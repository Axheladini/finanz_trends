<?php 

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Exception\RequestException;

class FirstTest extends Testcase
{
    
    private $guzzleClient;


    public function setUp():void
    {
        /* set the client equal to the api container*/
        $this->guzzleClient = new Client(['base_uri' => 'http://localhost:80/']);
    }

    public function tearDown():void
    {
        $this->guzzleClient = null;
    }
    
     /* A test fo candle endpoint */       
    function testCandleEndpoint() {
           
        $response = $this->guzzleClient->request('GET', 'candle');
        $body = $response->getBody()->getContents();
        $hits =  json_decode($body);
        /* Check if the number of entries are equal to 10000*/
        $this->assertSame(10000, count($hits->hits->hits));
        /* Check if respond is Json*/
        $this->assertJson($body);
         /* Check if status code is 200*/
        $this->assertEquals(200, $response->getStatusCode());

    }

    function testExchangeEndpoint() {
           
        $response = $this->guzzleClient->request('GET', 'exchange');
        $body = $response->getBody()->getContents();
        $hits =  json_decode($body);
        
        /* Check if the number of entries are equal to 23*/
        $this->assertSame(23, count($hits->hits->hits));
        /* Check if respond is Json*/
        $this->assertJson($body);
        /* Check if status code is 200*/
        $this->assertEquals(200, $response->getStatusCode());

    }
    function testMetadataEndpoint() {
           
        $response = $this->guzzleClient->request('GET', 'metadata');
        $body = $response->getBody()->getContents();
        $hits =  json_decode($body);
        
        /* Check if the number of entries are equal to 20 */
        $this->assertSame(20, count($hits->hits->hits));
        /* Check if respond is Json*/
        $this->assertJson($body);
        /* Check if status code is 200*/
        $this->assertEquals(200, $response->getStatusCode());

    }
}
