var trafficFrequency = $('.trafficFrequency').val();
var buildingFrequency = $('.buildingFrequency').val();

function renderTick() {
  spawnBuilding();
  spawnCars();
}


function spawnCars(trafficFrequency) {
  let potentialCars = [
    'car-black.png',
    'car-red.png',
    'car-blue.png'
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
    'building_tall_3x9.png',
    'building_square_5x5.png',
    'building_square_7x7.png'
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
