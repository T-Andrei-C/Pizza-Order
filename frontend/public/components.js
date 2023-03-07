const pizzaDisplay = (data, data2) => {
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
                <p>${pizza.ingredients}</p>
                <p>${data2}</p>
            </div>
            <div class="add-and-remove-btn">
                <img src="/public/img/white_plus.png">
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

// export { pizzaDisplay, pizzaPage }