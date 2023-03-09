import { orderForm } from "./components.js";

if (typeof window !== "undefined") {
    const loadEvent = () => {

    const rootElement = document.querySelector('#root');
    rootElement.insertAdjacentHTML('beforeend', orderForm());




};

window.addEventListener("load", loadEvent);
} else {
console.log("You are on the server.");
}