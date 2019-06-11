---
layout: default
---

<form id="fight-form" class="form text-center">

  <h1 class="h3 mb-3 font-weight-normal">Choose your weight class:</h1>
  
	<label for="birthyear" class="sr-only">Birth Year</label>
  <select class="yearselect d-block w-100" id="birthyear" required="">
	<option value="">Your Birth Year</option>
	</select>
	
	<label for="gender" class="sr-only">Gender (optional)</label>
	<select class="d-block w-100 mb-3" id="gender">
	<option value="">Your Gender (optional)</option>
	<option value="male">Male</option>
	<option value="female">Female</option>
	<option value="intersex">Intersex</option>
	<option value="transgender female">Transgender Female</option>
	<option value="transgender male">Transgender Male</option>
	</select>

<button class="btn btn-lg btn-primary btn-block" type="submit" style="margin-top:1em">Get challenger!</button>

</form>
