# Finanze trends
Test project from the hiring process.
Author: [Agon Xheladini](agonxheladini001@gmail.com)

## Techstack
<code><img width="50" src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" alt="HTML" title="HTML"/></code>
<code><img width="50" src="https://user-images.githubusercontent.com/25181517/192158956-48192682-23d5-4bfc-9dfb-6511ade346bc.png" alt="Sass" title="Sass"/></code>
<code><img width="50" src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="JavaScript" title="JavaScript"/></code>
<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183570228-6a040b9f-3ddf-47a2-a201-743121dac664.png" alt="php" title="php"/></code>
<code><img width="50" src="https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png" alt="Docker" title="Docker"/></code>

+ JQuery 3.7.1
+ PHP 8.0.30
+ Docer 4.26.0 (for windows)
+ sass 1.34.0

#### Developed under OS: 
 + Windows 11 OS
#### Tested with: 
 + Chrome Version 127.0.6533.73 (Official Build) (64-bit)
 + Microsoft Edge Version 127.0.2651.74 (Official build) (64-bit)
 + Firefox 128.0.3 (64-bit)

## Project setup instructions

#### 1. Pull the repository to your local machine:
+ https://github.com/Axheladini/finanz_trends.git

#### 2. I assume you have docker up and running. Point to the directory where you pulled the repository:
```shell script
docker-compose up -d
```

#### 2.1 Or separately build one after anothe the containers and afterwards bring them up

```shell script
docker-compose build api --no-cache
```
```shell script
docker-compose build dashboard --no-cache
```
```shell script
docker-compose up -d
```

#### 3. Wait for the above command to completely execute and than open:

[http://localhost:9090/](http://localhost:9090/)

## PHPUnit
+ Tests can be found under the **api** container. Since Slim4 PHP comes with composer and vendor I have used this framework for testings.
+ Enter the  **api** container and point to the directory: **/var/www/**
+ Test functions can be found at **/var/www/tests/FirstTest.php** (Currently three test with total 9 assertions)
+ To run the tests, point to **/var/www/** and type the command:
```shell script
composer test
```
## Explanation
For better development experience we need to change a bit the structure of th yml file and bothe Docerfiles. Using volumes instead of copying all files to the proper container is more practical. 
The structure is there the code is commented, few tweks and it becomes development ready environment. 

**api** container holds the Slim4 PHP framework. I have been using it to develop api endpoints for all three .json files and also for PHPUnitests. 

**dashboard** container holds the frontend. I have used Jquery with html and sass to completes this task, webpack is used to compile and import sass files from bulma framework. A page for eache json file, a javascript file for each page. Pagination is included for each page.

After pull and build make sure **api** container has **vendor** folder inside **/var/www/** and the
**dashboard** container has **node-modules** inside **/usr/share/nginx/html/**.

In general it is an simply environment and structure. Do not hesitate to ask questions: agonxheladini001@gmail.com

## Images from the UX/UI
![img 01](https://i.postimg.cc/7xs2dDjn/ft01.png)
![img 02](https://i.postimg.cc/xfBbj5fk/ft02.png)

