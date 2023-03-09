const express = require("express");
const cors = require("cors");
const path = require("path");

const { reader, writer } = require("./fileReader");
const filePathPizza = path.join(`${__dirname}/pizzas.json`);
const filePathAllergens = path.join(`${__dirname}/allergens.json`);
const filePathOrders = path.join(`${__dirname}/orders.json`);

const port = 9001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/pizza/list", (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});
app.use('/public', express.static(`${__dirname}/../frontend/public`));

app.get("/api/pizza", async (req, res) => {
    const pizzas = await reader(filePathPizza);
    res.json(pizzas.pizzas);
});

app.get("/api/allergen", async (req, res) => {
  const allergens = await reader(filePathAllergens)
    res.json(allergens.allergens);
});

app.route("/api/order")
.get(async(req, res) => {
    const orders = await reader(filePathOrders);
    res.json(orders);
}) 
.post(async(req, res) => {
    const orders = await reader(filePathOrders);
    req.body.id = orders.length + 1;
    orders.push(req.body);
    writer(filePathOrders, orders);
})

app.listen(port, () => console.log(`http://127.0.0.1:${port}`));