function doPic(){
    // var img = document.createElement('IMG');
    // img.src = '/media/images/slideshow/640x480-shore.jpg';
    // $('#picViewer').html(img);
    $('#picViewer').html("<img src= '/media/images/slideshow/640x480-shore.jpg'>");
}
function divBordersOn(){
    $('div').toggleClass("div");
}
// $("menu li ul").hide();
$("#menu > li > a").click(function () {
    // console.log('click');
    $('#sub-menu').slideToggle();
    // e.preventDefault();
// e.stopPropagation();
});
