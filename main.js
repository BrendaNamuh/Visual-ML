import SVM from './models.js'; 

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

var curr_model;

/*var curr_algo = ""
var coeff = [];
var xScale = d3.scaleLinear();
var yScale = d3.scaleLinear();*/




//Dropdown options
const dropdown = document.querySelector('.dropdown');

//Get inner elements
const select = dropdown.querySelector('.select');
const caret = dropdown.querySelector('.caret');
const menu = dropdown.querySelector('.menu');
const options = dropdown.querySelectorAll('.menu li');
const selected = dropdown.querySelectorAll('.selected');

//
select.addEventListener('click', ()=> {
  select.classList.toggle('select-clicked');
  caret.classList.toggle('caret-toggle');
  menu.classList.toggle('menu-open');
});

//document.getElementById("custom-slider").addEventListener("input",function(event){
options.forEach(option=>{
  option.addEventListener('click', function(event) {
  var curr_algo = event.target.innerText;
  switch(curr_algo){
    case "SVM":
      curr_model = new SVM("http://localhost:8000/classification.csv",'http://localhost:8000/SVM_DATA.csv',svg);
      curr_model.setPlot(["pink","orange"], ["0.0","1.0"],width,height,margin);


    case "Linear Regression":
      console.log("You clicked LR")

  }
  /*
    if (event.target.innerText =="Linear Regression") {
      
      setup_graph(algorithm ="Linear Regression", data_filename = "http://localhost:8000/PortlandHousePrices.csv");
      plot_model(algorithm ="Linear Regression", coefficients_filename='LR_DATA.csv');
    }
    else{
      setup_graph(algorithm ="SVM", data_filename = "http://localhost:8000/classification.csv",domain_x=[0,50],domain_y=[0,100]) ;
      plot_model(algorithm ="SVM",coefficients_filename='http://localhost:8000/SVM_DATA.csv');
    }*/


    //selected.innerText= option.innerText;
    select.classList.remove('select-clicked');
    caret.classList.remove('caret-rotate');
    menu.classList.remove('menu-open');

    options.forEach(option=>{
      option.classList.remove('active')
    });
  })
})



//function setup_graph(algorithm , data_filename,domain_x,domain_y){
//let filename = 'http://localhost:8000/classification.csv';


//svg.append("line").attr("x1", 0).attr("x2", height/2)
//.attr("y1", height).attr("y2", 0);
// X axis 
/*
var xScale = d3.scaleLinear()
  .domain([domain_x[0], domain_x[1]])
  .range([0, width - margin.left - margin.right]);
svg
  .append('g')
  .attr("transform", "translate(0,"+660+")")
  .call(d3.axisBottom(xScale));

// Y axis 
var yScale = d3.scaleLinear()
  .domain([domain_y[0], domain_y[1]])
  .range([height  - margin.top - margin.bottom, 0]);
svg
  .append('g')
  .call(d3.axisLeft(yScale));

//Read Data
  d3.csv( data_filename, function(data){ 
  
    switch(algorithm){
      case "Linear Regression":
        
      case "SVM":
        var zeros = []
        var ones = []
        //Convert datapoints to array 
        for (var i = 0;i<data.length; i++){
          if (data[i].success == 0.0){
            zeros.push([data[i].age, data[i].interest]);
          }
          else{ones.push([data[i].age, data[i].interest]);}
        } 
        //Plot Datapoints
        svg.append('g')
        .selectAll("dot")
        .data(zeros)
        .enter()
        .append("circle")
          .attr("cx", function (d) {  return xScale(d[0]) } ) // d refers to dataset specified in .data
          .attr("cy", function (d) { return yScale(d[1])} )// goes row by row plotting intrest column of row
          .attr("r", 5)
          .style("fill", "#95c2a1");

        svg.append('g')
          .selectAll("dot")
          .data(ones)
          .enter()
          .append("circle")
          .attr("cx", function (d) {  return xScale(d[0]) } ) // d refers to dataset specified in .data
          .attr("cy", function (d) { return yScale(d[1])} )// goes row by row plotting intrest column of row
          .attr("r", 5)
          .style("fill", "pink");
  }
});
*/
//}

    
    



    
      
  
      /*
      svg.append('line')
      .attr('x1',xScale(0))
      .attr('x2',xScale(45))
      .attr('y1',yScale(0))
      .attr('y2',yScale(0))
      .attr("stroke-width", 3)
      .attr("stroke", "#5c8065")
      .attr("id", "id");*/
      
  //});
  
/*

function plot_model(algorithm, coefficients_filename){


  switch(algorithm){
    case "Linear Regression":



    case "SVM":
      /*Fill array *//*
      d3.csv(coefficients_filename, function(data){   
        for (var i =0; i<data.length; i++){
          coeff.push([ data[i].w1, data[i].w2, data[i].b ]);
        }
      });
  }



}
*/


/*function getMetrics(algo, val){
  switch(algo){
    case "Linear Regression":
      return [9,9]
    case "SVM":
      return[`${parseFloat(coeff[val][0]).toFixed(0)}x1 + ${parseFloat(coeff[val][1]).toFixed(0)}x2 - ${parseFloat(coeff[val][2]).toFixed(0)} = 0`,
      `${parseFloat(coeff[val][2]).toFixed(0)}`];
  
  }    
}


function updateLine(algo,val){
  switch(algo){
    case "Linear Regression":


    case "SVM":
      let w1 = parseFloat(coeff[val][0]).toFixed(2);
      let w2 = parseFloat(coeff[val][1]).toFixed(2);
      let b = parseFloat(coeff[val][2]).toFixed(2);
      //console.log("This is m "+ w1)
      //console.log("This is b "+ b)
      y1 = (b/w2); y1 = parseFloat(y1).toFixed(2);
      y2 = (b - (w1*45))/w2; y2  = parseFloat(y2).toFixed(2);
      //console.log("This is y1 "+ y1);
      //console.log("This is y2 "+ y2);
      return [y1,y2];
  }
}*/


/*Initialize equation and cost values */
const equation_box = document.querySelector("#equation-container");
const cost_box = document.querySelector("#cost-container");
equation_box.innerHTML = 0;
cost_box.innerText = 0; 

/*SLIDER BLOCK*/ 
document.getElementById("custom-slider").addEventListener("input",function(event){
  
  let value = event.target.value;
  //document.getElementById("current-value").innerText = value;
  console.log(curr_model.getMetrics(value)[0]);
  equation_box.innerText = curr_model.getMetrics(value)[0];
  cost_box.innerText = curr_model.getMetrics(value)[1];//`${parseFloat(coeff[value][2]).toFixed(0)}`;
  
  

  document.getElementById("current-value").classList.add("active");
  equation_box.classList.add("active");
  cost_box.classList.add("active");
  document.getElementById("current-value").style.left = `${value}%`;  //Q1 WHAT DOES THIS MEAN

 
  
   
   d3.select("#id").remove();
   svg.append('line')
   .attr('x1',curr_model.xScale(0))
   .attr('x2',curr_model.xScale(45))
   .attr('y1',(curr_model.yScale(curr_model.updateLine(value)[0])).toString())
   .attr('y2',(curr_model.yScale(curr_model.updateLine(value)[1])).toString() )
   .attr("stroke-width", 3)
   .attr("stroke", "#5c8065")
   .attr("id", "id");



});





/*});*/






