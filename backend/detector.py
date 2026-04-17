import cv2
from ultralytics import YOLO

model = YOLO("yolov8s.pt")  # better accuracy than n

vehicle_map = {
    "car": "cars",
    "motorcycle": "bikes",
    "bus": "buses",
    "truck": "trucks"
}

def detect(frame):

    h, w = frame.shape[:2]

    # resize for faster inference
    frame_small = cv2.resize(frame, (640, 384))

    results = model(frame_small, conf=0.6, iou=0.5, verbose=False)

    counts = {
        "cars": 0,
        "bikes": 0,
        "autos": 0,   # not detected by YOLO (kept for UI)
        "buses": 0,
        "trucks": 0,
        "total": 0
    }

    detections = []

    scale_x = w / 640
    scale_y = h / 384

    seen_boxes = set()  # 🔥 avoid duplicate counting

    for r in results:

        if r.boxes is None:
            continue

        for box in r.boxes:

            cls = int(box.cls[0])
            name = model.names[cls]
            conf = float(box.conf[0])

            if conf < 0.6:
                continue

            if name not in vehicle_map:
                continue

            x1, y1, x2, y2 = map(int, box.xyxy[0])

            # 🔥 duplicate prevention key
            box_id = (x1, y1, x2, y2)
            if box_id in seen_boxes:
                continue
            seen_boxes.add(box_id)

            key = vehicle_map[name]
            counts[key] += 1

            # scale back
            x1 = int(x1 * scale_x)
            y1 = int(y1 * scale_y)
            x2 = int(x2 * scale_x)
            y2 = int(y2 * scale_y)

            detections.append((name, x1, y1, x2, y2))

    counts["total"] = (
        counts["cars"] +
        counts["bikes"] +
        counts["buses"] +
        counts["trucks"]
    )

    return counts, detections
