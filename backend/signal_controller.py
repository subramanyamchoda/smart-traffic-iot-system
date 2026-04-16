import time

GREEN_TIME = 30
YELLOW_TIME = 4
RED_TIME = 20

signal_state = "RED"
last_change = time.time()

def update_signal(total_vehicles):

    global signal_state, last_change

    current = time.time()
    elapsed = current - last_change

    
    if total_vehicles > 5:
        signal_state = "GREEN"
        last_change = current
        return "GREEN", GREEN_TIME

    
    if signal_state == "GREEN" and elapsed >= GREEN_TIME:
        signal_state = "YELLOW"
        last_change = current

    elif signal_state == "YELLOW" and elapsed >= YELLOW_TIME:
        signal_state = "RED"
        last_change = current

    elif signal_state == "RED" and elapsed >= RED_TIME:
        signal_state = "GREEN"
        last_change = current

    elapsed = current - last_change

    if signal_state == "GREEN":
        remaining = GREEN_TIME - elapsed
    elif signal_state == "YELLOW":
        remaining = YELLOW_TIME - elapsed
    else:
        remaining = RED_TIME - elapsed

    return signal_state, int(remaining)