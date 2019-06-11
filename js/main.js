(function($) {
  $(document).ready(function() {
    // Populate years.
    $(".yearselect").yearselect({ start: 1950 });

    $("#fight-form").submit(function(event) {
      event.preventDefault();
      var $form = $(this);
      var year = $("#birthyear", $form).val();
      var gender = $("#gender", $form).val();

      console.log(getResultUrl(year, gender));

      $.ajax({
        url: getResultUrl(year, gender)
      }).done(function(data) {
        console.log(data);
        var results = data.results.bindings;
        var fighter = results[Math.floor(Math.random() * results.length)];
        $form.append(
          "<h2 class='answer'>You're fighting: " + fighter.name.value + "</h2>"
        );
      });
    });
  });
})(jQuery);
