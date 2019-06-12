function cleanFighters(fighters) {
  return fighters.filter(element => {
    if (!element.hasOwnProperty("died")) {
      return element;
    }
  });
}

(function($) {
  $(document).ready(function() {
    // Populate years.
    $(".yearselect").yearselect({
      start: 1950,
      selected: 1985
    });

    $("#fight-form").submit(function(event) {
      event.preventDefault();
      var $form = $(this);
      var $arena = $(".fighter");
      var year = $("#birthyear", $form).val();
      var gender = $("#gender", $form).val();
      var notfamous = $("#notfamous", $form).prop("checked");

      console.log("year", year);
      console.log("gender", gender);
      console.log("notfamous", notfamous);

      // Empty arena.
      $arena.html("");

      $(".loading").removeClass("hidden");
      var getRes = getResultUrl(year, gender, notfamous);
      console.log(getRes);

      $.ajax({
        url: getRes
      }).done(function(data) {
        $(".loading").addClass("hidden");
        console.log(data);
        var results = cleanFighters(data.results.bindings);
        console.log(results);
        var fighter = results[Math.floor(Math.random() * results.length)];
        if (typeof fighter !== "undefined") {
          console.log(fighter);
          var fightLink = fighter.wikipedia_article.value;
          var fightPic = fighter.picture.value;
          var markup =
            '<h2 class="answer">You&apos;re fighting: </h2><br><div class="thumbnail"><img alt="name" src="' +
            fightPic +
            '" style="height: 200px; width: auto; display: block;"><div class="caption"><h3><a target="_blank" href="' +
            fightLink +
            '">' +
            fighter.name.value +
            "</a></h3></div></div>";
          $arena.html(markup);
        } else {
          $arena.html(
            "<h2 class='answer'>You're a snowflake, or they're all dead (probably).</h2>"
          );
        }
      });
    });
  });
})(jQuery);
