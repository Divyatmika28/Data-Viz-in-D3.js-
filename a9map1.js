
var radius = d3.scaleSqrt().domain([0, 30000]).range([0, 30]);
var formatNumber = d3.format(",.0f");
var svg = d3.select("#map1"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

svg.append("text")
.attr("fill","white")
.attr("x", 20)
.attr("y", 490)
.text("No. of villages in 1960")
.attr("class","t1")
;


svg.append("text")

.attr("fill","white")
.attr("x", 110)
.attr("y", 525)
.text("Legend")
.attr("class","t4");


var legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(" + (width - 850) + "," + (height - 5) + ")")
  .selectAll("g")
    .data([5000, 10000, 30000])
  .enter().append("g");
legend.append("circle")
    .attr("cy", function(d) { return -radius(d); })
    .attr("r", radius);
legend.append("text")
    .attr("y", function(d) { return -2 * radius(d); })
    .attr("dy", "1.3em")
    .text(d3.format(".1s"));

d3.json("world-110m.geojson").then(function (json) {
        var projection = d3.geoMercator().fitSize([width, height-5], json); 
        var path = d3.geoPath().projection(projection);

d3.csv("a9data.csv", function (d) { 
return { 
Country: d.Country, 
Villages: +d.Villages
};
}).then(function (data) {
console.log(data);

        svg.selectAll("path")
            .data(json.features)  
            .enter()
            .append("path")
            .attr("fill", "white")

            .attr("stroke", "black")
            .attr("d", path)
            ;  
        
    var iter = 0;
    var iter2 = 0;
    svg.append("g")
      .attr("class", "bubble")
        .selectAll("circle")
        .data(json.features)
        .enter().append("circle")
        .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("r", function(d) { return (d.properties.name == "Afghanistan" 
            || d.properties.name == "Albania" 
            || d.properties.name == "Australia" || d.properties.name == "Austria"
            || d.properties.name == "Bangladesh" || d.properties.name == "Bulgaria"
            || d.properties.name == "Chile" || d.properties.name == "Colombia"
            || d.properties.name == "Costa Rica" 
            || d.properties.name == "Algeria" ? ((data[iter++].Villages)/1600)+2.5 : 0); })
      .append("title")
      .text(function(d) {
          
        return(d.properties.name == "Afghanistan" 
            || d.properties.name == "Albania" 
            || d.properties.name == "Australia" || d.properties.name == "Austria"
            || d.properties.name == "Bangladesh" || d.properties.name == "Bulgaria"
            || d.properties.name == "Chile" || d.properties.name == "Colombia"
            || d.properties.name == "Costa Rica" 
            || d.properties.name == "Algeria" ? 
            d.properties.name + "\nVillages: " + formatNumber(data[iter2++].Villages) : "");
        });
        

        svg.append("g")
        .selectAll("g")
        .data(json.features)
        .enter().append("text")
        .attr("class", "t2")
        .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
        .text(function(d) {return(d.properties.name == "Afghanistan" 
            || d.properties.name == "Albania" 
            || d.properties.name == "Australia" || d.properties.name == "Austria"
            || d.properties.name == "Bangladesh" || d.properties.name == "Bulgaria"
            || d.properties.name == "Chile" || d.properties.name == "Colombia"
            || d.properties.name == "Costa Rica" 
            || d.properties.name == "Algeria" ? 
            d.properties.name : "");
            });

        
 });    
    });