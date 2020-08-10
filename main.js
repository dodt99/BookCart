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
    
    function render() {
        ajaxGet(url)
        .then(function(rs) {

            if(currentPage === Math.ceil(rs.length / itemPerPage)) {
                $('.nextPage').css({"pointer-events": "none"});
            } else {
                $('.nextPage').css({"pointer-events": "auto"});
            }
            if(currentPage === 1) {
                $('.prevPage').css({"pointer-events": "none"});
            } else {
                $('.prevPage').css({"pointer-events": "auto"});
            }

            let html = ``;
            rs.map((item, index) => {
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

    render();

    $('.page-link.nextPage').click(function() {
        event.preventDefault();
        currentPage++;
        render();
        // $('.page-link').removeClass('active');
        // $('.page-link').hasClass()
    });
    $('.page-link.prevPage').click(function() {
        event.preventDefault();
        currentPage--;
        render();
        
    });


});
