import { pizzaPage } from "./components.js";

if (typeof window !== "undefined") {
  const detailsOfPizzas = [];
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
      pizzas.map((pizza, i) => {
        detailsOfPizzas.push({
          id: pizza.id,
          url: pizza.url,
          name: pizza.name,
          ingredients: pizza.ingredients,
          price: pizza.price,
          allergens: [],
        });
        pizza.allergens.map((allergen) => {
          if (allergen === allergens[allergen - 1].id) {
            detailsOfPizzas[i].allergens.push(allergens[allergen - 1].name);
          }
        });
      });

      rootElement.insertAdjacentHTML(
        "beforeend",
        pizzaPage(pizzas, detailsOfPizzas)
      );
    };

    const removeListElements = () => {
      let listedItems = document.querySelectorAll(".list-item");
      if (listedItems) listedItems.forEach((item) => item.remove());
    };
    const showByAllergens = (data) => {
      const allergensList = document.querySelector("#allergens-list");
      const allergenSearch = document.querySelector("#pick-your-allergy");
      const spanSelector = document.querySelectorAll(".allergens");
      data.map((allergen) => {
        let listItem = document.createElement("li");
        listItem.classList.add("list-item");
        listItem.innerHTML = `${allergen.name
          .charAt(0)
          .toUpperCase()
          .concat(allergen.name.slice(1).toLowerCase())}`;

        listItem.addEventListener("click", () => {
          allergenSearch.value = listItem.innerHTML;
          removeListElements();
        });
        allergensList.appendChild(listItem);
      });
    };

    const filterByAllergens = async () => {
      const allergens = await fetchAllergens();
      const allergenSearch = document.querySelector("#pick-your-allergy");
      allergenSearch.addEventListener("input", () => {
        const filterPizzas = allergens.filter((allergen) =>
          allergen.name.includes(allergenSearch.value)
        );
        removeListElements();
        if (allergenSearch.value === "") {
          showByAllergens(allergens);
        }
        if (allergenSearch.value.length > 0) {
          showByAllergens(filterPizzas);
        }
      });
    };

    const orderedPizzas = [];
    const addPizzas = () => {
      const addButtons = Array.from(document.querySelectorAll('.add-pizza'));
      addButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          let pizzaId = btn.parentElement.parentElement.children[0].children[1].children[1].id
          let pizzaAmount = btn.parentElement.parentElement.children[2].children[0].value
          if (pizzaAmount > 0) {
            orderedPizzas.push({
              id: parseInt(pizzaId, 10),
              amount: parseInt(pizzaAmount, 10)
            })
            btn.innerHTML = `<img src="/public/img/white_x.png">`;
          }
          if (orderedPizzas.length === 1) {

          }
        })
      })
    }

    const chooseOption = () => {
      let allergyList = [];
      const allergenSearch = document.querySelector("#pick-your-allergy");
      const getOptions = document.querySelector("#allergens-list");
      const allPizzas = document.querySelectorAll(".pizza");
      const filterPizzas = document.querySelector("#filtered-list");

      const filterPizzasByAlergies = () => {
        detailsOfPizzas.map((pizza, i) => {
          if (!allergyList.some(allergy => pizza.allergens.includes(allergy))) {
            allPizzas[i].style.display = "";
          } else {
            allPizzas[i].style.display = "none";
          }
        });
      };

      getOptions.addEventListener("click", () => {
        allergyList.push(allergenSearch.value.toLowerCase());
        filterPizzasByAlergies();
        filterPizzas.innerHTML = "";
        allergyList = [...new Set(allergyList)];
        allergyList.forEach((allergy, i) => {
          if (!filterPizzas.textContent.includes(allergy)) {
            filterPizzas.insertAdjacentHTML(
              "beforeend",
              `
              <li>${allergy.charAt(0).toUpperCase().concat(allergy.slice(1).toLowerCase())}
                <button id="${i}" class="removeAlergy">X</button>
              </li>
            `
            );
          }
        });

        document.querySelectorAll(".removeAlergy").forEach(btn => {
          btn.addEventListener("click", e => {
            allergyList.splice(e.target.id, 1);
            btn.parentElement.remove();
            filterPizzasByAlergies();
          });
        });
      });
    };

    const main = async () => {
      await displayPizzaList();
      await filterByAllergens();
      addPizzas()
      chooseOption()
    };
    main();
  };

  window.addEventListener("load", loadEvent);
} else {
  console.log("You are on the server.");
}