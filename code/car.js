let carClass = class {
    constructor(carName) {
        this.name = carName,
        this.screenSelectAsset = '',
        this.inGameAsset = '',
        this.cost = 0,
        this.fuelTanksize = 0,
        this.currentFuel = 0,
        this.milesPerGallon = 0,
        this.minMph = 0,
        this.maxMph = 0,
        this.tireStatus = {
            frontDriver: 100,
            frontPassenger: 100,
            rearDriver: 100,
            rearPassenger: 100
        },
        this.windSheildStatus = 100
    }
    draw_select_interface() {
        $('.car-select').append(
            '<div class="car-selector col-xs-12 col-sm-4 text-center"><img src="'+this.screenSelectAsset+'"><h2>'+this.name+'</h2><ul class="text-start"><li>Starting Cost: $'+this.cost.toLocaleString()+'</li><li>Top Speed: '+this.maxMph+' MPH</li><li>Fuel Economy: '+this.milesPerGallon+' MPG</li></ul></div>'
        );
    }
}

let Lambo = new carClass('1986 Lambogini Countach');
Lambo.screenSelectAsset = 'assets/gfx/countach-select.png';
Lambo.inGameAsset = 'assets/gfx/countach.png';
Lambo.cost = 118000;
Lambo.fuelTanksize = 31.7;
Lambo.currentFuel = Lambo.fuelTanksize;
Lambo.milesPerGallon = 14.3;
Lambo.maxMph = 179;

let Porsche = new carClass('1985 Porsche 911 Carrera');
Porsche.screenSelectAsset = 'assets/gfx/porsche-select.png';
Porsche.inGameAsset = 'assets/gfx/porsche.png';
Porsche.cost = 84150;
Porsche.fuelTanksize = 21.2;
Porsche.currentFuel = Porsche.fuelTanksize;
Porsche.milesPerGallon = 20.7;
Porsche.maxMph = 152;

let Ferrari = new carClass('1985 Ferrari Testarossa');
Ferrari.screenSelectAsset = 'assets/gfx/ferrari-select.png';
Ferrari.inGameAsset = 'assets/gfx/ferrari.png';
Ferrari.cost = 88000;
Ferrari.fuelTanksize = 24.6;
Ferrari.currentFuel = Ferrari.fuelTanksize;
Ferrari.milesPerGallon = 11;
Ferrari.maxMph = 180;

$(document).ready(function(){
    Lambo.draw_select_interface();
    Porsche.draw_select_interface();
    Ferrari.draw_select_interface();
});