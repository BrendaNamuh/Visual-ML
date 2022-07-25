let filename = 'http://localhost:8000/Salary_Data.csv';

// set the dimensions and margins of the graph 10,30,30,60
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 700 ,
    height = 700 ;
    

// append the svg object to the body of the page
var svg = d3.select("#chart-container")
  .append("svg")
    .attr("width", width )
    .attr("height", height)
    .style("background", "#ffff");
svg = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
svg.append("line").attr("x1", 0).attr("x2", height/2)
.attr("y1", height).attr("y2", 0);

//Read Data
d3.csv(filename, function(data){ 
  
  // X axis 
  var xScale = d3.scaleLinear()
    .domain([0, 15])
    .range([0, width - margin.left - margin.right]);
    //console.log(width - margin.left - margin.right);
  svg
    .append('g')
    .attr("transform", "translate(0,"+660+")")
    .call(d3.axisBottom(xScale));

  // Y axis 
  var yScale = d3.scaleLinear()
    .domain([0, 150000])
    .range([height  - margin.top - margin.bottom, 0]);
    //console.log(height  - margin.top - margin.bottom)
    
    
  svg
    .append('g')
    .call(d3.axisLeft(yScale));


  // Add Scatter Dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) {  return xScale(d.Years) } )
      .attr("cy", function (d) { return yScale(d.Salary)} )
      .attr("r", 5)
      .style("fill", "#95c2a1");

    
    svg.append('line')
    .attr('x1',xScale(0))
    .attr('x2',xScale(14))
    .attr('y1',yScale(0))
    .attr('y2',yScale(0))
    .attr("stroke-width", 3)
    .attr("stroke", "#5c8065")
    .attr("id", "id");
    
//});
  




/* Reading the COEFFS*/
var linearFile = 'http://localhost:8000/LR_DATA.csv'
var coeff = [];

/*Fill array */
d3.csv(linearFile, function(data){ 
  for (var i =0; i<data.length; i++){
    coeff.push([ data[i].m, data[i].b ]);
  }
});


function getLinearEquation(val){
  return `${coeff[val][0]}x + ${coeff[val][1]}`
}

function updateLine(val){
  let m = parseFloat(coeff[val][0]).toFixed(2);
  let b = parseFloat(coeff[val][1]).toFixed(2);
  console.log("This is m "+ m)
  console.log("This is b "+ b)
  y1 = (m*1)+b;
  y2 = (m*14)+b;
  console.log("This is y1 "+ parseFloat(y1).toFixed(2));
  console.log("This is y2 "+ parseFloat(y2).toFixed(2));
  return [parseFloat(y1).toFixed(2),parseFloat(y2).toFixed(2)];
}


/*Initialize equation and cost values */
const equation_box = document.querySelector("#equation-container");
const cost_box = document.querySelector("#cost-container");
equation_box.innerHTML = 0;
cost_box.innerText = 0;

/*SLIDER BLOCK*/ 
document.getElementById("custom-slider").addEventListener("input",function(event){
  
  let value = event.target.value;
  document.getElementById("current-value").innerText = value;
  cost_box.innerText = value;
  equation_box.innerText = getLinearEquation(value);
  

  document.getElementById("current-value").classList.add("active");
  equation_box.classList.add("active");
  cost_box.classList.add("active");
  document.getElementById("current-value").style.left = `${value}%`;  //Q1 WHAT DOES THIS MEAN

 
  
   
   d3.select("#id").remove();
   svg.append('line')
   .attr('x1',xScale(0))
   .attr('x2',xScale(14))
   //.attr('y1',yScale(1))
   //.attr('y2',yScale(5))
   //console.log(yScale(updateLine(value)[0]))
   //console.log(updateLine(value)[1])
   .attr('y1',(yScale(updateLine(value)[0])).toString())
   //console.log(typeof parseFloat(yScale(updateLine(value)[1])).toFixed(0).toString() )
   //console.log( updateLine(value)[0])
   //console.log(typeof updateLine(value)[1])
   //console.log(updateLine(value)[1])
   //console.log(parseFloat(yScale(updateLine(value)[1])).toFixed(0).toString())
   .attr('y2',parseFloat(yScale(updateLine(value)[1])).toFixed(0).toString() )
   //console.log(parseFloat(yScale(updateLine(value)[1])).toFixed(0).toString())
   //.attr('y1', yScale("1"))
   //.attr('y2', yScale("100000"))
   .attr("stroke-width", 3)
   .attr("stroke", "#5c8065")
   .attr("id", "id");



});





});






