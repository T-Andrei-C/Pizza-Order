if (typeof window !== "undefined") {
    const loadEvent = () => {

    const rootElement = document.querySelector('#root');
    rootElement.insertAdjacentHTML('beforeend', `
    <section>
        <div id="order-complete">
            <img src="/public/img/smiley.png" id="smiley">
            <h3>Your order has been sent successfully!</h3>
        </div>
        <button id="homepage">Send Another</button>
    </section>`);

    const homepageBtn = document.querySelector('#homepage');
    homepageBtn.addEventListener('click', () => {
        location.href = "http://127.0.0.1:9001/pizza/list";
    });
};

window.addEventListener("load", loadEvent);
} else {
console.log("You are on the server.");
}