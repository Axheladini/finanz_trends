$(function(){
    
    const link = "http://localhost:9000/candle";

    getCandle();
     
    var candles;
    var candleslength;
    var currentPage = 1;
    var nextPage = 2;
    var prevPage = 0;
    var perPage = 20;
    var totalPages;
    var showpagination = false;
    var currentCandles = [];



  function getCandle() {

       $("#loading-holder").css({ display: "inline-block" });

        $.ajax({
            url: link,
            method: 'GET',
            success: function(response) {

                // Handle the API response here
                candles = response.hits.hits;
                candleslength = candles.length;
                totalPages = Number(candleslength)/Number(perPage);

                for ( var i = 0, l = Number(perPage)-Number(1); i <= l; i++ ) {

                    currentCandles.unshift(candles[i]);
                    
           
                    if(i == Number(perPage)-Number(1)){
            
                       renderCandles(currentCandles);
                       $("#loading-holder").css({ display: "none" });
                       $("#next").removeClass(" not-clickable ").addClass(" clickable ");
            
                    }
                }
        
            
            },
            error: function(xhr, status, error) {
                // Handle errors here
                console.error(status, error);
            }
        });
     }

/*function to render the Array Candles*/
function renderCandles(candles){
   
    $.each(candles, function(key,value) {
        $( ".candle-grid-holder" ).prepend( `<div class='grid'>
                                            <div class='cell'>ID</div><div class='cell'>`+value._id+`</div>
                                            <div class='cell'>Symbol</div><div class='cell'>`+value._source.symbol+`</div>
                                            <div class='cell'>Date and Time</div><div class='cell'>`+value._source.dateTime+`</div>
                                            <div class='cell'>Highest Price</div><div class='cell'>`+value._source.highestPrice+`</div>
                                            <div class='cell'>Lowest Price</div><div class='cell'>`+value._source.lowestPrice+`</div>
                                            <div class='cell'>End Price</div><div class='cell'>`+value._source.endPrice+`</div>
                                            <div class='cell'>Source</div><div class='cell'>`+value._source.source+`</div>
                                            <div class='cell'>Currency</div><div class='cell'>`+value._source.currency+`</div>
                                          </div>`);
    });
}
/*function to render the Array Candles ends here*/


/*Function next Page*/
$( "#next" ).on( "click", function() {
    
     console.log("Next clicked");

  } );

/*Function prev page*/
$( "#prev" ).on( "click", function() {
    console.log("Prev clicked");
  } );


})