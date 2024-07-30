<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;


require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();


$app->get('/', function (Request $request, Response $response, $args) {
    
    $response->getBody()->write('No data avaliable!');
    return $response;
});

$app->get('/candle', function (Request $request, Response $response, $args) {
    
    /*Check if candle.json file is avaliable */
    if(($candle_payload = @file_get_contents(__DIR__ . '/../storage/candle.json')) === false){
        
        /* If file missing prepare a Json error responde */
        $missing_file = array('success' => 'false', 'message' => "candle.json file not avaliable!");
        $missing_file_payload = json_encode($missing_file);
        $response->getBody()->write($missing_file_payload);
        $status_code = 409;/* Set status to 409 */

    }else{
        /* Assign Json Object to the Response */
        $response->getBody()->write($candle_payload);
        $status_code = 200; /* Set status to 409 */
      
    }
    /* Json Response ready */
    return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus($status_code);
   
});


$app->run();