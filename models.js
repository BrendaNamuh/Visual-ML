class Model{
    constructor(scatterPointFile,coefficientFile,svg){
        this.scatterPointFile  = scatterPointFile;
        this.coefficientFile = coefficientFile;
        this.svg = svg;
        this.xdomain = [0,0];
        this.ydomain = [0,0];
        this.xScale ;
        this.yScale ;
        var coeff =  [];
        
        // Fill Coefficients 
        d3.csv(this.coefficientFile, function(data){   
            
            for (var i =0; i<data.length; i++){
                coeff.push([ data[i].w1, data[i].w2, data[i].b ]);
            }
          });
        this.coeff = coeff;
    }

    
    // Plot Scatter dots
    UnicolourScatter(){

    }

    
    MulticolourScatter(colours, categories,width,height,margin,svg){
        let coordinates = {};
        categories.forEach((cat)=> coordinates[cat] = []);
        var xScale = d3.scaleLinear();
        var yScale = d3.scaleLinear();

        //CSV to Array
        d3.csv( this.scatterPointFile, function(data){ 
            
           
            //data is an array where each row is an object. Learn more about how to parse this row/object 
            for (var i = 0;i<data.length; i++){
                var curr_cat =  data[i].success; //SPECIFIC TO scatterPointFile = "http://localhost:8000/classification.csv"
                coordinates[curr_cat].push([data[i].age, data[i].interest]); //SPECIFIC TO scatterPointFile = "http://localhost:8000/classification.csv"
              } 
              
            //Determine Domains
            var xdomain = d3.extent(data, function(d) { return parseInt(d.age); });
            xdomain = [Math.min(0,xdomain[0]), Math.ceil(xdomain[1]/5)*5 ];
            var ydomain = d3.extent(data, function(d) { return parseInt(d.interest); });
            ydomain = [Math.min(0,ydomain[0]), Math.ceil(ydomain[1]/5)*5 ];
            
             
            // Determine Axis
            xScale 
                .domain([xdomain[0], xdomain[1]])
                .range([0, width - margin.left - margin.right]);
           
            
            svg
            .append('g')
            .attr("transform", "translate(0,"+660+")")
            .call(d3.axisBottom(xScale));

            // Y axis 
            yScale 
                .domain([ydomain[0], ydomain[1]])
                .range([height  - margin.top - margin.bottom, 0]);
        
            
            svg
            .append('g')
            .call(d3.axisLeft(yScale));

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

export default class SVM extends Model{

    constructor(scatterPointFile,coefficients_filename,svg){
        super(scatterPointFile,coefficients_filename,svg);
    }
    setPlot(colours, categories,width,height,margin){
        super.MulticolourScatter(colours, categories,width,height,margin,this.svg);
    }

    getMetrics(val){
        return[`${parseFloat(this.coeff[val][0]).toFixed(0)}x1 + ${parseFloat(this.coeff[val][1]).toFixed(0)}x2 - ${parseFloat(this.coeff[val][2]).toFixed(0)} = 0`,
        `${parseFloat(this.coeff[val][2]).toFixed(0)}`];
    }
    updateLine(val){
    
        let w1 = parseFloat(this.coeff[val][0]).toFixed(2);
        let w2 = parseFloat(this.coeff[val][1]).toFixed(2);
        let b = parseFloat(this.coeff[val][2]).toFixed(2);
        var y1 = (b/w2) || 0; y1 = parseFloat(y1).toFixed(2);
        console.log(y1);
        var y2 = (b - (w1*45))/w2 || 0; y2  = parseFloat(y2).toFixed(2);
        return [y1,y2];
    }
      
      

    
}

class LinearRegression extends Model{}