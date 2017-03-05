;(function($, win, doc, undefined){

  var kjsticky = $.fn.kjsticky = function( options ) {

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

      function init () {

        clearPosition();

        setSticky.absolute("0");

        $win.on("scroll load resize", function() {
          checkScroll();
        });
      }

      var setSticky = {

        // position nav element fixed to top of window with optional offset or IAW settings
        fixed: function( offset ) {
          clearPosition();
          $base.css({position: "fixed", top: offset || settings.offsetTop});
        },

        // position the nav element absolute to top or bottom of parent container with optional offset or IAW settings
        absolute: function( offset, where ) {
          clearPosition();

          if (where = "top") {
            $base.css({position: "absolute", top: offset || settings.offsetTop});
          } else {
            $base.css({position: "absolute", bottom: offset || settings.offsetBottom});
          }
        },
      };

      // clears the CSS properties and values so it won't interfere with what we are seeting.
      function clearPosition () {
        $base.css({position: "", top: "", bottom: ""});
      }

      // compare the scrollTop position to breakpoints and set the position of the nav element fixed or absolute to top or bottom
      var checkScroll = function() {

        if ($win.scrollTop() > sticky.mainTop - settings.offsetTop && $win.scrollTop() <= sticky.bottomStop) {
          setSticky.fixed(settings.offsetFixedTop);            // set the nav bar to be fixed to top of window after page is scrolled to top of nav element
        } else if ($win.scrollTop() > sticky.bottomStop) {
          setSticky.absolute(settings.offsetBottom, "bottom");           // position nav bar to bottom of parent container with settings.offsetBottom
        } else if ($win.scrollTop() < sticky.mainTop - settings.offsetTop) {
          setSticky.absolute(settings.offsetTop, "top");              // position the nav bar to the top of the container with settings.offsetTop
        }
      };

      init();

      return this;

    };

  $.fn.kjsticky.defaults = {
    footerID: "footer",
    mainID: "wrapper-main",
    offsetTop: "0",  // I need to set a function in init() to stringify offsetTop/Bottom in case I enter a number instead.
    offsetBottom: "0",
    offsetFixedTop: 32,
    notification: false
  };

})(jQuery, window, document);
