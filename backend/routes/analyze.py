from fastapi import APIRouter, Request

router = APIRouter()


@router.post("")
async def analyze_user(request: Request):
    data = await request.json()
    age = data.get("age")
    gender = data.get("gender")
    weight = data.get("weight")
    height = data.get("height")
    activity = data.get("activity")
    goal = data.get("goal")

    # Harris-Benedict BMR
    if gender == "male":
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    else:
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)

    activity_factors = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "active": 1.725,
    }
    tdee = bmr * activity_factors.get(activity, 1.2)

    # Adjust for goal
    if goal == "Weight Loss":
        calories = tdee - 500
    elif goal == "Muscle Gain":
        calories = tdee + 300
    else:
        calories = tdee

    # Macros: protein 25%, carbs 50%, fats 25%
    protein = round((calories * 0.25) / 4)
    carbs = round((calories * 0.5) / 4)
    fats = round((calories * 0.25) / 9)

    return {
        "calories": round(calories),
        "macros": [
            {"name": "Protein", "value": protein},
            {"name": "Carbs", "value": carbs},
            {"name": "Fats", "value": fats},
        ],
    }
