from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import cv2
import numpy as np
import time

from detector import detect
from speed import estimate_speed
from signal_controller import update_signal

app = Flask(__name__)

# ✅ CLEAN CORS (ONLY ONCE)
CORS(app, resources={
    r"/*": {
        "origins": [
            "https://smart-traffic-iot-system.vercel.app",
            "https://smart-traffic-iot-system.vercel.app/",
            "https://smart-traffic-iot-system.onrender.com/",
            "https://smart-traffic-iot-system.onrender.com",
            "http://localhost:3000"
        ]
    }
})

app.config["MAX_CONTENT_LENGTH"] = 5 * 1024 * 1024

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

last_time = 0

@app.route("/process-frame", methods=["POST"])
def process_frame():
    global last_time

    try:
        # throttle (prevents Render crash)
        if time.time() - last_time < 0.5:
            return jsonify({"status": "skipped"})

        last_time = time.time()

        file = request.files.get("frame")
        if not file:
            return jsonify({"error": "No frame received"})

        npimg = np.frombuffer(file.read(), np.uint8)
        frame = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

        if frame is None:
            return jsonify({"error": "decode failed"})

        frame = cv2.resize(frame, (640, 480))

        counts, detections = detect(frame)

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
        traffic_data["avg_speed"] = avg_speed
        traffic_data["signal"] = signal
        traffic_data["signal_time"] = signal_time

        return jsonify({
            "success": True,
            "counts": counts,
            "detections": len(detections),
            "avg_speed": avg_speed,
            "signal": signal,
            "signal_time": signal_time
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)})


@app.route("/api/traffic")
def traffic():
    return jsonify(traffic_data)


@app.route("/")
def home():
    return {"status": "ok"}


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port, debug=False)