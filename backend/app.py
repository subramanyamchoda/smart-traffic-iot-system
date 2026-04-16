from flask import Flask, Response, jsonify
from flask_cors import CORS
import cv2
import threading
import time

from detector import detect
from traffic_logic import get_density
from speed import estimate_speed
from signal_controller import update_signal


app = Flask(__name__)
CORS(app)

latest_frame = None
lock = threading.Lock()


traffic_data = {
    "cars": 0,
    "bikes": 0,
    "autos": 0,
    "buses": 0,
    "trucks": 0,
    "total": 0,
    "signal": "RED",
    "signal_time": 20,
    "avg_speed": 0
}


def process_camera():

    global latest_frame

    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("Error: Cannot access webcam")
        return

    # Optional: set resolution
    cap.set(3, 800)
    cap.set(4, 600)

    while True:
        try:
            ret, frame = cap.read()

            if not ret:
                continue

            # Resize for better detection consistency
            frame = cv2.resize(frame, (800, 600))

            counts, detections = detect(frame)

            speeds = []

            for label, x1, y1, x2, y2 in detections:

                center = (
                    int((x1 + x2) / 2),
                    int((y1 + y2) / 2)
                )

                vid, speed = estimate_speed(center)

                if 0 < speed < 120:
                    speeds.append(speed)

                # Draw bounding box
                cv2.rectangle(
                    frame,
                    (x1, y1),
                    (x2, y2),
                    (0, 255, 0),
                    2
                )

                # Draw label
                cv2.putText(
                    frame,
                    f"{label.upper()} | {int(speed)} km/h",
                    (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.6,
                    (0, 255, 0),
                    2
                )

            # Average speed
            avg_speed = round(sum(speeds) / len(speeds), 2) if speeds else 0

            density = get_density(counts["total"])
            signal, signal_time = update_signal(counts["total"])

            # Update live data
            traffic_data.update(counts)
            traffic_data["signal"] = signal
            traffic_data["signal_time"] = signal_time
            traffic_data["avg_speed"] = avg_speed

            # Encode frame
            ret, buffer = cv2.imencode(".jpg", frame)

            if ret:
                with lock:
                    latest_frame = buffer.tobytes()

            time.sleep(0.03)

        except Exception as e:
            print("Camera Error:", e)
            time.sleep(1)


@app.route("/api/traffic")
def traffic():
    return jsonify(traffic_data)

@app.route("/")
def home():
    return {
        "status": "success",
        "message": "Smart Traffic System Connected"
    }

@app.route("/video")
def video():

    def generate():
        global latest_frame

        while True:
            with lock:
                frame = latest_frame

            if frame is None:
                time.sleep(0.03)
                continue

            yield (
                b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' +
                frame +
                b'\r\n'
            )

            time.sleep(0.03)

    return Response(
        generate(),
        mimetype='multipart/x-mixed-replace; boundary=frame'
    )


if __name__ == "__main__":

    camera_thread = threading.Thread(target=process_camera)
    camera_thread.daemon = True
    camera_thread.start()

    app.run(
        host="0.0.0.0",
        port=5000,
        threaded=True
    )
