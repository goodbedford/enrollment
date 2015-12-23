(function(){

  
  var arryEven = [1,2,1,1]; //1,1,1,2
  var arryOdd = [1,3,2,1,1].sort();//1,1,1,2,3
  var fromDate = document.dateRange.fromDate;
  var toDate = document.dateRange.toDate;

  // console.log("mean:", getMean(arryEven));
  // console.log("median:", getMedian(arryEven));
  // document.dateRange.from.value = "2013-07-01";
  // document.dateRange.to.value = "2014-06-30";

  //setUp
  csvToJson();
  fromDate.value = "2013-07-01";
  toDate.value = "2014-06-30";

  dateChangeListener();
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

  function getMedian(myArray){
    var middleIndexA;
    var middleIndexB;
    var median = 0;
    var sortedArray = myArray.sort();
    if( sortedArray.length % 2 === 0){
      middleIndexA = (sortedArray.length / 2) - 1;
      middleIndexB = middleIndexA +1;
      median = (sortedArray[middleIndexA] + sortedArray[middleIndexB]) / 2;
    } else {
      median = Math.floor(sortedArray.length / 2);
    }
    return median.toFixed(2);
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
        height: 250
      },
      data:{
        columns: chartData,
        type: 'gauge',
        color: function(color, d){
          console.log("the color is:", color);
          console.log("c:is ",d.value);
          return "navy" ;
        }
      }

    });

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
  
    function getDataArray(jsonObjArray,objKey) {
      var someArray = jsonObjArray.map(function(jsonObj){
        // console.log(jsonObj);
        return jsonObj[objKey];
      });

      // someArray.unshift(type);
      //console.log('someArray:', someArray);
      return someArray;
    }

    function csvToJson(dFrom, dTo) {
      // var dFrom = "2013-09-01";
      // var dTo = "2014-06-030";
      // var dFrom = "09-01-2013";
      // var dTo = "06-30-2014";
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
        var schoolData = {
            id: ["studentId"],
            age: ["age"],
            grade: ["grade"],
            lastName: ["lastName"],
            checkListDate: ["x"],
            counselorFirstName: ["counselorFirstName"],
            meanAge: ['meanAge'],
            medianAge: ['medianAge']
          };
        //console.log("jsonObj responseData:",responseData);
        jsonObjArray = responseData;
        schoolData.id = schoolData.id.concat(getDataArray(jsonObjArray, "StudentID"));
        schoolData.age = schoolData.age.concat(getDataArray(jsonObjArray, "Age"));
        schoolData.grade = schoolData.grade.concat(getDataArray(jsonObjArray, "Grade"));
        schoolData.lastName = schoolData.lastName.concat(getDataArray(jsonObjArray, "LastName"));
        schoolData.checkListDate = schoolData.checkListDate.concat(getDataArray(jsonObjArray, "CheckListDate"));
        schoolData.counselorFirstName = schoolData.counselorFirstName.concat(getDataArray(jsonObjArray, "CounselorFirstname"));
        schoolData.medianAge = schoolData.medianAge.concat(getMedian(getDataArray(jsonObjArray, "Age")));

        console.log("schoolData:", schoolData);
        chartData.push(schoolData.checkListDate, schoolData.age);
        // console.log("chart:",chartData);

        goChart(chartData);
        //mean chart data.
        schoolData.meanAge = schoolData.meanAge.concat(getMean(getDataArray(jsonObjArray, "Age")));
        meanChartData.push(schoolData.meanAge);
        showMeanChart(meanChartData);
        return jsonObjArray;
      })
      .fail(function(error){
        console.log("error with getting jsonObjArray:",error);
      // });
      });
    }

})();