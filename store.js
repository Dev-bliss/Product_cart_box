let orderMessage = document.getElementById("orderMessage")
let cartCount = 0
let countElem =document.getElementById("count")

const product = [
    {
        image: "./assets/images/image-waffle-tablet.jpg",
        id: 0,
        name: "Waffle with Berries",
        category: "Waffle",
        price: 6.50,
    },
    {
        image: "./assets/images/image-creme-brulee-tablet.jpg",
        id: 1,
        name: "Vanilla Bean Crème Brûlée",
        category: "Crème Brûlée",
        price: 7.00
    },

    {
        image: "./assets/images/image-creme-brulee-tablet.jpg",
        id: 2,
        name: "Vanilla Bean Crème Brûlée",
        category: "Crème Brûlée",
        price: 7.00
    },

    {
        image: "./assets/images/image-creme-brulee-tablet.jpg",
        id: 3,
        name: "Vanilla Bean Crème Brûlée",
        category: "Crème Brûlée",
        price: 7.00
    },

    {
        image: "./assets/images/image-creme-brulee-tablet.jpg",
        id: 4,
        name: "Vanilla Bean Crème Brûlée",
        category: "Crème Brûlée",
        price: 7.00
    },

    {
        image: "./assets/images/image-creme-brulee-tablet.jpg",
        id: 5,
        name: "Vanilla Bean Crème Brûlée",
        category: "Crème Brûlée",
        price: 7.00
    },

    {
        image: "./assets/images/image-creme-brulee-tablet.jpg",
        id: 6,
        name: "Vanilla Bean Crème Brûlée",
        category: "Crème Brûlée",
        price: 7.00
    },

    {
        image: "./assets/images/image-creme-brulee-tablet.jpg",
        id: 7,
        name: "Vanilla Bean Crème Brûlée",
        category: "Crème Brûlée",
        price: 7.00
    },

    {
        image: "./assets/images/image-creme-brulee-tablet.jpg",
        id: 8,
        name: "Vanilla Bean Crème Brûlée",
        category: "Crème Brûlée",
        price: 7.00
    },

]





const categories = [...new Set(product.map((item) => { return item }))]
let i = 0
document.getElementById("container").innerHTML = categories.map((item) => {
    var { image, name, category, price } = item
    return (
        `<div class="cart">
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
            </div>`
    )
}).join('')

let dataBox = document.querySelectorAll(".cart");
dataBox = [...dataBox];

// let cartDisplay = document.querySelector('.cartDisplay');
// Function to update the cart's empty state message
// function updateCartDisplay() {
//     if (cartCount === 0) {
//         cartDisplay.innerHTML = `
//             <img src="illustration-empty-cart.svg" alt="">
//             <p>Your added items will appear here</p>
//         `;
//     }
// }

// updateCartDisplay();  // Initial check for empty state

// let cartItems = {}
let cartDisplay = document.querySelector('.cartDisplay')
dataBox.forEach((item, index) => {
    // document.querySelectorAll(".cart").forEach((item, index) => {
    let itemImage = item.querySelector('.imageBox img')
    itemImage.addEventListener('click', () => {
        // Get the product information
        let divElem = product[index];

        // Set initial values for quantity and total
        let unit = 1
        let unitCost = divElem.price;
  // Display the product information in the cart display
        let newDiv = document.createElement('li')
        let mainDiv = document.createElement('div')
        // cartDisplay.appendChild(newDiv)
        
        // let newDiv = document.createElement('li')
        newDiv.innerHTML = `
            <p>Product: ${divElem.name}</p>
            <p class="num">Number: <span class="quantity">${unit}</span></p>
            <p>Unit Price: $${divElem.price}</p>
            <p class="total">Total Price: <span class="totalPrice">$${unitCost.toFixed(2)}</span></p>`;
            cartDisplay.appendChild(newDiv)
        
        // Get references to quantity and total price elements in cart display
        const quantityElem = newDiv.querySelector('.quantity');
        const totalElem = newDiv.querySelector('.totalPrice');

        cartCount++
        countElem.textContent=`(${cartCount})`

        // Select plus and minus icons within the clicked item
        let iTagBox = item.querySelectorAll('.imageBox .add > i');
        iTagBox.forEach(iTag => {
            iTag.onclick = () => {
                if (iTag.id === 'plus') {
                    unit++;
                    cartCount++; // Increment the cart count
                    unitCost = unit*divElem.price
                } else if (iTag.id === 'minus') {
                    if (unit > 1) {
                        unit--;
                        cartCount--; // Decrease cart count
                        unitCost = unit * divElem.price;
                    }else{
                    cartDisplay.removeChild(newDiv)
                    cartCount--
                }
            }

                // Update the displayed quantity and total price
                quantityElem.textContent = unit;
                totalElem.textContent = `$${(unit * divElem.price).toFixed(2)}`;

                // Update the cart count display
                countElem.textContent = `(${cartCount})`;

                // if (cartCount === 0){
                //     updateCartDisplay();  // Show empty message if cartCount is 0
                // }
            };
        });
    });
});
// console.log(dataBox);
// let cart = [1]

// if (cart.length === 0){
//     cartDisplay.innerHTML = `
//     <div>
//         <img src="illustration-empty-cart.svg" alt="">
//         <p>your added items will appear here</p>
//     </div>`
// }else{
//     cartDisplay.innerHTML = `
//     <div>
//         <p>product: ${}</p>
//         <p>number: ${}</p>
//         <p>unit price: ${}</p>
//         <p>total price: ${}</p>
//     </div>`
// }









