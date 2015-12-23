var parseHelper = {
      lowerCase: lowerCase,
      arrDateObjFormator:arrDateObjFormator
};


function lowerCase(obj, key) {

  var lowerC = {};
  lowerC[key.lowerCase()] = obj;
  console.log("lowerC:", lowerC);
  return  lowerC;
}

function arrDateObjFormator(dateStr) {

  var dateArray = dateStr.split(/\/|-/g);
  console.log("date array parseHelper", dateArray);

  var year = dateArray[2];
  var month = addZero(dateArray[0]);
  var day = addZero(dateArray[1]);
  dateStr = year +"-"+ month +"-"+ day;
  console.log("date str parseHelper", dateStr);

  return dateStr;
}

function addZero(str) {
    if(str.length === 1){
      str = "0"+ str;
    }
    return str;
}

function changeDelimiter(dateStr, delimiter){
  dateStr = dateStr.replace(/\/|-/g, delimiter);
  return dateStr;
}

function splitDateStr(dateStr, mmddyyyy) {
  var dateArray = dateStr.split(/\/|-/g);



  return dateStr;

}


module.exports = parseHelper;





