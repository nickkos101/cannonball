let route = class {
    constructor(routeName) {
        this.name = routeName;
        this.Length = 0;
        this.stopsIndex = [];
    }
    checkRoute() {     
        this.stopsIndex.forEach(stop => {
            if (player.milesTraveled >= stop.stopLength && stop.hasPassed == false) {
                stop.hasPassed = true;
                $('.activity-log').prepend('<p>'+stop.routeMessage+'</p>');
            }
        });
    }
}

let FearAndLoathingRoute = new route('Fear and Loathing');
FearAndLoathingRoute.Length = 332;
FearAndLoathingRoute.stopsIndex = [
    { 
        stopName: 'San Diego, CA',
        stopPopulation: 1400000,
        routeMessage: 'You start your journey off in Sunny San Diego!',
        hasPassed: false,
        stopLength: 0
    },
    {
        stopName: 'Speed Society HQ, CA',
        stopPopulation: 9,
        routeMessage: 'You have reached Speed Sociey Headquarters!',
        hasPassed: false,
        stopLength: 16
    },
    { 
        stopName: 'Riverside, CA',
        stopPopulation: 326414,
        routeMessage: 'You have reached Riverside, CA',
        hasPassed: false,
        stopLength: 100
    },
    {
        stopName: 'Victorville, CA',
        routeMessage: 'You have reached Victorville, CA',
        stopPopulation: 121902,
        hasPassed: false,
        stopLength: 146
    },
    {
        stopName: 'Barstow, CA',
        routeMessage: 'You have reached Barstow, you are halfway there!',
        stopPopulation: 23899,
        hasPassed: false,
        stopLength: 176
    },
    {
        stopName: 'Calico Ghost Town, CA',
        routeMessage: 'You have reached the Calico Ghost Town!',
        stopPopulation: 0,
        hasPassed: false,
        stopLength: 187
    },
    {
        stopName: 'Baker, CA',
        routeMessage: 'You have reached Baker, CA',
        stopPopulation: 541,
        hasPassed: false,
        stopLength: 239
    },
    {
        stopName: 'Primm, NV',
        routeMessage: 'You have reached Primm, welcome to Nevada!',
        stopPopulation: 1132,
        hasPassed: false,
        stopLength: 288
    },
    {
        stopName: 'Seven Magic Mountains, NV',
        routeMessage: 'You have reached the Seven Magic Mountains, NV',
        stopPopulation: 0,
        hasPassed: false,
        stopLength: 306
    },
    {
        stopName: 'Las Vegas, NV',
        routeMessage: 'Congradulations! You have reached the end of your journey!',
        stopPopulation: 634773,
        hasPassed: false,
        stopLength: 332
    }
];