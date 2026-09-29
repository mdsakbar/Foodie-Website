let cart = JSON.parse(localStorage.getItem("foodieCart")) || [];

function saveCart() {
  localStorage.setItem("foodieCart", JSON.stringify(cart));
}

function addToCart(name, price) {

  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();

  alert(`${name} added to cart!`);
}


function updateCartCount() {

  const count = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  document.getElementById("cart-count").textContent = count;
}


function openCart() {

  renderCart();

  document
    .getElementById("cart-modal")
    .classList.add("show");
}


function closeCart() {

  document
    .getElementById("cart-modal")
    .classList.remove("show");
}


function renderCart() {

  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p style="text-align:center; padding:30px;">
        Your cart is empty.
      </p>
    `;

    cartTotal.textContent = "0";

    return;
  }

  let total = 0;

  cart.forEach((item, index) => {

    const itemTotal = item.price * item.quantity;

    total += itemTotal;

    cartItems.innerHTML += `

      <div class="cart-item">

        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
        </div>

        <div class="quantity-controls">

          <button onclick="changeQuantity(${index}, -1)">
            -
          </button>

          <span>${item.quantity}</span>

          <button onclick="changeQuantity(${index}, 1)">
            +
          </button>

        </div>

        <strong>
          ₹${itemTotal}
        </strong>

        <button
          class="remove-btn"
          onclick="removeFromCart(${index})"
        >
          <i class="fa-solid fa-trash"></i>
        </button>

      </div>
    `;
  });

  cartTotal.textContent = total;
}


function changeQuantity(index, change) {

  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  updateCartCount();
  renderCart();
}


function removeFromCart(index) {

  cart.splice(index, 1);

  saveCart();
  updateCartCount();
  renderCart();
}


function checkout() {

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert(
    "Order placed successfully! Thank you for ordering from Foodie."
  );

  cart = [];

  saveCart();
  updateCartCount();
  closeCart();
}


/* =========================
   MENU FILTER
========================= */

function filterMenu(category, button) {

  const cards =
    document.querySelectorAll(".food-card");

  const buttons =
    document.querySelectorAll(".filter-buttons button");

  buttons.forEach(btn => {
    btn.classList.remove("active");
  });

  button.classList.add("active");

  cards.forEach(card => {

    if (
      category === "all" ||
      card.dataset.category === category
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }

  });
}


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

  document
    .querySelector(".nav-links")
    .classList.toggle("show");
}


/* =========================
   LOGIN
========================= */

function openLogin() {

  document
    .getElementById("login-modal")
    .classList.add("show");
}


function closeLogin() {

  document
    .getElementById("login-modal")
    .classList.remove("show");
}


function login(event) {

  event.preventDefault();

  alert("Login successful!");

  closeLogin();
}


/* =========================
   SIGNUP
========================= */

function showSignup() {

  closeLogin();

  document
    .getElementById("signup-modal")
    .classList.add("show");
}


function closeSignup() {

  document
    .getElementById("signup-modal")
    .classList.remove("show");
}


function signup(event) {

  event.preventDefault();

  alert("Account created successfully!");

  closeSignup();
}


/* =========================
   NEWSLETTER
========================= */

function subscribe(event) {

  event.preventDefault();

  const email =
    document.getElementById("email").value;

  alert(
    `Thank you! ${email} has been subscribed.`
  );

  event.target.reset();
}


/* =========================
   CONTACT
========================= */

function sendMessage(event) {

  event.preventDefault();

  alert(
    "Thank you! Your message has been sent successfully."
  );

  event.target.reset();
}


/* =========================
   INITIALIZE
========================= */

document.addEventListener("DOMContentLoaded", () => {

  updateCartCount();

});


/* =========================
   CLOSE MODAL ON BACKDROP
========================= */

window.addEventListener("click", function(event) {

  const modals =
    document.querySelectorAll(".modal");

  modals.forEach(modal => {

    if (event.target === modal) {
      modal.classList.remove("show");
    }

  });

});