# tips.py

def get_tips(profile):
    tips = []

    if profile["diet"] == "omnivore":
        tips.append("Try a meat-free day once a week.")
    else:
        tips.append("You're already doing great with your diet!")

    if profile["transport"] == "car":
        tips.append("Consider biking or using public transport today.")
    else:
        tips.append("Your transport habits are already eco-friendly.")

    if profile["energy_usage"] == "high":
        tips.append("Turn off unused electronics to reduce energy use.")

    return tips
