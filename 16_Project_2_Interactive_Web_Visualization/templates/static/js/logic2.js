var dataCalifornia = "clean_covid_df.csv";


// var holder = {};

// dataCalifornia.forEach(function(d) {
//   if (holder.hasOwnProperty(d.date)) {
//     holder[d.date] = holder[d.date] + d.cases;
//   } else {
//     holder[d.date] = d.cases;
//   }
// });

// var obj2 = [];

// for (var prop in holder) {
//   obj2.push({ date: prop, cases: holder[prop] });
// }

// console.log(obj2);


let heatmap = new frappe.Chart("#heatmap", {
	type: 'heatmap',
	title: "California COVID cases for the Year 2020 ",
	data: {
	dataPoints: {
		'1524064033': 8, /* ... */},
						// object with timestamp-value pairs
		start: startDate,
		end: endDate      // Date objects
    },
    radius: 2, //default 0 
	countLabel: 'Level',
	discreteDomains: 0,  // default: 1
	colors: ['#ebedf0', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e'],
				// Set of five incremental colors,
				// preferably with a low-saturation color for zero data;
				// def: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']
  });