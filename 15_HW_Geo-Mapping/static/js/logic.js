// Earthquake data
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

//----------------------------------------------------------

d3.json(url, function(response) {

    createFeatures(response.features);

    // Create earthquake depth legend bar
    var svg = d3.select(".legend")
                .append("svg")
                .attr("height", 30);

    var legendBar = svg.append("legendBar");
    
    var linearGradient = legendBar.append("linearGradient")
            .attr("id", "linear-gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");


    //Color at 0% point 
    linearGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "rgb(253, 200, 119)");

    //Color at 50% point
    linearGradient.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", "#FD9346");
    
    //Color at 100% point
    linearGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#FF6200");

    svg.append("rect")
            .attr("width", 120)
            .attr("height", 20)
            .style("fill", "url(#linear-gradient)");
});

//----------------------------------------------------------

// ******Functions for features on the map******

// Call createMap in this function
function createFeatures(data) {
    
    // Creates circle for each earthquake datapoint
    function forEachCircle(feature, layer) {
        layer.bindPopup(`<strong>Location: ${feature.properties.place}<strong><br> 
                                 Depth: ${feature.geometry.coordinates[2]}<br> 
                                 Magnitude: ${feature.properties.mag}`)
    }


    var earthquakeDepths = [];

    data.forEach((feature) => {earthquakeDepths.push(feature.geometry.coordinates[2]); });

    var legendColorScale = d3.scaleLinear()
            .domain([Math.min(... earthquakeDepths), 90])
            .range(["rgb(253, 200, 119)", "#FF6200"]);

    
        // Create circle with colors dependent on earthquake depth
        function createCircle(feature) {

            return L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            
                // Color change depending on depth 
                fillOpacity: 0.3,
                stroke: false,
                color: legendColorScale(feature.geometry.coordinates[2]),
                radius: feature.properties.mag * 7500
            })
        }

    // Earthquake layer in circle, popup for each earthquake data
    var earthquakes = L.geoJSON(data, {
        pointToLayer: createCircle,
        forEachCircle: forEachCircle
    });

    createMap(earthquakes);
}

//----------------------------------------------------------

function createMap(earthquakes) {

    var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 20,
        id: "dark-v10",
        accessToken: API_KEY
    });
        
    var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 20,
        id: "light-v10",
        accessToken: API_KEY
    });

    var baseMaps = {
        "Dark Map": darkMap,
        "Light Map": lightMap
    };

    var overlay = {
        "Earthquakes": earthquakes
    };

    //Default will show lightmap & earth quake data
    var myMap = L.map("mapid", {
        center: [39.8283, -98.5795],
        zoom: 4.5,
        layers: [lightMap, earthquakes]
    });

    L.control.layers(baseMaps, overlay, {
        collapsed: true
    }).addTo(myMap);

    //Create legend on bottom right
    var legend = L.control({position: "bottomright"});

    //Create legend and add to HTML
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var limits = [-10, 500];

        var legendInfo = "<h3>Earthquake Depth</h3>" +
            "<div class=\"labels\">" +
                "<div class=\"min\">" + limits[0] + "</div>" +
                "<div class=\"max\">" + `${limits[limits.length - 1]}+` + "</div>" + "</div>";

        div.innerHTML = legendInfo;
        return div;
    };

    // Add legend to map
    legend.addTo(myMap);
}