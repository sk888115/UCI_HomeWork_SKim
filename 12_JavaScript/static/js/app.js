// from data.js
var tableData = data;

// select tbody 
tbody = d3.select("tbody")


// loop through the table
function displayData(ufo){ 
    tbody.text("")
    ufo.forEach(function(ufo_sighting){
    new_tr = tbody.append("tr")
    Object.entries(ufo_sighting).forEach(function([key, value]){
        new_td = new_tr.append("td").text(value)	
    })
})}

// display the data
displayData(tableData)

//---------------------------------------------------

// submit button
var submit = d3.select("#submit");


submit.on("click", function() {
    // // check submit button
    // console.log("submit button test")

    
  // Prevent page refresh
  d3.event.preventDefault();

//---------------------------------------------------


  // Select the input 
  var dateInput = d3.select("#datetime");
  var cityInput = d3.select("#city");
  var stateInput = d3.select("#state");
  var countryInput = d3.select("#country");
  var shapeInput = d3.select("#shape");
  var commentInput = d3.select("#comment");

  
  var filtered = tableData.filter(ufo_sighting =>{
  return (ufo_sighting.datetime===dateInput.property("value") || !dateInput.property("value") ) && 
            (ufo_sighting.city===cityInput.property("value") || !cityInput.property("value")) &&
            (ufo_sighting.state===stateInput.property("value") || !stateInput.property("value")) &&
            (ufo_sighting.country===countryInput.property("value") || !countryInput.property("value")) &&
            (ufo_sighting.shape===shapeInput.property("value") || !shapeInput.property("value")) &&
            (ufo_sighting.shape===commentInput.property("value") || !commentInput.property("value"))

 })


 displayData(filtered);


});


//---------------------------------------------------


var clearButton = d3.select("#clear");

// Clear button
clearButton.on('click', function () {
    // check clear button 
    // console.log("testing clear button")

    // prevent page refresh
    d3.event.preventDefault();

    // Clears input field
    clearEntries()
});


//---------------------------------------------------

// variable that selects all form-control class
var filterInputs = d3.selectAll('.form-control');


// Clears input fields
function clearEntries() {
    filters = {};

    filterInputs._groups[0].forEach(entry => {
        if (entry.value != 0) {
            d3.select('#' + entry.id).node().value = "";
        }
    });
};