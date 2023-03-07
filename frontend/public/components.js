const pizzaDisplay = (data, data2) => {
    const pizzas = [];
    data.forEach(pizza => {
        pizzas.push(`
        <div class ="pizza">
            <div class="main-details">
                <div>
                    <img src="${pizza.url}" class="pizza-image" alt="Image of ${pizza.name}">
                </div>
                <div>
                    <p>${pizza.price}</p>
                    <p>${pizza.name}</p>
                </div>
            </div>
            <div class="ingredients">
                <p>Ingredients: ${pizza.ingredients}</p>
                <p>Allergens: </p>
            </div>
            <div class="quantity-options">
                <input type="text" class="quantity">
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
        <div class="pizzas">
            ${pizzaDisplay(data, data2)}
        </div>
    </section>`
};

export { pizzaDisplay, pizzaPage }