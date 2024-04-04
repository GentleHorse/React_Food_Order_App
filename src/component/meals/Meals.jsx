import { useState, useEffect } from "react";
import Meal from "./Meal.jsx";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch("http://localhost:3000/meals");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch meals");
        }

        setLoadedMeals(resData);
      } catch (error) {
        setError({
          message: "Failed to fetch meals",
        });
      }
    }

    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <Meal key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
