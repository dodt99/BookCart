$(document).ready(function(){
    
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

    let url = 'https://5f23e5f73b9d350016203bbf.mockapi.io/books';

    var currentPage = 1; 
    var itemPerPage = 5;

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
                        <div href="#" class="btn btn-info">Add To Cart</div>
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

        })
        .catch(err => {
            console.log(err);
        });
    }

    renderBook();

    $('.page-link.nextBtn').click(function() {
        currentPage++;
        renderBook();
    });
    $('.page-link.prevBtn').click(function() {
        currentPage--;
        renderBook();    
    });
   


});
