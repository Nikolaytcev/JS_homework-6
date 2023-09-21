const products = document.querySelectorAll('.product');
const clearCartBtn = document.querySelector('.clear__cart');
const cart = document.querySelector('.cart__products');
const title = document.querySelector('.cart__title');


function setActive() {
    if (!title.classList.contains('cart__title-active')) {
        title.classList.add('cart__title-active');
        clearCartBtn.classList.add('clear__cart-active');
    };
};

function fromStorage() {
    cart.innerHTML = localStorage.getItem('cart');
    if (Array.from(cart.querySelectorAll('.cart__product')).length != 0) {
        setActive();
    };
};

function addProducts(product) {
    if (Array.from(cart.querySelectorAll(`[data-id="${product.dataset.id}"]`)).length == 0) {
        const html = `<div class="cart__product" data-id=${product.dataset.id}>
            <img class="cart__product-image" src=${product.querySelector('.product__image').src}>
            <div class="cart__product-count">${product.querySelector('.product__quantity-value').textContent}</div>
            </div>`
        cart.innerHTML += html;
    }
    else {
        const previouslyCount = Array.from(cart.querySelectorAll(`[data-id="${product.dataset.id}"]`))[0].querySelector('.cart__product-count');
        const nowCount = product.querySelector('.product__quantity-value');
        previouslyCount.textContent = Number(previouslyCount.textContent) + Number(nowCount.textContent);
    };
    localStorage.setItem('cart', cart.innerHTML);
    setActive();
};

function clearCart() {
    cart.querySelectorAll('.cart__product').forEach((e) => {
        cart.removeChild(e)
    })
    localStorage.setItem('cart', cart.innerHTML);
    title.classList.remove('cart__title-active');
    clearCartBtn.classList.remove('clear__cart-active');
};

fromStorage();

products.forEach((product) => {
    const inc = product.querySelector('.product__quantity-control_inc');
    const dec = product.querySelector('.product__quantity-control_dec');
    const value = product.querySelector('.product__quantity-value');
    const productAdd = product.querySelector('.product__add');
    let val = Number(value.textContent);

    inc.addEventListener('click', () => {
        val += 1;
        value.textContent = val;
    });

    dec.addEventListener('click', () => {
        val > 1 ? val -= 1 : val = 1;
        value.textContent = val;
    });

    productAdd.addEventListener('click', () => {addProducts(product)});
});

clearCartBtn.addEventListener('click', () => {
    clearCart();
});

