// import { pizzaDisplay, pizzaPage } from "components.js";
if(typeof window !== 'undefined') {

const loadEvent = () => {
const rootElement = document.querySelector('#root');

console.log(pizzaDisplay());
console.log(pizzaPage());

}
      
window.addEventListener("load", loadEvent);
} else {
console.log('You are on the server.')
}