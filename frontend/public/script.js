import { pizzaDisplay, pizzaPage } from "./components.js";

if (typeof window !== "undefined") {
  const loadEvent = () => {
    const rootElement = document.querySelector("#root");

    const fetchPizzas = async () => {
      const response = await fetch(`http://127.0.0.1:9001/api/pizza`);
      return await response.json();
    };

    const fetchAllergens = async () => {
      const response = await fetch(`http://127.0.0.1:9001/api/allergen`);
      return await response.json();
    };

    const displayPizzaList = async () => {
      const pizzas = await fetchPizzas();
      const allergens = await fetchAllergens();
      const allergenList = [];
      pizzas.map((pizza, i) => {
        allergenList.push({
          name: pizza.name,
          allergens: []
        })
        pizza.allergens.map(allergen => {
          if (allergen === allergens[allergen - 1].id) {
            allergenList[i].allergens.push(allergens[allergen - 1].name);
          }
        })
      })
      rootElement.insertAdjacentHTML("beforeend", pizzaPage(pizzas, allergenList));
    };

    const main = async () => {
      displayPizzaList();
    };
    main();
  };

  window.addEventListener("load", loadEvent);
} else {
  console.log("You are on the server.");
}