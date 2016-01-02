(function(){
    var arrayByNum, arrDateFormator, arrayObjByNumm, chart, colorPicker, convertArr, createChart, data, dateSwitch, demandChart, interestChart, makeActive, popularityChart, showChart, showDemand, showInterest, showPopularity, showTrends, trendsChart;

    popularityChart = [
        ["x", "2015-01-01", "2015-02-01", "2015-03-01", "2015-04-01", "2015-05-01", "2015-06-01", "2015-07-01", "2015-08-01", "2015-09-01", "2015-10-01", "2015-11-01", "2015-12-01"],
        ["solr", 76.24, 81.48, 81.88, 82, 82.93, 81.24, 79.29, 81.90, 81.94, 79.07, 79.77, 79.15],
        ["elasticsearch", 49.04, 52.84, 58.92, 64.66, 64.84, 70.09, 70.16, 69.64, 71.55, 70.23, 74.77, 76.57]
        ];

    interestChart =[
        ["x", "2015-01-01", "2015-02-01", "2015-03-01", "2015-04-01", "2015-05-01", "2015-06-01", "2015-07-01", "2015-08-01", "2015-09-01", "2015-10-01", "2015-11-01", "2015-12-01"],
        ["solr", 54.44, 58.07, 58.28, 57.37, 58.15, 58.62, 58.56, 59.15, 59.87, 58.73, 59.56, 57.2 ],
        ["elasticsearch", 56.74, 61.55, 64.91, 67.2, 69.26, 73.09, 74.76, 76.64, 80.12, 80.71, 83.06, 84.39 ]
        ];

    trendsChart = [
        ["x", "2015-01-01", "2015-02-01", "2015-03-01", "2015-04-01", "2015-05-01", "2015-06-01", "2015-07-01", "2015-08-01", "2015-09-01", "2015-10-01", "2015-11-01", "2015-12-01"],
        ["solr", 121.27, 139.27, 140.72, 134.08, 139.12, 131.06, 120.74, 124.71, 117.21, 109.25, 105.31, 107.11],
        ["elasticsearch", 54.41, 62.13, 79.07, 90.97, 79.05, 94.21, 91.2, 81.64, 75.57, 70.6, 77.77, 82.49 ]
        ];
    demandChart = [
        ["x", "2015-01-01", "2015-02-01", "2015-03-01", "2015-04-01", "2015-05-01", "2015-06-01", "2015-07-01", "2015-08-01", "2015-09-01", "2015-10-01", "2015-11-01", "2015-12-01"],
        ["solr", 70.07, 68.33, 68.26, 75.12, 73.63, 70.73, 69.76, 75.07, 78.99, 82.66, 82.19, 80.85],
        ["elasticsearch", 34.47, 35.84, 38.32, 47.25, 52.46, 52.82, 52.25, 53.1, 59.48, 62.8, 64.22, 59.27]
        ];

    createChart = function(data, chartTarget) {
      var chart;
      chart = c3.generate({
        bindto: chartTarget,
        size:{
          width: 150,
          height: 150
        },
        data: {
          x: "x",
          columns: data,
          type: 'pie',
          colors:{
            solr: "#84a7e2",
            elasticsearch: "#ffa29e"
          },
        },
        axis:{
          x:{
            type: "timeseries",
            // format: function(d){
            //   var date = arrDateFormator(d);
            //   return date;
            // }
            tick:{
              format: "%m-%d-%Y"
            }
          },
          y:{
            tick:{
              format: function(d){ return d+"-pts";},
              // values: arrayByNum(0,200, 10)
            }
          }
        }
      });
    };

    convertArr = function(arr) {
      var arrOfArrs = [];

      for(var i = 0; i < arr[0].length -1; i++){
        arrOfArrs.push(
          [ [arr[0][0], arr[0][i + 1] ],
            [arr[1][0], arr[1][i + 1] ],
            [arr[2][0], arr[2][i + 1] ]
          ]
          );
      }
      // console.log(arrOfArrs);
      return arrOfArrs;
    };

    dateSwitch = function(date) {
      var month = "";
      switch(date) {
        case "2015-01-01":
          month = "#jan";
          break;
        case "2015-02-01":
          month = "#feb";
          break;
        case "2015-03-01":
          month = "#march";
          break;
        case "2015-04-01":
          month = "#april";
          break;
        case "2015-05-01":
          month = "#may";
          break;
        case "2015-06-01":
          month = "#june";
          break;
        case "2015-07-01":
          month = "#july";
          break;
        case "2015-08-01":
          month = "#aug";
          break;
        case "2015-09-01":
          month = "#sept";
          break;
        case "2015-10-01":
          month = "#oct";
          break;
        case "2015-11-01":
          month = "#nov";
          break;
        case "2015-12-01":
          month = "#dec";
          break;
      default:
        console.log("error with date switch fn");
      }
      return month;
    };

    showChart = function(data) {
      var month ="";
      for(var i = 0; i < data.length; i++){
        month = dateSwitch(data[i][0][1]);
        createChart(data[i], month);

      }
    };

    showPopularity = function() {
      showChart(convertArr(popularityChart));
    };
    showInterest = function() {
      showChart(convertArr(interestChart));
    };
    showTrends = function() {
      showChart(convertArr(trendsChart));
    };
    showDemand = function() {
      showChart(convertArr(demandChart));
    };
    arrayByNum = function(start, end, num) {
      var arr = [];
      var i = 0;
      for(i = start; i < end; i+=num){
        arr.push(i);
      }
      return arr;
    };

    arrayObjByNum = function(start, end, num) {
      var arr = [];
      var i = 0;
      for(i = start; i <= end; i+=5){
        arr.push( {value: i});
      }
      return arr;
    };

    makeActive = function() {
      $("a.chart-nav").toggleClass("active", false);
      $(this).toggleClass("active");
    };

    colorPicker = function(dataColor, d) {
      var color = "red";
      var targetData = chart1Data.second[0][0];
      // console.log("targetData", targetData);
      // console.log("data", d);
      if( targetData == d.id){
        color = "blue";
      }
      return color;
    };
    arrDateFormator = function(dateStr) {
      dateArray = dateStr.split(/\/|-/g);
      console.log("date string helper", dateArray);

      var year = dateArray[0];
      var month = dateArray[1];
      var day = dateArray[2];
      dateStr = year +"-"+ month +"-"+ day;
      console.log("date str ", dateStr);

      return dateStr;
    };
   
   // d3.text("../vendors/popularityData.csv", "text/csv", function(text){
   //   dataset = d3.csv.parseRows(text);
   //   dataset = csvToJsonArray(dataset);
   // });

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
  };




//setup
  // data = convertArr(popularityChart.first);
  $("#popular").on("click", showPopularity);
  $("#interest").on("click", showInterest);
  $("#trends").on("click", showTrends);
  $("#demand").on("click", showDemand);
  $("a.chart-nav").on("click", makeActive);
  
  showPopularity();
})();