var svg2 = d3.select("#map2"),
        width = +svg2.attr("width"),
        height = +svg2.attr("height");

svg2.append("text")
.attr("x", 20)
.attr("y", 430)
.attr("fill","white")
.text("No of villages in 1960")
.attr("class","t1");

var data = d3.map();
var colorScheme = d3.schemeReds[6];
colorScheme.unshift("#eee")
var colorScale = d3.scaleThreshold()
    .domain([2000, 6000, 11000, 15000, 25000, 30000])
    .range(colorScheme);


var g = svg2.append("g")
    .attr("class", "legendThreshold")
    .attr("transform", "translate(20,470)");
g.append("text")
    .attr("class", "caption")
    .attr("fill","white")
    .attr("x", 0)
    .attr("y", -6)
    .text("No. of Villages in 1960");
var labels = ['0', '2000-5999', '6000-10999', '11000-14999', '15000-24999', '25000-29999', '> 30000'];
var legend = d3.legendColor()
    .labels(function (d) { return labels[d.i]; })
    .shapePadding(4)
    .scale(colorScale);
svg2.select(".legendThreshold")
    .call(legend);

  d3.json("world-110m.geojson").then(function (json) {
        var projection = d3.geoMercator().fitSize([width, height], json); 
        var path = d3.geoPath().projection(projection);

d3.csv("a9data.csv", function (d) { 
return { 
Country: d.Country, 
Villages: +d.Villages
};
}).then(function (data) {
console.log(data[0].Villages);

    var iter = 0;
    var iter2 = 0;

   
    svg2.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(json.features)
        .enter().append("path")
            .attr("fill", function (d){
            
                if(d.properties.name == "Afghanistan"){
                    return colorScale(data[0].Villages);
                }
                else if(d.properties.name == "Albania"){
                    return colorScale(data[1].Villages);
                }
                else if(d.properties.name == "Australia"){
                    return colorScale(data[2].Villages);
                }
                else if(d.properties.name == "Austria"){
                    return colorScale(data[3].Villages);
                }
                else if(d.properties.name == "Bangladesh"){
                    return colorScale(data[4].Villages);
                }
                else if(d.properties.name == "Bulgaria"){
                    return colorScale(data[5].Villages);
                }
                else if(d.properties.name == "Chile"){
                    return colorScale(data[6].Villages);
                }
                else if(d.properties.name == "Colombia"){
                    return colorScale(data[7].Villages);
                }
                else if(d.properties.name == "Costa Rica"){
                    return colorScale(data[8].Villages);
                }
                else if(d.properties.name == "Algeria"){
                    return colorScale(data[9].Villages);
                }
                else{
                    return colorScale(0);
                }
                
            })
            .attr("stroke", "black")
            .attr("d", path)
            .append("title")
            .text(function(d) {
       
        return(d.properties.name == "Afghanistan" 
            || d.properties.name == "Albania" 
            || d.properties.name == "Australia" || d.properties.name == "Austria"
            || d.properties.name == "Bangladesh" || d.properties.name == "Bulgaria"
            || d.properties.name == "Chile" || d.properties.name == "Colombia"
            || d.properties.name == "Costa Rica" 
            || d.properties.name == "Algeria" ? 
            d.properties.name + "\nVillages " + formatNumber(data[iter2++].Villages) : "");
        });
        

        svg2.append("g")
        .selectAll("g")
        .data(json.features)
        .enter().append("text")
        .attr("fill","white")
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

