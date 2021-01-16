d3.csv("./assets/data/data.csv").then(function(data) {
    
    // recieve data from the csv
    console.log(data[0])
    
    data.forEach(function(data) {
        data.smokes = +data.smokes
        data.age = +data.age
        data.abbr = data.abbr
    })
    


    var svgWidth = 960;
    var svgHeight = 500;

    var margin = {
        top: 20,
        right: 40,
        bottom: 80,
        left: 100
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var chosenXAxis = "age";
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.age)*.8, 
            d3.max(data, d  => d.age)*1.2
        ])
        .range([0,width]);

    // Create y scale function
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.smokes)])
        .range([height, 0]);
      
    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // append y axis
    chartGroup.append("g")
        .call(leftAxis);

    chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", 11)
        .attr("fill", "grey")
        .attr("opacity", ".75")
        .attr("stroke", "black")
    
    chartGroup.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d,i) => xLinearScale(d.age))
        .attr("y", d => (yLinearScale(d.smokes-0.28)))
        .classed("stateText", true)
        .text(d => d.abbr)
        .attr("font-size", 10)
        
    
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - (margin.left/2))
        .attr("x", 0- (height/1.75))
        .attr("dy", "1em")
        .classed("axis-text", true)
        .text("Age (median)");

    chartGroup.append("text")
        .attr("x", margin.left*3.3)
        .attr("y", height+30)
        .attr("dy", "1em")
        .classed("axis-text", true)
        .text("Smokes (%)");
})
