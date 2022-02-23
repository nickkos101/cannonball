$(document).ready(function(){

    $('#startButton').click(function(event){
        event.preventDefault();

        if ($('input[name=playerName]').val() == '') {
            alert('You Must Choose a Driver Name!');
            return;
        }

        if ($('input[name=selectedCar]').val() == '') {
            alert('You Must choose a Car!');
            return;
        }

        //Construct Initial Starting Values
        var playerName = $('input[name=playerName]').val();
        // var routeName = $().val();
        var selectedCar = $('input[name=selectedCar]').val();
        window.location = "game.html?playerName="+playerName+"&selectedCar="+selectedCar;
    });

    $('.car-selector').click(function(){
        $('.car-selector').removeClass('active');
        $(this).addClass('active');
        $('input[name=selectedCar]').val($(this).attr('data-car'));
    });

});