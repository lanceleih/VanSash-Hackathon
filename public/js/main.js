/**
 * Created by Lancelei on 2017-07-09.
 */
$(document).ready(function(){

    $("#hide").click(function(){
        $("#introduction").fadeToggle(450);

        setTimeout(function() {
            $("#main").css("background","#9DC2EA");
        }, 400);
        $("#data").fadeToggle(2100);
    });
});