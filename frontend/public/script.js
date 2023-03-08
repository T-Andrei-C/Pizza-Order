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

    // let a = [];
    // const filter = ["gluten", "milk"];
    // allergenList.map(pizza => {
    //   if(!filter.some(alergy => pizza.allergens.includes(alergy))){
    //     a.push(pizza);
    //   }
    // })
    // console.log(a)

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

    const removeListElements = () => {
      let listedItems = document.querySelectorAll(".list-item");
      if (listedItems) listedItems.forEach(item => item.remove());
    }
    const showByAllergens = (data) => {
      const allergensList = document.querySelector("#allergens-list");
      const allergenSearch = document.querySelector("#pick-your-allergy");
      data.map(allergen => {
        let listItem = document.createElement("li");
        listItem.classList.add("list-item");
        listItem.innerHTML = `${allergen.name}`;

        listItem.addEventListener("click", () => {
          allergenSearch.value = listItem.innerHTML;
          removeListElements();
        })
        allergensList.appendChild(listItem);
      })
    }

    const filterByAllergens = async () => {
      const allergens = await fetchAllergens();
      const allergenSearch = document.querySelector("#pick-your-allergy");
      allergenSearch.addEventListener("input", () => {
        const filterPizzas = allergens.filter(allergen => allergen.name.includes(allergenSearch.value));
        removeListElements();
        if (allergenSearch.value === "") {
          showByAllergens(allergens);
        }
        if (allergenSearch.value.length > 0) {
          showByAllergens(filterPizzas);
        }
      })
    }

    const main = async () => {
      await displayPizzaList();
      filterByAllergens();
    };
    main();
  };

  window.addEventListener("load", loadEvent);
} else {
  console.log("You are on the server.");
}