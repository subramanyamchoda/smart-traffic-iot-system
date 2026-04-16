import cv2
from ultralytics import YOLO

# Use better model for accuracy
model = YOLO("yolov8s.pt")   # 🔥 better than yolov8n

vehicle_map = {
    "car": "cars",
    "motorcycle": "bikes",
    "bus": "buses",
    "truck": "trucks"
}

def detect(frame):

    frame_small = cv2.resize(frame, (640, 384))

    # 🔥 higher confidence + IOU filtering
    results = model(frame_small, conf=0.6, iou=0.5)

    counts = {
        "cars": 0,
        "bikes": 0,
        "autos": 0,
        "buses": 0,
        "trucks": 0,
        "total": 0
    }

    detections = []

    scale_x = frame.shape[1] / 640
    scale_y = frame.shape[0] / 384

    for r in results:

        if r.boxes is None:
            continue

        for box in r.boxes:

            cls = int(box.cls[0])
            name = model.names[cls]

            if name not in vehicle_map:
                continue

            conf = float(box.conf[0])

            # 🔥 extra safety filter
            if conf < 0.6:
                continue

            key = vehicle_map[name]
            counts[key] += 1

            x1, y1, x2, y2 = map(int, box.xyxy[0])

            # scale back to original frame
            x1 = int(x1 * scale_x)
            y1 = int(y1 * scale_y)
            x2 = int(x2 * scale_x)
            y2 = int(y2 * scale_y)

            detections.append((name, x1, y1, x2, y2))

    counts["total"] = sum([
        counts["cars"],
        counts["bikes"],
        counts["buses"],
        counts["trucks"]
    ])

    return counts, detections