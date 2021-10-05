export function AvailabilityParser(availability){

    try{
        var parsed = JSON.parse(availability);
        return parsed;
    }catch(e){
        console.log("e",e);
    }
    
    // var partitions = availability.split(';');

    // var dictionary = {}
    // partitions.forEach(x => {
    //     var y = x.split('=');
    //     if(y[0] == 'days'){
    //         dictionary[y[0]] = JSON.parse(y[1]);
    //     }else{
    //         dictionary[y[0]] = y[1];
    //     }
    // });
    // return dictionary;
}

export function MapAndSortDaysOfTheWeek(days){
    const dotw = [{id: 0, name: 'mon'},{id: 1, name: 'tue'},{id: 2, name: 'wed'},{id: 3, name: 'thu'},{id: 4, name: 'fri'},{id: 5, name: 'sat'},{id: 6, name: 'sun'}];
    try{
        const lowered = days.map(name => name.toLowerCase());
        const filtered = dotw.filter(a => lowered.some(b => a.name === b));
        return filtered;
    }catch(e){
        console.log("e",e);
    }
}