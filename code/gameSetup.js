$(document).ready(function(){

  $(".car-select").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    autoplay: false,
    responsive: [{ breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }]
  });

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
    var copilotName = $('input[name=copilotName]').val();
    window.location = "game.html?playerName="+playerName+"&copilotName="+copilotName+"&selectedCar="+selectedCar;
  });

  $('.car-selector').click(function(){
    $('.car-selector').removeClass('active');
    $(this).addClass('active');
    $('input[name=selectedCar]').val($(this).attr('data-car'));
  });

});
