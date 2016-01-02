// (function(){
  var addCommas, csvToJsonArray, dataset, formatNumber, plotData, roundNumber, shortenNumber, smallMultiples;

  smallMultiples = function() {
    var colorScale, createLegend,  drawChart, drawDetails, getPosition, graphHeight, graphWidth, height, hideAnnotation, hideDetail, scaleFactor, setScales, showAnnotation, showDetail, toggleHidden, width, xScale, yPadding, yScale;
    
    popularityData = [];
    width = 200;
    height = 160;
    graphWidth = 180;
    graphHeight = 140;
    yPadding = 12;
    xScale = d3.scale.ordinal().rangeRoundBands([0,graphWidth], 0.1);
    yScale = d3.scale.linear().range([0, graphHeight - yPadding]);
    colorScale = d3.scale.ordinal().range(["red", "blue"]);
    scaleFactor = 4;


    // d3.text("../vendors/popularityData.csv", "text/csv", function(text){
    //   dataset = d3.csv.parseRows(text);
    //   popularityData = csvToJsonArray(dataset);
    // });

    function chart(selection) {
      return selection.each(function(data){
        var pre, previews, svgs;
        setScales();
        createLegend();
        // add svg for each month
        pre = d3.select(this).select("#previews")
              .selectAll(".previews").data(data);

        pre.enter()
          .append("div")
          .attr("class", "preview")
          .attr("width", width)
          .attr("height", height);

        svgs = pre.append("svg")
              .attr("width", width)
              .attr("height", height);

        previews = svgs.append("g");
      });
      
    }


    //helper functions
    setScales = function() {
      var name, yMax;

      yMax = d3.max(data, function(d) {
        return d3.max(d.values, function(e) {
          return e.value;
        });
      });

      yScale.domain([0, yMax + 300]);
      names = data[0].values.map(function(d) {
        return d.name;
      });

      xScale.domain(names);
      return colorScale.domain(names);
    };
    createLegend = function() {
      var keys, legend;

      legend = d3.select("#legend")
        .append("svg")
        .attr("width", 100)
        .attr("height", 300);
      keys = legend.selectAll("g").data(data[0].values)
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
          return "translate(" + 0 + "," + (40 * (i +1)) +")";
        });
      keys.append("rect").attr("width", 30)
        .attr("height", 30)
        .attr("fill", function(d) {
          return colorScale(d.name);
        });
      return keys.append("text").text(function(d) {
        return d.name;
      })
      .attr("text-anchor", "left")
      .attr("dx", "2.2em")
      .attr("dy", "1.2em");
    };

    function arrayByNum(start, end, num) {
      var arr = [];
      var i = 0;
      for(i = start; i < end; i+=5){
        arr.push(i);
      }
      return arr;
    }

    function arrayObjByNum(start, end, num) {
      var arr = [];
      var i = 0;
      for(i = start; i <= end; i+=5){
        arr.push( {value: i});
      }
      return arr;
    }

    function makeActive() {
      $("a.chart-nav").toggleClass("active", false);
      $(this).toggleClass("active");
    }

    function colorPicker(color, d) {
      var color = "red";
      var targetData = chart1Data.second[0][0];
      // console.log("targetData", targetData);
      // console.log("data", d);
      if( targetData == d.id){
        color = "blue";
      }
      return color;
    }
    return chart;
  };
   
   d3.text("../vendors/popularityData.csv", "text/csv", function(text){
     dataset = d3.csv.parseRows(text);
     dataset = csvToJsonArray(dataset);
   });

 csvToJsonArray = function(arr) {
    var jsonObj;
    var jsonArr = [];
    var len = arr[0].length - 2;

    for(var i = 0; i < len; i++) {
      jsonObj = {
        "month": arr[0][i + 2],
        "values": [
          {
            "name": arr[1][0],
            "value": arr[1][i+2],
            "pollType": arr[1][1]
          },
          {
            "name": arr[2][0],
            "value": arr[2][i+2],
            "pollType": arr[1][1]
          }
        ]
      };
      jsonArr.push(jsonObj);
    }
    console.log("json array",jsonArr);
    return jsonArr;
  }
  plotData = function(selector, data, plot) {
    return d3.select(selector).datum(data).call(plot);
  };
//setup
$(function() {
  var display, plot;
  plot = smallMultiples();
  display = function(data) {
    return plotData("#chart1", dataset, plot);
  };
  return d3.json(dataset, display);
});

// })();