var express = require('express');
var app = express();
var fs = require('fs');
var Converter = require('csvtojson').Converter;
var jsonData;
var jsonEdData;
var parseHelper = require('./helper/parseHelper.js');
var converter = new Converter({
  //auto type check
  checkType: true 
});
var converter2 = new Converter({
  //auto type check
  checkType: true 
});

// subscribtion data
var filename = './part1/vendors/checklistQuery2.csv';
converter.on('end_parsed', function(jsonArray){
  jsonData = jsonArray;
  // console.log("j data:", jsonData);
});
fs.createReadStream(filename).pipe(converter);
//education data
var filename2 = './part1/vendors/educationData.csv';
converter2.on('end_parsed', function(jsonEdArray){
  jsonEdDataArray = jsonEdArray;
  console.log("filename2: csv2json:", jsonEdDataArray);
});
fs.createReadStream(filename2).pipe(converter2); 

 
// app.use(express.static('/part1'));
app.use(express.static(__dirname + "/part1"));

app.get('/', function(req, res){

  res.sendFile("index.html");
});
// return converted csv to json
app.get('/api/dataset?', function(req, res){
  console.log("req.query", req.query);
  var from = req.query.from || '';
  var to = req.query.to || '';
  var newArray = [];
  var tempDate = [];
  if(from){
    jsonData.forEach(function(jObj){
      var tempObj = (JSON.parse(JSON.stringify(jObj)));
      tempObj['CheckListDate'] = parseHelper.arrDateObjFormator(jObj['CheckListDate']);

      if( tempObj['CheckListDate'] >= from && tempObj['CheckListDate'] <= to ){
        newArray.push(tempObj);
        console.log("newObj added to newArray in server:", tempObj);
      } else {
        console.log("error with date range");
        console.log("CheckListDate", tempObj['CheckListDate']);
        console.log("from date", from);
        console.log("to date", to);
      }
    });

    res.json(newArray);
  } else {
    console.log("default date selected:");
    console.log("jsonData array before formater:", jsonData);
    jsonData.forEach(function(jObj){
      console.log("jObj before formater:", jObj['CheckListDate']);
      var tempObj = (JSON.parse(JSON.stringify(jObj)));
      tempObj['CheckListDate'] = parseHelper.arrDateObjFormator(jObj['CheckListDate']);
      newArray.push(tempObj);
    });
    console.log("newArray  after formater",newArray);
    res.json(newArray);
  }  
});

app.get('/api/dataset/edu', function(req, res){
  console.log("the req fo edu:", req);
  console.log("the education data:", jsonEdDataArray);

  res.json(jsonEdDataArray);

});

app.listen(process.env.PORT || 3000, successCallBack);

function successCallBack() {
  console.log("listening on Port");
}