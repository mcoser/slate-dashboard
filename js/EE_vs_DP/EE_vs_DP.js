
var degPro = 0;
var execEd = 0;
var other = 0;


  

/*****************

LINE CHART

*****************/
$( document ).ready(function() {

var lineChartData = {
        labels: allYears,
        datasets: [{
            fillColor: "transparent",
            pointColor: "black",
            strokeColor: "#003946",
            data: degNums,
        },
        {
            fillColor: "transparent",
            pointColor: "black",
            strokeColor: "#A71930",
            data: execNums,
        },
        {
            fillColor: "transparent",
            pointColor: "black",
            strokeColor: "#857363",
            data: otherNums,
        }]
    };

var ctx = document.getElementById("lineCanvas").getContext("2d");
var myLine = new Chart(ctx).Line(lineChartData, {
    showTooltips: false,
    bezierCurve: false,
   
    onAnimationComplete: function () {

        var ctx = this.chart.ctx;
        ctx.font = this.scale.font;
        //ctx.fillStyle = this.scale.textColor
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";

        this.datasets.forEach(function (dataset) {
            dataset.points.forEach(function (points) {
                ctx.fillText(points.value, points.x, points.y - 10);
            });
        })
    },


});

});




function getLineData () {
    //=====================================
    //
    //  Gets unique Departments - 
    //
    //=====================================
    var allDepts = [];
    var uniqueDepts = {};

    for (var i = 0; i < caseData.length; ++i) {

        if (typeof(uniqueDepts[caseData[i].Department]) == "undefined"){
            allDepts.push(caseData[i].Department);
        }
         uniqueDepts[caseData[i].Department] = 0;
     }

    for (var p = 0; p < caseData.length; p++) {

        if (caseData[p].Department == "Degree Program") {
        		
                degPro++;
            }
                else if (caseData[p].Department == "Executive Education") {
                    execEd++;
                }
                    else {
                        other++;
                    }
                }
        
    console.log(degPro);
    console.log(execEd);
    console.log(other);
    console.log("years: " + allYears);

    for (var y = 0; y < allYears.length; y++) {
        var degCounter = 0;
        var execCounter = 0;
        var otherCounter = 0;
        for (var d = 0; d < caseData.length; d++) {

            if (allYears[y] == caseData[d].AY) {

                if (caseData[d].Department == "Degree Program") {
                    degCounter++;
                }
                    else if (caseData[d].Department == "Executive Education") {
                        execCounter++;
                    }
                    	else {
                    		otherCounter++
                    	}

            }

        }
                degNums.push(degCounter);
                execNums.push(execCounter);
                otherNums.push(otherCounter);
                
                

                console.log("Deg: " + degCounter);
                console.log("exec: " + execCounter);
                console.log("other: " + otherCounter);
    }
    console.log("Deg TOTAL: " + degNums);
    console.log("Exec TOTAL: " + execNums);
}








//count how many times the Department occurs in each year
//year list needs to be generated on load








/*
$(function() {
    $('#hksCheck').click(function() {
        $('#lineDivs').append('<canvas id="lineCanvas"></canvas>');
        $('#lineDivs').append('<h3>Cornvis</h3>');
    });
    });
console.log(uniquePubs);

//count each course per Department

for( var i in caseData){
    if ()

for (var p = 0; p < caseData.length; p++) {
    if ()
}

$('#barChartCanvas').empty();
$('#barChartCanvas').append('<canvas id="barCanvas"></canvas>');
        
*/















