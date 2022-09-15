class Model{
    constructor(scatterPointFile,coefficientFile,svg){
        this.scatterPointFile  = scatterPointFile;
        this.coefficientFile = coefficientFile;
        this.svg = svg;
        this.xdomain = [0,0];
        this.ydomain = [0,0];
        this.xScale ;
        this.yScale ;
        var coeff = [] ;
      console.log("HERE");



        
        // Fill Coefficients 
        var a = d3.csv(this.coefficientFile, function(data){  
            for (var i =0; i<data.length; i++){
            coeff.push(data[i]);
                
        
                
            }
            
        });
      
        console.log(coeff);
       
        this.coeff = coeff;
       
        console.log(this.coeff);
   
       
    }
    

    
    
    
    UnicolourScatter(width,height,margin,svg){
        svg.selectAll("*").remove();
      
        var xScale = d3.scaleLinear();
        var yScale = d3.scaleLinear();

        d3.csv( this.scatterPointFile, function(data){ 
            

            //Determine Domains
            var xdomain = d3.extent(data, function(d) { return parseInt(d.Size); });
            xdomain = [Math.min(0,xdomain[0]), Math.ceil(xdomain[1]/5)*5 ];
            var ydomain = d3.extent(data, function(d) { return parseInt(d.Price); });
            ydomain = [Math.min(0,ydomain[0]), Math.ceil(ydomain[1]/10000)*10000 ];
            console.log(ydomain);

           
            
            //Get Labels
            var xAxisLabel = d3.keys(data[0])[0];
            var yAxisLabel = d3.keys(data[0])[2];


            // Setting up the X and Y axis
            xScale  
            .domain([xdomain[0], xdomain[1]])
            .range([0, width - margin.left - margin.right]);
            svg.append('g') // X axis 
            .attr("transform", "translate(0,"+660+")")
            .call(d3.axisBottom(xScale)); 
            //X label
            svg.append("text") 
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width - margin.left - margin.right)
            .attr("y", height -10)
            .text(xAxisLabel);

            
            yScale 
            .domain([ydomain[0], ydomain[1]])
            .range([height  - margin.top - margin.bottom, 0]);
            svg.append('g') // Y axis 
            .call(d3.axisLeft(yScale)); 
            //Y label
            svg.append("text")  
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", -60)
            .attr("transform", "rotate(-90)")
            .text(yAxisLabel);
            
            
            // Add Scatter Dots
            svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
                .attr("cx", function (d) {  return xScale(d.Size) } )
                .attr("cy", function (d) { return yScale(d.Price)} )
                .attr("r", 5)
                .style("fill", "#95c2a1");

            
            svg.append('line')
            .attr('x1',xScale(xdomain[0]))
            .attr('x2',xScale(xdomain[1]))
            .attr('y1',yScale(ydomain[0]))
            .attr('y2',yScale(ydomain[0]))
            .attr("stroke-width", 3)
            .attr("stroke", "#5c8065")
            .attr("id", "id");


        });
        this.xScale = xScale;
        this.yScale = yScale;
    
    }

    
    MulticolourScatter(colours, categories,width,height,margin,svg){
        svg.selectAll("*").remove();
       
        let coordinates = {};
        categories.forEach((cat)=> coordinates[cat] = []);
        var xScale = d3.scaleLinear();
        var yScale = d3.scaleLinear();

        //CSV to Array
        d3.csv( this.scatterPointFile, function(data){ 
            
           
            //data is an array where each row is an object. Learn more about how to parse this row/object 
            for (var i = 0;i<data.length; i++){
                var curr_cat =  data[i].success; //SPECIFIC TO scatterPointFile = "http://localhost:8000/classification.csv"
                coordinates[curr_cat].push([data[i].Age, data[i].Interest]); //SPECIFIC TO scatterPointFile = "http://localhost:8000/classification.csv"
              } 
              
            //Determine Domains
            var xdomain = d3.extent(data, function(d) { return parseInt(d.Age); });
            xdomain = [Math.min(0,xdomain[0]), Math.ceil(xdomain[1]/5)*5 ];
            var ydomain = d3.extent(data, function(d) { return parseInt(d.Interest); });
            ydomain = [Math.min(0,ydomain[0]), Math.ceil(ydomain[1]/5)*5 ];
            
             
            //Get Labels
            var xAxisLabel = d3.keys(data[0])[0];
            var yAxisLabel = d3.keys(data[0])[2];


            // Setting up the X and Y axis
            xScale  
            .domain([xdomain[0], xdomain[1]])
            .range([0, width - margin.left - margin.right]);
            svg.append('g') // X axis 
            .attr("transform", "translate(0,"+660+")")
            .call(d3.axisBottom(xScale)); 
            //X label
            svg.append("text") 
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width - margin.left - margin.right)
            .attr("y", height -10)
            .text("Interest");

            
            yScale 
            .domain([ydomain[0], ydomain[1]])
            .range([height  - margin.top - margin.bottom, 0]);
            svg.append('g') // Y axis 
            .call(d3.axisLeft(yScale)); 
            //Y label
            svg.append("text")  
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", -60)
            .attr("transform", "rotate(-90)")
            .text("Age");
           
            

            for (var i =0;i<categories.length;i++){
                //Plot Datapoints
                svg.append('g')
                .selectAll("dot")
                .data(coordinates[categories[i]])
                .enter()
                .append("circle")
                .attr("cx", function (d) {  return xScale(d[0]) } ) // d refers to dataset specified in .data
                .attr("cy", function (d) { return yScale(d[1])} )// goes row by row plotting intrest column of row
                .attr("r", 5)
                .style("fill", colours[i]);
            }
            svg.append('line')
            .attr('x1',xScale(xdomain[0]))
            .attr('x2',xScale(xdomain[1]))
            .attr('y1',yScale(ydomain[0]))
            .attr('y2',yScale(ydomain[0]))
            .attr("stroke-width", 3)
            .attr("stroke", "#5c8065")
            .attr("id", "id");

    });
    this.xScale = xScale;
    this.yScale = yScale;

    }

    
}
export class SVM extends Model{

    constructor(scatterPointFile,coefficients_filename,svg){
        super(scatterPointFile,coefficients_filename,svg);
    }
    setPlot(colours, categories,width,height,margin){
        super.MulticolourScatter(colours, categories,width,height,margin,this.svg);
    }

    getMetrics(val){
        return[`${parseFloat(this.coeff[val].w1).toFixed(0)} X₁ + ${parseFloat(this.coeff[val].w2).toFixed(0)} X₂ - ${parseFloat(this.coeff[val].b).toFixed(2)} = 0`,
        `${(this.coeff[val].cost).toExponential(1)}`]; //Should this not be this.coeff[val][3]
    }
    updateLine(val){
    
        let w1 = parseFloat(this.coeff[val].w1).toFixed(2);
        let w2 = parseFloat(this.coeff[val].w2).toFixed(2);
        let b = parseFloat(this.coeff[val].b).toFixed(2);
        var y1 = (b/w2) || 0; y1 = parseFloat(y1).toFixed(2);
        //console.log(y1);
        var y2 = (b - (w1*45))/w2 || 0; y2  = parseFloat(y2).toFixed(2);
        return [y1,y2];
    }
      
      

    
}
export class LinearRegression extends Model{

    constructor(scatterPointFile,coefficients_filename,svg){
        super(scatterPointFile,coefficients_filename,svg);
    }

    setPlot(width,height,margin){
        super.UnicolourScatter(width,height,margin,this.svg);     
    }

    getMetrics(val){
        
        /*return[`${parseFloat(this.coeff[val].m).toFixed(1)} X + ${parseFloat(this.coeff[val].b).toFixed(1)}`,
        `${parseFloat(this.coeff[val].cost).toFixed(0)}`];*/
        return [`${parseFloat(this.coeff[val].m1).toFixed(0)}x + ${parseFloat(this.coeff[val].b).toFixed(2)}`,
        `${(this.coeff[val].cost).toExponential(1)}`]
    }

    updateLine(val){
        
    
        /*let m = parseFloat(this.coeff[val].m).toFixed(2);
        //let w2 = parseFloat(this.coeff[val][1]).toFixed(2);
        let b = parseFloat(this.coeff[val].b).toFixed(2);
        console.log(b);
        var y1 = b || 0; y1 = parseFloat(y1).toFixed(2);
        
        var y2 = (m*10)+b|| 0; y2  = parseFloat(y2).toFixed(2);
        console.log(y1);
        return [y1,y2];*/
        console.log(this.coeff[val]);
        console.log("eheiuhfiuehr");
        console.log(this.coeff[val].m1);
        let m1 = parseFloat(this.coeff[val].m1).toFixed(2);
  let m2 = parseFloat(this.coeff[val].m2).toFixed(2);
  let b = parseFloat(this.coeff[val].cost).toFixed(2);
  console.log("This is m "+ m1)
  console.log("This is m2 "+ m2)
  console.log("This is b "+ b)
  console.log(parseFloat((m1*1)+(m2*1)+b).toFixed(2));
  //y1 = (m1*1)+(m2*1)+b; 
  //y1 = parseFloat(y1).toFixed(2);
  //y1 = parseFloat((m1*1)+(m2*1)+b).toFixed(2);
  //y2 = (m1*4500)+(m2*5)+b;
  //y2 = parseFloat(y2).toFixed(2);
  
  //console.log("This is y1 "+ y1);
  //console.log("This is y2 "+ y2);
  return [parseFloat((m1*1)+(m2*1)+b).toFixed(2), parseFloat((m1*4500)+(m2*5)+b).toFixed(2)];
    }

    


}

