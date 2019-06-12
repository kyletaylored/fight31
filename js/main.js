(function($) {
  $(document).ready(function() {
    // Populate years.
    $(".yearselect").yearselect({
      start: 1950
    });

    $("#fight-form").submit(function(event) {
      event.preventDefault();
      var $form = $(this);
      var year = $("#birthyear", $form).val();
      var gender = $("#gender", $form).val();
      console.log("year", year);
      console.log("gender", gender);
      $(".loading").removeClass("hidden");
      var getRes =
        gender == "" ? getResultUrl(year) : getResultUrl(year, gender);

      console.log(getRes);

      $.ajax({
        url: getRes
      }).done(function(data) {
        $(".loading").addClass("hidden");
        console.log(data);
        var results = data.results.bindings;
        var fighter = results[Math.floor(Math.random() * results.length)];
        if (typeof fighter !== "undefined") {
          console.log(fighter);
          var fightLink = fighter.wikipedia_article.value;
          $form.append(
            `<h2 class="answer">You're fighting: <a href="${fightLink}">${
              fighter.name.value
            }</a></h2>`
          );
        } else {
          $form.append("<h2 class='answer'>Lucky you, you're too old.</h2>");
        }
      });
    });
  });
})(jQuery);

function outputUpdate(vol) {
  document.querySelector("#birthyear").value = vol;
}
