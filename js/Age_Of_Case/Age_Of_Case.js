//var for current year selected in selection box
var currentYear = $("#aySelect").val(); 

/*
//Full list of Case Titles from raw json
var cases = [];
for (var i in caseData){
    cases.push(caseData[i].CaseTitle);
}

console.log("Full List of Case Titles");
console.log(cases)


//extracting unique case titles from full list (all years) - method 1
Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}

var uniqueCaseArray = cases.unique(); 
console.log("Unique Case Array 1");
console.log(uniqueCaseArray);


//extracting unique case titles from full list (all years) - method 2
var uniqueCaseObj = {};
var caseDataName = [];
    for( var i in caseData){
     if( typeof(uniqueCaseObj[caseData[i].CaseTitle]) == "undefined"){
      caseDataName.push(caseData[i].CaseTitle);
     }
     uniqueCaseObj[caseData[i].CaseTitle] = 0;
    }
console.log("Unique case titles in Object")
console.log(uniqueCaseObj);
console.log("Unique case titles in Array")
console.log(caseDataName);
*/

//Get unique AY field values, and sort - may not work in Firefox
var uniqueAyObj = {};
var uniqueAyArr = [];
    for( var i in caseData){
     if( typeof(uniqueAyObj[caseData[i].AY]) == "undefined"){
      uniqueAyArr.push(caseData[i].AY);
     }
     uniqueAyObj[caseData[i].AY] = 0;
    }
console.log("Object for Unique AYs");
console.log(uniqueAyObj);
console.log("Array for Unique AYs");
console.log(uniqueAyArr);


//remove any blanks, or text that is not a Year, for dropdown selector
var uniqueAyArr_Format = [];
function uniqueValues(arr) {

    for (var i=0, l=arr.length; i<l; i++)
        if (uniqueAyArr_Format.indexOf(arr[i]) === -1 && arr[i] !== '')
            uniqueAyArr_Format.push(arr[i]);
    return uniqueAyArr_Format;

}

uniqueValues(uniqueAyArr);
uniqueAyArr_Format.sort();
console.log("uniqueAyArr_Format: ");
console.log(uniqueAyArr_Format);
console.log("uniqueAyArr_Format: ");
console.log(uniqueAyArr_Format[1]);


//momentjs test - vars are isolated
var momToad = moment();
console.log("momToad: ");
console.log(momToad);

var subStr = momToad.subtract(1, "years").format("DD-MM-YYYY");
console.log("subStr: ");
console.log(subStr);


//setting age ranges based on today's year
//Today
var today = new Date();
//Isolate only today's year
var todayYear           = (today.getFullYear());
//today, five years ago
var pastFive            = (todayYear - 5);
//and so on
var pastTen             = (todayYear - 10);
//i know, probably not the best way to do this...
var pastFifteen         = (todayYear - 15);
var pastTwenty          = (todayYear - 20);
var pastTwentyFive      = (todayYear - 25);
var pastThirty          = (todayYear - 30);
var pastThirtyFive      = (todayYear - 35);
var pastForty           = (todayYear - 40);

console.log("today: ")
console.log(today);
console.log("todayYear:")
console.log(todayYear);
console.log("40 years ago: ");
console.log(pastForty);


//variables for chart data

var yearCount  = 0;
var withData   = 0;

//get data - only in Chrome - has to do with date formatting in firefox
function getData() {

    //count each time a case is taught at HKS
    //In other words, number of sessions in which a case was used duirng a specified academic year
    //these numbers may reflect a sigle session thatused multiple cases,
    //or an individual case that is used multiple times in multiple places
    //vars reset each time function is called    
    var pubCount5               = 0;
    var pubCount10              = 0;
    var pubCount15              = 0;
    var pubCount20              = 0;
    var pubCount25              = 0;
    var pubCount30              = 0;
    var pubCount35              = 0;
    var pubCount40              = 0;
    var pubCount40more          = 0;
    var all                     = 0;
    var lessThanTen             = 0;

    //unique cases
    var UpubCount5              = 0;
    var UpubCount10             = 0;
    var UpubCount15             = 0;
    var UpubCount20             = 0;
    var UpubCount25             = 0;
    var UpubCount30             = 0;
    var UpubCount35             = 0;
    var UpubCount40             = 0;
    var UpubCount40more         = 0;

    var yearAll = 0;
    var noPubDate  = 0;
    var UnoPubDate = 0;
    var UlessThanTen = 0;

    //unique cases used in EE
    var UpubCount5_EE           = 0;
    var UpubCount10_EE          = 0;
    var UpubCount15_EE          = 0;
    var UpubCount20_EE          = 0;
    var UpubCount25_EE          = 0;
    var UpubCount30_EE          = 0;
    var UpubCount35_EE          = 0;
    var UpubCount40_EE          = 0;
    var UpubCount40more_EE      = 0;
    var UnoPubDate_EE = 0;

    //unique cases used in DP
    var UpubCount5_DP           = 0;
    var UpubCount10_DP          = 0;
    var UpubCount15_DP          = 0;
    var UpubCount20_DP          = 0;
    var UpubCount25_DP          = 0;
    var UpubCount30_DP          = 0;
    var UpubCount35_DP          = 0;
    var UpubCount40_DP          = 0;
    var UpubCount40more_DP      = 0;
    var UnoPubDate_DP = 0;

    var yearlyCaseNames     = [];

    //Initialize chart with data and settings
    //fill pubDate var with publication dates from case data list
    for (var i = 0; i < caseData.length; ++i) {

        //make the date string from the case data list a usable formatted date - see moment.js
        var pubDate = moment(new Date(caseData[i].PubDate));

        //fill pubDateYear var with just the years of the publication dates from pubDate
        var pubDateYear = pubDate._i.getFullYear();

        //iterate through the data, and if the AY matches the selected year, populate var based on time/ age
        //want to consolidate into a different more effecient function - feedback welcome
        if (caseData[i].AY == currentYear) {
            all++;
            yearCount++;
            if (pubDateYear >= pastTen) {
            lessThanTen ++;
            }
            if (pubDateYear <= todayYear && pubDateYear >= pastFive ) {
                pubCount5++;
            }
                else if (pubDateYear < pastFive && pubDateYear >= pastTen) {
                    pubCount10++;
                }
                    else if (pubDateYear < pastTen && pubDateYear >= pastFifteen) {
                        pubCount15++;
                    }
                        else if (pubDateYear < pastFifteen && pubDateYear >= pastTwenty) {
                            pubCount20++;
                        }
                            else if (pubDateYear < pastTwenty && pubDateYear >= pastTwentyFive) {
                                pubCount25++;
                            }
                                else if (pubDateYear < pastTwentyFive && pubDateYear >= pastThirty) {
                                    pubCount30++;
                                }
                                    else if(pubDateYear < pastThirty && pubDateYear >= pastThirtyFive) {
                                        pubCount35++;
                                    }
                                       else if (pubDateYear < pastThirtyFive && pubDateYear >= pastForty) {
                                            pubCount40++;
                                        }
                                            else if (caseData[i].PubDate == "00-Jan-1900") {                                  
                                                noPubDate++;
                                            }
                                                else if (caseData[i].PubDate == "0") {
                                                    noPubDate++;
                                                }
                                                    else if (caseData[i].PubDate =="") {
                                                        noPubDate++;
                                                    }
                                                        else {
                                                            pubCount40more++;
                                                        }

        //array with records of ay, case title, and pub date in selected AY
        yearlyCaseNames.push({caseTitle: caseData[i].CaseTitle, pubDate: caseData[i].PubDate, ay: caseData[i].AY, dept: caseData[i].Department});
        
        }
    }
        
    //Remove duplicates from the yearlyCaseNames array.  Resulting object should be list of unique
    //case titles from selected AY with pubdate if applicable    
    var auxArr = {};

    for ( var i=0, len=yearlyCaseNames.length; i < len; i++ )
        auxArr[yearlyCaseNames[i]['caseTitle']] = yearlyCaseNames[i];

    yearlyCaseNames = new Array();
    for ( var key in auxArr )
        yearlyCaseNames.push(auxArr[key]);
            
    console.log("yearlyCaseNames");
    console.log(yearlyCaseNames);
    console.log("auxArr");
    console.log(auxArr);

    

    //age tally for full list of uniqe case titles taught in specified AY
    for (var i = 0; i < yearlyCaseNames.length; ++i) {
        //make the date string from the case data list a usable formatted date - see moment.js
        var UpubDate = moment(new Date(yearlyCaseNames[i].pubDate));

        //fill UpubDateYear var with just the years of the publication dates from UpubDate
        var UpubDateYear = UpubDate._i.getFullYear();
       
        yearAll++


        if (UpubDateYear >= pastTen) {
            UlessThanTen ++;
            }
        if (UpubDateYear <= todayYear && UpubDateYear >= pastFive ) {
            UpubCount5++;
                }
                    else if (UpubDateYear < pastFive && UpubDateYear >= pastTen) {
                        UpubCount10++;
                    }
                        else if (UpubDateYear < pastTen && UpubDateYear >= pastFifteen) {
                            UpubCount15++;
                        }
                            else if (UpubDateYear < pastFifteen && UpubDateYear >= pastTwenty) {
                                UpubCount20++;
                            }
                                else if (UpubDateYear < pastTwenty && UpubDateYear >= pastTwentyFive) {
                                    UpubCount25++;
                                }
                                    else if (UpubDateYear < pastTwentyFive && UpubDateYear >= pastThirty) {
                                        UpubCount30++;
                                    }
                                        else if(UpubDateYear < pastThirty && UpubDateYear >= pastThirtyFive) {
                                            UpubCount35++;
                                        }
                                           else if (UpubDateYear < pastThirtyFive && UpubDateYear >= pastForty) {
                                                UpubCount40++;
                                            }
                                                else if (UpubDateYear == "00-Jan-1900") {                                  
                                                    UnoPubDate++;
                                                }
                                                    else if (UpubDateYear == "0") {
                                                        UnoPubDate++;
                                                    }
                                                        else if (UpubDateYear == "") {
                                                            UnoPubDate++;
                                                        }
                                                            else if (isNaN(UpubDateYear) == true) {
                                                                UnoPubDate++;
                                                            }
                                                                else {
                                                                    UpubCount40more++;
                                                                }

        //age tally for uniqe case titles taught at Executive Education in specified AY                                                       
        if (yearlyCaseNames[i].dept == "Executive Education") {

            if (UpubDateYear <= todayYear && UpubDateYear >= pastFive ) {
                UpubCount5_EE++;
            }
                else if (UpubDateYear < pastFive && UpubDateYear >= pastTen) {
                    UpubCount10_EE++;
                }
                    else if (UpubDateYear < pastTen && UpubDateYear >= pastFifteen) {
                        UpubCount15_EE++;
                    }
                        else if (UpubDateYear < pastFifteen && UpubDateYear >= pastTwenty) {
                            UpubCount20_EE++;
                        }
                            else if (UpubDateYear < pastTwenty && UpubDateYear >= pastTwentyFive) {
                                UpubCount25_EE++;
                            }
                                else if (UpubDateYear < pastTwentyFive && UpubDateYear >= pastThirty) {
                                    UpubCount30_EE++;
                                }
                                    else if(UpubDateYear < pastThirty && UpubDateYear >= pastThirtyFive) {
                                        UpubCount35_EE++;
                                    }
                                       else if (UpubDateYear < pastThirtyFive && UpubDateYear >= pastForty) {
                                            UpubCount40_EE++;
                                        }
                                            else if (UpubDateYear == "00-Jan-1900") {                                  
                                                UnoPubDate_EE++;
                                            }
                                                else if (UpubDateYear == "0") {
                                                    UnoPubDate_EE++;
                                                }
                                                    else if (UpubDateYear == "") {
                                                        UnoPubDate_EE++;
                                                    }
                                                        else if (isNaN(UpubDateYear) == true) {
                                                            UnoPubDate_EE++;
                                                        }
                                                            else {
                                                                UpubCount40more_EE++;
                                                            }
        }     

        //age tally for uniqe case titles taught at Degree Programs in specified AY 
        if (yearlyCaseNames[i].dept == "Degree Program" || yearlyCaseNames[i].dept == "Degree Programs") {

            if (UpubDateYear <= todayYear && UpubDateYear >= pastFive ) {
                        UpubCount5_DP++;
            }
                else if (UpubDateYear < pastFive && UpubDateYear >= pastTen) {
                    UpubCount10_DP++;
                }
                    else if (UpubDateYear < pastTen && UpubDateYear >= pastFifteen) {
                        UpubCount15_DP++;
                    }
                        else if (UpubDateYear < pastFifteen && UpubDateYear >= pastTwenty) {
                            UpubCount20_DP++;
                        }
                            else if (UpubDateYear < pastTwenty && UpubDateYear >= pastTwentyFive) {
                                UpubCount25_DP++;
                            }
                                else if (UpubDateYear < pastTwentyFive && UpubDateYear >= pastThirty) {
                                    UpubCount30_DP++;
                                }
                                    else if(UpubDateYear < pastThirty && UpubDateYear >= pastThirtyFive) {
                                        UpubCount35_DP++;
                                    }
                                       else if (UpubDateYear < pastThirtyFive && UpubDateYear >= pastForty) {
                                            UpubCount40_DP++;
                                        }
                                            else if (UpubDateYear == "00-Jan-1900") {                                  
                                                UnoPubDate_DP++;
                                            }
                                                else if (UpubDateYear == "0") {
                                                    UnoPubDate_DP++;
                                                }
                                                    else if (UpubDateYear == "") {
                                                        UnoPubDate_DP++;
                                                    }
                                                        else if (isNaN(UpubDateYear) == true) {
                                                            UnoPubDate_DP++;
                                                        }
                                                            else {
                                                                UpubCount40more_DP++;
                                                            }
        }



    }



    //testing for the counting vars
    console.log("Cases in 0-5 years: " + pubCount5);
    console.log("Cases in 5-10 years: " + pubCount10);
    console.log("Cases in 10-15 years: " + pubCount15);
    console.log("Cases in 15-20 years: " + pubCount20);
    console.log("Cases in 20-25 years: " + pubCount25);
    console.log("Cases in 25-30 years: " + pubCount30);
    console.log("Cases in 30-35 years: " + pubCount35);
    console.log("Cases in 35-40 years: " + pubCount40);
    console.log("Cases in 40+ years: " + pubCount40more);
    console.log("No pub date: " + noPubDate);
    console.log("PUBDATE: " + pubDate);


    withData = (all - noPubDate);
    console.log("all: " + all);
    console.log("no pub: " + noPubDate);
    console.log(all);
    console.log("wiz with: " + withData);
    console.log("No pub date: " + noPubDate);
    console.log("PUBDATE: " + pubDate);
    console.log("past 10:" + pastTen);
    console.log("les than:" + lessThanTen);




    console.log("Cases in 0-5 yearsUUUU: " + UpubCount5);
    console.log("Cases in 5-10 yearsUUUU: " + UpubCount10);
    console.log("Cases in 10-15 yearsUUUU: " + UpubCount15);
    console.log("Cases in 15-20 yearsUUUU: " + UpubCount20);
    console.log("Cases in 20-25 yearsUUUU: " + UpubCount25);
    console.log("Cases in 25-30 yearsUUUU: " + UpubCount30);
    console.log("Cases in 30-35 yearsUUUU: " + UpubCount35);
    console.log("Cases in 35-40 yearsUUUU: " + UpubCount40);
    console.log("Cases in 40+ years: " + UpubCount40more);
    console.log("No pub date: " + UnoPubDate);
    console.log("UPUBDATE: " + UpubDate);



    console.log("Cases in 0-5 yearsUUUU_EE: " + UpubCount5_EE);
    console.log("Cases in 5-10 yearsUUUU_EE: " + UpubCount10_EE);
    console.log("Cases in 10-15 yearsUUUU_EE: " + UpubCount15_EE);
    console.log("Cases in 15-20 yearsUUUU_EE: " + UpubCount20_EE);
    console.log("Cases in 20-25 yearsUUUU_EE: " + UpubCount25_EE);
    console.log("Cases in 25-30 yearsUUUU_EE: " + UpubCount30_EE);
    console.log("Cases in 30-35 yearsUUUU_EE: " + UpubCount35_EE);
    console.log("Cases in 35-40 yearsUUUU_EE: " + UpubCount40_EE);

    console.log("Cases in 0-5 yearsUUUU_DP: " + UpubCount5_DP);
    console.log("Cases in 5-10 yearsUUUU_DP: " + UpubCount10_DP);
    console.log("Cases in 10-15 yearsUUUU_DP: " + UpubCount15_DP);
    console.log("Cases in 15-20 yearsUUUU_DP: " + UpubCount20_DP);
    console.log("Cases in 20-25 yearsUUUU_DP: " + UpubCount25_DP);
    console.log("Cases in 25-30 yearsUUUU_DP: " + UpubCount30_DP);
    console.log("Cases in 30-35 yearsUUUU_DP: " + UpubCount35_DP);
    console.log("Cases in 35-40 yearsUUUU_DP: " + UpubCount40_DP);
//chartjs config




/*****************
BAR CHART - Unique values
*****************/
var barChartData_Unique = {
        labels: ["0-5 Years", "5-10 Years", "10-15 Years", "15-20 Years", "20-25 Years", "25-30 Years", "30-35 Years", "35-40 Years", "40 + years"],
        datasets: [
            {
                fillColor: "#D55C19",
                data: [UpubCount5, UpubCount10, UpubCount15, UpubCount20, UpubCount25, UpubCount30, UpubCount35, UpubCount40, UpubCount40more]
            },
            ]

    };

var ctx = document.getElementById("barCanvasUnique").getContext("2d");
console.log("ctxORING: " + ctx);
var myLine = new Chart(ctx).Bar(barChartData_Unique, {
    showTooltips: false,
        scaleOverride : false,
        scaleSteps : 10,
        scaleStepWidth : 30,
        scaleStartValue : 0,
        //stacked: true,
    onAnimationComplete: function () {

        var ctx = this.chart.ctx;
        ctx.font = this.scale.font;
        //ctx.fillStyle = this.scale.textColor
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";

        this.datasets.forEach(function (dataset) {
            dataset.bars.forEach(function (bars) {
                ctx.fillText(bars.value, bars.x, bars.y - 10);
            });
        })
    }

});

// ======================================================
// Doughnut Chart 2
// ======================================================

// Doughnut Chart Options
var doughnutOptions2 = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,
    
    //String - The colour of each segment stroke
    segmentStrokeColor : "#fff",
    
    //Number - The width of each segment stroke
    segmentStrokeWidth : 2,
    
    //The percentage of the chart that we cut out of the middle.
    percentageInnerCutout : 50,
    
    //Boolean - Whether we should animate the chart 
    animation : true,
    
    //Number - Amount of animation steps
    animationSteps : 50,
    
    //String - Animation easing effect
    animationEasing : "easeOutBounce",
    
    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : true,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : true,
    
    //Function - Will fire on animation completion.
    onAnimationComplete : null,

    tooltipTemplate: "<%= label %> <%= value %>",
    
    onAnimationComplete: function()
    {
        this.showTooltip(this.segments, true);
    },
    
    tooltipEvents: [],
    
    showTooltips: true
    }
var uAll = yearlyCaseNames.length;
var uWithPubDate = (uAll - UnoPubDate);
// Doughnut Chart Data
var doughnutData2 = [
    {
        value : UnoPubDate,
        color : "#E0E0EB"
    },
    {
        label: "w/ Publication Date: ",
        value: uWithPubDate,
        color:"#D55C19"
    },
/*
var doughnutData2 = [
    {
        value : UmoreThanTen_NOay,
        color : "#E0E0EB"
    },
    {
        label: "< 10 Years: ",
        value: UlessThanTen_NOay,
        color:"#6A7F10"
    },
*/
]

//Get the context of the Doughnut Chart canvas element we want to select
var ctx = document.getElementById("pieCanvas2").getContext("2d");

// Create the Doughnut Chart
var mydoughnutChart2 = new Chart(ctx).Doughnut(doughnutData2, doughnutOptions2);

/*****************

LINE CHART

*****************/
$( document ).ready(function() {

var lineChartData = {
        labels: ["0-5 Years", "5-10 Years", "10-15 Years", "15-20 Years", "20-25 Years", "25-30 Years", "30-35 Years", "35-40 Years", "40 + years"],
      
        datasets: [{
            fillColor: "transparent",
            pointColor: "black",
            strokeColor: "#003946",
            data: [UpubCount5_EE, UpubCount15_EE, UpubCount10_EE, UpubCount20_EE, UpubCount25_EE, UpubCount30_EE, UpubCount35_EE, UpubCount40_EE, UpubCount40more_EE]
            
        },
        {
            fillColor: "transparent",
            pointColor: "black",
            strokeColor: "#A71930",
            data: [UpubCount5_DP, UpubCount10_DP, UpubCount15_DP, UpubCount20_DP, UpubCount25_DP, UpubCount30_DP, UpubCount35_DP, UpubCount40_DP, UpubCount40more_DP]
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

/*****************
BAR CHART - Unique values - DEPT=EE
*****************/
var barChartData_Unique_EE = {
        labels: ["0-5 Years", "5-10 Years", "10-15 Years", "15-20 Years", "20-25 Years", "25-30 Years", "30-35 Years", "35-40 Years", "40 + years"],
        datasets: [
            {
                fillColor: "red",
                data: [UpubCount5_EE, UpubCount15_EE, UpubCount10_EE, UpubCount20_EE, UpubCount25_EE, UpubCount30_EE, UpubCount35_EE, UpubCount40_EE, UpubCount40more_EE]
            },
            ]

    };

var ctx = document.getElementById("barCanvasUniqueEE").getContext("2d");
console.log("ctxORING: " + ctx);
var myLine = new Chart(ctx).Bar(barChartData_Unique_EE, {
    showTooltips: false,
        scaleOverride : false,
        scaleSteps : 10,
        scaleStepWidth : 30,
        scaleStartValue : 0,
        //stacked: true,
    onAnimationComplete: function () {

        var ctx = this.chart.ctx;
        ctx.font = this.scale.font;
        //ctx.fillStyle = this.scale.textColor
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";

        this.datasets.forEach(function (dataset) {
            dataset.bars.forEach(function (bars) {
                ctx.fillText(bars.value, bars.x, bars.y - 10);
            });
        })
    }

});


/*****************
BAR CHART - Unique values - DEPT=DP
*****************/
var barChartData_Unique_DP = {
        labels: ["0-5 Years", "5-10 Years", "10-15 Years", "15-20 Years", "20-25 Years", "25-30 Years", "30-35 Years", "35-40 Years", "40 + years"],
        datasets: [
            {
                fillColor: "green",
                data: [UpubCount5_DP, UpubCount10_DP, UpubCount15_DP, UpubCount20_DP, UpubCount25_DP, UpubCount30_DP, UpubCount35_DP, UpubCount40_DP, UpubCount40more_DP]
            },
            ]

    };

var ctx = document.getElementById("barCanvasUniqueDP").getContext("2d");
console.log("ctxORING: " + ctx);
var myLine = new Chart(ctx).Bar(barChartData_Unique_DP, {
    showTooltips: false,
        scaleOverride : false,
        scaleSteps : 10,
        scaleStepWidth : 30,
        scaleStartValue : 0,
        //stacked: true,
    onAnimationComplete: function () {

        var ctx = this.chart.ctx;
        ctx.font = this.scale.font;
        //ctx.fillStyle = this.scale.textColor
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";

        this.datasets.forEach(function (dataset) {
            dataset.bars.forEach(function (bars) {
                ctx.fillText(bars.value, bars.x, bars.y - 10);
            });
        })
    }

});


//EMND BAR CHARTS



console.log("%^%*@%*@%@&*%@*&@%&*@%@^&%@&*@%@&*^%@&*%");
console.log("yearAll" + yearAll);
    document.getElementById("uCasesAll").innerHTML = yearAll;
    
console.log(UlessThanTen);
    document.getElementById("lessTenAll").innerHTML = UlessThanTen;

console.log(UnoPubDate);

    document.getElementById("noPubAll").innerHTML = UnoPubDate;
    

}

    var Uall_NOay          = 0;
    var UlessThanTen_NOay  = 0;
    var UnoPubDate_NOay = 0;

function getPies() {
    var fullCaseNames = [];


    var UpubCount5_NOay              = 0;
    var UpubCount10_NOay             = 0;
    var UpubCount15_NOay             = 0;
    var UpubCount20_NOay             = 0;
    var UpubCount25_NOay             = 0;
    var UpubCount30_NOay             = 0;
    var UpubCount35_NOay             = 0;
    var UpubCount40_NOay             = 0;
    var UpubCount40more_NOay         = 0;
    

    for (var i = 0; i < caseData.length; ++i) {
        fullCaseNames.push({caseTitle: caseData[i].CaseTitle, pubDate: caseData[i].PubDate, ay: caseData[i].AY, dept: caseData[i].Department});
        }
            
    //Remove duplicates from the fullCaseNames array.  Resulting object should be list of unique
    //case titles from selected AY with pubdate if applicable    
    var auxArr2 = {};

    for ( var i=0, len=fullCaseNames.length; i < len; i++ )
        auxArr2[fullCaseNames[i]['caseTitle']] = fullCaseNames[i];

    fullCaseNames = new Array();
    for ( var key in auxArr2 )
        fullCaseNames.push(auxArr2[key]);
            
    console.log("fullCaseNames");
    console.log(fullCaseNames);
    console.log("auxArr2");
    console.log(auxArr2);

        
    for (var i = 0; i < fullCaseNames.length; ++i) {
        //make the date string from the case data list a usable formatted date - see moment.js
        var UpubDate_NOay = moment(new Date(fullCaseNames[i].pubDate));

        //fill UpubDateYear_NOay var with just the years of the publication dates from UpubDate
        var UpubDateYear_NOay = UpubDate_NOay._i.getFullYear();
        Uall_NOay++;
        if (UpubDateYear_NOay >= pastTen) {
            UlessThanTen_NOay ++;
        }



        if (UpubDateYear_NOay <= todayYear && UpubDateYear_NOay >= pastFive ) {
                    UpubCount5_NOay++;
                }
                    else if (UpubDateYear_NOay < pastFive && UpubDateYear_NOay >= pastTen) {
                        UpubCount10_NOay++;
                    }
                        else if (UpubDateYear_NOay < pastTen && UpubDateYear_NOay >= pastFifteen) {
                            UpubCount15_NOay++;
                        }
                            else if (UpubDateYear_NOay < pastFifteen && UpubDateYear_NOay >= pastTwenty) {
                                UpubCount20_NOay++;
                            }
                                else if (UpubDateYear_NOay < pastTwenty && UpubDateYear_NOay >= pastTwentyFive) {
                                    UpubCount25_NOay++;
                                }
                                    else if (UpubDateYear_NOay < pastTwentyFive && UpubDateYear_NOay >= pastThirty) {
                                        UpubCount30_NOay++;
                                    }
                                        else if(UpubDateYear_NOay < pastThirty && UpubDateYear_NOay >= pastThirtyFive) {
                                            UpubCount35_NOay++;
                                        }
                                           else if (UpubDateYear_NOay < pastThirtyFive && UpubDateYear_NOay >= pastForty) {
                                                UpubCount40_NOay++;
                                            }
                                                else if (UpubDateYear_NOay == "00-Jan-1900") {                                  
                                                    UnoPubDate_NOay++;
                                                }
                                                    else if (UpubDateYear_NOay == "0") {
                                                        UnoPubDate_NOay++;
                                                    }
                                                        else if (UpubDateYear_NOay == "") {
                                                            UnoPubDate_NOay++;
                                                        }
                                                            else if (isNaN(UpubDateYear_NOay) == true) {
                                                                UnoPubDate_NOay++;
                                                            }
                                                                else {
                                                                    UpubCount40more_NOay++;
                                                                }

    }
            
    console.log("UnoPubDate_NOay");
    console.log(UnoPubDate_NOay);
    var withPub_NOay = Uall_NOay - UnoPubDate_NOay;



    var doughChartData = {
    labels: ["Has Publication Date", "No Publication Date Listed"],
    datasets: [{
        label: 'Publication Date',
        backgroundColor: ["#E0E0EB", '#A71930'],
        data: [withPub_NOay, UnoPubDate_NOay]
    }]


};



// ======================================================
// Doughnut Chart
// ======================================================

// Doughnut Chart Options
var doughnutOptions = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,
    
    //String - The colour of each segment stroke
    segmentStrokeColor : "#fff",
    
    //Number - The width of each segment stroke
    segmentStrokeWidth : 2,
    
    //The percentage of the chart that we cut out of the middle.
    percentageInnerCutout : 50,
    
    //Boolean - Whether we should animate the chart 
    animation : true,
    
    //Number - Amount of animation steps
    animationSteps : 50,
    
    //String - Animation easing effect
    animationEasing : "easeOutBounce",
    
    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : true,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : true,
    
    //Function - Will fire on animation completion.
    onAnimationComplete : null,

        tooltipTemplate: "<%= label %> <%= value %>",
        
        onAnimationComplete: function()
        {
            this.showTooltip(this.segments, true);
        },
        
        tooltipEvents: [],
        
        showTooltips: true
    }

   



// Doughnut Chart Data
var doughnutData = [
    {
        labelColor: "black",
        value: UnoPubDate_NOay,
        color:"#E0E0EB"
    },

    {
        label: "w/ Publication Date: ",
        value : withPub_NOay,
        color : "#D55C19"
    }

]


//Get the context of the Doughnut Chart canvas element we want to select
var ctx = document.getElementById("pieCanvas").getContext("2d");
console.log(ctx);

// Create the Doughnut Chart
var mydoughnutChart = new Chart(ctx).Doughnut(doughnutData, doughnutOptions);











var barChartData_Unique_NOay = {
        labels: ["0-5 Years", "5-10 Years", "10-15 Years", "15-20 Years", "20-25 Years", "25-30 Years", "30-35 Years", "35-40 Years", "40 + years"],
        datasets: [
            {
                fillColor: "#D55C19",
                data: [UpubCount5_NOay, UpubCount10_NOay, UpubCount15_NOay, UpubCount20_NOay, UpubCount25_NOay, UpubCount30_NOay, UpubCount35_NOay, UpubCount40_NOay, UpubCount40more_NOay]
            },
            ]

    };

var ctx = document.getElementById("barCanvasUnique_NOay").getContext("2d");
console.log("ctxORING: " + ctx);
var myLine = new Chart(ctx).Bar(barChartData_Unique_NOay, {
    showTooltips: false,
        scaleOverride : false,
        scaleSteps : 10,
        scaleStepWidth : 30,
        scaleStartValue : 0,
        //stacked: true,
    onAnimationComplete: function () {

        var ctx = this.chart.ctx;
        ctx.font = this.scale.font;
        //ctx.fillStyle = this.scale.textColor
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";

        this.datasets.forEach(function (dataset) {
            dataset.bars.forEach(function (bars) {
                ctx.fillText(bars.value, bars.x, bars.y - 10);
            });
        })
    }

});

    console.log("Cases in 0-5 yearsUUUU__NO AY: " + UpubCount5_NOay);
    console.log("Cases in 5-10 yearsUUUU__NO AY: " + UpubCount10_NOay);
    console.log("Cases in 10-15 yearsUUUU__NO AY: " + UpubCount15_NOay);
    console.log("Cases in 15-20 yearsUUUU__NO AY: " + UpubCount20_NOay);
    console.log("Cases in 20-25 yearsUUUU__NO AY: " + UpubCount25_NOay);
    console.log("Cases in 25-30 yearsUUUU__NO AY: " + UpubCount30_NOay);
    console.log("Cases in 30-35 yearsUUUU__NO AY: " + UpubCount35_NOay);
    console.log("Cases in 35-40 yearsUUUU__NO AY: " + UpubCount40_NOay);
        console.log("Cases in 40+ years__NO AY: " + UpubCount40more_NOay);

    console.log(Uall_NOay);
    document.getElementById("uCasesAll").innerHTML = Uall_NOay;
    document.getElementById("noPubAll").innerHTML = UnoPubDate_NOay;
    document.getElementById("lessTenAll").innerHTML = UlessThanTen_NOay;
    console.log(UlessThanTen_NOay);
console.log("end of get pies!");

}