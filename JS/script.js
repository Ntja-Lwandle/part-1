function searchProducts() {

    let input =
        document.getElementById("searchBar")
        .value
        .toLowerCase();

    let products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        let text =
            product.innerText.toLowerCase();

        if (text.includes(input)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });

}


function toggleMenu() {

    const menu =
        document.getElementById("navMenu");

    menu.classList.toggle("show");

}

// =====================
//  CART SETUP
// =====================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//  SAVE CART
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
  updateCartCount();
}

// =====================
//  ADD TO CART
// =====================
function addToCart(name, price, model) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ name, price, model, qty: 1 });
  }

  saveCart();
  alert(`${name} added to cart!`);
}

// =====================
//  REMOVE ITEM
// =====================
function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  saveCart();

}

// =====================
//  INCREASE QTY
// =====================
function increaseQty(name) {
  const item = cart.find(i => i.name === name);
  if (item) { 
    item.qty += 1;
  saveCart();
  }
}


// =====================
//  DECREASE QTY
// =====================
function decreaseQty(name) {

    const item = cart.find(i => i.name === name);

    if (!item) return;

    item.qty--;

    if (item.qty <= 0) {

        removeFromCart(name);

    } else {

        saveCart();

    }

}

// =====================
//  DISPLAY CART
// =====================
function displayCart() {
  const list = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");

  if (!list || !totalDisplay) return;

  list.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const li = document.createElement("li");

    li.innerHTML = `

<div class="cart-item">

  <model-viewer
      src="${item.model}"
      auto-rotate
      camera-controls
      shadow-intensity="1">
  </model-viewer>

  <div class="cart-info">

      <h3>${item.name}</h3>

      <p>R ${(item.price * item.qty).toFixed(2)}</p>

      <p>Quantity: ${item.qty}</p>

      <button onclick="decreaseQty('${item.name}')">-</button>

      <button onclick="increaseQty('${item.name}')">+</button>

      <button onclick="removeFromCart('${item.name}')">
          Remove
      </button>

  </div>

</div>

`;

    list.appendChild(li);
  });

  totalDisplay.textContent = `Total: R ${total.toFixed(2)}`;
}

// =====================
//  CART COUNTER (NAV ICON)
// =====================
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const counter = document.getElementById("cart-count");

  if (counter) {
    counter.textContent = count;
  }
}

// =====================
//  UPDATE UI
// =====================
function updateCartUI() {
  displayCart();
}

// =====================
//  INIT
// =====================
if (document.getElementById("cart-items")) {
    displayCart();
}
updateCartCount();


const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function(e){

        e.preventDefault();

        alert(
            "Order placed successfully! Thank you for shopping with FigureVault."
        );

        localStorage.removeItem("cart");

        cart = [];

        updateCartCount();

        window.location.href = "index.html";
    });

}