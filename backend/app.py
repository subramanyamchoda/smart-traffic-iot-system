from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2

from detector import detect
from speed import estimate_speed
from signal_controller import update_signal

app = Flask(__name__)
CORS(app)

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


@app.route("/process-frame", methods=["POST"])
def process_frame():
    try:
        file = request.files["frame"]

        if not file:
            return jsonify({"error": "No frame received"})

        npimg = np.frombuffer(file.read(), np.uint8)
        frame = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

        # ❗ DEBUG CHECK 1
        if frame is None:
            return jsonify({"error": "Frame decode failed"})

        print("Frame shape:", frame.shape)

        # 🔥 FORCE SAFE SIZE
        frame = cv2.resize(frame, (640, 480))

        # ---------------- DETECTION ----------------
        counts, detections = detect(frame)

        print("Counts:", counts)
        print("Detections:", len(detections))

        speeds = []

        for label, x1, y1, x2, y2 in detections:

            cx = (x1 + x2) // 2
            cy = (y1 + y2) // 2

            _, speed = estimate_speed((cx, cy))

            if 0 < speed < 120:
                speeds.append(speed)

        avg_speed = round(sum(speeds) / len(speeds), 2) if speeds else 0

        signal, signal_time = update_signal(counts.get("total", 0))

        traffic_data.update(counts)
        traffic_data["signal"] = signal
        traffic_data["signal_time"] = signal_time
        traffic_data["avg_speed"] = avg_speed

        return jsonify({
            "success": True,
            "counts": counts,
            "detections": len(detections)
        })

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"success": False, "error": str(e)})
        
@app.route("/api/traffic")
def traffic():
    return jsonify(traffic_data)

@app.route("/")
def home():
    return {
        "status": "success",
        "message": "Smart Traffic System Connected"
    }

if __name__ == "__main__":
    app.run(debug=True, port=5000)
