var lastBackgroundMode = "showAll";

function getNextBackground() {
	backgroundUpdate_interval.restart();
	getNewBackground(false);
}

function getNewBackground(initial) {
	var xmlhttp = null;
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	} 
	else { // code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			$('#img_background').hide();
			document.getElementById("img_background").src=xmlhttp.responseText;
			$(document).ready(function() {
				$('#img_background').load(function() {
					console.log('lastBackgroundMode: '+lastBackgroundMode);
					if(lastBackgroundMode == "showAll") {
						showAllBackground();
					}
					else if(lastBackgroundMode == "fillScreen") {
						fillscreenBackground();
					}
					
				});
				$('#img_background').show();
			});
		}
	}
	xmlhttp.open("GET","getBackground.php?initial="+initial,true);
	xmlhttp.send();
}

function fillscreenBackground() {
	var theWindow        = $(window),
			$bg              = $("#img_background"),
			aspectRatio      = $bg.width() / $bg.height();
			
	if(lastBackgroundMode == "fillScreen") {
		$('#img_background').css({
				'position' : '',
				'left' : '',
				'top' : '',
				'margin-left' : '',
				'margin-right' : '',
				'overflow' : 'hidden'
		});
		function resizeBg() {
			if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
				$bg
					.removeClass()
					.addClass('bgheight');
			}
			else {
				$bg
					.removeClass()
					.addClass('bgwidth');
			}
		}	
	}
	else {
		function resizeBg() {
			if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
				$bg
					.removeClass()
					.addClass('bgwidth');
			}
			else {
				$bg
					.removeClass()
					.addClass('bgheight');
			}
		}	
	}
										
	function resizeBg() {
		if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
			$bg
				.removeClass()
				.addClass('bgwidth');
		}
		else {
			$bg
				.removeClass()
				.addClass('bgheight');
		}
	}										
	theWindow.resize(resizeBg).trigger("resize");
}

function showAllBackground() {
	fillscreenBackground();
	$(function() {
		$('#img_background').css({
				'position' : 'absolute',
				'left' : '50%',
				'top' : '50%',
				'margin-left' : -$('#img_background').outerWidth()/2,
				'margin-top' : -$('#img_background').outerHeight()/2,
				'overflow' : 'hidden'
		});
	});
}

function toggleSlideshowView() {
	if(lastBackgroundMode == "showAll") {
		lastBackgroundMode = "fillScreen";
		fillscreenBackground();
		document.getElementById('slideshow_view_toggle').innerHTML='Show All';
		return;
	}
	else if(lastBackgroundMode == "fillScreen") {
		lastBackgroundMode = "showAll";
		showAllBackground();
		document.getElementById('slideshow_view_toggle').innerHTML='Fill Screen';
		return;
	}
}

// This function gets the current time and injects it into the DOM
function updateClock() {
	// Gets the current time
	var now = new Date();

	// Get the hours, minutes and seconds from the current time
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();

	// Format hours, minutes and seconds
	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	// Gets the element we want to inject the clock into
	var elem = document.getElementById('clock_overlay');

	// Sets the elements inner HTML value to our clock data
	elem.innerHTML = hours + ':' + minutes;// + ':' + seconds;
}

function toggleClock() {
	if($('#clock_overlay').css("display") == "block") {
		$("#button_clock_toggle").toggle(1000,"linear");
		document.getElementById('button_clock_toggle').innerHTML='Show';
	}
	else {
		$("#button_clock_toggle").toggle(1000,"linear");
		document.getElementById('button_clock_toggle').innerHTML='Hide';
	}
	$("#clock_overlay").toggle(1000,"linear");
	$("#button_clock_toggle").toggle(1000,"linear");
}

function Interval(fn, time) {
	var timer = false;
	this.start = function () {
		if(!this.isRunning()) {
			timer = setInterval(fn, time);
		}
	};
	this.stop = function () {
		clearInterval(timer);
		timer = false;
	};
	this.restart = function () {
		this.stop();
		this.start();
	};
	this.isRunning = function () {
		return timer !== false;
	};
}

var clockUpdate_interval = new Interval('updateClock()', 10000);
clockUpdate_interval.start();
var backgroundUpdate_interval = new Interval('getNewBackground(false)', 60000);
backgroundUpdate_interval.start();

function toggleBackground_change() {
	if(backgroundUpdate_interval.isRunning()) {
		console.log('stopping background slideshow');
		backgroundUpdate_interval.stop();
		document.getElementById('toggle_slideshow').innerHTML='Play Slideshow';
	}
	else {
		console.log('starting background slideshow');
		backgroundUpdate_interval.start();
		document.getElementById('toggle_slideshow').innerHTML='Pause Slideshow';
		getNewBackground(false);
	}
}

// !!!USE AT OWN RISK!!!
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}