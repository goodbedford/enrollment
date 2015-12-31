(function(){

  function smallMultiples() {

    var dataset;
    var popularityData = [];
    var width = 200;
    var height = 160;
    var graphWidth = 180;
    var graphHeight = 140;
    var yPadding = 12;
    var xScale = d3.scale.ordinal().rangeRoundBands([0,graphWidth], 0.1);
    var yScale = d3.scale.linear().range([0, graphHeight - yPadding]);
    var colorScale = d3.scale.ordinal().range(["red", "blue"]);
    var scaleFactor = 4;


    d3.text("../vendors/popularityData.csv", "text/csv", function(text){
      dataset = d3.csv.parseRows(text);
      popularityData = csvToJsonArray(dataset);
    });

    // add svg for each month
    var pre = d3.select(this).select("#previews")
          .selectAll(".previews").data(popularityData);

    pre.enter()
      .append("div")
      .attr("class", "preview")
      .attr("width", width)
      .attr("height", height);

    var svgs = pre.append("svg")
          .attr("width", width)
          .attr("height", height);

    var previews = svgs.append("g");


    //helper functions
    function csvToJsonArray(arr) {
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

  }
   
  
//setup

})();