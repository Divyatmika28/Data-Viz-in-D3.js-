var svg3 = d3.select("#map3"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

d3.json("county_boundaries.geojson").then(function (json) {
        var projection = d3.geoMercator().fitSize([width, height], json.features[3]); 
        var path = d3.geoPath().projection(projection);

        svg3.selectAll("path")
            .data(json.features)  
            .enter()
            .append("path")
            .attr("fill", "white")
            .attr("stroke", "black")
            .attr("d", path)
            ;



d3.csv("a9data2.csv").then(function (data) {
console.log(data);

svg3.selectAll(".pin")
  .data(data)
  .enter().append("circle", ".pin")
  .attr("r", 3)
  .attr("fill", function(d) {
      
      if(d['INCIDENT TYPE'] == "ANIMAL SHOOTING INCIDENT"){
        return "red";
      }
      else if(d['INCIDENT TYPE'] == "UNINTENTIONAL DISCHARGE INCIDENT"){
          return "green"
      }
      else if(d['INCIDENT TYPE'] == "OTHER SHOOTING INCIDENT"){
          return "purple"
      }
      else{
          return "blue"
      }
      

 })
  .attr("transform", function(d) {
      
    return "translate(" + projection([
      d.APPROX_LONGITUDE,
      d.APPROX_LATITUDE
    ]) + ")";
  })
  .attr("opacity",0.5)
  .append("title")
            .text(function(d) {
        
        return("Incident Type: " + d['INCIDENT TYPE'] + "\nCity: " + d.CITY + "\nZip: " + d.ZIP);
        });


svg3.append("g")
        .selectAll("g")
        .data(json.features)
        .enter().append("text")
        .attr("class", "t3")
        .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
        .text(function(d) {return d.properties.name}); 

svg3.append("text")
.attr("fill","white")
.attr("x", 50)
.attr("y", 550)
.text("Shooting Incidents in the County of Los Angeles")
.attr("class","t1");

});

});