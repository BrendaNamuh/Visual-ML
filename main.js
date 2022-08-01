import SVM from './models.js'; 

var curr_model;

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

options.forEach(option=>{
  option.addEventListener('click', function(event) {
  var curr_algo = event.target.innerText;
  switch(curr_algo){
    case "SVM":
      curr_model = new SVM("http://localhost:8000/classification.csv",'http://localhost:8000/SVM_DATA.csv',svg);
      curr_model.setPlot(["pink","orange"], ["0.0","1.0"],width,height,margin);
      break;

    case "Linear Regression":
      console.log("You clicked LR");
      break;
  }
  
    //selected.innerText= option.innerText;
    select.classList.remove('select-clicked');
    caret.classList.remove('caret-rotate');
    menu.classList.remove('menu-open');

    options.forEach(option=>{
      option.classList.remove('active')
    });
  })
})


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







