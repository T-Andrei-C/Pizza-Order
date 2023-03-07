const pizzaDisplay = (data) => {
    const pizzas = [];
    data.forEach(pizza => {
        pizzas.push(`
        <div class ="pizza">
            <div class="main-details">
                <img src="${pizza.url}" alt="Image of ${pizza.name}">
                <p>${pizza.price}</p>
                <p>${pizza.name}</p>
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

const pizzaPage = (data) => {
    return `
    <section>
        <div class="pizzas">
            ${pizzaDisplay(data)}
        </div>
    </section>`
};

export { pizzaDisplay, pizzaPage }