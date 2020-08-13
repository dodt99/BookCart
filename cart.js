
function savePro(products) {
    localStorage.setItem('sendProducts', JSON.stringify(products));
}
function getPro() {
    return JSON.parse(localStorage.getItem('products'));
}

function getTotalCart() {
    let pro = getPro();
    let total = 0;

    if(pro === null) {
        return total;
    }

    for(let i=0; i<pro.length; i++) {
        total += pro[i].quantity;
    }
    return total;
}
$('.totalProduct').html(getTotalCart());

function getTotalPrice() {
    let products = getPro();
    let price = 0;
    products.map((item) => {
        price += item.quantity * ((Math.ceil(item.priceRegular * (1 - item.saleOff) * 1000)) / 1000).toFixed(3);
    });
    return price.toFixed(3);
}
$('.cart__total-price h4').html(getTotalPrice() + 'đ');

function renderProducts(){
    let products = getPro();
    let html = ``;
    products.map((item) => {
        html += `
            <div class="product">
                <div class="product__avatar">
                    <img src="${item.avatar}" alt="">
                </div>
                <div class="product__detail">
                    <h4 class="product__name">${item.name}</h4>
                    <p class="product__author">- Tác giả: ${item.author}</p>
                    <a href="#" class="delete-product">Xóa</a>
                </div>
                <div class="product__sale">
                    <div class="product__price">
                        <p class="price__final">${((Math.ceil(item.priceRegular * (1 - item.saleOff) * 1000)) / 1000).toFixed(3)}đ</p>
                        <span id="price__regular">${item.priceRegular}.000đ</span>
                        <span id="price__sale-of">| -${item.saleOff * 100}%</span>
                    </div>
                    <div class="product__quantity">
                        <form action="#">
                            <input type="number" value="${item.quantity}">
                        </form>
                    </div>
                </div>
            </div>`;
    });
    $('.cart__products').html(html);
}
renderProducts();

