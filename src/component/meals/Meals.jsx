import Meal from "./Meal.jsx";
import useHttp from "../../hook/useHttp.js";
import Error from "../error/Error.jsx";

/**
 * AVOID INFITNITE LOOP
 * 
 * If "requestConfig" is created inside the component,
 * even thought it's an empty object,
 * it's newly created everytime the component re-rendered.
 * This cause an infinite loop,
 * because it's one of the depedencies of useCallback in the useHttp hook.
 * Thus, it's needed to be defined outside the component.
 */
const requestConfig = {};

/**
 * COMPONENT BODY
 */
export default function Meals() {

  // Fetch meals data
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  // Loading message
  if (isLoading){
    return <p style={{textAlign: "center"}}>Fetching meals ...</p>
  }

  // Error handling
  if (error){
    return <Error title="Failed to fetch meals" message={error} />
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <Meal key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
