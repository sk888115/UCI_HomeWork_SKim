anychart.onDocumentReady(function () {

    var data=[];

        // create the chart and set the data
        chart = anychart.heatMap(data);
        
        // set the chart title
        chart.title("Human Development Index by region (2010-2018)");
        
        // create and configure the color scale.
        var customColorScale = anychart.scales.linearColor();
        customColorScale.colors(["#ACE8D4", "#00726A"]);
        
        // set the color scale as the color scale of the chart
        chart.colorScale(customColorScale);
        
        // set the container id
        chart.container("container");
        
        // initiate drawing the chart
        chart.draw();
        
      });

// const data = {
//     labels: ["12am-3am", "3am-6pm", "6am-9am", "9am-12am",
//         "12pm-3pm", "3pm-6pm", "6pm-9pm", "9am-12am"
//     ],
//     datasets: [
//         {
//             name: "Some Data", type: "bar",
//             values: [25, 40, 30, 35, 8, 52, 17, -4]
//         },
//         {
//             name: "Another Set", type: "line",
//             values: [25, 50, -10, 15, 18, 32, 27, 14]
//         }
//     ]
// }

// const chart = new frappe.Chart("#chart", {  // or a DOM element,
//                                             // new Chart() in case of ES6 module with above usage
//     title: "My Awesome Chart",
//     data: data,
//     type: 'axis-mixed', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
//     height: 250,
//     colors: ['#7cd6fd', '#743ee2']
// })

// let data = {
//     dataPoints: {
//         "1426744959": 20,
//         "1463673055": 113,
//         "1476892421": 57,
//         // ...
//     },
//     start: startDate, // a JS date object
//     end: endDate
// }

// let chart = new Chart("#heatmap", {
//     type: 'heatmap',
//     data: data,
// })

// radius: 2, // default 0

// discreteDomains: 0, // default 1
// colors: ['#ebedf0', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e'],