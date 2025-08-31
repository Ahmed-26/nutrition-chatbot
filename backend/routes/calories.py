from fastapi import APIRouter, Request

router = APIRouter()

# Simple calorie lookup for common Indian foods
FOOD_DB = {
    "roti": 80,
    "daal": 120,
    "rice": 130,
    "chicken curry": 250,
    "grilled chicken": 180,
    "paneer": 265,
    "tofu": 76,
    "salad": 40,
    "egg": 68,
    "fish": 120,
    "oats": 150,
    "banana": 90,
}


@router.post("")
async def get_calories(request: Request):
    data = await request.json()
    items = data.get("items", [])
    result = []
    for item in items:
        name = item.lower().strip()
        calories = FOOD_DB.get(name, None)
        result.append(
            {"item": name, "calories": calories if calories is not None else "Unknown"}
        )
    return {"results": result}
