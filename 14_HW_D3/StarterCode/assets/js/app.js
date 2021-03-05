function makeResponsive() {
    var svgArea = d3.select("#scatter").select("svg");
  
    // clear svg 
    if (!svgArea.empty()) {
      svgArea.remove();
    }
  
    var svgWidth = 800;
    var svgHeight = 400;
  
    var margin = {
      top: 20,
      right: 40,
      bottom: 60,
      left: 100
  };
  
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
  

  //---------------------------------------------------------------------  
  // Create an SVG wrapper, append SVG that holds the chart
  
    var svg = d3.select("#scatter")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
  
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    // Call data
    d3.csv("/assets/data/data.csv").then(function(features) {
  
      // Parse data
      features.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        data.abbr = +data.abbr;
  
      });
  
      // Create scale functions
      var xLinearScale = d3.scaleLinear()
        .domain([d3.min(features, d => d.poverty), d3.max(features, d => d.poverty)])
        .range([0, width]);
  
      var yLinearScale = d3.scaleLinear()
        .domain([d3.min(features, d => d.healthcare), d3.max(features, d => d.healthcare)])
        .range([height, 0]);
  
      // Create axis functions
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);
  
      // Append Axes to the chart
      chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
  
      chartGroup.append("g")
        .call(leftAxis);
  
       // Create Circles
      var circlesGroup = chartGroup.selectAll("circle")
      .data(features)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", "10")
      .attr("fill", "lightpink")
      .attr("opacity", ".4");
  
      // Create labels
      chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("axisText", true)
        .text("Lacks Healthcare (%)");
  
      chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .classed("axisText", true)
        .text("In Poverty (%)");
  
      // Initialize tooltip
      var toolTip = d3.tip()
        .attr("id", "tooltip")
        .offset([80, -60])
        .html(function(d) {
          return (`${data.abbr}<br>poverty: ${d.poverty}<br>healthcare: ${d.healthcare}`);
        });
  
      // Call tooltip in the chart
      chartGroup.call(toolTip);
  
      // Create event listeners to display and hide the tooltip
      circlesGroup.on("click", function(data) {
        toolTip.show(data, this);
      })
        // mouseout event
        .on("mouseout", function(data) {
          toolTip.hide(data);
        });
  
    }).catch(function(error) {
      console.log(error);
    });
  }
  
  // Call makeResponsive()
  makeResponsive();
