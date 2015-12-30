(function(){

  var yGrid = arrayObjByNum(50, 150, 5);

  // var popularityChart = [
  //   ["x", "2015-01-01", "2015-02-01", "2015-03-01", "2015-04-01", "2015-05-01", "2015-06-01",
  //         "2015-07-01", "2015-08-01", "2015-09-01", "2015-10-01", "2015-11-01", "2015-12-01"],
  //   ["solr", 76.24, 81.48, 81.88, 82, 82.93, 81.24, 79.29, 81.90, 81.94, 79.07, 79.77, 79.15],
  //   ["elasticsearch", 49.04, 52.84, 58.92, 64.66, 64.84, 70.09, 70.16, 69.64, 71.55, 70.23, 74.77, 76.57]
  // ];

  var popularityChart = {
    first:[["x", "2015-01-01", "2015-02-01", "2015-03-01", "2015-04-01", "2015-05-01", "2015-06-01",
          "2015-07-01", "2015-08-01", "2015-09-01", "2015-10-01", "2015-11-01", "2015-12-01"],
          ["solr", 76.24, 81.48, 81.88, 82, 82.93, 81.24, 79.29, 81.90, 81.94, 79.07, 79.77, 79.15]],
    second:[["elasticsearch", 49.04, 52.84, 58.92, 64.66, 64.84, 70.09, 70.16, 69.64, 71.55, 70.23, 74.77, 76.57]]
  };

  var interestChart ={
    first:[["x", "2015-01-01", "2015-02-01", "2015-03-01", "2015-04-01", "2015-05-01", "2015-06-01",
          "2015-07-01", "2015-08-01", "2015-09-01", "2015-10-01", "2015-11-01", "2015-12-01"],
          ["solr", 54.44, 58.07, 58.28, 57.37, 58.15, 58.62, 58.56, 59.15, 59.87, 58.73, 59.56, 57.2 ]],
    second:[["elasticsearch", 56.74, 61.55, 64.91, 67.2, 69.26, 73.09, 74.76, 76.64, 80.12, 80.71, 83.06, 84.39 ]]
  };

  var trendsChart = {
    first:[["x", "2015-01-01", "2015-02-01", "2015-03-01", "2015-04-01", "2015-05-01", "2015-06-01",
          "2015-07-01", "2015-08-01", "2015-09-01", "2015-10-01", "2015-11-01", "2015-12-01"],
          ["solr", 121.27, 139.27, 140.72, 134.08, 139.12, 131.06, 120.74, 124.71, 117.21, 109.25, 105.31, 107.11]],
    second:[["elasticsearch", 54.41, 62.13, 79.07, 90.97, 79.05, 94.21, 91.2, 81.64, 75.57, 70.6, 77.77, 82.49 ]]
  };

  var demandChart = {
    first:[["x", "2015-01-01", "2015-02-01", "2015-03-01", "2015-04-01", "2015-05-01", "2015-06-01",
          "2015-07-01", "2015-08-01", "2015-09-01", "2015-10-01", "2015-11-01", "2015-12-01"],
          ["solr", 70.07, 68.33, 68.26, 75.12, 73.63, 70.73, 69.76, 75.07, 78.99, 82.66, 82.19, 80.85]],
    second:[["elasticsearch", 34.47, 35.84, 38.32, 47.25, 52.46, 52.82, 52.25, 53.1, 59.48, 62.8, 64.22, 59.27]]
  };
  //helper functions
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

  function showPopularity() {
    createChart(popularityChart, "#chart1");
  }
  function showInterest() {
    createChart(interestChart, "#chart1");
  }
  function showTrends() {
    createChart(trendsChart, "#chart1");
  }
  function showDemand() {
    createChart(demandChart, "#chart1");
  }
  function createChart(chart1Data, chartTarget) {
    var chart1 = c3.generate({
      bindto: chartTarget,
      transition: {duration: 1000},
      size: {
        height: 400,  
      },
      padding: {
        top: 10,
        right: 25
      },
      legend:{
        position: "inset",
        inset:{
          anchor: "top-left",
          x: 0,
          y: -5,
          step: 1
        }
      },
      data: {
        x: "x",
        columns: chart1Data.first,
        types: {
          solr:"line"
        },
        colors: {
          solr: "#84a7e2",
          elasticsearch: "#ffa29e"
        },
      },
      point: {
        r:function(d) {
          // console.log(d);
          return  5;
        },
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%m-%d-%y",
            fit: false,
            rotate: 70
          },
        },
        y: {
          label: {
            text: "DB-Engine Score",
            position: "outer-middle",
          },
          tick:{
            format: function(d){ 
              return d+ " pts";}
          }
        }
      },
      
    });
    setTimeout(function() {
        chart1.load({
            columns:chart1Data.second,
            type: "line"
        });
        // chart1.groups([["solr","elasticsearch"]]);

    }, 700);
    chart1.ygrids.add(yGrid);
  }
    
  
//setup
$("#popular").on("click", showPopularity);
$("#interest").on("click", showInterest);
$("#trends").on("click", showTrends);
$("#demand").on("click", showDemand);
$("a.chart-nav").on("click", makeActive);
createChart(popularityChart, "#chart1");


})();