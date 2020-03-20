
    var margin = { top: 20, left: 80, bottom: 50, right: 450 };
    var width = 1250 - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom;

    var svg = d3.select("#chart").append("svg")
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    var x = d3.scaleBand();
    var y = d3.scaleLinear();

    var xAxis,yAxis;
    var dataset;

    var mode = "#ascend";

    var modeSortMet = "#all";
    var datasetCop;


  d3.json("data7.json", function (data) {
  return {
  country: d.country,
  value: +d.value
  };
  }).then(function (data) {
  console.log(data);
  dataset = data;
  dataset.sort(function (a, b) { return d3.ascending(a.country, b.country); });
  setMode("#alpha");
  setNumCouMode("#res");

  drawBars();
  });


    d3.select("#res")
        .on("click", function () {

            setNumCouMode("#res")

            datasetCop = dataset.slice(0)


            setMode("#alpha")

            datasetCop.sort(function (a, b) {
                return d3.ascending(a.country, b.country);
            });

            x.domain(datasetCop.sort(
                function (a, b) { return d3.ascending(a.country, b.country); }
            ).map(function (d) {

                return d.country;
            }));
            transitionAxis();
            redrawbars(datasetCop)

        });



    d3.select("#all")
        .on("click", function () {

            setNumCouMode("#all")

            datasetCop = dataset.slice(0)

            if (mode === "#alpha") {

                setMode("#alpha")

                datasetCop.sort(function (a, b) {
                    return d3.ascending(a.country, b.country);
                });

                x.domain(datasetCop.sort(
                    function (a, b) { return d3.ascending(a.country, b.country); }
                ).map(function (d) {

                    return d.country;
                }));
                transitionAxis();
                redrawbars(datasetCop)
            }

            if (mode === "#ascend") {
                setMode("#ascend")


                datasetCop.sort(function (a, b) {
                    return d3.ascending(a.value, b.value);
                });


                x.domain(datasetCop.sort(
                    function (a, b) { return d3.ascending(a.value, b.value); }
                ).map(function (d) {

                    return d.country;
                }));

                transitionAxis();

                redrawbars(datasetCop)
            }
            if (mode === "#descen") {
                setMode("#descen")

                datasetCop.sort(function (a, b) {
                    return d3.descending(a.value, b.value);
                });

                x.domain(datasetCop.sort(
                    function (a, b) { return d3.descending(a.value, b.value); }
                ).map(function (d) {

                    return d.country;
                }));

                transitionAxis();

                redrawbars(datasetCop)
            }


        });



    d3.select("#top")
        .on("click", function () {

            setNumCouMode("#top")

            if (mode === "#alpha") {
                datasetCop = dataset.slice(0)

                datasetCop.sort(function (a, b) {
                    return d3.descending(a.value, b.value);
                });


                datasetCop.splice(5, 5);

                setMode("#alpha")

                datasetCop = datasetCop.sort(function (a, b) {
                    return d3.ascending(a.country, b.country);

                });


                x.domain(datasetCop.sort(
                    function (a, b) { return d3.ascending(a.value, b.valuey); }
                ).map(function (d) {

                    return d.country;
                }));
                transitionAxis();
                redrawbars(datasetCop)
            }

            if (mode === "#ascend") {

                datasetCop = dataset.slice(0)

                datasetCop.sort(function (a, b) {
                    return d3.descending(a.value, b.value);
                });
                datasetCop.splice(5, 5)
                setMode("#ascend")

                datasetCop.sort(function (a, b) {
                    return d3.ascending(a.value, b.value);
                });

                x.domain(datasetCop.sort(
                    function (a, b) { return d3.ascending(a.value, b.value); }
                ).map(function (d) {

                    return d.country;
                }));
                transitionAxis();
                redrawbars(datasetCop)
            }
            if (mode === "#descen") {

                datasetCop = dataset.slice(0)

                datasetCop.sort(function (a, b) {
                    return d3.descending(a.value, b.value);
                });

                setMode("#descen")

                datasetCop.splice(5, 5)
                datasetCop.sort(function (a, b) {
                    return d3.descending(a.value, b.value);
                });


                x.domain(datasetCop.sort(
                    function (a, b) { return d3.descending(a.value, b.value); }
                ).map(function (d) {

                    return d.country;
                }));
                transitionAxis();
                redrawbars(datasetCop)
            }


        });


    d3.select("#bot")
        .on("click", function () {

            if (mode === "#alpha") {

                setNumCouMode("#bot")
                datasetCop = dataset.slice(0)

                datasetCop
                 = datasetCop.sort(function (a, b) {
                    return d3.descending(a.value, b.value);
                });

                datasetCop.splice(0, 5)

                setMode("#alpha")
                datasetCop = datasetCop.sort(function (a, b) {
                    return d3.ascending(a.country, b.country);
                });

                x.domain(datasetCop.sort(
                    function (a, b) { return d3.ascending(a.country, b.country); }
                ).map(function (d) {

                    return d.country;
                }));
                transitionAxis();
                redrawbars(datasetCop)
            }

            if (mode === "#ascend") {

                setNumCouMode("#bot")
                datasetCop = dataset.slice(0)

                datasetCop = datasetCop.sort(function (a, b) {
                    return d3.descending(a.value, b.value);
                });

                datasetCop.splice(0, 5)

                setMode("#ascend")
                datasetCop = datasetCop.sort(function (a, b) {
                    return d3.ascending(a.value, b.value);
                });

                x.domain(datasetCop.sort(
                    function (a, b) { return d3.ascending(a.value, b.value); }
                ).map(function (d) {

                    return d.country;
                }));
                transitionAxis();
                redrawbars(datasetCop)
            }
            if (mode === "#descen") {

                setNumCouMode("#bot")
                datasetCop = dataset.slice(0)

                datasetCop = datasetCop.sort(function (a, b) {
                    return d3.descending(a.value, b.value);
                });

                datasetCop.splice(0, 5)

                setMode("#descen")
                datasetCop = datasetCop.sort(function (a, b) {
                    return d3.descending(a.value, b.value);
                });

                x.domain(datasetCop.sort(
                    function (a, b) { return d3.descending(a.value, b.value); }
                ).map(function (d) {

                    return d.country;
                }));
                transitionAxis();
                redrawbars(datasetCop)
            }


        });


    d3.select("#alpha")
        .on("click", function () {


            setMode("#alpha")

            if (modeSortMet === "#all") {
                setNumCouMode("#all")
                datasetCop = dataset.slice(0)

                datasetCop = datasetCop.sort(function (a, b) {
                    return d3.ascending(a.country, b.country);
                });


                x.domain(datasetCop.sort(
                    function (a, b) { return d3.ascending(a.country, b.country); }
                ).map(function (d) {

                    return d.country;
                }));
                transitionAxis();
                redrawbars(datasetCop)
            }

            if (modeSortMet === "#top") {


                datasetCop = dataset.slice(0)


                setNumCouMode("#top")
                datasetCop = datasetCop.sort(function (a, b) {
                    return d3.ascending(a.value, b.value);
                });

                datasetCop = datasetCop.splice(5, 5)

                datasetCop = datasetCop.sort(function (a, b) {
                    return d3.ascending(a.country, b.country);
                });


                datasetCop.splice(5, 5)


                x.domain(datasetCop.sort(
                    function (a, b) { return d3.ascending(a.country, b.country); }
                ).map(function (d) {

                    return d.country;
                }));
                transitionAxis();
                redrawbars(datasetCop)
            }
            if (modeSortMet === "#bot") {
                setNumCouMode("#bot")
                datasetCop = dataset.slice(0)

                datasetCop = datasetCop.sort(function (a, b) {
                    return d3.ascending(a.value, b.value);
                });

                datasetCop = datasetCop.splice(0, 5)

                datasetCop = datasetCop.sort(function (a, b) {
                    return d3.ascending(a.country, b.country);
                });


                datasetCop = datasetCop.splice(0, 5)


                x.domain(datasetCop.sort(
                    function (a, b) { return d3.ascending(a.country, b.country); }
                ).map(function (d) {

                    return d.country;
                }));
                transitionAxis();
                redrawbars(datasetCop)


            }


        });


    d3.select("#ascend")
        .on("click", function () {


            setMode("#ascend")

            if (modeSortMet === "#all") {
                datasetCop = dataset.slice(0)
                setNumCouMode("#all")
                datasetCop = datasetCop.sort(function (a, b) {
                    return d3.ascending(a.value, b.value);
                });


                x.domain(datasetCop.sort(
                    function (a, b) { return d3.ascending(a.value, b.value); }
                ).map(function (d) {

                    return d.country;
                }));
                transitionAxis();
                redrawbars(datasetCop);
            }

            if (modeSortMet === "#top") {
                datasetCop = dataset.slice(0)
                setNumCouMode("#top")
                datasetCop = datasetCop.sort(function (a, b) {
                    return d3.ascending(a.value, b.value);
                });


                datasetCop = datasetCop.splice(5, 5)


                x.domain(datasetCop.sort(
                    function (a, b) { return d3.ascending(a.value, b.value); }
                ).map(function (d) {

                    return d.country;
                }));
                transitionAxis();
                redrawbars(datasetCop)
            }
            if (modeSortMet === "#bot") {
                datasetCop = dataset.slice(0)
                setNumCouMode("#bot")
                datasetCop = datasetCop.sort(function (a, b) {
                    return d3.ascending(a.value, b.value);
                });

                datasetCop = datasetCop.splice(0, 5)


                x.domain(datasetCop.sort(
                    function (a, b) { return d3.ascending(a.value, b.value); }
                ).map(function (d) {

                    return d.country;
                }));
                transitionAxis();
                redrawbars(datasetCop)

            }


        });

    d3.select("#descen")
        .on("click", function () {


            setMode("#descen")
            datasetCop = dataset.slice(0)


            if (modeSortMet === "#all") {
                setNumCouMode("#all")
                datasetCop = datasetCop.sort(function (a, b) {
                    return d3.descending(a.value, b.value);
                });


                x.domain(datasetCop.sort(
                    function (a, b) { return d3.descending(a.value, b.value); }
                ).map(function (d) {

                    return d.country;
                }));
                transitionAxis();
                redrawbars(datasetCop)
            }

            if (modeSortMet === "#top") {
                setNumCouMode("#top")
                datasetCop = datasetCop.sort(function (a, b) {
                    return d3.descending(a.value, b.value);
                });

                datasetCop = datasetCop.splice(0, 5)

                x.domain(datasetCop.sort(
                    function (a, b) { return d3.descending(a.value, b.value); }
                ).map(function (d) {

                    return d.country;
                }));
                transitionAxis();
                redrawbars(datasetCop)

            }
            if (modeSortMet === "#bot") {
                setNumCouMode("#bot")
                datasetCop = datasetCop.sort(function (a, b) {
                    return d3.descending(a.value, b.value);
                });


                datasetCop = datasetCop.splice(5, 5)

                x.domain(datasetCop.sort(
                    function (a, b) { return d3.descending(a.value, b.value); }
                ).map(function (d) {

                    return d.country;
                }));


                transitionAxis();
                redrawbars(datasetCop)
            }

        });




    function transitionAxis() {


        var transition = svg.transition()
            .duration(750);

        var delay = function (d, i) {
            return i * 50;
        };


        transition.select("#x-axis")
            .call(xAxis);


    }

    function redrawbars() {



        x.domain(datasetCop.map(function (d) { return d.country; }));


        var bars = svg.selectAll(".bar")
            .data(datasetCop, function (d) { return d.country; });

        var delay = function (d, i) {
            return i * 50;
        }


        bars.transition()
            .duration(750)
            .delay(delay)
            .attr("x", function (d) { return x(d.country); })
            .attr("width", x.bandwidth());


        bars.enter().append("rect")
            .attr("x", function (d) { return x(d.country); })
            .attr("y", function (d) { return y(d.value); })
            .transition()
            .duration(1000)
            .attr("class", "bar")
            .attr("x", function (d) { return x(d.country); })
            .attr("y", function (d) { return y(d.value); })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return height - y(d.value); });


        bars.exit()
            .transition()
            .duration(750)
            .style("opacity", 10)
            .remove();

    }



    function setMode(id) {
        d3.select("#alpha").style("background-color", "grey");
        d3.select("#ascend").style("background-color", "grey");
        d3.select("#descen").style("background-color", "grey");
        d3.select(id).style("background-color", "yellow");
        mode = id;




    }

    function setNumCouMode(id) {
        d3.select("#res").style("background-color", "red");
        d3.select("#all").style("background-color", "red");
        d3.select("#top").style("background-color", "red");
        d3.select("#bot").style("background-color", "red");

        d3.select(id).style("background-color", "grey");
        modeSortMet = id;


    }

    function drawBars() {
        x.domain(dataset.map(function (d) { return d.country; }))
            .range([0, width])
            .paddingInner(0.05);

        y.domain([0, d3.max(dataset, function (d) { return d.value; })])
            .range([height, 0]);

        svg.selectAll(".bar")
            .data(dataset, function (d) { return d.country; })
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return x(d.country); })
            .attr("y", function (d) { return y(d.value); })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return height - y(d.value); });


        xAxis = d3.axisBottom()
            .scale(x)


        svg.append("g")
            .attr("id", "x-axis")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);



        yAxis = d3.axisLeft()
            .scale(y)


        svg.append("g")
            .attr("id", "y-axis")
            .attr("class", "axis")
            .call(yAxis);

        svg.append("text")
            .attr("class", "title")
            .attr("x", (width / 2))
            .attr("y", -5)
            .attr("text-anchor", "middle")
            .text("Total Fertility Rate from 1960-1965")
            .style("font-weight","bold")
            //.style("text-decoration", "underline");

        svg.append("text")
            .attr("x", - height / 2)
            .attr("y", - margin.left * 0.4)
            .attr("transform", "rotate(-90)")
            .attr('class', 'ylabel')
            .append("tspan").text("Fertility Rate")
            //.style("baseline-shift", "super")
            .style("font-size", "0.7em");

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom * 0.9)
            .attr('class', 'xlabel')
            .append("tspan").text("Countries")
            //.style("baseline-shift", "super")
            .style("font-size", "0.7em");

         }
