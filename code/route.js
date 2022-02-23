let route = class {
    constructor(routeName) {
        this.name = routeName;
        this.routeLength = 0;
        this.stopsIndex = [];
    }
}

let FearAndLoathingRoute = new route('Fear and Loathing');
FearAndLoathingRoute.routeLength = 332;
FearAndLoathingRoute.stopsIndex = [
    { 
        stopName: 'San Diego, CA',
        stopPopulation: 1400000,
        stopLength: 0
    },
    {
        stopName: 'Speed Society HQ, CA',
        stopPopulation: 9,
        stopLength: 15.6
    },
    { 
        stopName: 'Riverside, CA',
        stopPopulation: 326414,
        stopLength: 99.2
    },
    {
        stopName: 'Victorville, CA',
        stopPopulation: 121902,
        stopLength: 146
    },
    {
        stopName: 'Barstow, CA',
        stopPopulation: 23899,
        stopLength: 176
    },
    {
        stopName: 'Calico Ghost Town, CA',
        stopPopulation: 0,
        stopLength: 187
    },
    {
        stopName: 'Baker, CA',
        stopPopulation: 541,
        stopLength: 239
    },
    {
        stopName: 'Primm, NV',
        stopPopulation: 1132,
        stopLength: 288
    },
    {
        stopName: 'Seven Magic Mountains, NV',
        stopPopulation: 0,
        stopLength: 306
    },
    {
        stopName: 'Las Vegas, NV',
        stopPopulation: 634773,
        stopLength: 332
    }
];