import json
import os
import pandas as pd
from fastapi import APIRouter, Request
from typing import List, Dict

router = APIRouter()

PROFILE_PATH = os.path.join(os.path.dirname(__file__), "..", "profiles.json")


def load_profiles():
    if not os.path.exists(PROFILE_PATH):
        return []
    with open(PROFILE_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def save_profiles(profiles):
    with open(PROFILE_PATH, "w", encoding="utf-8") as f:
        json.dump(profiles, f, indent=2)


@router.get("/v1/profiles")
async def get_profiles():
    profiles = load_profiles()
    return {"profiles": profiles}


@router.post("/v1/profiles/save")
async def save_profile(request: Request):
    data = await request.json()
    profiles = load_profiles()
    profiles.append(data)
    save_profiles(profiles)
    return {"status": "saved", "profiles": profiles}


FOODS_CSV = os.path.join(os.path.dirname(__file__), "..", "foods.csv")


def load_foods():
    df = pd.read_csv(FOODS_CSV)
    return df


def calculate_bmr_tdee(age, gender, weight, height, activity, goal):
    # Mifflin-St Jeor Equation
    if gender == "male":
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    else:
        bmr = 10 * weight + 6.25 * height - 5 * age - 161
    activity_factors = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "active": 1.725,
        "very active": 1.9,
    }
    tdee = bmr * activity_factors.get(activity, 1.2)
    if goal == "loss":
        calories = tdee - 500
    elif goal == "gain":
        calories = tdee + 300
    else:
        calories = tdee
    # Macros: protein 25%, carbs 50%, fats 25%
    protein = round((calories * 0.25) / 4)
    carbs = round((calories * 0.5) / 4)
    fats = round((calories * 0.25) / 9)
    return {
        "bmr": round(bmr),
        "tdee": round(tdee),
        "calories": round(calories),
        "macros": {
            "protein": protein,
            "carbs": carbs,
            "fats": fats,
        },
    }


def filter_foods(df, preferences, allergies, diet_category):
    # Filter by diet category and allergies
    if diet_category:
        df = df[df[diet_category] == "yes"]
    if preferences:
        if preferences == "vegan":
            df = df[df["vegan"] == "yes"]
        elif preferences == "vegetarian":
            df = df[(df["vegan"] == "yes") | (df["category"] == "regional")]
    if allergies:
        for allergen in allergies:
            df = df[~df["food"].str.contains(allergen, case=False)]
    return df


import random


def generate_meal_plan(df, macros, day_offset=0):
    # Professional meal plan: rotate and randomize foods for each day
    protein_foods = df.sort_values("protein", ascending=False)["food"].tolist()
    carb_foods = df.sort_values("carbs", ascending=False)["food"].tolist()
    fat_foods = df.sort_values("fat", ascending=False)["food"].tolist()

    # Shuffle lists for variety
    random.seed(day_offset)  # Ensure different days get different meals
    protein_foods = protein_foods.copy()
    carb_foods = carb_foods.copy()
    fat_foods = fat_foods.copy()
    random.shuffle(protein_foods)
    random.shuffle(carb_foods)
    random.shuffle(fat_foods)

    meal_plan = []
    meal_plan.append(
        {
            "meal": "Breakfast",
            "items": [
                protein_foods[day_offset % len(protein_foods)],
                carb_foods[day_offset % len(carb_foods)],
                fat_foods[day_offset % len(fat_foods)],
            ],
        }
    )
    meal_plan.append(
        {
            "meal": "Lunch",
            "items": [
                protein_foods[(day_offset + 1) % len(protein_foods)],
                carb_foods[(day_offset + 1) % len(carb_foods)],
                fat_foods[(day_offset + 1) % len(fat_foods)],
            ],
        }
    )
    meal_plan.append(
        {
            "meal": "Dinner",
            "items": [
                protein_foods[(day_offset + 2) % len(protein_foods)],
                carb_foods[(day_offset + 2) % len(carb_foods)],
                fat_foods[(day_offset + 2) % len(fat_foods)],
            ],
        }
    )
    meal_plan.append(
        {
            "meal": "Snacks",
            "items": [
                carb_foods[(day_offset + 2) % len(carb_foods)],
                fat_foods[(day_offset + 2) % len(fat_foods)],
            ],
        }
    )
    return meal_plan


def generate_grocery_list(meal_plan):
    # Aggregate items for grocery list
    grocery = {}
    for meal in meal_plan:
        for item in meal["items"]:
            grocery[item] = grocery.get(item, 0) + 1
    return [{"item": k, "quantity": v} for k, v in grocery.items()]


def substitute_food(df, food, preferences):
    # Substitute food based on preferences
    if preferences == "vegan":
        subs = df[(df["vegan"] == "yes") & (df["food"] != food)]["food"].tolist()
    elif preferences == "vegetarian":
        subs = df[
            (df["vegan"] == "yes")
            | (df["category"] == "regional") & (df["food"] != food)
        ]["food"].tolist()
    else:
        subs = df[df["food"] != food]["food"].tolist()
    return subs[:3]


@router.post("/v1/plan/generate")
async def generate_personalized_plan(request: Request):
    data = await request.json()
    age = float(data.get("age", 0))
    gender = data.get("gender")
    height = float(data.get("height", 0))
    weight = float(data.get("weight", 0))
    activity = data.get("activity")
    goal = data.get("goal")
    allergies = data.get("allergies", [])
    preferences = data.get("preferences", "vegetarian")
    diet_category = data.get("diet_category", None)
    days = int(data.get("days", 1))

    nutrition = calculate_bmr_tdee(age, gender, weight, height, activity, goal)
    df = load_foods()
    filtered_df = filter_foods(df, preferences, allergies, diet_category)
    meal_plan = []
    for day in range(days):
        day_plan = generate_meal_plan(filtered_df, nutrition["macros"], day_offset=day)
        for meal in day_plan:
            meal["day"] = day + 1
        meal_plan.extend(day_plan)
    grocery_list = generate_grocery_list(meal_plan)
    return {
        "nutrition": nutrition,
        "meal_plan": meal_plan,
        "grocery_list": grocery_list,
    }


@router.post("/v1/foods/substitute")
async def food_substitute(request: Request):
    data = await request.json()
    food = data.get("food")
    preferences = data.get("preferences", "vegetarian")
    df = load_foods()
    subs = substitute_food(df, food, preferences)
    return {"substitutes": subs}


@router.get("/v1/foods/search")
async def search_foods(request: Request):
    query = request.query_params.get("q", "")
    diet_category = request.query_params.get("diet_category", None)
    df = load_foods()
    if query:
        df = df[df["food"].str.contains(query, case=False)]
    if diet_category:
        df = df[df[diet_category] == "yes"]
    foods = df[["food", "category", "calories", "protein", "carbs", "fat"]].to_dict(
        orient="records"
    )
    return {"foods": foods}
