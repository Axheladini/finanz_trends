$(function(){
    
    const link = "http://localhost:9000/candle";

    getCandle();
     
    var candles;
    var candleslength;
    var currentPage = 1;
    var perPage = 201;
    var totalPages;
    var currentCandles = [];

    function getCandle(){

       $("#loading-holder").removeClass(" loading-not-visible ").addClass(" loading-visible ");

        $.ajax({
            url: link,
            method: 'GET',
            success: function(response) {

                // Handle the API response here
                candles = response.hits.hits;
                candleslength = candles.length;
                totalPages = Math.ceil(Number(candleslength)/Number(perPage));
        
                for ( var i = 0, l = Number(perPage)-Number(1); i <= l; i++ ) {

                    //currentCandles.unshift(candles[i]);
                    currentCandles.push(candles[i]);
           
                    if(i == Number(perPage)-Number(1)){
                       renderCandles(currentCandles);
                       $("#loading-holder").removeClass(" loading-visible ").addClass(" loading-not-visible ");
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

    /*-------------------------------------*/
    /*function to render the Array Candles*/
    function renderCandles(candles){
    
        $.each(candles, function(key,value) {
            $( ".candle-grid-holder" ).append( `<div class='grid'>
            <div class='cell'>ID</div><div class='cell'>`+value._id+`</div>
            <div class='cell'>Symbol</div><div class='cell'>`+value._source.symbol+`</div>
            <div class='cell'>Datum und Uhrzeit</div><div class='cell'>`+value._source.dateTime+`</div>
            <div class='cell'>Highest Price</div><div class='cell'>`+value._source.highestPrice+`</div>
            <div class='cell'>Höchster Preis</div><div class='cell'>`+value._source.lowestPrice+`</div>
            <div class='cell'>Endpreis</div><div class='cell'>`+value._source.endPrice+`</div>
            <div class='cell'>Quelle</div><div class='cell'>`+value._source.source+`</div>
            <div class='cell'>Währung</div><div class='cell'>`+value._source.currency+`</div>
        </div>`);
        });
    }


    /*-------------------------------------*/
    /*Function next Page*/
    $( "#next" ).on( "click", function() {

        $("#loading-holder").removeClass(" loading-not-visible ").addClass(" loading-visible ");
        $("div.grid").remove();
        
        currentCandles = [];

        var from = Number(currentPage) * Number(perPage);
        var to = (Number(from) + Number(perPage)) - 1;

        if(to > candleslength) {
            to = candleslength;
        }
        

        for ( var i = from, l = to; i <=l; i++ ) {
        
            //currentCandles.unshift(candles[i]);
            currentCandles.push(candles[i]);

            if(i == l){

                currentPage++;

                console.log("current:"+currentPage);
                console.log("start:"+from);
                console.log("ends:"+to);
                
                renderCandles(currentCandles);
                
                $("#prev").removeClass(" not-clickable ").addClass(" clickable ");
                $("#next").removeClass(" not-clickable ").addClass(" clickable ");
                $("#loading-holder").removeClass(" loading-visible ").addClass(" loading-not-visible ");

                console.log("current page:"+currentPage);
                console.log("total:"+totalPages);
                var nextPage = Number(currentPage) + 1;
                console.log("current page + 1:"+nextPage);
                console.log(currentCandles);
             
                if(nextPage > totalPages)
                {   
                    console.log(currentCandles);
                    $("#next").removeClass(" clickable ").addClass(" not-clickable ");
                }


            }

        }

    } );
    /*-------------------------------------*/
    /*Function prev page*/
    $( "#prev" ).on( "click", function() {
        
            currentPage--;

            currentCandles = [];
            $("#loading-holder").removeClass(" loading-not-visible ").addClass(" loading-visible ");
            $("div.grid").remove();

            var from = (Number(currentPage) * Number(perPage)) - perPage;
            var to = (Number(from) + Number(perPage)) - 1;

            console.log("current:"+currentPage);
            console.log("start:"+from);
            console.log("ends:"+to);

            for ( var i = from, l = to; i <=l; i++ ) {

                //currentCandles.unshift(candles[i]);
                currentCandles.push(candles[i]);

                if(i == l){

                    renderCandles(currentCandles);
                    $("#prev").removeClass(" not-clickable ").addClass(" clickable ");
                    $("#next").removeClass(" not-clickable ").addClass(" clickable ");
                    $("#loading-holder").removeClass(" loading-visible ").addClass(" loading-not-visible ");
                    if((currentPage-1) == 0){
                        $("#prev").removeClass(" clickable ").addClass(" not-clickable ");
                    }
                }
        
    }
        
    } );


 /*JQuery end*/
})