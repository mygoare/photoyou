(function(){
  $('#show-filter > button').bind('click',function(){
      var canvas = document.getElementById("edit-box");
      var filter_name = $(this).attr('value');

      switch(filter_name) {
        case "1":
          //canvas.classList.toggle("grayscale");
           canvas.className = "grayscale";
          break;
        case "2":
          //canvas.classList.toggle("brightness");
           canvas.className = "brightness";
          break;
        case "3":
          //canvas.classList.toggle("blur");
           canvas.className = "blur";
          break;
        case "4":
          //canvas.classList.toggle("invert");
           canvas.className = "invert";
          break;
        case "5":
          //canvas.classList.toggle("opacity");
           canvas.className = "opacity";
          break;
        case "6":
          //canvas.classList.toggle("sepia");
           canvas.className = "sepia";
          break;
      }
  });
  $("#show-frame-table > button").bind("click",function(){
    var border_val = $(this).attr("value");
    $("#border-box").attr("src", "border_"+border_val+".png");
  });
})();
