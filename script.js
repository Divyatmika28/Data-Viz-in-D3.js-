// 
// bubble chart
d3.json("bubbledata.json").then(function(data) {
    var svgWidth = 600,
      svgHeight = 600;
    var width = svgWidth - 0,
      height = svgHeight - 0;
  
    // Creates a new pack layout with the default settings
    var pack = data => d3.pack()
      .size([width, height])
      .padding(3)
      (d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value))
  

    var color = d3.schemeBlues[4];
    //var color = d3.scaleLinear()
                  //  .domain([0, 5])
                    //.range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
                    //.interpolate(d3.interpolateHcl)
  
    const root = pack(data);
    let focus = root;
    let view;
    console.log("bubbledata: ", root);
  
    const svg = d3.select(".bubblechart").append("svg")
      // .attr("width", svgWidth)
      // .attr("height", svgHeight)
      .attr("viewBox", `-${svgWidth / 2} -${svgHeight / 2} ${svgWidth} ${svgHeight}`)
      .style("background", color[0])
      .style("cursor", "pointer")
      .on("click", () => zoom(root));
  
    const node = svg.append("g")
      .selectAll("circle")
      .data(root.descendants().slice(1))
      .join("circle")
      .attr("fill", d => d.children ? color[d.depth] : "white")
      .attr("pointer-events", d => !d.children ? "none" : null)
      .on("mouseover", function() { d3.select(this).attr("stroke", "grey"); })
      .on("mouseout", function() { d3.select(this).attr("stroke", null); })
      .on("click", d => focus !== d && (zoom(d), d3.event.stopPropagation()));
  
    const label = svg.append("g")
      .style("font", "13px sans-serif")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants())
      .join("text")
      .style("fill-opacity", d => d.parent === root ? 1 : 0)
      .style("display", d => d.parent === root ? "inline" : "none")
      .text(d => d.data.name);
  
    zoomTo([root.x, root.y, root.r * 2]);
  
    function zoomTo(v) {
      const k = width / v[2];
      view = v;
      label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("r", d => d.r * k);
    }
  
    function zoom(d) {
      const focus0 = focus;
      focus = d;
      const transition = svg.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });
  
      label.filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    }
  
  });
  
  
  // 
  // line chart
  
  d3.json("linedata.json").then(function(data) {
    console.log("linedata: ", data);
  
    var svgWidth = 900,
      svgHeight = 500;
    var margin = { top: 50, right: 125, bottom: 45, left: 35 };
    var width = svgWidth - margin.left - margin.right,
      height = svgHeight - margin.top - margin.bottom;
  
    var color = d3.schemePaired;
  
    var svg = d3.select(".linechart").append("svg")
      // can be responsive to the page size
      .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    var x = d3.scalePoint([0, width]);
    var y = d3.scaleLinear([height, 0]);
  
    var line = d3.line().x(d => x(d.year)).y(d => y(d.value))
  
    var records = data.flatMap(d => d.record)
    x.domain(d3.set(records.map(d => d.year)).values().sort()).padding(0.5);
    y.domain([0, d3.max(records, d => d.value) * 1.05])
  
    xAxis = d3.axisBottom(x).tickSizeOuter(0)
    yAxis = d3.axisLeft(y).tickSizeOuter(0).tickSizeInner(-width)
  
    // add axes
    svg.append("g")
      .attr("id", "yAxis")
      .call(yAxis);
    svg.append("g")
      .attr("id", "xAxis")
      .attr("transform", "translate(0 " + height + ")")
      .call(xAxis);
  
    d3.selectAll("#xAxis .tick text")
      .attr("transform", "rotate(-15)") //after rotate 90 deg the x,y position exchanged
  
    // set title
    var title = svg.append("g")
      .attr("class", "svgtitle")
      .append("text")
      .attr("x", width / 2)
      .attr("y", -15)
      .text("Total Fertility Rate (live births per women) of 10 Countries from 1950 to 2020")
  
    // add axes labels
    svg.append("text")
      .attr("class", "axislabel")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .attr("text-anchor", "end")
      .text("Year(s)");
    svg.append("text")
      .attr("class", "axislabel")
      .attr("x", -height / 2)
      .attr("y", -25)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)") //after rotate 90 deg the x,y position exchanged
      .text("Total Fertility Rate (live births per women)");
  
    // add legends
    var legendy = d3.scaleBand([5, height]).domain(data.map(d => d.country)).padding(0.3)
    var legends = svg.append("g")
      .attr("class", "legend")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .on("mouseover", (d, i) => svg.select(".svgline.line" + i).style("stroke-width", 5))
      .on("mouseout", (d, i) => svg.select(".svgline.line" + i).style("stroke-width", 2))
  
    legends.append("rect")
      .attr("x", width + 5)
      .attr("y", d => legendy(d.country) + 8)
      .attr("width", 30)
      .attr("height", 4)
      .attr("fill", (d, i) => color[i])
  
    var textg = legends.append("g")
    textg.append("text")
      .attr("x", width + 40)
      .attr("y", d => {
        if (d.country.length > 14)
          return legendy(d.country) + 8
        else return legendy(d.country) + 14;
      })
      .text(d => {
        if (d.country.length > 14)
          return d.country.slice(0, d.country.lastIndexOf(' ', 13));
        else return d.country;
      })
    textg.append("text")
      .attr("x", width + 40)
      .attr("y", d => legendy(d.country) + 21)
      .text(d => {
        if (d.country.length > 14)
          return d.country.slice(d.country.lastIndexOf(' ', 14));
        else return '';
      })
  
    // draw lines
    svg.selectAll(".svgline")
      .data(data)
      .enter()
      .append("path")
      .attr("class", (d, i) => "svgline line" + i)
      .datum(d => d.record)
      .attr("stroke", (d, i) => color[i])
      .attr("d", line)
  
 
    var pointg = svg.selectAll(".points")
      .data(data)
      .enter()
      .append("g")
      .attr("fill", (d, i) => color[i])
  
    pointg.selectAll("circle")
      .data(d => {
        d.record.sort((a, b) => a.year.slice(0, 4) - b.year.slice(0, 4));
        d.record.forEach(r => r["country"] = d.country);
        return d.record
      })
      .enter()
      .append("circle")
      .attr("cx", d => x(d.year))
      .attr("cy", d => y(d.value))
      .attr("r", 6)
      .attr("fill-opacity", 0)
      .on("mouseover", function(d) {
        d3.select(this).attr("fill-opacity", 1);
  
    
        var tooltip = svg.append("g").classed("tooltip", true)
        var tooltipRect = tooltip.append("rect")
          .attr("x", x(d.year) + 10)
          .attr("y", y(d.value) - 60)
          .attr("height", 52)
          
        tooltip.append("text")
          .attr("x", x(d.year) + 20)
          .attr("y", y(d.value) - 36)
          .text(d.year)
        tooltip.append("text")
          .attr("x", x(d.year) + 20)
          .attr("y", y(d.value) - 20)
          .text(d.country + ": " + d.value)
  
        var tooltipwidth = tooltip.selectAll("text").nodes()[1].getBBox().width
        tooltipRect.attr("width", tooltipwidth + 20)
        if (tooltipwidth + (+tooltipRect.attr("x")) > width)
          tooltip.attr("transform", "translate(" + (-tooltipwidth - 40) + " 0)")
      })
      .on("mouseout", function() {
        d3.select(this).attr("fill-opacity", 0)
        svg.selectAll(".tooltip").remove()
      });
  });
  
  // 
  // pie chart
  
  d3.json("piedata.json").then(function(data) {
  
    var lastyeardata = data.slice(0,5)
    lastyeardata.forEach(d => d.last = d.record[0])
    console.log("piedata: ", lastyeardata);
  
    var svgWidth = 500,
      svgHeight = 500;
    var margin = { top: 0, right: 40, bottom: 0, left: 0 };
    var width = svgWidth - margin.left - margin.right,
      height = svgHeight - margin.top - margin.bottom,
      radius = Math.min(width, height) / 2;
  
    var color = d3.schemePaired;
  
    var svg = d3.select(".piechart").append("svg")
   
      .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
      .append("g")
      .attr("transform", "translate(" + (margin.left+width/2) + "," + (margin.top+height/2) + ")");
  
    var pie = d3.pie()
      .sort(null)
      .value(d => d.last.value);
  
    var path = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);
    var pathLarger = d3.arc()
      .outerRadius(radius)
      .innerRadius(0);
  
    var label = d3.arc()
      .outerRadius(radius - 60)
      .innerRadius(radius - 60);
  
    var arc = svg.selectAll(".arc")
      .data(pie(lastyeardata))
      .enter()
      .append("g")
      .attr("class", "arc");
  
    arc.append("path")
      .attr("d", path)
      .attr("fill", (d,i) => color[i])
      .on("mouseover", function(d,i) {
      
        d3.select(this).attr("d",pathLarger)
  
    
        var move = label.centroid(d)
        if (move[0]>0)
          move[0]-=10
        if (move[1]>0)
          move[1]+=10
        var textcord = [250+move[0],250+move[1]]
        
        var tooltip = d3.select(".piechart").append("div").classed("tooltip", true)
        tooltip.style("left", textcord[0])
          .style("top", textcord[1]-60)
        tooltip.append("p")
          .style("padding","5 10 0 10")
          .style("margin","0")
          .property("textContent",d.data.country)
        tooltip.append("p")
          .style("padding","5 10 0 10")
          .style("margin","0")
          .property("textContent","Value: "+d.value)
      })
      .on("mouseout", function() {
        d3.select(this).attr("d", path)
        d3.selectAll("div.tooltip").remove()
      });
  
    var textg=arc.append("g")
      .attr("transform", d=> "translate(" + label.centroid(d) + ")")
    textg.append("text")
      .attr("text-anchor","middle")
      .text(d=> {
      if(d.data.country.length>11)
        return d.data.country.slice(0,d.data.country.lastIndexOf(' ', 11))
      else return d.data.country});
    textg.append("text")
      .attr("text-anchor","middle")
      .attr("dy","1.2em")
      .text(d=> {
      if(d.data.country.length>11)
        return d.data.country.slice(d.data.country.lastIndexOf(' ', 11))
      else return ''});
  });
