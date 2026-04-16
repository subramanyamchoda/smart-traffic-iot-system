import time
import math

vehicle_tracks = {}
next_id = 1

PIXELS_PER_METER = 10   # 🔥 tune based on camera
MAX_DISTANCE = 50
TRACK_TIMEOUT = 1.5


def estimate_speed(center):

    global next_id

    current_time = time.time()

    best_id = None
    min_dist = float("inf")

    # 🔥 find closest tracked vehicle
    for vid, data in vehicle_tracks.items():

        prev_center = data["pos"]

        dist = math.hypot(center[0] - prev_center[0],
                          center[1] - prev_center[1])

        if dist < MAX_DISTANCE and dist < min_dist:
            min_dist = dist
            best_id = vid

    # 🔥 new vehicle
    if best_id is None:
        vehicle_tracks[next_id] = {
            "pos": center,
            "time": current_time
        }
        next_id += 1
        return next_id, 0

    prev = vehicle_tracks[best_id]

    dist_pixels = math.hypot(
        center[0] - prev["pos"][0],
        center[1] - prev["pos"][1]
    )

    time_diff = current_time - prev["time"]

    # update
    vehicle_tracks[best_id]["pos"] = center
    vehicle_tracks[best_id]["time"] = current_time

    if time_diff <= 0:
        return best_id, 0

    dist_meters = dist_pixels / PIXELS_PER_METER
    speed = (dist_meters / time_diff) * 3.6

    # 🔥 remove unrealistic speeds
    if speed > 120:
        speed = 0

    return best_id, round(speed, 2)