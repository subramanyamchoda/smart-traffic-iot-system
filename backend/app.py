from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2
import os
import time

from detector import detect
from speed import estimate_speed
from signal_controller import update_signal

app = Flask(__name__)

# ✅ FIX 1: SIMPLE GLOBAL CORS (IMPORTANT FOR RENDER)
CORS(app, supports_credentials=True)

# ✅ FIX 2: MAX FILE SIZE
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


# ✅ FIX 3: HANDLE PRE-FLIGHT REQUESTS (CORS CRITICAL)
@app.route("/process-frame", methods=["POST", "OPTIONS"])
def process_frame():

    # Handle OPTIONS request (CORS preflight)
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200

    global last_time

    try:
        # rate limit (avoid overload)
        if time.time() - last_time < 0.5:
            return jsonify({"status": "skipped"})

        last_time = time.time()

        file = request.files.get("frame")
        if not file:
            return jsonify({"error": "No frame received"}), 400

        npimg = np.frombuffer(file.read(), np.uint8)
        frame = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

        if frame is None:
            return jsonify({"error": "decode failed"}), 400

        frame = cv2.resize(frame, (640, 480))

        # ---------------- DETECTION ----------------
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

        response = jsonify({
            "success": True,
            "counts": counts,
            "detections": len(detections),
            "avg_speed": avg_speed,
            "signal": signal,
            "signal_time": signal_time
        })

        # ✅ FIX 4: FORCE CORS HEADERS (IMPORTANT ON RENDER)
        response.headers.add("Access-Control-Allow-Origin", "*")

        return response

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/traffic")
def traffic():
    response = jsonify(traffic_data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/")
def home():
    return {"status": "ok"}


# ✅ FIX 5: RENDER PORT SUPPORT
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port, debug=False)