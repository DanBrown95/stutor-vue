export function AvailabilityParser(availability){

    try{
        var parsed = JSON.parse(availability);
        console.log("parsed", parsed);
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