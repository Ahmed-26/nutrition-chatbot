import requests


def test_chat():
    resp = requests.post(
        "http://localhost:8000/chat", json={"message": "Hello!", "session_id": "test1"}
    )
    assert resp.status_code == 200
    print("/chat:", resp.json())


def test_analyze():
    payload = {
        "age": 25,
        "gender": "male",
        "weight": 70,
        "height": 175,
        "activity": "moderate",
        "goal": "Weight Loss",
    }
    resp = requests.post("http://localhost:8000/analyze", json=payload)
    assert resp.status_code == 200
    print("/analyze:", resp.json())


def test_mealplan():
    payload = {"calories": 1800, "preferences": "Veg", "goal": "Weight Loss"}
    resp = requests.post("http://localhost:8000/mealplan", json=payload)
    assert resp.status_code == 200
    print("/mealplan:", resp.json())


def test_calories():
    payload = {"items": ["roti", "daal", "chicken curry"]}
    resp = requests.post("http://localhost:8000/calories", json=payload)
    assert resp.status_code == 200
    print("/calories:", resp.json())


if __name__ == "__main__":
    test_chat()
    test_analyze()
    test_mealplan()
    test_calories()
