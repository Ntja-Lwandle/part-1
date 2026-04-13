// =====================
// 🛒 CART SETUP
// =====================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 💾 SAVE CART
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
  updateCartCount();
}

// =====================
// ➕ ADD TO CART
// =====================
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  saveCart();
  alert(`${name} added to cart!`);
}

// =====================
// ❌ REMOVE ITEM
// =====================
function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  saveCart();
}

// =====================
// ➕ INCREASE QTY
// =====================
function increaseQty(name) {
  const item = cart.find(i => i.name === name);
  if (item) item.qty += 1;

  saveCart();
}

// =====================
// ➖ DECREASE QTY
// =====================
function decreaseQty(name) {
  const item = cart.find(i => i.name === name);

  if (!item) return;

  item.qty -= 1;

  if (item.qty <= 0) {
    removeFromCart(name);
  } else {
    saveCart();
  }
}

// =====================
// 🖥️ DISPLAY CART
// =====================
function displayCart() {
  const list = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("total");

  if (!list || !totalDisplay) return;

  list.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${item.name}</strong> - R ${(item.price * item.qty).toFixed(2)}
      <br>
      Qty: ${item.qty}
      <button onclick="decreaseQty('${item.name}')">-</button>
      <button onclick="increaseQty('${item.name}')">+</button>
      <button onclick="removeFromCart('${item.name}')">🗑 Remove</button>
    `;

    list.appendChild(li);
  });

  totalDisplay.textContent = `Total: R ${total.toFixed(2)}`;
}

// =====================
// 🔢 CART COUNTER (NAV ICON)
// =====================
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const counter = document.getElementById("cart-count");

  if (counter) {
    counter.textContent = count;
  }
}

// =====================
// 🔄 UPDATE UI
// =====================
function updateCartUI() {
  displayCart();
}

// =====================
// 🧾 INIT
// =====================
displayCart();
updateCartCount();