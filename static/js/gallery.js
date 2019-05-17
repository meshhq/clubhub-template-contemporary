$( ".carousel-image" ).click(function() {
    var id = $(this).attr("id");
    $('#carousel-modal').carousel(Number(id));
});