
$(function(){

  $(".slider").slick({
    prevArrow: ".testimonial__control--prev",
    nextArrow: ".testimonial__control--next"
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
        
        $('.control__img--back').click(function(event) {
          // hide work description and show thumbs
          $('.page-slider__first').removeClass("page-slider__first--hide");
          $('.page-slider__second').removeClass("page-slider__second--active");
          event.preventDefault();
        });  

        $(".slider").slick();
    });
  }

  var clientItems =  $(".client-item").map(function(){ return $(this).data("client"); }).get(),  
      clientIndex = 0;

  $('.client-nav-item').click(function(event) {
    
    // remove active nav item and current client  
    $('.client-nav-item').removeClass('client-nav-item-active');
    $('.client-item').removeClass('client-item-active');
    
    // add new active nav and new client  
    var client = $(this).data("client");
    $('.client-nav-item').filter("[data-client='" + client + "']").addClass('client-nav-item-active');
    $('.client-item').filter("[data-client='" + client + "']").addClass('client-item-active');
  });

  $('.control-prev').click(function(event) {
    
    // remove current client  
    $('.client-logo-item').removeClass('client-logo-item-active');
    $('.client-item').removeClass('client-item-active');
    
    // get previous client and show
    var client = prevClient();
    $('.client-logo-item').filter("[data-client='" + client + "']").addClass('client-logo-item-active');
    $('.client-item').filter("[data-client='" + client + "']").addClass('client-item-active');
  });

  $('.control-next').click(function(event) {

    // remove current client 
    $('.client-logo-item').removeClass('client-logo-item-active');
    $('.client-item').removeClass('client-item-active');
    
    // get next client and show
    var client = nextClient();
    $('.client-logo-item').filter("[data-client='" + client + "']").addClass('client-logo-item-active');
    $('.client-item').filter("[data-client='" + client + "']").addClass('client-item-active');
  });

  function prevClient(){

    // decrement counter
    clientIndex--;

    // reset index to last client if index falls to negative
    if(clientIndex < 0){
      clientIndex = clientItems.length - 1;
    }

    return clientItems[clientIndex];;
  }

  function nextClient(){

    // increment counter
    clientIndex++;

    // reset index to first client if index goes over client count
    if(clientIndex > (clientItems.length - 1)){
      clientIndex = 0;
    }

    return clientItems[clientIndex];;
  }
});




