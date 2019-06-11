---
layout: default
---

<form id="fight-form" class="form">

  <h1 class="h3 mb-3 font-weight-normal">Choose your weight class:</h1>
  
	<label for="birthyear" class="sr-only">Birth Year</label>
  <select class="yearselect d-block w-100" id="birthyear" required=""></select>
	
	<label for="gender" class="sr-only">Gender (optional)</label>
	<select class="d-block w-100" id="gender" required="">
	<option value="">Gender (optional)</option>
	<option value="Q6581097">Male</option>
	<option value="Q6581072">Female</option>
	<option value="Q1097630">Intersex</option>
	<option value="Q1052281">Transgender Female</option>
	<option value="Q2449503">Transgender Male</option>
	</select>

  <div class="checkbox mb-3">
    <label>
      <input type="checkbox" value="remember-me"> Remember me
    </label>
  </div>
  <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
  <p class="mt-5 mb-3 text-muted">© 2017-2019</p>
</form>
