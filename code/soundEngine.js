function soundEngine(soundPath) {
  var trident = !!navigator.userAgent.match(/Trident\/7.0/);
  var net = !!navigator.userAgent.match(/.NET4.0E/);
  var IE11 = trident && net
  var IEold = (navigator.userAgent.match(/MSIE/i) ? true : false);
  if (IE11 || IEold) {
    document.all.sound.src = soundPath;
  } else {
    var snd = new Audio(soundPath); // buffers automatically when created
    snd.play();
  }
}
