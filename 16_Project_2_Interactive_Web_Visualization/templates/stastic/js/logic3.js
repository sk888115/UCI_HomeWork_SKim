d3.csv("../../../output/grouped_norcal_county_total_df.csv", function(error, norcal_data) {// with header..
    if (error) throw error;

    norcal_data.forEach(function(data) {
        data.fips = +data.fips;
        data.cases = +data.cases;
        console.log(data.fips);
    });       
    
    

    d3.csv("../../../output/grouped_socal_county_total_df.csv", function(error, socal_data) {// with header..
        if (error) throw error;
        socal_data.forEach(function(data) {
            // console.log(data.fips);
        });
        
    });  

});

//         d3.csv("grouped_socal_county_total_df.csv", function(error, data2) {// without header..
//             data2.forEach(function(d2) {
//                     newArray.push(d2);
//             });

//             });
//         console.log(newArray);
//     });

//     var fips = unpack(rows, 'fips'),
//         cases = unpack(rows, 'cases'),
//         northern_cali_fips = unpack(rows, 'northern_cali_fips'),
//         southern_cali_fips = unpack(rows, 'southern_cali_fips'),
//         color = [,"rgb(255,65,54)","rgb(133,20,75)","rgb(255,133,27)","lightgrey"],
//         citySize = [],
//         hoverText = [],
//         scale = 50000;

//     for ( var i = 0 ; i < cityPop.length; i++) {
//         var currentSize = cityPop[i] / scale;
//         var currentText = cityName[i] + " pop: " + cityPop[i];
//         citySize.push(currentSize);
//         hoverText.push(currentText);
//     }

//     var data = [{
//         type: 'scattergeo',
//         locationmode: 'USA-states',
//         lat: cityLat,
//         lon: cityLon,
//         hoverinfo: 'text',
//         text: hoverText,
//         marker: {
//             size: citySize,
//             line: {
//                 color: 'black',
//                 width: 2
//             },
//         }
//     }];

//     var layout = {
//         title: '2020 California COVID-19 Cases - Northern v. Southern ',
//         showlegend: false,
//         geo: {
//             scope: 'usa',
//             projection: {
//                 type: 'albers usa'
//             },
//             showland: true,
//             landcolor: 'rgb(217, 217, 217)',
//             subunitwidth: 1,
//             countrywidth: 1,
//             subunitcolor: 'rgb(255,255,255)',
//             countrycolor: 'rgb(255,255,255)'
//         },
//     };

//     Plotly.newPlot("myDiv", data, layout, {showLink: false});

// });