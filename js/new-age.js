(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Watch the Carousel
  $('#deviceCarouselIndicators').on('slide.bs.carousel', function (e) {
      var from = e.from + 1;
      var to = e.to + 1;

      // The selector for the box around the info text
      var infoSelector = '.screen-info';
      var previousInfoHeight = $(infoSelector).outerHeight();

      // The text that we are going to hide
      var hideSelector = '#screen-info-' + from;
      
      // The text that we are going to show
      var showSelector = '#screen-info-' + to;

      // Make sure we don't have any irrelevant text showing
      $(infoSelector + '> span').not(hideSelector).css('display', 'none');
      
      $(hideSelector).fadeOut('slow', function() {
        // To be able to smoothly animate the info box
        // to a new height, we need to determine what the
        // new height will be.
        
        // We will briefly display the item we will show,
        // while setting the info box's height to be auto.
        $(showSelector).css('display', 'inline');
        $(infoSelector).css('height', 'auto');

        // We can now capture the height we will need to animate to.
        var height = $(infoSelector).outerHeight();

        // We set the height of the info box to be what it was
        // previously, so that its height doesn't change.
        $(infoSelector).css('height', previousInfoHeight);

        // We hide the item we want to display again, so that we
        // can fade it into view
        $(showSelector).css('display', 'none');

        // Animate the info box height with the new value,
        // and fade in the text that we want
        $(infoSelector).animate({ height: height }, 1000, function () {
            // Set the info box's height to auto so that it can be responsive
            $(infoSelector).css('height', 'auto');
        });
        $(showSelector).fadeIn('slow');
      })
  })

  $('#deviceCarouselIndicators').on('slid.bs.carousel', function (e) {
      var to = e.to + 1;
      var showSelector = '#screen-info-' + to;
      var infoSelector = '.screen-info';

      // Make sure we don't have any irrelevant text showing
      $(infoSelector + '> span').not(showSelector).css('display', 'none');
  })

})(jQuery); // End of use strict
