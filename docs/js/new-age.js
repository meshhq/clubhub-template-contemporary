(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
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
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 54
    });

    // Collapse Navbar
    var navbarCollapse = function () {
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


    // ========================
    // Device Carousel
    // ========================
    
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

        $(hideSelector).fadeOut('slow', function () {
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
            $(infoSelector).animate({
                height: height
            }, 1000, function () {
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

    // ========================
    // Alerts
    // ========================

    var displayAlert = function(alertClass) {
        var selector = '.alert-box ' + alertClass;
        $(selector).fadeIn('slow', function(e) {
            setTimeout(function() {
                $(selector).fadeOut('slow')
            }, 5000)
        });
    }

    // ========================
    // Email Form
    // ========================

    var clearForm = function() {
        $('#email-form-submit').text("Send Message");
        var inputs = $('#contact-form')
        inputs.trigger('reset')
    }

    var validateForm = function() {
        var inputs = $('#contact-form .form-control')
        var isValid = true
        for (var i = 0; i < inputs.length; i++) {
            if (!inputs[i].validity.valid) {
                isValid = false
                break
            }
        }
        if (isValid) {
            $('#email-form-submit').removeAttr('disabled')
        } else {
            $('#email-form-submit').attr('disabled', true)
        }
    }

    // Run the form validation when the modal is shown
    $('#contact-modal').on('shown.bs.modal', function (e) {
        validateForm();
    })

    // Run the form validation as the user types in the form fields
    $('#contact-form .form-control').on('keyup', function (e) {
        validateForm();
    })

    // ========================
    // Email Form Submission
    // ========================

    $('#email-form-submit').click(function (e) {
        var firstName = $('#sender-first-name').val();
        var lastName = $('#sender-last-name').val();
        var email = $('#sender-email').val();
        var emailMessage = $('#message-text').val();

        // Update the button
        $('#email-form-submit').text("Sending Message")
        $("#email-form-submit").attr('disabled', true)

        $.ajax({
            type: 'POST',
            url: 'https://t4irsdl7oe.execute-api.us-west-2.amazonaws.com/prod',
            contentType: 'application/json',
            data: JSON.stringify({
                'firstName': firstName,
                'lastName': lastName,
                'email': email,
                'message': emailMessage,
            }),
            success: function (res) {
                clearForm();
                $('#contact-modal').modal('toggle');
                displayAlert('.alert-primary');
            },
            error: function () {
                clearForm();
                $('#contact-modal').modal('toggle');
                displayAlert('.alert-danger');
            }
        })
    })

})(jQuery); // End of use strict