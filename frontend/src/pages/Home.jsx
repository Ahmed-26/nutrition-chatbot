import React, { useState } from "react";
import ChatUI from "../components/ChatUI";
import NutritionDashboard from "../components/NutritionDashboard";
import { motion } from "framer-motion";

const Home = () => {
  const [nutrition, setNutrition] = useState(null);
  const [mealPlan, setMealPlan] = useState([]);
  const [groceryList, setGroceryList] = useState([]);
  const [form, setForm] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activity: "",
    goal: "",
    allergies: "",
    preferences: "Pakistani",
    days: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit nutrition info to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://127.0.0.1:8000/v1/plan/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to fetch meal plan");
      const data = await res.json();
      setNutrition(data.nutrition);
      setMealPlan(data.meal_plan);
      setGroceryList(data.grocery_list);
    } catch (err) {
      setError("Unable to connect to backend or invalid data.");
    }
    setLoading(false);
  };

  // Profile features removed

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-100 to-blue-300 flex flex-col items-center justify-center py-6 md:py-10">
      <div className="w-full max-w-3xl mx-auto px-2 md:px-0">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-extrabold mb-2 text-center text-blue-700 drop-shadow-lg tracking-tight">
            Nutrition Chatbot
          </h1>
          <p className="text-lg text-center text-gray-700 font-medium mb-4">
            Your personal AI nutritionist for healthy Pakistani meal plans
          </p>
          <div className="flex justify-center gap-4 mb-2">
            <span className="inline-block px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold shadow">
              Pakistani Cuisine
            </span>
            <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold shadow">
              Personalized Diets
            </span>
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold shadow">
              Grocery Lists
            </span>
          </div>
        </motion.div>

        {/* Nutrition Info Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white/90 rounded-2xl shadow-xl p-4 md:p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          <div>
            <label className="block font-bold text-blue-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-4 py-2 rounded-lg border-2 border-blue-200 focus:outline-none focus:ring focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="block font-bold text-blue-700 mb-1">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-blue-200 focus:outline-none focus:ring focus:ring-blue-100"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-blue-700 mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              name="height"
              value={form.height}
              onChange={handleChange}
              required
              min="50"
              className="w-full px-4 py-2 rounded-lg border-2 border-blue-200 focus:outline-none focus:ring focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="block font-bold text-blue-700 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              required
              min="20"
              className="w-full px-4 py-2 rounded-lg border-2 border-blue-200 focus:outline-none focus:ring focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="block font-bold text-blue-700 mb-1">
              Activity Level
            </label>
            <select
              name="activity"
              value={form.activity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-blue-200 focus:outline-none focus:ring focus:ring-blue-100"
            >
              <option value="">Select</option>
              <option value="sedentary">Sedentary</option>
              <option value="light">Lightly Active</option>
              <option value="moderate">Moderately Active</option>
              <option value="active">Active</option>
              <option value="very">Very Active</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-blue-700 mb-1">Goal</label>
            <select
              name="goal"
              value={form.goal}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-blue-200 focus:outline-none focus:ring focus:ring-blue-100"
            >
              <option value="">Select</option>
              <option value="lose">Lose Weight</option>
              <option value="maintain">Maintain Weight</option>
              <option value="gain">Gain Weight</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block font-bold text-blue-700 mb-1">
              Allergies
            </label>
            <input
              type="text"
              name="allergies"
              value={form.allergies}
              onChange={handleChange}
              placeholder="e.g. nuts, dairy"
              className="w-full px-4 py-2 rounded-lg border-2 border-blue-200 focus:outline-none focus:ring focus:ring-blue-100"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-bold text-blue-700 mb-1">
              Dietary Preferences
            </label>
            <input
              type="text"
              name="preferences"
              value={form.preferences}
              onChange={handleChange}
              placeholder="Pakistani, vegetarian, etc."
              className="w-full px-4 py-2 rounded-lg border-2 border-blue-200 focus:outline-none focus:ring focus:ring-blue-100"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-bold text-blue-700 mb-1">Days</label>
            <select
              name="days"
              value={form.days}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-blue-200 focus:outline-none focus:ring focus:ring-blue-100"
            >
              {[...Array(14)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} Day{i === 0 ? "" : "s"}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 flex flex-col md:flex-row justify-end items-center gap-2 md:gap-4 mt-2">
            {error && (
              <span className="text-red-500 font-semibold mb-2 md:mb-0">
                {error}
              </span>
            )}
            <button
              type="submit"
              className="w-full md:w-auto bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 md:px-8 py-3 rounded-xl font-bold shadow hover:scale-105 transition-transform"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Meal Plan"}
            </button>
          </div>
        </motion.form>

        {/* Chat Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-2xl shadow-2xl bg-white/80 p-4 md:p-6 mb-8"
        >
          <ChatUI />
        </motion.div>

        {/* Nutrition Dashboard Section */}
        {nutrition && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <NutritionDashboard
              calories={nutrition.calories}
              macros={Object.entries(nutrition.macros).map(([name, value]) => ({
                name,
                value,
              }))}
              mealPlan={mealPlan}
              groceryList={groceryList}
            />
          </motion.div>
        )}
      </div>
      {/* Footer */}
      <footer className="mt-6 md:mt-10 text-center text-gray-500 text-xs md:text-sm px-2">
        Made by Ahmed Rasheed Group
      </footer>
    </div>
  );
};

export default Home;
