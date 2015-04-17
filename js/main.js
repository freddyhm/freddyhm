/*
 * Show 
 */

var workItems = document.querySelectorAll('.work-item');

// write in plain javascript later
$('.work-item').click(function(event) {

  // hide our thumbs and show our work description
  $('.work-list-wrap').addClass("hide");
  $('.work-desc-wrap').addClass("active");
  
  // get project name and title from element 
  var projName = $(this).attr("data-folder"), 
      projTitle = $(this).text();

  // load our html and set project properties
  loadWorkDetails(projName, projTitle);
});

$('.desc-btn-back').click(function(event) {

  // hide work description and show thumbs
  $('.work-list-wrap').removeClass("hide");
  $('.work-desc-wrap').removeClass("active");
  $('.work-desc-list').addClass("hide");
});

for (var i = 0; i < workItems.length; i++) { 

  // add hover effect for all items in our work list
  workItems[i].addEventListener('mouseover', function() {
    for (var i = 0; i < this.childNodes.length; i++) {
      if(this.childNodes[i].className === "work-overlay"){
          this.childNodes[i].classList.toggle("over");
      }
    }
  });

  workItems[i].addEventListener('mouseleave', function() {
    for (var i = 0; i < this.childNodes.length; i++) {
      if(this.childNodes[i].classList.contains("over")){
          this.childNodes[i].classList.remove("over");
      }
    }
  });
}

function loadWorkDetails(projID, projTitle){
  var htmlURL = 'work/' + projID + '.html';
  $('.work-desc-title').text(projTitle);
  $('.work-load').load(htmlURL);
}

var clientItems =  $(".client-item").map(function(){ return $(this).data("client"); }).get(),  
    clientIndex = 0;

$('.client-nav-item').click(function(event) {
  
  // remove active nav item and current client  
  $('.client-nav-item').removeClass('active');
  $('.client-item').removeClass('active');
  
  // add new active nav and new client  
  var client = $(this).data("client");
  $('.client-nav-item').filter("[data-client='" + client + "']").addClass('active');
  $('.client-item').filter("[data-client='" + client + "']").addClass('active');
});

$('.control-prev').click(function(event) {
  
  // remove current client  
  $('.client-logo-item').removeClass('active');
  $('.client-item').removeClass('active');
  
  // get previous client and show
  var client = prevClient();
  $('.client-logo-item').filter("[data-client='" + client + "']").addClass('active');
  $('.client-item').filter("[data-client='" + client + "']").addClass('active');
});

$('.control-next').click(function(event) {

  // remove current client 
  $('.client-logo-item').removeClass('active');
  $('.client-item').removeClass('active');
  
  // get next client and show
  var client = nextClient();
  $('.client-logo-item').filter("[data-client='" + client + "']").addClass('active');
  $('.client-item').filter("[data-client='" + client + "']").addClass('active');
});

function prevClient(){

  clientIndex--;

  if(clientIndex < 0){
    clientIndex = clientItems.length - 1;
  }

  return clientItems[clientIndex];;
}

function nextClient(){

   clientIndex++;

  if(clientIndex > (clientItems.length - 1)){
    clientIndex = 0;
  }

  return clientItems[clientIndex];;
}




