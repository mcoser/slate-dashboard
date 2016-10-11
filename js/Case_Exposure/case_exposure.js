
var sortedObjArr = 0;

//====================
// UNIQUE AY LIST 
//====================
function removeAyElement(arrayName,arrayElement) {
  for(var i=0; i<arrayName.length;i++ ) { 
        if(arrayName[i]==arrayElement)
            arrayName.splice(i,1); 
      } 
}

var allAy = [];
var uniqueAy = {};
for (var i = 0; i < caseData.length; ++i) {
    if (typeof(uniqueAy[caseData[i].AY]) == "undefined"){
        allAy.push(caseData[i].AY);
    }
         uniqueAy[caseData[i].AY] = 0;
}

allAy.sort();
removeAyElement(allAy, 0);
console.log (allAy);




//====================
// Selected Year Case List
//====================
function whatYear () {
  SY_CaseTitleList = []; 
  SY_EnrollmentNumbers = [];


  SY_UniqeCaseTitleList = [];

  /* Get all cases from selected year */
  var currentYear = $("#aySelect").val(); 
  console.log(currentYear);
  for (var i=0; i<caseData.length; i++) {
    if (caseData[i].AY == currentYear) {
      SY_CaseTitleList.push(caseData[i].CaseTitle);
      SY_EnrollmentNumbers.push(caseData[i].CourseEnrollment);
    }
  }

  console.log(SY_CaseTitleList);

  /* Extract unique cases */
  for(i = 0; i< SY_CaseTitleList.length; i++){    
      if(SY_UniqeCaseTitleList.indexOf(SY_CaseTitleList[i]) === -1){
          SY_UniqeCaseTitleList.push(SY_CaseTitleList[i]);        
      }        
  }
  console.log(SY_UniqeCaseTitleList);
  console.log(SY_EnrollmentNumbers);


  /*enrollment numbers?? */
  var summedEnrollment = [];
  for (var x = 0; x < SY_UniqeCaseTitleList.length; x++) {
    enrollmentArray = [];
    

    for (var c = 0; c < SY_CaseTitleList.length; c++) {
      if (SY_UniqeCaseTitleList[x] == SY_CaseTitleList[c]) {

        enrollmentArray.push(SY_EnrollmentNumbers[c]);
      }

    }

      var localSum = enrollmentArray.reduce(add, 0);

        function add(a, b) {
            return a + b;
        }
        summedEnrollment.push(localSum);
  }

  //for eachunique case, run against full list.
  //for each unique case, find the enrollment number on full list, and opush to a separat elist
  //sum separate list and push tat value, and unoqcaseot to obj

console.log(enrollmentArray);
console.log(summedEnrollment);



  function objCombine(names, values) {
      var result = {};
      for (var i = 0; i < names.length; i++)
           result[names[i]] = values[i];
      return result;
  }

  var objTest = objCombine(SY_UniqeCaseTitleList, summedEnrollment);
  console.log(objTest);


  function sortObject(obj) {
      var arr = [];
      var prop;
      for (prop in obj) {
          if (obj.hasOwnProperty(prop)) {
              arr.push({
                  'key': prop,
                  'value': obj[prop]
              });
          }
      }
      arr.sort(function(a, b) {
          return a.value - b.value;
      });
      return arr; // returns array
  }

  var sortedObjArr = sortObject(objTest);
  console.log(sortedObjArr[9]);


  //clear the table rows on each button click
  $("#table tr").remove();

  
  for (x = 0; x < sortedObjArr.length; x++) {

      
        
      var tr;
            tr = $('<tr/>');

            tr.append("<td>" + sortedObjArr[x].key + "</td>"); 
            tr.append("<td>" + sortedObjArr[x].value + "</td>");


            $('table').append(tr);

      }
  

/* whatYear() end bracket */
}



function pullExpoList () {


  function removeCaseElement(arrayName,arrayElement) {
    for(var i=0; i<arrayName.length;i++ ) { 
      if(arrayName[i]==arrayElement)
        arrayName.splice(i,1); 
    } 
  }

  var allCase = [];
  var uniqueCase = {};
  var summedEnrollment = [];

  var currentYear = $("#aySelect").val();
  for (var i = 0; i < caseData.length; ++i) {
      if (typeof(uniqueCase[caseData[i].CaseTitle]) == "undefined"){
          allCase.push(caseData[i].CaseTitle);
      }
           uniqueCase[caseData[i].CaseTitle] = 0;
  


  for (var x = 0; x < allCase.length; x++) {
    enrollmentArray = [];

    for (var c = 0; c < caseData.length; c++) {
      if (allCase[x] == caseData[c].CaseTitle) {

        enrollmentArray.push(caseData[c].CourseEnrollment);
      }

    }

      var localSum = enrollmentArray.reduce(add, 0);

        function add(a, b) {
            return a + b;
        }
        summedEnrollment.push(localSum);

  }


  console.log(allCase);

  console.log(summedEnrollment);

  removeCaseElement(allCase, 0);

  function objCombine(names, values) {
      var result = {};
      for (var i = 0; i < names.length; i++)
           result[names[i]] = values[i];
      return result;
  }

  var objTest = objCombine(allCase, summedEnrollment);
  console.log(objTest);


  function sortObject(obj) {
      var arr = [];
      var prop;
      for (prop in obj) {
          if (obj.hasOwnProperty(prop)) {
              arr.push({
                  'key': prop,
                  'value': obj[prop]
              });
          }
      }
      arr.sort(function(a, b) {
          return a.value - b.value;
      });
      return arr; // returns array
  }



  var sortedObjArr = sortObject(objTest);
  console.log(sortedObjArr[60]);


  var globalCounter = 0;
  var table = document.getElementById('table');
  console.log(table);

  for (var i = 0; i < Object.keys(sortedObjArr).length; i++) {
      var tr = "<tr>";
      if (sortedObjArr[i].value.toString().substring(sortedObjArr[i].value.toString().indexOf('.'), sortedObjArr[i].value.toString().length) < 2) sortedObjArr[i].value += "0";

      tr += "<td>" + sortedObjArr[i].key + "</td>" + "<td>" + sortedObjArr[i].value.toString() + "</td></tr>";
      table.innerHTML += tr;
  }




}
/* pullExpoList() end bracket */
}

//==============
//Export to CSV 
//============== 
$(document).ready(function () {
    function exportTableToCSV($table, filename) {
        var $rows = $table.find('tr:has(td)'),

            // Temporary delimiter characters unlikely to be typed by keyboard
            // This is to avoid accidentally splitting the actual contents
            tmpColDelim = String.fromCharCode(11), // vertical tab character
            tmpRowDelim = String.fromCharCode(0), // null character

            // actual delimiter characters for CSV format
            colDelim = '","',
            rowDelim = '"\r\n"',

            // Grab text from table into CSV formatted string
            csv = '"' + $rows.map(function (i, row) {
                var $row = $(row),
                    $cols = $row.find('td');
                return $cols.map(function (j, col) {
                    var $col = $(col),
                        text = $col.text();
                    return text.replace(/"/g, '""'); // escape double quotes
                }).get().join(tmpColDelim);
            }).get().join(tmpRowDelim)
                .split(tmpRowDelim).join(rowDelim)
                .split(tmpColDelim).join(colDelim) + '"',

            // Data URI
            csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
        $(this)
            .attr({
            'download': filename,
                'href': csvData,
                'target': '_blank'
        });
    }

    // This must be a hyperlink
    $("#export").on('click', function (event) {

        // CSV
        exportTableToCSV.apply(this, [$('#mainTable>table'), 'export.csv']);
        
        // IF CSV, don't do event.preventDefault() or return false
        // We actually need this to be a typical hyperlink
    });
});

