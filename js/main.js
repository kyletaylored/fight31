(function($) {
  $(document).ready(function() {
    // Populate years.
    $(".yearselect").yearselect({ start: 1950 });

    $("#fight-form").submit(function(event) {
      event.preventDefault();
      var $form = $(this);
      var year = $("#birthyear", $form).val();
      var gender = $("#gender", $form).val();
      console.log("year", year);
      console.log("gender", gender);

      var getRes =
        gender == "" ? getResultUrl(year) : getResultUrl(year, gender);

      console.log(getRes);

      $.ajax({
        url: getRes
      }).done(function(data) {
        console.log(data);
        var results = data.results.bindings;
        var fighter = results[Math.floor(Math.random() * results.length)];
        console.log(fighter);
        $form.append(
          "<h2 class='answer'>You're fighting: " + fighter.name.value + "</h2>"
        );
      });
    });
  });
})(jQuery);
