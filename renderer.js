function renderTick() {
  spawnBuilding();
  spawnCars();
}


//Spawns Random Cars and animates them across the screen over 5 seconds and then removes them from memory.
function spawnCars() {
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
function spawnBuilding() {
  let potentialBuildings = [
    'assets/gfx/building-vegas-set-1.png',
    'assets/gfx/building-vegas-set-2.png',
    'assets/gfx/building-vegas-set-3.png',
    'assets/gfx/building-vegas-set-4.png',
    'assets/gfx/building-vegas-set-5.png',
    'assets/gfx/building-vegas-set-6.png',
    'assets/gfx/building-vegas-set-7.png',
    'assets/gfx/building-vegas-set-8.png',
    'assets/gfx/building-vegas-set-9.png',
    'assets/gfx/building-set-riverside-1.png',
    'assets/gfx/building-set-riverside-2.png',
    'assets/gfx/building-set-riverside-3.png',
    'assets/gfx/building-set-riverside-4.png',
    'assets/gfx/building-set-riverside-5.png',
    'assets/gfx/building-set-riverside-6.png',
    'assets/gfx/building-set-riverside-7.png',
    'assets/gfx/building-set-riverside-8.png',
    'assets/gfx/building-set-riverside-9.png',
    'assets/gfx/building-set-riverside-10.png',
    'assets/gfx/building-set-riverside-11.png',
    'assets/gfx/building-set-riverside-12.png',
    'assets/gfx/building-set-riverside-13.png',
    'assets/gfx/building-set-riverside-14.png',
    'assets/gfx/building-set-riverside-15.png',
  ];
  $('.building_spawner').append('<img src="'+potentialBuildings[Math.floor(Math.random()*potentialBuildings.length)]+'">');
  $('.building_spawner img').animate({
    left: "100%",
  }, 10000, "linear", function() {
    $(this).remove();
  });
}

$(document).ready(function(){

  let buildingFrequency = $('.buildingFrequency').val();

  // var buildingSpawnInterval = setInterval(function(){
  //   spawnBuilding();
  // }, buildingFrequency);


  $('.buildingFrequency').change(function(){
    buildingFrequency = $(this).val();
    clearInterval(buildingSpawnInterval);
    buildingSpawnInterval = setInterval(function(){
      spawnBuilding();
    }, buildingFrequency);
  });


});
