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

