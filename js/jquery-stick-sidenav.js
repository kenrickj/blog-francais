;(function($, win, doc, undefined){

  $.fn.kjsticky = function( options ) {

      var $win = $(win),
          $base = $(this),
          $doc = $(doc);

      $win.scrollTop(0);

      var settings = $.extend({}, $.fn.kjsticky.defaults, options);

      var sticky = {
        mainTop: $(settings.mainID).offset().top,
        footerTop: $(settings.footerID).offset().top,
        sidebarTop: $base.offset().top,
        sidebarHeight: $base.outerHeight(true)
      };

      sticky.sidebarBottom = sticky.sidebarTop + sticky.sidebarHeight;
      sticky.bottomStop = sticky.footerTop - sticky.sidebarHeight - (settings.offsetTop * 2);

      console.log(sticky.bottomStop);
      console.info($doc.height());
      console.info(sticky.footerTop);

      function init () {

        if (settings.notification) {
          notify();
        }

        clearPosition();

        setSticky.absolute("0");

        $win.on("scroll load resize", function() {
          checkScroll();
        });
      }

      var setSticky = {
        fixed: function( offset ) {
          clearPosition();
          $base.css({position: "fixed", top: offset || settings.offsetTop});
        },
        absolute: function( offset ) {
          clearPosition();
          $base.css({position: "absolute", top: offset || settings.offsetTop});
        },
        toBottom: function( offset ) {
          clearPosition();
          $base.css({position: "absolute", bottom: offset || settings.offsetBottom, marginBottom: 0});
        }
      };

      function clearPosition () {
        $base.css({position: "", top: "", bottom: ""});
      }

      var checkScroll = function() {

        if ($win.scrollTop() > sticky.mainTop - settings.offsetTop && $win.scrollTop() <= sticky.bottomStop) {
          setSticky.fixed();
        } else if ($win.scrollTop() > sticky.bottomStop) {
          setSticky.toBottom("0");
        } else if ($win.scrollTop() < sticky.mainTop - settings.offsetTop) {
          setSticky.absolute("0");
        }
      };

      init();

      return this;

    };

  $.fn.kjsticky.defaults = {
    msg: "It's about to get sticky!",
    footerID: "footer",
    mainID: "wrapper-main",
    offsetTop: 32,
    offsetBottom: 16,
    notification: false
  };

})(jQuery, window, document);
