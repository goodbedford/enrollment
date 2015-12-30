(function(){
  var chart1Data = [
    ["type","Participation Rights"],
    ["moreCommon", 44],
    ["neither", 42],
    ["lessCommon", 14],
  ];
  var chart2Data = [
    ["type", 'IPO Protections'],
    ["moreCommon", 53],
    ["neither", 39],
    ["lessCommon", 8],
  ];

  var chart3Data = [
    ["type", "Multiple Liquidation Preference"],
    ["moreCommon", 45],
    ["neither", 40],
    ["lessCommon", 15]
  ];

  var chart4Data = [
    ["type","Cumulative Dividends"],
    ["moreCommon", 20],
    ["neither", 65],
    ["lessCommon", 15]
  ];

  function createChart(chart1Data, chartTarget) {
    var chart1 = c3.generate({
      bindto: chartTarget,
      data:{
        columns: chart1Data,
        type: "donut",
        names:{
          moreCommon: "More Common",
          neither: "Neither",
          lessCommon: "Less Common"
        },
        colors:{
          moreCommon: "#84a7e2",
          neither: "#bdbdbd",
          lessCommon: "#ffa29e"
        }
      },
      donut:{
        // title: chart1Data[0][1],
      },
      legend:{
        hide:["type"],
        item:{
          //prevent click
          onclick: function(d){return;},
        }
      }
    });
  }




//setup
createChart(chart1Data, "#chart1");
createChart(chart2Data, "#chart2");
createChart(chart3Data, "#chart3");
createChart(chart4Data, "#chart4");



})();