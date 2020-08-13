
function savePro(products) {
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
        total += pro[i].quantity;
    }
    return total;
}

function addItem(item) {
    for (let i=0; i<selectedProducts.length; i++) {
        if (item.id === selectedProducts[i].id) {
            selectedProducts[i].quantity++;
            savePro(selectedProducts);
            return;
        }
    };
    newPro = item;
    newPro.quantity = 1;
    selectedProducts.push(newPro);
    savePro(selectedProducts);
}

let selectedProducts = getPro();
if (selectedProducts === null) {
    selectedProducts = [];
}
$('.totalProduct').html(getTotalCart());

async function ajaxGet(url) {
    let rs = null;
    await $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function(result) {
            rs = result;
        }
    });
    return rs;
};

function renderNumberPage(currentPage, totalPage) {
    let html = ``;

    let firstNumber;
    let lastNumber;
    if (currentPage <= 3) {
        firstNumber = 1;
        lastNumber = firstNumber + 4;
    } else {
        if (currentPage > 3 && currentPage < (totalPage-2)) {
            firstNumber = currentPage - 2;
            lastNumber = firstNumber + 4;
        } else {
            if (currentPage >= (totalPage-2)) {
                firstNumber = totalPage - 4;
                lastNumber = totalPage;
            }
        }
    }

    for (i = firstNumber; i <= lastNumber; i++ ) {
        if (i === currentPage) {
            html += `<li class="page-link active">${i}</li>`;
        } else 
            html += `<li class="page-link">${i}</li>`;
    };
    $('.pageNumbers').html(html);     
}

function renderBook() {
    ajaxGet(url)
    .then(function(data) {
        let totalPage = Math.ceil(data.length / itemPerPage);

        let html = ``;
        data.map((item, index) => {
            if ((index >= (currentPage-1)*itemPerPage) && (index < currentPage*itemPerPage)) {
                html += 
                `<div class="product">
                    <a href="#"><img class="image" src= ${item.avatar} alt=""></a>
                    <h4 class="name">${item.name}</h4>
                    <p class="author">${item.author}</p>
                    <div class="price-sale">
                        <span class="price-final">${((Math.ceil(item.priceRegular * (1 - item.saleOff) * 1000)) / 1000).toFixed(3)}đ</span>
                        <span class="saleOff">-${item.saleOff * 100}%</span>
                        <p class="priceRegular">${item.priceRegular}.000đ</p>
                    </div>
                    <div href="#" class="btn btn-info" id-pro=${item.id}>Add To Cart</div>
                </div>`;
            }   
        });
        $(".products").html(html);

        renderNumberPage(currentPage, totalPage);
        $('.pageNumbers li').click(function() {
            currentPage = ($(this).html());
            renderBook();    
        });

        if(currentPage === totalPage) {
            $('.nextBtn').addClass('hide');
        } else {
            $('.nextBtn').removeClass('hide');
        }
        if(currentPage === 1) {
            $('.prevBtn').addClass('hide');
        } else {
            $('.prevBtn').removeClass('hide');
        };


        //Cart
        $('.product .btn').click(function() {
            let id = $(this).attr('id-pro');
            console.log(id);
            for (let i=0; i<data.length; i++) {
                if (id === data[i].id) {
                    addItem(data[i]);
                    break;
                }
            }
            
            let totalPro = getTotalCart();
            $('.totalProduct').html(totalPro);

            $('.cart-popup').removeClass('show');
            setTimeout(() => {
                $('.cart-popup').addClass('show');
            }, 300);
            
        });

    })
    .catch(err => {
        console.log(err);
    });
}


let url = 'https://5f23e5f73b9d350016203bbf.mockapi.io/books';

var currentPage = 1; 
var itemPerPage = 5;
renderBook();

$('.page-link.nextBtn').click(function() {
    currentPage++;
    renderBook();
});
$('.page-link.prevBtn').click(function() {
    currentPage--;
    renderBook();    
});

$('.cart-popup .fa-times').click(function() {
    $('.cart-popup').removeClass('show');
});

