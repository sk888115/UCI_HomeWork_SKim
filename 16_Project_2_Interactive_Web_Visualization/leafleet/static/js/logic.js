// // canvas resolution
// var width = 1000,
// height = 600;  
  
// // Defines "svg" as data type and "make canvas" command
// var svg = d3.select("body").append("svg")
//       .attr("width", width)
//       .attr("height", height);

//----------------------------------------------------------------------

// Creating map object
var myMap = L.map("map", {
  center: [36.62873356165663, -120.8397582339502],
  zoom: 6
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

L.svg().addTo(myMap)

// Store API query variables
var baseURL = "https://raw.githubusercontent.com/EdwinVargas22/Project-2-Group-4/main/output/cali_county.csv";
var date = "$where=created_date between'2020-01-01T00:00:00' and '2020-12-31T00:00:00'";
var county = "county";
var state = "state";
var fips = "fips";
var cases = "&cases";
var limit = "&$limit=10000000";


// Assemble API query URL
var url = baseURL;
var socalCounties = ["Inyo", "Kern", "San Luis Obispo", "Santa Barbara", "Ventura", "Los Angeles", "San Bernardino", "Orange", "Riverside", "San Diego", "Imperial"];


function generateCircle(data) {
  d3.select('#map')
    .select('svg')
    .selectAll('myCircles')
    .data(data)
    .enter()
    .append('circle')
      .attr("cx", function(d){return myMap.latLngToLayerPoint([d.latitude, d.longitude]).x})
      .attr("cy", function(d){return myMap.latLngToLayerPoint([d.latitude, d.longitude]).y})
      .attr('r', function(d){return d.cases/100000>20?20:d.cases/100000})
      .style('fill', 'rgba(0,0,155,0.4)')
      //  .style('fill', function(d){
      //    //if(d.county  "Inyo"  "Kern" : "San Luis Obispo" : "Santa Barbara" : "Ventura" : "Los Angeles" : "San Bernardino" : "Orange" : "Riverside" : "San Diego": "Imperial"){
      //    if(d.county === socalCounties){return('orange');   }
      //   else {return('blue')};
      // })
      .attr('stroke-width', 3)
      .attr('fill-opacity', 10)
}

function update(){
  d3.selectAll("circle")
    .attr("cx", function(d){ return myMap.latLngToLayerPoint([d.latitude, d.longitude]).x })
    .attr("cy", function(d){ return myMap.latLngToLayerPoint([d.latitude, d.longitude]).y })
}

// Grab the data with d3
d3.csv(baseURL, function(data) {
  if (data !== null) {
    generateCircle(data)

   }
});

myMap.on("moveend",update)
