//CannonBall Run Simulation Game Inspired by "The Oregon Trail"
//Written By Nicholas Koskowski Febuary 9th, 2022

const urlParams = new URLSearchParams(window.location.search);

//Create a player class with a ton of variables to keep & initialize player state.
let playerClass = class {
  constructor(route) {
    this.ticks = 0;
    this.playerName = urlParams.get('playerName');
    this.route = FearAndLoathingRoute;
    this.isMoving = true;
    this.waitToTick = 0;

    this.milesTraveled = 0;
    this.milesPerTick = 0.000277778;
    this.money = 1000;

    this.bladder = 100;

    if (urlParams.get('selectedCar') == 'Lambo') {
      this.car = Lambo;
    }

    if (urlParams.get('selectedCar') == 'Porsche') {
      this.car = Porsche;
    }

    if (urlParams.get('selectedCar') == 'Ferrari') {
      this.car = Ferrari;
    }
  }
}


//Create a base class for random events to describe the basics of a random event.
let gEventClass = class {
  constructor(desc) {
    this.desc = desc;
  }
  play() {
    return;
  }
}

//This is an example of a random event.
class windsheildRockEvent extends gEventClass {
  constructor(desc) {
    super('A rock hit your windsheild!');
  }
  play(player) {
    if (player.isMoving) {
      soundEngine('assets/sound/thunk.wav');
      //Reduce the players cars windSheildStatus.
      player.car.windSheildStatus = player.car.windSheildStatus - 25;
      //Put the event in the activity log.
      $('.activity-log').prepend('<p class="text-warning">'+this.desc+'</p>');
    }
  }
}

//This is an example of a static event.
class windSheildBreakEvent extends gEventClass {
  constructor(desc) {
    super('Your windsheild has broken!');
  }
  play(player) {
    //Stop the players Movement
    if (player.car.windSheildStatus <= 0 && player.isMoving) {
      player.isMoving = false;
      player.waitToTick = player.ticks + 3;
      soundEngine('assets/sound/glass.wav');
      $('.activity-log').prepend('<p class="text-danger">'+this.desc+'</p>');
      $('.crack').show();
    }
  }
}

class windSheildFixEvent extends gEventClass {
  constructor(desc) {
    super('You payed $100 to fix your windsheild!');
  }
  play(player) {
    if (player.car.windSheildStatus <= 0 && player.waitToTick == player.ticks) {
      player.isMoving = true;
      if (player.money >= 100) {
        $('.crack').hide();
        player.car.windSheildStatus = 100;
        player.money = player.money - 100;
        soundEngine('assets/sound/repair.wav');
        $('.activity-log').prepend('<p class="text-warning">'+this.desc+'</p>');
      } else {
        player.money = player.money - 100;
      }
    }
  }
}

class foundMoneyEvent extends gEventClass {
  constructor(desc) {
    super('Found Money!');
  }
  play(player) {
    let randMoney = Math.floor((Math.random() * 355) + 1);
    player.money = player.money + randMoney;
    $('.activity-log').prepend('<p class="text-success">You found $'+randMoney+'!</p>');
    soundEngine('assets/sound/cash.wav');
  }
}

class drinkWaterEvent extends gEventClass {
  constructor(desc) {
    super('You took a drink of water!');
  }
  play(player) {
    let randWater = Math.floor((Math.random() * 45) + 1);
    player.bladder = player.bladder - randWater;
    $('.activity-log').prepend('<p>'+this.desc+'</p>');
  }
}

class haveToPissEvent extends gEventClass {
  constructor(desc) {
    super('You had to stop to take a piss!');
  }
  play(player) {
    if (player.bladder <= 0) {
      soundEngine('assets/sound/piss.wav');
      player.bladder = 100;
      $('.activity-log').prepend('<p class="text-warning">'+this.desc+'</p>');
    }
  }
}

class speedingEvent extends gEventClass {
  constructor(desc) {
    super('You have been ticketed for Speeding!');
  }
  play(player) {
    var mph = $('.speed').val();

    let fineMax = 0;
    let fineMin = 0;

    if (player.isMoving && mph > 65) {
      fineMin = 50;
      fineMax = 300;
    }
    if (player.isMoving && mph > 100) {
      fineMin = 100;
      fineMax = 1000;
    }

    let fineAmount = Math.floor((Math.random() * fineMax) + fineMin);

    if (fineAmount % 2 == 0 && fineAmount > 0) {
      console.log(fineAmount);
      $('.activity-log').prepend('<p class="text-warning">You have been pulled over for speeding but were let off with a warning!</p>');
      soundEngine('assets/sound/siren.wav');
      $('.sirens').show();
      player.waitToTick = player.ticks + 1;
    }
    else if (fineAmount > 0) {
      player.money = player.money - fineAmount;
      $('.activity-log').prepend('<p class="text-danger">You have been pulled over for speeding and fined: $'+fineAmount+'</p>');
      soundEngine('assets/sound/siren.wav');
      $('.sirens').show();
      player.waitToTick = player.ticks + 2;
    }
  }
}

class reckLessDrivingEvent extends gEventClass {
  constructor(desc) {
    super('You have been pulled over and jailed for reckless driving!');
  }
  play(player) {

    var mph = $('.speed').val();
    if (mph > 100) {
      //Stop moving
      player.isMoving = false;
      let jailTime = Math.floor((Math.random() * 6) + 1);
      player.waitToTick = player.ticks + jailTime;
      //Append to activity log.
      $('.jail').show();
      $('.activity-log').prepend('<p class="text-danger">You have been jailed '+jailTime+' days for reckless driving!</p>');
      soundEngine('assets/sound/siren.wav');
    }
  }
}

class getOutOfJailEvent extends gEventClass {
  constructor(desc) {
    super('You got out of jail!');
  }
  play(player) {
    if (player.ticks == player.waitToTick) {
      player.isMoving = true;
      player.waitToTick = 0;
      $('.jail').hide();
      $('.activity-log').prepend('<p class="text-success">You got out of jail!</p>');
    }
  }
}

class beingFollowedEvent extends gEventClass {
  //TODO CLEAN THIS DECISION MAKING PROCESS UP INTO A UI IMPLEMENT CONSQUENCES FOR NOT MAKING A DECISION
  //TODO STOP THIS EVENT FROM BEING OVERLAPPED ON ITSELF
  constructor(desc) {
    super('You are being followed!');
    this.timer = 10;
  }
  play(player) {
    $('.activity-log').prepend('<p class="text-warning">You are being followed!</p>');
    this.options();
  }
  options() {
    $('.decision-log').empty();
    $('.decision-log').prepend('<i class="fas fa-timer"></i><span id="timeToMakeDecision">'+this.timer+'</span> <button class="btn">Lose Them</button><button class="btn">Slow Down</button><button class="btn">Pull Over</button>');
    setInterval(function(){
      let timerValue = parseInt($('#timeToMakeDecision').text());
      $('#timeToMakeDecision').text(timerValue - 1);
      if (timerValue == 0) {
        $('.decision-log').empty();
      }
    }, 1000);
  }
}

//Keep track of gas usage every tick that occurs.
function gasTick(player) {
  var mph = $('.speed').val();
  if (player.isMoving) {

    var fuelSpendPerTick = (player.car.milesPerGallon / mph);

    player.car.currentFuel = player.car.currentFuel - fuelSpendPerTick;

    //Do the Interface Updates for Gas Status
    if ((player.car.currentFuel / player.car.fuelTanksize * 100) <= 100) {
      $('.gas').html('Full Tank');
    }

    if ((player.car.currentFuel / player.car.fuelTanksize * 100) <= 75) {
      $('.gas').html('3/4 Tank');
    }

    if ((player.car.currentFuel / player.car.fuelTanksize * 100) <= 50) {
      $('.gas').html('Half Tank');
    }

    if ((player.car.currentFuel / player.car.fuelTanksize * 100) <= 25) {
      $('.gas').html('1/4 Tank');
    }

    if ((player.car.currentFuel / player.car.fuelTanksize * 100) <= 1) {
      $('.gas').html('Empty');

      //Warn the player they ran out of gas and restart the game.
      player.isMoving = false;
      soundEngine('assets/sound/outofgas.wav');
      alert('You ran out of gas!');
      location.reload();
    }
  }
}

function purchaseGas(player) {
  console.log('EventFired');
  player.car.currentFuel = player.car.fuelTanksize;
  $('.activity-log').prepend('<p class="text-success">You refilled your tank!</p>');
}

function moveTick(player) {
  var mph = $('.speed').val();

  if (player.isMoving) {
    player.milesTraveled = player.milesTraveled + (player.milesPerTick * mph);
  }

  //Controls Routing Stop Checks
  player.route.checkRoute();

  //Update the Interface Elements for Movement
  $('.milesTraveled').html(Math.ceil(player.milesTraveled));

  $('.milesToGo').html(Math.ceil(player.route.Length) - Math.ceil( player.milesTraveled));
}

function moneyTick(player) {

  if (player.money <= 0) {
    soundEngine('assets/sound/outofmoney.wav');
    alert('You have run out of money!');
    location.reload();
    //Just draw the money on the interface.
  }
  $('.money').html(player.money);
}

function bladderTick(player) {
  //Just draw the money on the interface.
  $('.bladder').html(player.bladder);
}

function randomEventTick(player) {
  let windSheildlEventInstance = new windsheildRockEvent();
  let foundMoneyEventInstance = new foundMoneyEvent();
  let drinkWaterEventInstance = new drinkWaterEvent();
  let speedingEventInstance = new speedingEvent();
  let reckLessDrivingEventInstance = new reckLessDrivingEvent();
  let beingFollowedEventInstance = new beingFollowedEvent();
  listOfRandomEvents = [
    windSheildlEventInstance,
    foundMoneyEventInstance,
    drinkWaterEventInstance,
    speedingEventInstance,
    reckLessDrivingEventInstance
    // beingFollowedEventInstance
  ];

  listOfRandomEvents[Math.floor(Math.random()*listOfRandomEvents.length)].play(player);

}

function staticEventTick(player) {
  let windSheildBreakEventInstance = new windSheildBreakEvent();
  let windSheildFixEventInstance = new windSheildFixEvent();
  let haveToPissEventInstance = new haveToPissEvent();
  let getOutOfJailEventInstance = new getOutOfJailEvent();

  listOfStaticEvents = [
    windSheildBreakEventInstance,
    windSheildFixEventInstance,
    haveToPissEventInstance,
    getOutOfJailEventInstance
  ];

  listOfStaticEvents.forEach(staticEvent => {
    staticEvent.play(player);
  });

  //Check if game is paused and stop animation.
  if (player.isMoving) {
    $('.x4').removeClass('paused');
  } else {
    $('.x4').addClass('paused');
  }
}



let player = new playerClass();

$(document).ready(function(){
  console.log('GameState Started');

  player.car.drawInGame();

  $('#gasButton').click(function(){
    purchaseGas(player);
  });

  $('.speed').change(function(){
    console.log('yes');
    $(this).parent().find('span').empty();
    $(this).parent().find('span').append($(this).val());
  });

  setInterval(function(){
    player.ticks = player.ticks + 1;
    $('.turnstaken').html(player.ticks);
    if (player.isMoving) {
      bladderTick(player);
      moneyTick(player);
      moveTick(player);
      gasTick(player);
      randomEventTick(player);
    }
    if (player.waitToTick == player.ticks) {
      $('.sirens').hide();
    }
    staticEventTick(player);
  }, 1000);

});
