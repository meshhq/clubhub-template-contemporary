(function ($) {
    // Wait until DOM loads up
    $(document).ready(function () {
        /**
         * @method login
         * @description Links to the Standup dem0
         * @return      {null}
         */
        $('.login-button').click(function () {
            window.location = 'https://admin.tryclubhub.com';
        });
    })

})(jQuery);