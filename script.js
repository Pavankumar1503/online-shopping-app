//Elements References
const productContainer = document.getElementById("product-container");
const cartcontainer = document.getElementById('cart-container');
const Available = document.getElementById('Available');
const clearCart1 = document.getElementById('clearCart');
const sortByPrice = document.getElementById("sortByprice");
const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Phone", price: 20000 },
    { id: 3, name: "Tablet", price: 30000 },
    { id: 4, name: "Earphone", price: 500 },
    { id: 5, name: "Camera", price: 35000 }, // Fixed spelling
];

let cart = [];

products.forEach(function (product) {

    const { id, name, price } = product;
    const divelement = document.createElement("div");
    divelement.className = "productrow";
    divelement.innerHTML = `
        <p>${name} - Rs. ${price}</p>
        <button onclick="addToCart(${id})">Add to cart</button>
    `;
    productContainer.appendChild(divelement);
});




function addToCart(id) {
    const isProductInCart = cart.some((item) => item.id === id);
    const product = products.find((p) => p.id === id);

    if (isProductInCart) {
        updateUserFeed(`${product.name} is already in the cart`, "error");
        return;
    }

    cart.push(product);
    updateUserFeed(`${product.name} added to cart`, "success");
    renderCartDetails();
}

function renderCartDetails() {
    cartcontainer.innerHTML = ""; // Clear previous cart
    cart.forEach(function (product) {
        const { id, name, price } = product;
        const divelement = document.createElement("div");
        divelement.className = "productrow";
        divelement.innerHTML = `
            <p>${name} - Rs. ${price}</p>
            <button onclick="removeCart(${id})">Remove</button>
        `;
        cartcontainer.appendChild(divelement);
    });



    let totalprice = 0;
    for (let i = 0; i < cart.length; i++) {
        totalprice = totalprice + cart[i].price;
    }
    console.log(totalprice);
    document.getElementById('total').textContent = `Rs. ${totalprice}`;
}




function removeCart(id) {
    cart = cart.filter(product => product.id !== id);
    renderCartDetails();
    const removedProduct = products.find(p => p.id === id);
    updateUserFeed(`${removedProduct.name} removed from cart`, "error");
}

let time;
function updateUserFeed(msg, type) {
    clearTimeout(time);
    Available.style.display = "block";
    Available.style.padding = "10px";
    Available.style.margin = "10px 0";

    if (type === "success") {
        Available.style.backgroundColor = "green";
        Available.style.color = "white";
    } else {
        Available.style.backgroundColor = "red";
        Available.style.color = "white";
    }

    Available.textContent = msg;
    time = setTimeout(() => {
        Available.style.display = "none";
    }, 3000);
};

clearCart1.addEventListener("click", () => {
    // cartcontainer.innerHTML = null;
    console.log("click");
    cart.length = 0;
    renderCartDetails();
    updateUserFeed("Cart Is Clear", "success");

});

sortByPrice.addEventListener("click", () => {
    cart.sort(function (item1, item2) {
        return item1.price - item2.price;
        renderCartDetails();
    });
    renderCartDetails();
});