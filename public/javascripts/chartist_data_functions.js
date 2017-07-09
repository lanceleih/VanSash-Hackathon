/**
 * Created by chico_percedes on 2017-07-09.
 */

// Shorthand for $( document ).ready()
$(function() {
    console.log( "JQuery is ready!" );

    //EXAMPLE:
    var ex = {"EIAannoID":"16482686","ID":"477","Match":"14677","Round":"1","half":"1","time":"1731.51","Teaminpossession":"LAGalaxy","possessionlabel":"14677m89","player":"StefanIshizaki","postion":"MID","positiondetail":"right-midfield","team":"LAGalaxy","Action":"pass","Atr":"r","LocX":"64.99214935","LocY":"86.77581787","Result":"Juninho","Direction/type":"forwardshort","distance":"4.45947439","angle":"320.7562023","DS":"0"};


    //Ajax function to retrieve data from Json file. Once retrieved we can do whatever operations we want.
    $.get('/json', function (res){
        //step one: Clean Data for Passes:
        var cleandata = {
            coordinates:[]
        };
        //Iterate throuh each obj and return:
        //x,y coordinate of player in LAGalaxy that passed the ball without NotCompleted or lose and pass is greater than 10mts
        for(var i = 0; i < res.length; i++){
            if(res[i].team === "LAGalaxy" && res[i].Action === "pass" && res[i].Result !== "NotCompleted" && res[i].Result !== "lose" && parseFloat(res[i].distance) > 40.0) {
                cleandata.coordinates.push({x : parseFloat(res[i].LocX), y:parseFloat(res[i].LocY)});
            }
        }

        if (cleandata.coordinates.length > 1){
            // console.log(cleandata);
            console.log('Clean Data Loaded');
        }


        var options = {
            high : 100,
            low : 0,
            divisor : 1,
            showLine : false,
            showArea: false,
            axisX: {
                type: Chartist.AutoScaleAxis,
                onlyInteger: true
            }
        };

        var data = {
            // A labels array that can contain any sort of values
            // labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            // Our series array that contains series objects or in this case series data arrays
            series: [
                cleandata.coordinates
            ]
        };

        // Create a new line chart object where as first parameter we pass in a selector
        // that is resolving to our chart container element. The Second parameter
        // is the actual data object.
        new Chartist.Line('.ct-chart', data, options);

    }).fail(function(err){
        console.log(err)
    });
});