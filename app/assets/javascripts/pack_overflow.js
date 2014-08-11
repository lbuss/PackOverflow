window.PackOverflow = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new PackOverflow.Routers.Router
    Backbone.history.start();
  }
};

$(document).ready(function(){
  // PackOverflow.initialize();
  // $(window).load(function() {
 //    var i =0;
 //    var images = ['image2.jpg','image3.jpg','image1.jpg'];
 //    var image = $('body');
 //                  //Initial Background image setup
 //    image.css('background-image', 'image_path("image1.jpg")');
 //                  //Change image at regular intervals
 //    // setInterval(function(){
 // //     image.fadeOut(1000, function () {
 // //     image.css('background-image', 'image_path(' + images [i++] +')');
 // //     image.fadeIn(1000);
 // //     });
 // //     if(i == images.length)
 // //      i = 0;
 // //    }, 20000);
 //   });
});
