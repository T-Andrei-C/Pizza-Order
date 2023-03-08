const capitalizeAllInArray = (data) => {
    const newList = [];
    data.forEach(el => 
        newList.push(`${el.trim().charAt(0).toUpperCase().concat(el.trim().slice(1).toLowerCase())}`));
    return newList.join(", ");
};

const capitalizeString = (str) => {
    const arr = str.split(",");
    let newList = capitalizeAllInArray(arr);
    return newList;
};

const pizzaDisplay = (data, data2) => {
    const pizzas = [];
    data.forEach((pizza, i) => {
        pizzas.push(`
        <div class ="pizza">
            <div class="main-details">
                <div>
                    <img src="${pizza.url}" class="pizza-image" alt="Image of ${pizza.name}">
                </div>
                <div>
                    <p>&euro;${pizza.price}</p>
                    <p><b>${pizza.name}</b></p>
                </div>
            </div>
            <div class="ingredients">
                    <div>
                        <p>Ingredients: ${capitalizeAllInArray(pizza.ingredients)}</p><br>
                        <p>Allergens: 
                            <span class="allergens">${capitalizeString(pizza.name === data2[i].name ? data2[i].allergens.join(", ") : "")} </span>
                        </p>
                    </div>
                </div>
            <div class="quantity-options">
                <select class="quantity">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div class="add-and-remove-btn">
                <button><img src="/public/img/white_plus.png"></button>
            </div>
        </div>`);
    });
    return pizzas.join("");
};

const pizzaPage = (data, data2) => {
    return `
    <section>
        <input type="text" id="pick-your-allergy" placeholder="Filter by Allergen">
        <ul id="allergens-list"></ul>
        <button id="reset">Show All Pizzas</button>
        <div class="pizzas">
            ${pizzaDisplay(data, data2)}
        </div>
    </section>`
};

export { pizzaDisplay, pizzaPage }
