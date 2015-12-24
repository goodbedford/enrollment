(function(){

  
  var arryEven = [1,2,1,1]; 
  var arryOdd = [1,3,2,1,1].sort();
  var fromDate = document.dateRange.fromDate;
  var toDate = document.dateRange.toDate;
  var urlEd = "api/dataset/edu";

  //setUp
  //subscription data
  csvToJson();
  fromDate.value = "2013-07-01";
  toDate.value = "2014-06-30";
  dateChangeListener();
  // education Data
  getJsonData(urlEd);

  //helpers
  function dateChangeListener() {
    // fromDate.onchange = setDate(fromDate.value);
    var $fromDate = $('#fromDate');
    var $toDate = $('#toDate');
    $fromDate.on('change',function(){
      console.log("changed from input:", $fromDate.val());
      console.log("changed to input:", $toDate.val());
      csvToJson($fromDate.val(),$toDate.val());
    });
    $toDate.on('change',function(){
      console.log("changed from input:", $fromDate.val());
      console.log("changed to input:", $toDate.val());
      csvToJson($fromDate.val(),$toDate.val());
    });
  }
  function getMean(myArray){
    //mean is total sum of array values divided by array length
    var mean = myArray.reduce(function(a, b){
      return a + b;
    })/myArray.length;

    return mean.toFixed(2);
  }
  function getTotalSubcribers() {
  }
  function getMedian(myArray){
    var middleIndexA;
    var middleIndexB;
    var median = [];
    var sortedArray = myArray.sort();
    if( sortedArray.length % 2 === 0){
      middleIndexA = (sortedArray.length / 2) - 1;
      middleIndexB = middleIndexA +1;
      median.push(((sortedArray[middleIndexA] + sortedArray[middleIndexB]) / 2).toFixed(2));
    } else {
      median.push(sortedArray[(Math.floor(sortedArray.length / 2))].toFixed(2));
    }
    return median;
  }
  function getDataArray(jsonObjArray,objKey) {
    var someArray = jsonObjArray.map(function(jsonObj){
      return jsonObj[objKey];
    });

    return someArray;
  }
  function arrDateFormator(dateStr) {
    dateArray = dateStr.split(/\/|-/g);
    console.log("date string helper", dateArray);

    var year = dateArray[0];
    var month = dateArray[1];
    var day = dateArray[2];
    dateStr = year +"-"+ month +"-"+ day;
    console.log("date str ", dateStr);

    return dateStr;
  }
  function setDate(str) {

    console.log("input changed", str);
  }
  function getUnique(dataArray){
    var uniqueArray = [];
    datatArray.forEach(function(item) {
         if(uniqueArray.indexOf(item) < 0) {
             uniqueArray.push(item);
         }
    });
    return uniqueArray;
  }
  function goChart(chartData){
    var chartTime = c3.generate({
          bindto: '#chartTime',
          padding: {
            top: 50,
            bottom: 25
          },
          size:{
            height:400
          },
          data: {
              x: 'x',
              columns:chartData,
              type: 'line',
              colors:{
                age: '#ccc'
              },
              color: function(color,d){
                console.log("color", color);
                console.log("data:",d);
                if(d.value > 21){
                  color = 'red';
                }

                return color;
              }
          },
          point:{
            select:{
              r: 2
            },
            r: function(d){
              console.log(d);
              // debugger;

              return d.value/2;
            } 
          },
          axis: {
            x: {
              type: 'timeseries',
              label: {
                text: 'Time Line',
                position: 'outer-middle'
              },
              tick:{
                format: '%m/%d/%Y'
              }
            },
            y: {
              label: {
                text: "Age",
                position: 'outer-middle'
              }
            }
          },
          subchart:{
            show:true
          }
    });
  }
  function showMeanChart(chartData, chartTarget){
    var meanChart = c3.generate({
      bindto: '#meanAgeChart',
      padding: {
        top: 25
      },
      size:{
        height: 150
      },
      data:{
        columns: chartData,
        type: 'gauge',
        color: function(color, d){
          console.log("the color is:", color);
          console.log("c:is ",d.value);
          return "navy" ;
        }
      },
      gauge:{
        label:{
          format: function(value){
            return value;
          }
        },
        width: 25,
        units: 'age'
      }
    });
  }
  function showMedianChart(chartData, chartTarget){
    var medianChart = c3.generate({
      bindto: '#medianAgeChart',
      padding: {
        top: 25
      },
      size:{
        height: 150
      },
      data:{
        columns: chartData,
        type: 'gauge',
        color: function(color, d){
          console.log("the color is:", color);
          console.log("c:is ",d.value);
          return "navy" ;
        }
      },
      gauge:{
        label:{
          format: function(value){
            return value;
          }
        },
        width: 25,
        units: 'age'
      }
    });
  }
  function showMaxAgeChart(chartData, chartTarget){
    var medianChart = c3.generate({
      bindto: '#maxAgeChart',
      padding: {
        top: 25
      },
      size:{
        height: 150
      },
      data:{
        columns: chartData,
        type: 'gauge',
        color: function(color, d){
          console.log("the color is:", color);
          console.log("c:is ",d.value);
          return "navy" ;
        }
      },
      gauge:{
        label:{
          format: function(value){
            return value;
          }
        },
        width: 25,
        units: 'age'
      }
    });
  }  
  function showEduChart(chartData, chartTarget){
    var chart = c3.generate({
      bindto: chartTarget,
      padding: {
        top: 50,
        bottom: 25
      },
      size:{
        height: 400,
        width: 700
      },
      data:{
        json: chartData,
        keys:{
          x:'state',
          value: ['overweightPeople', 'bachelors', 'state', 'politicalParty']
        },
        type: 'bar',
        axes:{
        },
      },
      axis:{
        x:{
          type: 'category'

        },
        y:{
          show: true
        }
      }
    });

  }
  function csvToJson(dFrom, dTo) {
    var url = "";
    if( dFrom && dTo){
      url = "/api/dataset?from="+dFrom+ "&to="+ dTo;
    } else {
      url = "/api/dataset";
    }
    
    $.ajax({
      url: url,
      method: "GET",
    })
    .done(function(responseData){
      var chartData = [];
      var meanChartData = [];
      var medianChartData = [];
      var maxAgeChartData = [];
      var schoolData = {
          id: ["studentId"],
          age: ["age"],
          grade: ["grade"],
          lastName: ["lastName"],
          checkListDate: ["x"],
          counselorFirstName: ["counselorFirstName"],
          meanAge: ['meanAge'],
          medianAge: ['medianAge'],
          maxAge: ['maxAge'],
          minAge: ['minAge']
        };
      //console.log("jsonObj responseData:",responseData);
      jsonObjArray = responseData;
      schoolData.id = schoolData.id.concat(getDataArray(jsonObjArray, "StudentID"));
      schoolData.age = schoolData.age.concat(getDataArray(jsonObjArray, "Age"));
      schoolData.grade = schoolData.grade.concat(getDataArray(jsonObjArray, "Grade"));
      schoolData.lastName = schoolData.lastName.concat(getDataArray(jsonObjArray, "LastName"));
      schoolData.checkListDate = schoolData.checkListDate.concat(getDataArray(jsonObjArray, "CheckListDate"));
      schoolData.counselorFirstName = schoolData.counselorFirstName.concat(getDataArray(jsonObjArray, "CounselorFirstname"));

      console.log("schoolData:", schoolData);
      chartData.push(schoolData.checkListDate, schoolData.age);
      // console.log("chart:",chartData);
      goChart(chartData);
      //mean chart data.
      schoolData.meanAge = schoolData.meanAge.concat(getMean(getDataArray(jsonObjArray, "Age")));
      meanChartData.push(schoolData.meanAge);
      showMeanChart(meanChartData);
      // median chart data
      schoolData.medianAge = schoolData.medianAge.concat(getMedian(getDataArray(jsonObjArray, "Age")));
      medianChartData.push(schoolData.medianAge);
      showMedianChart(medianChartData);
      // max Age chart data
      schoolData.maxAge.push( Math.max.apply(null, getDataArray(jsonObjArray, "Age")));
      maxAgeChartData.push(schoolData.maxAge);
      showMaxAgeChart(maxAgeChartData);
      return jsonObjArray;
    })
    .fail(function(error){
      console.log("error with getting jsonObjArray:",error);
    // });
    });
  }


  function getJsonData(url){

    $.ajax({
      url:url,
      method: "GET" 
    })
    .done(function(responseData){
      console.log("responseData from "+ url, ":", responseData);
      var jsonEdDataArray = [];
      //attach response to chart or
      // convert response to need arrays then add to chart
      showEduChart(responseData, "#educationChart");
    })
    .fail(function(error){
      console.log("Error with getting "+url, ":", error);
    });
  }

})();