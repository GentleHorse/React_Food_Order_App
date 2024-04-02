import Meal from "./Meal.jsx";

export default function Meals() {
  return (
    <div id="meals">
      <Meal
        img="./logo.jpg"
        title="Mac & Cheese"
        price="8.99"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae
        proin sagittis nisl rhoncus mattis rhoncus urna."
      />

      <Meal
        img="./logo.jpg"
        title="Margherita Pizza"
        price="12.99"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae
        proin sagittis nisl rhoncus mattis rhoncus urna."
      />

      <Meal
        img="./logo.jpg"
        title="Ceasar Salad"
        price="7.99"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae
        proin sagittis nisl rhoncus mattis rhoncus urna."
      />
    </div>
  );
}
