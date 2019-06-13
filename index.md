---
layout: default
---

<h1>#fight31</h1>
<p>{{ site.description | escape }}</p>
<form class="form text-center" id="fight-form" name="fight-form">
	<h1 class="h3 mb-3 font-weight-normal">Choose your weight class:</h1>
	<div class="row">
	<div class="col-md-12 mb-3">
		<label for="birthyear">Your Birth Year</label>
			<input type="range" min="1950" max="2009" value="1990" id="birthyear-input" 
				step="1" oninput="outputUpdate(value)">
			<output for="birthyear" id="birthyear">1990</output>
			</div>
    	<div class="col-md-12 mb-3">
    		<label class="center-block">Gender (optional)</label>
    		<button class="btn btn-default btn-inline gender" data-gender="male">Male</button>
    		<button class="btn btn-default btn-inline gender" data-gender="female">Female</button>
    		<button class="btn btn-default btn-inline gender" data-gender="intersex">Intersex</button>
    		<button class="btn btn-default btn-inline gender" data-gender="non-binary">Non-binary</button>
    		<button class="btn btn-default btn-inline gender" data-gender="transgender male">Transgender Male</button>
    		<button class="btn btn-default gender" data-gender="transgender female">Transgender Female</button>
			<input type="hidden" id="gender" value="" />
    	</div>
    </div>
    <div class="row">
    	<div class="custom-control custom-checkbox">
    		<input type="checkbox" class="custom-control-input" id="notfamous">
    		<label class="custom-control-label" for="notfamous"><em>Do you care if they're famous?</em></label>
    	</div>
    </div>
    <div class="row">
		<div class="col-md-12">
    	<button class="btn btn-lg btn-primary btn-block" style="margin-top:1em" type="submit">Get challenger!</button>
		</div>
    </div>
    <div class="loading hidden"> 🥊</div>
    <div class="fighter"></div>

</form>
