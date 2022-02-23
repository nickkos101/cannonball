var trafficFrequency = $('.trafficFrequency').val();
var buildingFrequency = $('.buildingFrequency').val();

function renderTick() {
  spawnBuilding();
  spawnCars();
}


//Spawns Random Cars and animates them across the screen over 5 seconds and then removes them from memory.
function spawnCars(trafficFrequency) {
  let potentialCars = [
    'assets/gfx/car-black.png',
    'assets/gfx/car-red.png',
    'assets/gfx/car-blue.png'
  ];
  $('.car_spawner').append('<img src="'+potentialCars[Math.floor(Math.random()*potentialCars.length)]+'">');
  $('.car_spawner img').animate({
    left: "100%",
  }, 5000, "linear", function() {
    $(this).remove();
  });
}

//Checks if the player is in the correct position and spawns a sign on the route for it. 
//Animating the signs across the screen over 5 seconds before removing it off screen.
function spawnSigns(currentMilage, routeStop) {
  if (currentMilage == routeStop.stopLength) {
    $('.sign').append('<p class="name">'+routeStop.stopName+'</p>');
    $('.sign').append('<p class="pop">'+routeStop.stopPopulation.toLocaleString()+'</p>');
    $('.sign').animate({
      left: "100%",
    }, 5000, "linear", function() {
      $(this).remove();
    });
  }
}

//Spawns a random building and animates it across the screen over 10 seconds before removing it.
function spawnBuilding(buildingFrequency) {
  let potentialBuildings = [
    'assets/gfx/building_tall_3x9.png',
    'assets/gfx/building_square_5x5.png',
    'assets/gfx/building_square_7x7.png'
  ];
  $('.building_spawner').append('<img src="'+potentialBuildings[Math.floor(Math.random()*potentialBuildings.length)]+'">');
  $('.building_spawner img').animate({
    left: "100%",
  }, 10000, "linear", function() {
    $(this).remove();
  });
}

$(document).ready(function(){
  
  $('.buildingFrequency').change(function(){
    buildingFrequency = $(this).val();
  });
  
  $('.trafficFrequency').change(function(){
    trafficFrequency = $(this).val();
  });
  
  setInterval(function(){
    renderTick();
  }, 3000);
  
});
