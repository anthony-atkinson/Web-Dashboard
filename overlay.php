<div id="slideshow_controls">
	<div class="ghost_button" onclick="toggleBackground_change();">
		<p id="toggle_slideshow">Pause Slideshow</p>
	</div>
	<div class="ghost_button" onclick="getNextBackground();">
		<p id="slideshow_next">Next</p>
	</div>
	<div class="ghost_button" onclick="toggleSlideshowView();">
		<p id="slideshow_view_toggle">Fill Screen</p>
	</div>
</div>
<div style="width:auto;">
	<div id="clock_overlay">
		<script>updateClock();</script>
	</div>
	<div id="button_clock_toggle" class="button_clock ghost_button" onclick="toggleClock();">
		<p>Hide</p>
	</div>
	<div id="button_clock_show" class="button_clock ghost_button" onclick="toggleClock();">
		<p>Show</p>
	</div>
</div>