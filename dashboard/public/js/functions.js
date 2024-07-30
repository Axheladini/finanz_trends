$(function(){


    getCandle();

    function getCandle() {
        $.ajax({
            url: 'http://localhost:9000/candle',
            method: 'GET',
            success: function(response) {
                // Handle the API response here
                var candles = response.hits.hits;
                candles.forEach(function(item) {
                    console.log(item);
                });
            },
            error: function(xhr, status, error) {
                // Handle errors here
                console.error(status, error);
            }
        });
     }


      
})