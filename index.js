let orderMessage = document.getElementById("orderMessage");
let cartCount = 0;
let countElem = document.getElementById("count");
let totalCartCost = 0;

const product = [
  {
    image: "./assets/images/image-waffle-tablet.jpg",
    id: 0,
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.0,
  },
  {
    image: "./assets/images/image-tiramisu-tablet.jpg",
    id: 1,
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 7.0,
  },

  {
    image: "./assets/images/image-baklava-tablet.jpg",
    id: 2,
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 75.0,
  },

  {
    image: "./assets/images/image-creme-brulee-tablet.jpg",
    id: 3,
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 9.0,
  },

  {
    image: "./assets/images/image-meringue-tablet.jpg",
    id: 4,
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 8.0,
  },

  {
    image: "./assets/images/image-brownie-tablet.jpg",
    id: 5,
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.0,
  },

  {
    image: "./assets/images/image-cake-tablet.jpg",
    id: 6,
    name: "Red Velvet Cake",
    category: "Cake",
    price: 1.0,
  },

  {
    image: "./assets/images/image-panna-cotta-mobile.jpg",
    id: 7,
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 3.0,
  },

  // {
  //     image: "./assets/images/image-creme-brulee-tablet.jpg",
  //     id: 8,
  //     name: "Vanilla Bean Crème Brûlée",
  //     category: "Crème Brûlée",
  //     price: 7.00
  // },
];

const categories = [
  ...new Set(
    product.map((item) => {
      return item;
    })
  ),
];
let i = 0;
document.getElementById("container").innerHTML = categories
  .map((item) => {
    var { image, name, category, price } = item;
    return `<div class="cart">
                <div class="imageBox">
                    <img src=${image}></img>
                    <div class='trybox'>
                        <div class="cartBox"><img src="ICON.svg" alt="" class="carticon"><span class="addList">Add to Cart</span></div>
                        <div class="add"><i class="fa fa-plus-circle icon" aria-hidden="true" id='plus'></i> <i class="fa fa-minus-circle icon" aria-hidden="true" id='minus'></i></div>
                    </div>
                </div>
                <p class="nameList">
                    <span class="firstName">${name}</span><br>
                    <span class="secondName">${category}</span><br>
                    <span class="price">${price}.00</span>
                </p>
            </div>`;
  })
  .join("");

let dataBox = document.querySelectorAll(".cart");
dataBox = [...dataBox];
let cartDisplay = document.querySelector(".cartDisplay");
let cartItems = {}; // Object to track items in the cart by ID

dataBox.forEach((item, index) => {
  let itemImage = item.querySelector(".imageBox img");
  itemImage.addEventListener("click", () => {
    let divElem = product[index];
    let unit = 1;
    let unitCost = divElem.price;

    if (!cartItems[divElem.id]) {
      // If item is not in the cart, add it and increase cartCount
      cartItems[divElem.id] = { unit, divElem };
      cartCount++;
      totalCartCost += unitCost;
      countElem.textContent = `(${cartCount})`;

      // document.querySelector(".orders").textContent = `$${totalCartCost.toFixed(2)}`;

      // Create and append a new cart item display
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                <div class='productName'>
                <p class='pro'> ${divElem.name}</p>
                </div>
                <div class='pricetag'>
                <p class="num"> <span class="quantity">${unit}</span></p>
                <p> $${divElem.price.toFixed(2)}</p>
                <p class="total"> <span class="totalPrice">$${unitCost.toFixed(
                  2
                )}</span></p>
                <button class="delete-btn">x</button>
                </div>
                <hr>`;
      cartDisplay.appendChild(newDiv);

      
      // orderMessage.appendChild(newDiv)
      // Check if totalP div already exists

      const deleteBtn = newDiv.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => {
        // Check if the item exists in cartItems before deleting
        if (cartItems[divElem.id]) {
          // Reduce totalCartCost by the cost of the item to be removed
          totalCartCost -= cartItems[divElem.id].unit * divElem.price;
          
          // Remove item from cartItems object
          delete cartItems[divElem.id];
          
          // Update cart count and display it
          cartCount--;
          countElem.textContent = `(${cartCount})`;
          
          // Remove item from the display
          cartDisplay.removeChild(newDiv);
          
          // If no items remain, reset the totalCartCost to 0
          if (cartCount === 0) {
            totalCartCost = 0;
          }
          
          // Update the displayed total cost
          document.querySelector(".orders").textContent = `$${totalCartCost.toFixed(2)}`;
        }
      });
      

      if (!document.querySelector(".totalOrderContainer")) {
        let totalP = document.createElement("div");
        totalP.classList.add("totalOrderContainer"); // Adding a class to identify it
        let ptag = document.createElement("p");
        ptag.innerHTML = "Total order";

        let spanTag = document.createElement("span");
        spanTag.innerHTML = 0;
        spanTag.className = "orders";
        ptag.appendChild(spanTag);
        totalP.appendChild(ptag);
        let hTag = document.createElement("h3");
        hTag.innerHTML = "confirm order";
        orderMessage.appendChild(totalP);
        orderMessage.appendChild(hTag);
      }
      document.querySelector(".orders").textContent = `$${totalCartCost.toFixed(2)}`;

      // Select quantity and total price elements
      const quantityElem = newDiv.querySelector(".quantity");
      const totalElem = newDiv.querySelector(".totalPrice");

      // Select plus and minus icons within the clicked item
      let iTagBox = item.querySelectorAll(".imageBox .add > i");
      iTagBox.forEach((iTag) => {
        iTag.onclick = () => {
          if (iTag.id === "plus") {
            unit++;
            unitCost = unit * divElem.price;
            totalCartCost += divElem.price;
          } else if (iTag.id === "minus") {
            if (unit > 1) {
              unit--;
              unitCost = unit * divElem.price;
              totalCartCost -= divElem.price;
            } else {
              // Remove item from cart if quantity reaches 1 and minus is clicked
              cartDisplay.removeChild(newDiv);
              delete cartItems[divElem.id];
              cartCount--;
              totalCartCost -= divElem.price;
              countElem.textContent = `(${cartCount})`;
              // or.textContent =`(${totalCartCost})`
            }
          }

          // Update the displayed quantity and total price
          quantityElem.textContent = unit;
          totalElem.textContent = `$${unitCost.toFixed(2)}`;
          document.querySelector(
            ".orders"
          ).textContent = `$${totalCartCost.toFixed(2)}`;
        };
      });
    }
  });
}); // Function to show the modal with order details
// Ensure the confirm order button is set up once
function handleOrderConfirmation() {
  const confirmButton = orderMessage.querySelector("h3");

  if (confirmButton && !confirmButton.hasListener) {
    confirmButton.addEventListener("click", () => {
      if (confirmButton.textContent === "confirm order") {
        showOrderModal(); // Show modal with order details
        confirmButton.textContent = "Start New Order";
      } else {
        resetCart(); // Reset cart if button says "Start New Order"
      }
    });
    confirmButton.hasListener = true; // Mark to avoid duplicate listeners
  }
}

// Modified part for cart item addition
if (!document.querySelector(".totalOrderContainer")) {
  let totalP = document.createElement("div");
  totalP.classList.add("totalOrderContainer");
  let ptag = document.createElement("p");
  ptag.innerHTML = "Total order";

  let spanTag = document.createElement("span");
  spanTag.innerHTML = 0;
  spanTag.className = "orders";
  ptag.appendChild(spanTag);
  totalP.appendChild(ptag);

  let hTag = document.createElement("h3");
  hTag.innerHTML = "confirm order";
  orderMessage.appendChild(totalP);
  orderMessage.appendChild(hTag);

  handleOrderConfirmation(); // Set up the order confirmation listener
}

// Show order modal with details
function showOrderModal() {
  const modal = document.getElementById("orderModal");
  const orderDetails = document.getElementById("orderDetails");
  const modalTotal = document.getElementById("modalTotal");

  // Populate order details in the modal
  orderDetails.innerHTML = Object.values(cartItems)
    .map((item) => {
      return `<p>${item.divElem.name} x ${item.unit} - $${(
        item.unit * item.divElem.price
      ).toFixed(2)}</p>
        <hr>`;
    })
    .join("");
  modalTotal.textContent = `$${totalCartCost.toFixed(2)}`;

  // Display the modal
  modal.style.display = "block";

  // Handle close modal
  const closeModal = document.querySelector(".close");
  closeModal.onclick = () => {
    modal.style.display = "none";
  };

  // Handle Start New Order button
  document.getElementById("startNewOrder").onclick = () => {
    modal.style.display = "none";
    resetCart();
  };
}

// Reset cart function
function resetCart() {
  cartItems = {};
  cartCount = 0;
  totalCartCost = 0;
  countElem.textContent = `(${cartCount})`;
  cartDisplay.innerHTML = ""; // Clear cart display
  document.querySelector(".orders").textContent = `$0.00`; // Reset total cost display

  // Change "Start New Order" button back to "confirm order"
  const confirmOrderBtn = orderMessage.querySelector("h3");
  if (confirmOrderBtn) confirmOrderBtn.textContent = "confirm order";
}

// Initial event listener setup to ensure cart and modal setup works reliably
document.addEventListener("DOMContentLoaded", () => {
  handleOrderConfirmation();
});
