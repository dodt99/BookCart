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

    // ajaxGet(url).then(rs => {
    //     localStorage.setItem('dataBooks', JSON.stringify(rs));
    // }).catch(err => {
    //     console.log(err);
    // })
   
    // const dataBooks = JSON.parse(localStorage.getItem('dataBooks')); 

    // function render() {
    //     let html = ``;
    //     dataBooks.map((item, index) => {
    //         if ((index >= (currentPage-1)*itemPerPage) && (index < currentPage*itemPerPage)) {
    //             html += 
    //             `<div class="product">
    //                 <a href="#"><img class="image" src= ${item.avatar} alt=""></a>
    //                 <h4 class="name">${item.name}</h4>
    //                 <p class="author">${item.author}</p>
    //                 <div class="price-sale">
    //                     <span class="price-final">${((Math.ceil(item.priceRegular * (1 - item.saleOff) * 1000)) / 1000).toFixed(3)}đ</span>
    //                     <span class="saleOff">-${item.saleOff * 100}%</span>
    //                     <p class="priceRegular">${item.priceRegular}.000đ</p>
    //                 </div>
    //                 <div href="#" class="btn btn-info">Add To Cart</div>
    //             </div>`;
    //         }   
    //     });
    //     $(".products").html(html);
    // }

    // render();

    var currentPage = 1; 
    var itemPerPage = 5;

    function renderNumberPage(currentPage, totalPage) {
        let html = ``;

        let firstNumber = (currentPage > 2) ? (currentPage - 2) : (1);
        let lastNumber = (currentPage < totalPage-2) ? (firstNumber + 4) : (totalPage); 
        for (i = firstNumber; i <= lastNumber; i++ ) {
            html += `<li class="page-link">${i}</li>`;
        };
        $('.pageNumber').html(html);
    }
    
    function renderBook() {
        ajaxGet(url)
        .then(function(data) {

            let totalPage = Math.ceil(data.length / itemPerPage);
            if(currentPage === totalPage) {
                $('.nextBtn').addClass('hide');
            } else {
                $('.nextBtn').removeClass('hide');
            }
            if(currentPage === 1) {
                $('.prevBtn').addClass('hide');
            } else {
                $('.prevBtn').removeClass('hide');
            }

            renderNumberPage(currentPage, totalPage);

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
        })
        .catch(err => {
            console.log(err);
        });
    }

    renderBook();

    $('.page-link.nextBtn').click(function() {
        currentPage++;
        renderBook();
        // $('.page-link').removeClass('active');
        // $('.page-link').hasClass()
    });
    $('.page-link.prevBtn').click(function() {
        currentPage--;
        renderBook();
        
    });


});
