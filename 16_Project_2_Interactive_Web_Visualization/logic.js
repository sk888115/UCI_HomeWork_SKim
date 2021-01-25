// Define streetmap layer
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

// Create baseMaps object to hold our base layers
var baseMaps = {
    "Street Map": streetmap
};

// Create map with streetmap and earthquakes layers to display when loaded
var map = L.map("map", {
    center: [32.7767, -96.7970],
    zoom: 4,
    layers: [streetmap, earthquakes]
});