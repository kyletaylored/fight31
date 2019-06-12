---
layout: default
---

<form class="form text-center" id="fight-form" name="fight-form">
	<h1 class="h3 mb-3 font-weight-normal">Choose your weight class:</h1>
	<div class="row">
		<div class="col-md-6 mb-3">
			<label for="birthyear">Your Birth Year</label>
			<input type="range" min="1950" max="2009" value="1990" id="birthyear-input" 
				step="1" oninput="outputUpdate(value)">
			<output for="birthyear" id="birthyear">1990</output>
		</div>
		<div class="col-md-6 mb-3">
			<label for="gender">Your Gender (optional)</label><br>
			<select class="d-block w-100 mb-3" id="gender">
				<option value="">
					(select one)
				</option>
				<option value="male">
					Male
				</option>
				<option value="female">
					Female
				</option>
				<option value="intersex">
					Intersex
				</option>
				<option value="transgender female">
					Transgender Female
				</option>
				<option value="transgender male">
					Transgender Male
				</option>
			</select>
		</div>
	</div><button class="btn btn-lg btn-primary btn-block" style="margin-top:1em" type="submit">Get challenger!</button>
	<div class="loading hidden"> 🥊</div>
</form>
