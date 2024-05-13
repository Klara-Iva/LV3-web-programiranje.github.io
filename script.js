const cartButton = document.querySelector(".cart-button");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".close");
const buyButton = document.querySelector(".buy-btn");
const cartItemsList = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const itemsGrid = document.querySelector(".items-grid");
const searchInput = document.getElementById("search-input");
const searchButton = document.querySelector(".search-btn");

let items = [
  {
    id: 1,
    name: "Apple",
    price: 0.99,
  },
  {
    id: 5,
    name: "Apple-Red",
    price: 1.01,
  },
  {
    id: 2,
    name: "Banana",
    price: 10,
  },
  {
    id: 3,
    name: "Berries",
    price: 20,
  },
  {
    id: 4,
    name: "IceCream",
    price: 5,
  },
];

let cart = [];
fillItemsGrid();
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

function fillItemsGrid() {
  for (const item of items) {
    let itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.innerHTML = `
            <img src="picture${item.id}.jpg" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
        `;
    console.log("mreza loaded");
    itemsGrid.appendChild(itemElement);
  }
}

function toggleModal() {
  modal.classList.toggle("show-modal");
}

cartButton.addEventListener("click", toggleModal);
modalClose.addEventListener("click", toggleModal);

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const itemId = parseInt(button.dataset.id);
    addToCart(itemId);
  });
});

function addToCart(itemId) {
  const item = items.find((item) => item.id === itemId);
  if (item) {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === itemId
    );
    if (existingItemIndex > -1) {
      const quantityInput = document.querySelector(
        `.item-quantity[data-id="${itemId}"]`
      );
      const newQuantity = quantityInput
        ? parseInt(quantityInput.value) || 1
        : 1;
      cart[existingItemIndex].quantity += newQuantity;
    } else {
      const quantityInput = document.querySelector(
        `.item-quantity[data-id="${itemId}"]`
      );
      const newQuantity = quantityInput
        ? parseInt(quantityInput.value) || 1
        : 1;
      cart.push({ ...item, quantity: newQuantity });
    }
    updateCartBadge();
    updateCartList();
    updateCartTotal();
  }
}

function updateCartList() {
  cartItemsList.innerHTML = "";
  for (const item of cart) {
    const cartItemElement = createCartItemElement(item);
    cartItemsList.appendChild(cartItemElement);
  }
}

function updateCartTotal() {
  let total = 0;
  for (const item of cart) {
    total += item.price * (item.quantity || 1);
  }
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(itemId) {
  const itemIndex = cart.findIndex((item) => item.id === itemId);
  if (itemIndex > -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
    } else {
      cart.splice(itemIndex, 1);
    }
    updateCartBadge();
    updateCartList();
    updateCartTotal();
  }
}

cartItemsList.addEventListener("click", (event) => {
  console.log("btn pressed");
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const itemId = parseInt(event.target.dataset.id);
    removeFromCart(itemId);
  }
});

function createCartItemElement(item) {
  const cartItemElement = document.createElement("li");
  cartItemElement.classList.add("cart-item");
  cartItemElement.innerHTML = `
      <img src="picture${item.id}.jpg" alt="${
    item.name
  }" style="width: 150px; height: 150px;">
      <span class="item-name">${item.name}</span>
      <span class="item-price">$${item.price.toFixed(2)}</span>
      <span class="item-quantity">Qty: ${item.quantity || 1}</span>
      <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
    `;
  return cartItemElement;
}

function updateCartBadge() {
  const cartBadge = document.querySelector(".cart-badge");
  let totalQuantity = 0;
  for (const item of cart) {
    totalQuantity += item.quantity || 1;
  }
  cartBadge.textContent = totalQuantity;
}

buyButton.addEventListener("click", buy);

function buy() {
  if (cart.length === 0) {
    window.alert("No items to buy in the cart!");
  } else {
    window.alert("Thank you for your purchase!");
    cart = [];
    updateCartBadge();
    updateCartList();
    updateCartTotal();
  }
}

function displayItems(filteredItems) {
  itemsGrid.innerHTML = "";
  if (filteredItems.length === 0) {
    const messageElement = document.createElement("p");
    messageElement.textContent = "No items found matching your search.";
    itemsGrid.appendChild(messageElement);
  } else {
    for (const item of filteredItems) {
      const itemElement = createItemElement(item);
      itemsGrid.appendChild(itemElement);
    }
  }
}

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );
  displayItems(filteredItems);
});

window.onload = () => {
  displayItems(items);
};
function createItemElement(item) {
  const itemElement = document.createElement("div");
  itemElement.classList.add("item");
  itemElement.innerHTML = `
    <img src="picture${item.id}.jpg" alt="${item.name}">
    <h2>${item.name}</h2>
    <p>$${item.price.toFixed(2)}</p>
    <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
  `;

  itemElement
    .querySelector(".add-to-cart-btn")
    .addEventListener("click", () => {
      const itemId = parseInt(
        itemElement.querySelector(".add-to-cart-btn").dataset.id
      );
      addToCart(itemId);
    });

  return itemElement;
}
