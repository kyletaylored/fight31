function cleanFighters(fighters) {
  return fighters.filter(element => {
    if (!element.hasOwnProperty("died")) {
      return element;
    }
  });
}
/**
 * Get a smaller version of the photo because some of them are large.
 * @param  {string} link Path to the photo.
 * @return {string}      Updated path to photo.
 */
function resizePhoto(link) {
  return "https://commons.wikimedia.org/w/thumb.php?width=500&f=" + link.substring(link.lastIndexOf('/')+1);
}

function outputUpdate(vol) {
  document.querySelector("#birthyear").value = vol;
}

(function ($) {

  $.wait = function( callback, seconds){
    return window.setTimeout( callback, seconds * 1000 );
 }

  $(document).ready(function () {
    // Populate years.
    $(".yearselect").yearselect({
      start: 1950,
      selected: 1985
    });

    $('.gender').on('click', function (e) {
      e.preventDefault();
      $('.gender.btn-primary').removeClass('btn-primary');
      $(this).addClass('btn-primary');
      $('#gender').val($(this).data('gender'));
    });

    $('input[type="range"]').rangeslider({

      // Feature detection the default is `true`.
      // Set this to `false` if you want to use
      // the polyfill also in Browsers which support
      // the native <input type="range"> element.
      polyfill: false,

      // Callback function
      onInit: function () {},

      // Callback function
      onSlide: function (position, value) {},

      // Callback function
      onSlideEnd: function (position, value) {}
    });

    $("#fight-form").submit(function (event) {
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

      $(".loading-wrapper").removeClass("hidden");
      var getRes = getResultUrl(year, gender, notfamous);
      console.log(getRes);

      // https://query.wikidata.org/#SELECT%20%2a%20WHERE%20%7B%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cen%22.%20%7D%20%7D%0ALIMIT%20100
      // Add wikidata query debug.
      $arena.append("<a style='padding-bottom:30px' target='_blank' href='https://query.wikidata.org/#"+getRes.uri+"'>(Wikidata Query)</a>");

      $.ajax({
        url: getRes.url,
        timeout: 60000
      }).done(function (data) {
        console.log(data);
        var results = cleanFighters(data.results.bindings);
        console.log(results);
        var fighter = results[Math.floor(Math.random() * results.length)];
        if (typeof fighter !== "undefined") {
          console.log(fighter);
          var fightLink = fighter.wikipedia_article.value;
          var fightPic = resizePhoto(fighter.picture.value);

          var markup =
            '<h2 class="answer">You&apos;re fighting: </h2><br><div class="thumbnail"><img alt="name" src="' +
            fightPic +
            '" style="height: 200px; width: auto; display: block;"><div class="caption"><h3><a target="_blank" href="' +
            fightLink +
            '">' +
            fighter.name.value +
            "</a></h3></div></div>";
          $arena.html(markup);
          $("html, body").animate({
            scrollTop: $(document).height()
          }, 1000);

        } else {
          $arena.html(
            "<h2 class='answer'>You're a snowflake, or they're all dead by now (likely).</h2>"
          );
        }
      }).fail(function( jqXHR, textStatus, errorThrown ) {
        console.log("error:", errorThrown);
        var iframe = '<iframe src="https://player.vimeo.com/video/148751763?autoplay=1&loop=1&autopause=0" width="640" height="480" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
        $arena.html(iframe);
      }).always(function(){
        // Always hide the loading wrapper.
        $(".loading-wrapper").addClass("hidden");
      });
    });
  });

})(jQuery);
