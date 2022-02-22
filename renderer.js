var trafficFrequency = $('.trafficFrequency').val();
var buildingFrequency = $('.buildingFrequency').val();

function renderTick() {
  spawnBuilding();
  spawnCars();
}


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

function spawnCar() {
  let potentialCars = [];
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
