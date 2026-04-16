def get_density(total):

    if total <= 8:
        return "LOW"

    elif total <= 20:
        return "MEDIUM"

    elif total <= 40:
        return "HIGH"

    else:
        return "VERY_HIGH"


def get_time_period(hour):

    if 5 <= hour < 11:
        return "MORNING"

    elif 11 <= hour < 16:
        return "AFTERNOON"

    elif 16 <= hour < 21:
        return "EVENING"

    else:
        return "NIGHT"