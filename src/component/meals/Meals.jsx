import { useState, useEffect } from "react";
import Meal from "./Meal.jsx";

export default function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals");
      const resData = await response.json();

      setMeals(resData);
    }

    fetchMeals();
  }, []);

  return (
    <div id="meals">
      {meals.map((meal) => (
        <Meal
          key={meal.id}
          img={`http://localhost:3000/${meal.image}`} // NOT "img={meal.image}" !!
          title={meal.name}
          price={meal.price}
          description={meal.description}
        />
      ))}
    </div>
  );
}
