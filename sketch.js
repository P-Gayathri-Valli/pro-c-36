var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed
var lastFed=0

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("Feed The Dog")
  feed.position(700,100)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,100);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  
 
  drawSprites();
  strokeWeight(0)
  textSize(14)
  fill("white")
  stroke("white")
  if(lastFed>=12){
     text("Last Fed :"+lastFed+"  PM ",350,30)

  }
   else if(lastFed==0){
    text("Last Fed: 12 AM",350,30)
  }else{
    text("Last Fed: "+lastFed+" AM ",350,30)

  }

}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var food_stock_val=foodObj.getFoodStock();
  if(food_stock_val<=0){
    foodObj.updateFoodStock(food_stock_val*0)
  }else{
    foodObj.updateFoodStock(food_stock_val-1)
  }
  lastFed=hour();
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
