// canvas 
var canvas = document.querySelector("#pic-canvas");
var ctx = canvas.getContext('2d');

// video
var video = document.querySelector('video');
window.URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMdeia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

function onFailSoHard (e) {  // feekback when getUserMedia true
  console.log('Reeeeejected!', e);
}
function hasGetUserMedia(){
  return !!(navigator.getUserMdeia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

// init the camera
function init(){
  if (hasGetUserMedia()) {
    // go getUserMedia
    navigator.getUserMedia({video: true}, function(stream){
      video.src = window.URL.createObjectURL(stream);
      // video controls
      //video.controls = true;
      localMediaStream = stream;
    }, onFailSoHard);

    openCamera();
    $(".pic-edit").hide();
    $(".video").show();$("#animation").show();

  } else {
    alert("Your browser is not supported 'navigator.getUserMedia'");
    video.src = 'somevideo.webm';  // feedback
  }
}

// canvas to capture a picture
function capture () {
  if (localMediaStream) {
    ctx.drawImage(video, 0, 0);
    var pic_img = '<a class="pics" href="javascript:void();"><img src="'+canvas.toDataURL('image/webp')+'" width="120" height="90" /></a>';
    $("#init").after(pic_img);
    $('.pics').bind('click', function(){
      // 关闭摄像头
      video.pause();
      localMediaStream.stop();
      // 动画关闭摄像头
      closeCamera();

      $(".video").hide();$("#animation").hide();
      $(".pic-edit").show();

      var edit_pic_src = $(this).find("img").attr("src");
      loadImageToCanvas(edit_pic_src);
      // 编辑窗口置空
      $("#edit-box").attr("class", "");/*$("#border-box").removeAttr("src");*/$("#border-box").attr("src", "border_0.png");

      $("#educed-pic").attr("src", edit_pic_src);
    });
  }
}

// 照相
function countDown (sec) {
  clearAnimateUp();clearAnimateDown();
  var count = setInterval(function(){
    $("#count-num").show().html(sec);
    sec--;
    if (sec < 0) {
      $("#count-num").html('').hide();
      clearInterval(count);
      capture();

      animateUp();
      animateDown();

      document.querySelector('audio').play();
    }
  }, 1000);
}

// 语音识别
function fun(event){
  var rsp = event.results[0].utterance;
  console.log(rsp);
  if (rsp == "ok" || rsp == "okay" ) {
    init();
  }
  //if (rsp == "stop") {
    //video.pause();
    //localMediaStream.stop();
  //}
  if (rsp.indexOf('take') != -1) {
    // promise delay
    //capture();
    countDown(2);
  }
}

document.querySelector('#init').addEventListener('click', function(){
  init();
}, false);
document.querySelector('#capture').addEventListener('click', function(){
  if (localMediaStream) {
    countDown(2);
  }
}, false);

function openCamera () {
  $("#piece-up").css({"top":"-275px", "left":"0px"});
  $("#piece-down").css({"left":"0px", "bottom":"-275px"});
}

function closeCamera() {
  $("#piece-up").css({"top":"0px", "left":"0px"});
  $("#piece-down").css({"left":"0px", "bottom":"0px"});
}

function animateUp () {
  $("#piece-up").css({"-webkit-animation":"animate-up 1s"});
}
function clearAnimateUp () {
  $("#piece-up").css({"-webkit-animation":""});
}
function animateDown () {
  $("#piece-down").css({"-webkit-animation":"animate-down 1s"});
}
function clearAnimateDown () {
  $("#piece-down").css({"-webkit-animation":""});
}

// load image to canvas
function loadImageToCanvas(pic_src){
  var pic_canvas = document.querySelector("#edit-box");
  var ctx = pic_canvas.getContext("2d");

  var imgObj = new Image();
  imgObj.src = pic_src;

  imgObj.onload = function(){
    ctx.drawImage(this, 0, 0, this.width, this.height, 0, 0, pic_canvas.width, pic_canvas.height);
  }
}

// 编辑工具 冒泡

//$("#educe").fancybox({
  //'transitionIn' : 'none',
  //'transitionOut': 'none'
//});

$("#educe").bind('click', function(){
  $("#educed").animate({
    left: '0'
  }, 500);
});
$("#fancybox-close").bind('click', function(){
  $("#educed").animate({
    left: '-730'
  }, 500);
});

$("#filter").click(function(){
  $("#show-filter").slideToggle(200);
});
$("#decorate").click(function(){
  $("#show-decorate").slideToggle(200);
});
$("#frame-table").click(function(){
  $("#show-frame-table").slideToggle(200);
});
