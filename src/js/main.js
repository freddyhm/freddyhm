
$(function(){

  $(".testimonial__slider").slick({
    dots: true,  
    prevArrow: ".testimonial__control--prev",
    nextArrow: ".testimonial__control--next"
  });

  $(".detail__slider").slick({
    dots: true,  
    prevArrow: ".detail__control--prev",
    nextArrow: ".detail__control--next"
  });

  var workItems = document.querySelectorAll('.gallery__item');

  // write in plain javascript later 
  $('.gallery__item').click(function(event) { 

    // hide our thumbs and show our work description
    $('.page-slider__first').addClass("page-slider__first--hide");
    $('.page-slider__second').addClass("page-slider__second--active");
    
    // get project name
    var projName = $(this).attr("data-folder");

    // load our html and set project properties
    loadWorkDetails(projName);
    event.preventDefault();
  });

  for (var i = 0; i < workItems.length; i++) { 

    // add hover effect for all items in our work list
    workItems[i].addEventListener('mouseover', function() {
      for (var i = 0; i < this.childNodes.length; i++) {
        if(this.childNodes[i].className === "overlay"){
            this.childNodes[i].classList.toggle("overlay--over");
        }
      }
    });

    workItems[i].addEventListener('mouseleave', function() {
      for (var i = 0; i < this.childNodes.length; i++) {

        console.log(this.childNodes[0]);
        if(this.childNodes[i].classList.contains("overlay--over")){
            this.childNodes[i].classList.remove("overlay--over");
        }
      }
    });
  }

  function loadWorkDetails(projID){
    var htmlURL = projID + '.html #js-detail__content';
    $('#js-detail__load').load(htmlURL, function(){
        
        $('#js-control--back').click(function(event) {
          // hide work description and show thumbs
          $('.page-slider__first').removeClass("page-slider__first--hide");
          $('.page-slider__second').removeClass("page-slider__second--active");
          event.preventDefault();
        });  

        $(".detail__slider").slick({
          dots: true,  
          prevArrow: ".detail__control--prev",
          nextArrow: ".detail__control--next"
        });
    });
  }
});

