// console.log("Cloudy with a chance of meatballs.");

// async function requestWeather() {
//     const httpRequest = await $.ajax({
//         method: "GET",
//         // url: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/sananselmo,ca?include=days,current,fcst&key=3D6EZXHLSVULQWKNPQNZGMSNW",
//         url: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/sananselmo,ca?key=3D6EZXHLSVULQWKNPQNZGMSNW",
//         success: function(response){
//             postDescription(response);
//         }
//     })
// }

function postDescription(obj) {
    console.log(obj);
    let mySection = $('section');
    $(mySection).html(obj.description)
}
