# Food order app with react

## 0. Set up

### 0-0. Install
You need to install depedencies both for the front end and for the dummy back end. <br>

- Backend: `/backend$ npm install`
- Frontend: `$ npm install`

## 0-1. Run application 
In order to run the application properly, you need to run both the backend. <br>

- Backend: `/backend$ npm start`
- Frontend: `$ npm run dev`


## 1. Objectives
- Add components for displaying **products**, the **cart** (in a **modal**) and a **checkout form** (in a **modal**)
- **Fetch** the (dummy) meals data from the **backend** and show it on the screen (GET/meals)
- Allow users to **add & remove** products to / from the **cart**
- **Send cart data** along with **user data** (full name, email, street, postal code, city) to the **backend** (POST/orders)
- Handle **loading & error** states

## 2. Planing
1. Add the **Header** component
2. Add the **Meals-related** components & the logic to fetch meals data from a **backend**
3. Add **Cart** logic (add items to cart, edit cart items) & **Checkout** page logic

## 3. Creating the Header component
```
export default function Header() {
  return (
    <header>
      <div id="main-header">
        <div id="title">
          <img alt="hamburger illustration logo" src="./logo.jpg" />
          <h1>Reactfood</h1>
        </div>
        <button>Cart (3)</button>
      </div>
    </header>
  );
}
```

## 4. Creating the Meals & Meal component

## 4-0. Creat the Meals component with hard coded params

```
import Meal from "./Meal.jsx";

export default function Meals() {
  return (
    <div id="meals">
        <div className="meal-item">
            <article>
                <img src="./logo.jpg" />
                <h3>Mac & Cheese</h3>
                <div className="meal-item-price">€8.99</div>
                <div className="meal-item-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae proin sagittis nisl rhoncus mattis rhoncus urna.
                </div>
                <div className="meal-item-actions">
                    <button>Add to Cart</button>
                </div>
            </article>
        </div>

        <div className="meal-item">
            <article>
                <img src="./logo.jpg" />
                <h3>Margherita Pizza</h3>
                <div className="meal-item-price">€12.99</div>
                <div className="meal-item-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae proin sagittis nisl rhoncus mattis rhoncus urna.
                </div>
                <div className="meal-item-actions">
                    <button>Add to Cart</button>
                </div>
            </article>
        </div>

        <div className="meal-item">
            <article>
                <img src="./logo.jpg" />
                <h3>Ceasar Salad</h3>
                <div className="meal-item-price">€7.99</div>
                <div className="meal-item-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae proin sagittis nisl rhoncus mattis rhoncus urna.
                </div>
                <div className="meal-item-actions">
                    <button>Add to Cart</button>
                </div>
            </article>
        </div>
    </div>
  );
}
```

## 4-1. Create the reuseable Meal component and replace contents

**Meals.jsx**
```
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
``` 

<br><br>

**Meal.jsx**
```
export default function Meal({ img, title, price, description }) {
  return (
    <div className="meal-item">
      <article>
        <img src={img} />
        <h3>{title}</h3>
        <div className="meal-item-price">€{price}</div>
        <div className="meal-item-description">{description}</div>
        <div className="meal-item-actions">
          <button>Add to Cart</button>
        </div>
      </article>
    </div>
  );
}
```

## 4-2. Replace hard coded data with the DUMMY array (`Meals.jsx`)
```
const DUMMY_MEALS = [
  {
    "id": "m1",
    "name": "Mac & Cheese",
    "price": "8.99",
    "description": "Creamy cheddar cheese mixed with perfectly cooked macaroni, topped with crispy breadcrumbs. A classic comfort food.",
    "image": "images/mac-and-cheese.jpg"
  },
  {
    "id": "m2",
    "name": "Margherita Pizza",
    "price": "12.99",
    "description": "A classic pizza with fresh mozzarella, tomatoes, and basil on a thin and crispy crust.",
    "image": "images/margherita-pizza.jpg"
  },
  {
    "id": "m3",
    "name": "Caesar Salad",
    "price": "7.99",
    "description": "Romaine lettuce tossed in Caesar dressing, topped with croutons and parmesan shavings.",
    "image": "images/caesar-salad.jpg"
  },
  {
    "id": "m4",
    "name": "Spaghetti Carbonara",
    "price": "10.99",
    "description": "Al dente spaghetti with a creamy sauce made from egg yolk, pecorino cheese, pancetta, and pepper.",
    "image": "images/spaghetti-carbonara.jpg"
  },
]

export default function Meals() {
  return (
    <div id="meals">
      {DUMMY_MEALS.map((meal) => (
        <Meal
          key={meal.id}
          img={meal.image}
          title={meal.name}
          price={meal.price}
          description={meal.description}
        />
      ))}
    </div>
  );
}
```

## 5. Add fetch meals data logic (`Meals.jsx`)
```
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
```
