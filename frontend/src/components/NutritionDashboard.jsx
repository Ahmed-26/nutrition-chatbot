import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const NutritionDashboard = ({ calories, macros, mealPlan, groceryList }) => {
  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-white via-blue-50 to-green-100 rounded-2xl shadow-2xl mt-4 md:mt-6 border border-blue-100">
      <h2 className="text-3xl font-extrabold mb-6 text-green-700 flex items-center gap-2">
        <span role="img" aria-label="dashboard">
          📊
        </span>{" "}
        Your Nutrition Dashboard
      </h2>
      <div className="mb-4 md:mb-6 flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="flex-1 bg-white rounded-xl shadow-lg p-4 md:p-6 border border-green-200 flex flex-col items-center min-w-0">
          <span className="font-semibold text-lg text-blue-700 flex items-center gap-2">
            <span role="img" aria-label="calories">
              🔥
            </span>{" "}
            <span className="font-bold">Calories per day:</span>
          </span>
          <span className="text-2xl font-bold text-green-600 mt-2">
            {calories} kcal
          </span>
        </div>
        <div className="flex-1 bg-white rounded-xl shadow-lg p-4 md:p-6 border border-blue-200 min-w-0">
          <span className="font-semibold text-lg text-blue-700 flex items-center gap-2">
            <span role="img" aria-label="macros">
              🍽️
            </span>{" "}
            <span className="font-bold">Macronutrient Breakdown:</span>
          </span>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={macros}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mb-4 md:mb-6 bg-white rounded-xl shadow-lg p-4 md:p-6 border border-blue-100">
        <span className="font-semibold text-lg text-green-700 flex items-center gap-2">
          <span role="img" aria-label="meal">
            🥗
          </span>{" "}
          <span className="font-bold">Meal Plan Suggestions:</span>
        </span>
        {/* Group meals by day and show headings */}
        <div className="mt-2">
          {(() => {
            // Group meals by day
            const days = {};
            mealPlan.forEach((meal) => {
              const day = meal.day || 1;
              if (!days[day]) days[day] = [];
              days[day].push(meal);
            });
            return Object.keys(days).map((dayNum) => (
              <div key={dayNum} className="mb-4">
                <h3 className="text-xl font-bold text-blue-600 mb-2">
                  Day {dayNum} Meals
                </h3>
                <ul className="list-disc ml-6">
                  {days[dayNum].map((meal, idx) => (
                    <li key={idx} className="text-blue-700 font-medium mb-1">
                      <span className="font-bold">{meal.meal}:</span>{" "}
                      {meal.items.join(", ")}
                    </li>
                  ))}
                </ul>
              </div>
            ));
          })()}
        </div>
      </div>
      <div className="mb-4 md:mb-6 bg-white rounded-xl shadow-lg p-4 md:p-6 border border-green-100">
        <span className="font-semibold text-lg text-green-700 flex items-center gap-2">
          <span role="img" aria-label="grocery">
            🛒
          </span>{" "}
          <span className="font-bold">Grocery List:</span>
        </span>
        <ul className="list-disc ml-6 mt-2">
          {groceryList &&
            groceryList.map((item, idx) => (
              <li key={idx} className="text-blue-700 font-medium mb-1">
                {item.item}{" "}
                <span className="text-green-600">({item.quantity})</span>
              </li>
            ))}
        </ul>
      </div>
      <div className="mb-2 md:mb-4 bg-white rounded-xl shadow-lg p-4 md:p-6 border border-blue-100">
        <span className="font-semibold text-lg text-blue-700 flex items-center gap-2">
          <span role="img" aria-label="progress">
            📈
          </span>{" "}
          <span className="font-bold">Progress Charts:</span>
        </span>
        <div className="bg-gray-100 rounded p-4 text-gray-500 mt-2 text-center">
          Progress charts coming soon...
        </div>
      </div>
    </div>
  );
};

export default NutritionDashboard;
