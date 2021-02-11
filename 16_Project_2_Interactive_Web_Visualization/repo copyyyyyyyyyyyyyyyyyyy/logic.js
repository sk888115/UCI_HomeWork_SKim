var chart = {
    var svg_one = d3.create("svg")
        .attr("viewBox", [0, 0, 975, 610]);
    
    
}

// var margin = { top: 0, left: 0, right: 0, bottom: 0},
//     height = 400 - margin.top - margin.bottom,
//     width = 800 - margin.left - margin.right;

// var svg = d3.select("#map")
//     .append("svg")
//     .attr("height", height + margin.top + margin.bottom)
//     .attr("width", width = margin.left + margin.right)
//     .append("g")
//     .attr("transform", `translate(${margin.left}${margin.top})`);
    



// // Define streetmap layer
// var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
// });

// // Create baseMaps object to hold our base layers
// var baseMaps = {
//     "Street Map": streetmap
// };

// // Create map with streetmap and earthquakes layers to display when loaded
// var map = L.map("map", {
//     center: [32.7767, -96.7970],
//     zoom: 4,
//     layers: [streetmap, earthquakes]
// });