$(function(){
    
    /*Get the Api link from the global variable declarations (js/globals.js)*/
    const apiLink = globals.exchangeLink;
    
    /*The function for receiving data from candle.json*/
    getJsonData();
    
    /*Declare pagination variables */
    var exchange;
    var exchangelength;
    var currentPage = 1;
    var perPage = 20;
    var totalPages;
    var tempExchange = [];


    /*--------------------------------------------------*/
    /* Ajax function to get the list from Json API      */
    function getJsonData(){

       $("#loading-holder").removeClass(" loading-not-visible ").addClass(" loading-visible ");

        $.ajax({
            url: apiLink,
            method: 'GET',
            success: function(response) {

                // Handle the API response here
                exchange = response.hits.hits;
                // Assign the lengs of the json object to the propper parameter
                exchangelength = exchange.length;
                totalPages = Math.ceil(Number(exchangelength)/Number(perPage));

                var too = Number(perPage)-Number(1);
        
                for ( var i = 0, l = Number(perPage)-Number(1); i <= l; i++ ) {

                    //currentCandles.unshift(candles[i]);
                    tempExchange.unshift(exchange[i]);
                    // End of the loop
                    if(i == Number(perPage)-Number(1)){
                       renderItems(tempExchange);
                       pageCounter();
                       $("#loading-holder").removeClass(" loading-visible ").addClass(" loading-not-visible ");
                       $("#next").removeClass(" not-clickable ").addClass(" clickable ");
                    }
                }
            },
            error: function(xhr, status, error) {
                console.error(status, error);
            }
        });
     }



    /*--------------------------------------------------*/
    /*function to render the Array metadata for each page*/
    function renderItems(metadata){
    
        $.each(metadata, function(key,value) {
            $( ".candle-grid-holder" ).prepend( `<div class='grid'>
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


    /*--------------------------------------------------------*/
    /*Function next Page for the pagination                   */
    $( "#next" ).on( "click", function() {
        
        //show loading when clicking next 
        $("#loading-holder").removeClass(" loading-not-visible ").addClass(" loading-visible ");
        //Remove current items and prepare the place holder for the next page 
        $("div.grid").remove();
        
        //Empty the tem Candles Array
        tempExchange = [];
        
        //Define next page from and to items (have in mind that the json object starts from 0)
        var from = (Number(currentPage) * Number(perPage)) - 1;
        var to = Number(from) + Number(perPage);

        //Define last page items if less than perPage variable
        if(to > exchangelength) {
           
            lastPage = (exchangelength - from)-1;
            to = from + lastPage;
        }
             
        //Iterate throght Json object and construct new page items
        for ( var i = from, l = to; i <=l; i++ ) {
        

            tempExchange.unshift(exchange[i]);

            //Detect and of for loop
            if(i == l){
                
                //Increment current page
                currentPage++; 
                
                //Prepare pagination buttons and remove loading 
                $("#prev").removeClass(" not-clickable ").addClass(" clickable ");
                $("#next").removeClass(" not-clickable ").addClass(" clickable ");
                $("#loading-holder").removeClass(" loading-visible ").addClass(" loading-not-visible ");

                //Adjust pagecouner on the pagination widget
                pageCounter();

                //Render page items to the interface
                renderItems(tempExchange);
                var nextPage = currentPage + 1;
                //Disable next button of pagination when last page
                if(nextPage > totalPages)
                {   
                    $("#next").removeClass(" clickable ").addClass(" not-clickable ");
                }

            }
        }

    } );



    /*-------------------------------------*/
    /*Function prev page                   */
    $( "#prev" ).on( "click", function() {
            
        //Decrement current page
        currentPage--;
        
        //Empty the temp Array for page items 
        tempExchange = [];

        //Show loading and empty the html interface form page items
        $("#loading-holder").removeClass(" loading-not-visible ").addClass(" loading-visible ");
        $("div.grid").remove();
        
        //Set from and to page items 
        var from = (Number(currentPage) * Number(perPage)) - perPage;
        var to = (Number(from) + Number(perPage)) - 1;

        //Loop through json to find next page items
        for ( var i = from, l = to; i <=l; i++ ) {

            tempExchange.unshift(exchange[i]);
            //tempExchange.push(exchange[i]);
            
            //Detect end of the loop
            if(i == l){
                
                //Render page items to the interface
                renderItems(tempExchange);
                //Render page counter 
                pageCounter();

                //Render next and prev buttons and remove loading
                $("#prev").removeClass(" not-clickable ").addClass(" clickable ");
                $("#next").removeClass(" not-clickable ").addClass(" clickable ");
                $("#loading-holder").removeClass(" loading-visible ").addClass(" loading-not-visible ");

                //Disable prev button of the pagination when first page
                if((currentPage-1) == 0){
                    $("#prev").removeClass(" clickable ").addClass(" not-clickable ");
                }
            }
        }
        
    } );
    
    /*-------------------------------------------*/
    /*Function to render the page counter         */
    function pageCounter(){

        $(".page-counter").html("<p>pages: "+totalPages+"        / current page: "+currentPage+"</p>");

    }


 /*JQuery end*/
})