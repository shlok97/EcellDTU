
      // A function to show a dark overlay on an image when it is hovered
      $(".itemContainer, .thumbnail-container").hover(function(){

        $(this).children('.black').fadeIn();

      }, function(){
        $(this).children('.black').fadeOut();
      });

      // A function to perfectly fit the image in the grid item
      $(".gridImage").each(function(){
        var x = $(this).parent().width();
        var y = $(this).parent().height();

        var mx = $(this).width();
        var my = $(this).height();

        if((x/y) > (mx/my)) {
          $(this).width(x);
        }
        else {
          $(this).height(y);
        }
      });

      // a funtion to animate the text when it appears on the screen
      $(window).scroll(function(event) {
        if($(".fullWidthContainer").offset().top + 250 < $(window).scrollTop() + $(window).outerHeight()) {
          $(".fullWidthContainer").children('.textInImage').fadeIn('slow');
        } else {
          $(".fullWidthContainer").children('.textInImage').css("display", "none");
        }

        if($(".solutionsRow").offset().top + 250 < $(window).scrollTop() + $(window).outerHeight()) {
          $(".solutionsRow").find('#point1').fadeIn(700);
          $(".solutionsRow").find('#point2').fadeIn(1400);
          $(".solutionsRow").find('#point3').fadeIn(2100);

        }if($(".solutionsRow").offset().top > $(window).scrollTop() + $(window).outerHeight()) {
          $(".solutionsRow").find('#point1').css("display", "none");
          $(".solutionsRow").find('#point2').css("display", "none");
          $(".solutionsRow").find('#point3').css("display", "none");
        }
      });

      // A function used to start the slideshow of the carousel
      function myLoop(i) {
        var delay = 4000;
        i++;
        switch (i % 3) {
          case  0:

            $('#img1').fadeOut();
            $('#img2').fadeIn();
            break;
          case 1:
            $('#img2').fadeOut();
            $('#img3').fadeIn();
            break;
          case 2:
            $('#img3').fadeOut();
            $('#img1').fadeIn();
            break;
          default:

        }
        setTimeout(function() {myLoop(i);}, delay);

      }
      // This function calls the myLoop function when the page loads
      $(document).ready(function() {
        var count = 0;
        myLoop(0);
      });
