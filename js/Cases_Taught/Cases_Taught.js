

function facultyFilter () {


	//clear the table rows on each button click
	$("#table tr").remove();

	//ref the dropdown selection values
	var facultySelect = document.getElementById("facSelect").value;


	//for each case study in the list, see if the selction in the drop down matches the
	//respective values in the json object.
	//If it matches, append the information to the table
	for (x = 0; x < caseData.length; x++) {

			if (facultySelect === caseData[x]['Faculty Name']) {
				console.log("last name: " + caseData[x]['Course no.']);
				console.log("facultySelect: " + facultySelect);
			var tr;
            tr = $('<tr/>');

            tr.append("<td>" + caseData[x].CaseTitle + "</td>"); 
            tr.append("<td>" + caseData[x].CourseTitle + "</td>");
            tr.append("<td>" + caseData[x]['Course no.'] + "</td>");
            tr.append("<td>" + caseData[x]['Faculty Name'] + "</td>");
            tr.append("<td>" + caseData[x].Inst1_Fname + "</td>");
            tr.append("<td>" + caseData[x].AY + "</td>");
            tr.append("<td>" + caseData[x].Publisher + "</td>");            
            tr.append("<td>" + caseData[x].Department + "</td>");
            console.log("Rows:" + caseData.length);
            $('table').append(tr);

			}
	}
}

function caseFilter () {


  //clear the table rows on each button click
  $("#table tr").remove();

  //ref the dropdown selection values
  var caseSelect = document.getElementById("cases").value;


  //for each case study in the list, see if the selction in the drop down matches the
  //respective values in the json object.
  //If it matches, append the information to the table
  for (x = 0; x < caseData.length; x++) {

      if (caseSelect === caseData[x].CaseTitle) {

      var tr;
            tr = $('<tr/>');

            tr.append("<td>" + caseData[x].CaseTitle + "</td>"); 
            tr.append("<td>" + caseData[x].CourseTitle + "</td>");
            tr.append("<td>" + caseData[x]['Course no.'] + "</td>");
            tr.append("<td>" + caseData[x]['Faculty Name'] + "</td>");
            tr.append("<td>" + caseData[x].Inst1_Fname + "</td>");
            tr.append("<td>" + caseData[x].AY + "</td>");
            tr.append("<td>" + caseData[x].Publisher + "</td>");            
            tr.append("<td>" + caseData[x].Department + "</td>");
            $('table').append(tr);

      }
  }
}

function programFilter () {


	//clear the table rows on each button click
	$("#table tr").remove();

	//ref the dropdown selection values
	var programSelect = document.getElementById("proSelect").value;


	//for each case study in the list, see if the selction in the drop down matches the
	//respective values in the json object.
	//If it matches, append the information to the table
	for (x = 0; x < caseData.length; x++) {

			if (programSelect === caseData[x].CourseTitle) {
				console.log("Case Title: " + caseData[x].CourseTitle);
				console.log("prograsmSelect: " + programSelect);
			var tr;
            tr = $('<tr/>');

            tr.append("<td>" + caseData[x].CaseTitle + "</td>"); 
            tr.append("<td>" + caseData[x].CourseTitle + "</td>");
            tr.append("<td>" + caseData[x]['Course no.'] + "</td>");
            tr.append("<td>" + caseData[x]['Faculty Name'] + "</td>");
            tr.append("<td>" + caseData[x].Inst1_Fname + "</td>");
            tr.append("<td>" + caseData[x].AY + "</td>");
            tr.append("<td>" + caseData[x].Publisher + "</td>");
            tr.append("<td>" + caseData[x].Department + "</td>");
            console.log("Rows:" + caseData.length);
            $('table').append(tr);

			}
	}
}

function sesFilter () {


  //clear the table rows on each button click
  $("#table tr").remove();

  //ref the dropdown selection values
  var sesSelect = document.getElementById("sesSelect").value;


  //for each case study in the list, see if the selction in the drop down matches the
  //respective values in the json object.
  //If it matches, append the information to the table
  for (x = 0; x < caseData.length; x++) {

      if (sesSelect == caseData[x]['Course no.']) {
        console.log("Session: " + caseData[x]['Course no.']);
        
      var tr;
            tr = $('<tr/>');

            tr.append("<td>" + caseData[x].CaseTitle + "</td>"); 
            tr.append("<td>" + caseData[x].CourseTitle + "</td>");
            tr.append("<td>" + caseData[x]['Course no.'] + "</td>");
            tr.append("<td>" + caseData[x]['Faculty Name'] + "</td>");
            tr.append("<td>" + caseData[x].Inst1_Fname + "</td>");
            tr.append("<td>" + caseData[x].AY + "</td>");
            tr.append("<td>" + caseData[x].Publisher + "</td>");
            tr.append("<td>" + caseData[x].Department + "</td>");
            console.log("Rows:" + caseData.length);
            $('table').append(tr);

      }
  }
}


function ayFilter () {


  //clear the table rows on each button click
  $("#table tr").remove();

  //ref the dropdown selection values
  var aySelect = document.getElementById("aySelect").value;


  //for each case study in the list, see if the selction in the drop down matches the
  //respective values in the json object.
  //If it matches, append the information to the table
  for (x = 0; x < caseData.length; x++) {

      if (aySelect == caseData[x].AY) {
        console.log("Case Title: " + caseData[x].AY);
        
      var tr;
            tr = $('<tr/>');

            tr.append("<td>" + caseData[x].CaseTitle + "</td>"); 
            tr.append("<td>" + caseData[x].CourseTitle + "</td>");
            tr.append("<td>" + caseData[x]['Course no.'] + "</td>");
            tr.append("<td>" + caseData[x]['Faculty Name'] + "</td>");
            tr.append("<td>" + caseData[x].Inst1_Fname + "</td>");
            tr.append("<td>" + caseData[x].AY + "</td>");
            tr.append("<td>" + caseData[x].Publisher + "</td>");
            tr.append("<td>" + caseData[x].Department + "</td>");
            console.log("Rows:" + caseData.length);
            $('table').append(tr);

      }
  }
}


//Preparing uniqe values for population into selection menus

//====================
// UNIQUE CASE LIST 
//====================
  function removeCaseElement(arrayName,arrayElement)
   {
      for(var i=0; i<arrayName.length;i++ )
       { 
          if(arrayName[i]==arrayElement)
              arrayName.splice(i,1); 
        } 
    }
  var allCase = [];
  var uniqueCase = {};
  for (var i = 0; i < caseData.length; ++i) {
      if (typeof(uniqueCase[caseData[i].CaseTitle]) == "undefined"){
          allCase.push(caseData[i].CaseTitle);
      }
           uniqueCase[caseData[i].CaseTitle] = 0;
  }
  allCase.sort();
  removeCaseElement(allCase, 0);
  console.log (allCase);


//====================
// UNIQUE FACULTY LIST 
//====================
  function removeFacElement(arrayName,arrayElement)
   {
      for(var i=0; i<arrayName.length;i++ )
       { 
          if(arrayName[i]==arrayElement)
              arrayName.splice(i,1); 
        } 
    }
  var allFac = [];
  var uniqueFac = {};
  for (var i = 0; i < caseData.length; ++i) {
      if (typeof(uniqueFac[caseData[i]['Faculty Name']]) == "undefined"){
          allFac.push(caseData[i]['Faculty Name']);
      }
           uniqueFac[caseData[i]['Faculty Name']] = 0;
  }
  allFac.sort();
  removeFacElement(allFac, 0);
  console.log (allFac);


//====================
// UNIQUE PROGRAM LIST 
//====================
  function removeProElement(arrayName,arrayElement)
   {
      for(var i=0; i<arrayName.length;i++ )
       { 
          if(arrayName[i]==arrayElement)
              arrayName.splice(i,1); 
        } 
    }
  var allPro = [];
  var uniquePro = {};
  for (var i = 0; i < caseData.length; ++i) {
      if (typeof(uniquePro[caseData[i].CourseTitle]) == "undefined"){
          allPro.push(caseData[i].CourseTitle);
      }
           uniquePro[caseData[i].CourseTitle] = 0;
  }
  allPro.sort();
  removeProElement(allPro, 0);


//====================
// UNIQUE SESSION LIST 
//====================
  function removeSesElement(arrayName,arrayElement)
   {
      for(var i=0; i<arrayName.length;i++ )
       { 
          if(arrayName[i]==arrayElement)
              arrayName.splice(i,1); 
        } 
    }
  var allSes = [];
  var uniqueSes = {};
  for (var i = 0; i < caseData.length; ++i) {
      if (typeof(uniqueSes[caseData[i]['Course no.']]) == "undefined"){
          allSes.push(caseData[i]['Course no.']);
      }
           uniqueSes[caseData[i]['Course no.']] = 0;
  }
  allSes.sort();
  removeProElement(allSes, 0);
  console.log (allSes);


//====================
// UNIQUE AY LIST 
//====================
  function removeAyElement(arrayName,arrayElement)
   {
      for(var i=0; i<arrayName.length;i++ )
       { 
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

