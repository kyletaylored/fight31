(function($) {
  $(document).ready(function() {
    // Populate years.
    $(".yearselect").yearselect({ start: 1950 });

    $("#color-check").submit(function(event) {
      event.preventDefault();

      var color = "#" + $("#color").val();
      console.log(color);

      var isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
      if (isOk) {
        var rgb = hexToRgb(color);
        var text = "¯\\_(ツ)_/¯";
        if (rgb) {
          var insult = insults[Math.floor(Math.random() * insults.length)];
          var bgClass = "white";
          if (rgb.r > rgb.g && rgb.r > rgb.b) {
            text = "this definitely isn't green or blue...";
          }
          if (rgb.g > rgb.b) {
            text =
              "it's <span class='text' style='color:white;'>green</span>, you " +
              insult +
              ".";
            bgClass = "green";
          }
          if (rgb.g < rgb.b) {
            text =
              "it's <span class='text' style='color:white;'>blue</span>, you " +
              insult +
              ".";
            bgClass = "blue";
          }
          $(this).html("<h2 class='answer'>" + text + "</h2>");
          $("body")
            .css("background-color", color)
            .addClass(bgClass);
        }
      }
      console.log(isOk);
    });
  });
})(jQuery);
