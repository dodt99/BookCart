async function ajaxPost(url, data) {
    let rs = null;
    await $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        url: url,
        success: function(result) {
            rs = result;
        }
    });
    return rs;
}


function setPro(products) {
    localStorage.setItem('products', JSON.stringify(products));
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
        total += parseInt(pro[i].quantity);
    }
    return total;
}

function renderTotalCart() {
    $('.totalProduct').html(getTotalCart());
}
renderTotalCart();

function getTotalPrice() {
    let products = getPro();
    let price = 0;
    products.map((item) => {
        price += item.quantity * ((Math.ceil(item.priceRegular * (1 - item.saleOff) * 1000)) / 1000).toFixed(3);
    });
    return price.toFixed(3);
}

function renderTotalPrice() {
    $('.cart__total-price h4').html(getTotalPrice() + 'đ');
}
renderTotalPrice();

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
                    <span class="delete-product" id-pro=${item.id}>Xóa</span>
                </div>
                <div class="product__sale">
                    <div class="product__price">
                        <p class="price__final">${((Math.ceil(item.priceRegular * (1 - item.saleOff) * 1000)) / 1000).toFixed(3)}đ</p>
                        <span id="price__regular">${item.priceRegular}.000đ</span>
                        <span id="price__sale-of">| -${item.saleOff * 100}%</span>
                    </div>
                    <div class="product__quantity">
                        <form action="#">
                            <input type="number" id-pro=${item.id} value="${item.quantity}" min="1">
                        </form>
                    </div>
                </div>
            </div>`;
    });
    
    $('.cart__products').html(html);
    addEventDelete();
    addEventChangeQuantity();
}
renderProducts();

function reRender() {
    renderTotalPrice();
    renderTotalCart();
    renderProducts();
}

function deleteProduct(id) {
    let products = getPro();
    for( var i = 0; i < products.length; i++) { 
        if (products[i].id === id) { 
            products.splice(i, 1); 
        }
    }
    setPro(products);
}

function addEventDelete() {
    $('.delete-product').click(function() {
        let id = $(this).attr('id-pro');
        deleteProduct(id); 
        reRender();
    });
}

function changeQuantity(id, quantity) {
    let products = getPro();
    let productChanged = products.filter((data) => {
        return data.id === id;
    });
    productChanged = productChanged[0];
    let index = products.indexOf(productChanged);
    products[index].quantity = quantity;
    setPro(products);  
}

function addEventChangeQuantity() {
    $('.product__quantity input').change(function() {
        let quantity = $(this).val();
        let id = $(this).attr('id-pro');
        changeQuantity(id, quantity);
        reRender();
    });
}

function submitCart() {
    let products = getPro();
    let dataSend = [];
    products.map((item) => {
        let data = {
            id: item.id,
            quantity: parseInt(item.quantity)
        }
        dataSend.push(data);
    });
    
    // ajaxPost('', dataSend)
    // .then((data) => {
    //     console.log(data);
    // });
    alert(JSON.stringify(dataSend));
}

$(document).ready(function() {

    $('.cart__submit a').click(function() {
        submitCart();
    });
    
});
