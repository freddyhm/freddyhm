 window.onload = function(){

 	// add show/hide classes to element
 	function toggleVisibility(elem){
 		if(elem){
 			if(elem.classList.contains("is-nav-visible")){
				elem.classList.remove("is-nav-visible");
				elem.classList.add("is-nav-hidden");
			}else if(elem.classList.contains("is-nav-hidden")){
				elem.classList.remove("is-nav-hidden");
				elem.classList.add("is-nav-visible");
			}else{
				elem.classList.add("is-nav-hidden");
			}
 		}
 	}

 	// hide/show nav bar when logo is selected
	document.getElementsByClassName("logo").item().addEventListener('click', function(event) {
		var navElem = document.getElementsByClassName("nav-list").item();
		toggleVisibility(navElem);		

	}, false);


	(function(){

		/* Custom Slider */

		var startX = 0, 		// x coordinate
			startY = 0, 		// y coordinate
			dist = 0.   		// distance travelled by input
			allowedTime = 300, 	// maximum time allowed to travel that distance
			elapsedTime = 0,	// duration of input
			startTime = 0,		// start time of input
			gallery = document.getElementById("gallery-work"); // touch surface element

		gallery.addEventListener('touchstart', function(event) {

			// get touch event and set x, y, and current time when input is received
		 	var touchObj = event.changedTouches[0];
		    startX = touchObj.pageX;
		    startY = touchObj.pageY;
		    startTime = new Date().getTime();
		}, false);
		

		/*
		gallery.addEventListener('touchend', function(event){
		    
		    var touchObj = event.changedTouches[0]; 
		    dist = touchoOj.pageX - startX; // get total distance traveled
		    elapsedTime = new Date().getTime() - startTime; // get time elapsed
		    
		    // check that distance is enough to be meaningful and that vertical distance traveled is minimal for horizontal swipes
		    var swiperightBol = ((dist <= -100 || dist >= 100) && Math.abs(touchobj.pageY - startY) <= 100);
		    var swipeDir = dist > 0 ? "right" : "left";
		   
		 }, false);
		*/

		

		gallery.addEventListener('touchmove', function(event) {

			// get vertical distance to determine scroll or swipe
		 	var touchObj = event.changedTouches[0];
			var isSwipe = Math.abs(touchobj.pageY - startY) <= 10;

			if(isSwipe){

			   // get left property from inline or css if first run 
			   var prevDistance = !gallery.style.left ? window.getComputedStyle(gallery, null).getPropertyValue("left") : gallery.style.left;
			   var currDistance = 0;

			   // get new distance
			   dist = touchobj.pageX - startX;

			   if(dist < 0){
			   		currDistance = extractIntFromStyle(prevDistance) - 10;
			   }else if(dist > 0){
			   		currDistance = extractIntFromStyle(prevDistance) + 10;
			   }

			   moveSlider(currDistance);
		 	}

		}, false);

		// remove 'px' from css styles
		function extractIntFromStyle(styleVal){
			return parseInt(styleVal.substr(0, styleVal.length - 2), 10);
		};

		// set new distance for slider
		function moveSlider(currentDist){
			if(currentDist <= -20 && currentDist >= -900){
			   	gallery.style.left = currentDist + "px";
			 }
		}

	}());
};