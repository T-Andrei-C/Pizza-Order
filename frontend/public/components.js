const formatList = (data) => {
    const newList = [];
    data.forEach(el => 
        newList.push(`${el.charAt(0).toUpperCase().concat(el.slice(1).toLowerCase())}`));
    return newList.join(", ");
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
                        <p>Ingredients: ${formatList(pizza.ingredients)}</p><br>
                        <p>Allergens: ${formatList([pizza.name === data2[i].name ? data2[i].allergens.join(", ") : ""])} </p>
                    </div>
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