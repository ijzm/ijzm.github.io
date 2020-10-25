window.addEventListener('load', function() {
	SetFooter();
	SetAge();
	if(getCookie("language") == "") {
		setCookie("language", "english", 100);
	}
	changeLanguage(getCookie("language"));

	var RetractedElements = document.getElementsByClassName("Retracted");
	for(var i = 0; i < RetractedElements.length; i++) {
		RetractedElements[i].style.opacity = 0;
	}
});


//Sets the Year in the Footer Section
function SetFooter() {
	var date = new Date();
	var year = date.getFullYear();
	var footer = document.getElementById("footer")
	if(footer != null) {
		footer.innerHTML += year;
	}
}
//Sets my age
function SetAge() {
	var date = new Date();
	//Should be off for about a day
	var birthdate = new Date("1999-08-09");
	var diff = date - birthdate;
	var diffDate = new Date(diff); 

	var year = Math.abs(diffDate.getUTCFullYear() - 1970);
	//Should fix this
	var ageES = document.getElementById("AgeES");
	var ageEN = document.getElementById("AgeEN");
	if(ageES != null) {
		ageES.innerHTML = year;
	}
	if(ageEN != null) {
		ageEN.innerHTML = year;
	}
}

//Language
function changeLanguage(language) {
	var esElements = document.getElementsByClassName("es");
	var enElements = document.getElementsByClassName("en");
	var btnLanguage = document.getElementById("LanguageButton");

	var esShow = "none";
	var enShow = "none";

	if(language == "spanish") {
		esShow = "inline-block";
		btnLanguage.innerHTML = "ES"
		document.getElementById("AboutButton").innerHTML = "Acerca de"
		document.getElementById("PortfolioButton").innerHTML = "Portafolio"
		document.getElementById("ContactButton").innerHTML = "Contacto"
		//document.getElementById("ResumeButton").innerHTML = "Resumé"
	} else {
		enShow = "inline-block";		
		btnLanguage.innerHTML = "EN"
		document.getElementById("AboutButton").innerHTML = "About"
		document.getElementById("PortfolioButton").innerHTML = "Portfolio"
		document.getElementById("ContactButton").innerHTML = "Contact"
		//document.getElementById("ResumeButton").innerHTML = "Resumé"
	}

	for (var i = 0; i < esElements.length; i++) {
		esElements[i].style.display = esShow;
	}

	for (var i = 0; i < enElements.length; i++) {
		enElements[i].style.display = enShow;
	}
}

function languageButton() {
	var language = getCookie("language");
	if(language == "spanish") {
		language = "english";
	} else {
		language = "spanish";
	}
	setCookie("language", language, 100);
	changeLanguage(language);
}

function RetractSection(t) {
	var element = t.nextElementSibling;
	if(element.classList.contains("Retracted")) {
		element.classList.remove("Retracted");
		t.previousElementSibling.scrollIntoView();
		setTimeout(function () {
			element.style.opacity = 1;
		}, 20);
	} else {
		element.style.opacity = 0;
		element.addEventListener('transitionend', function(e) {
			element.classList.add("Retracted");
		}, {
			capture: false,
			once: true,
			passive: false
		});
	}
}

function ShowMenu() {
	var element = document.getElementById("NavButtons");
	element.classList.toggle("ResponsiveNavbar");
}

//Cookies
function setCookie(cookie_name, cookie_value, days_until_expiration) {
	var d = new Date();
	d.setTime(d.getTime() + (days_until_expiration*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cookie_name + "=" + cookie_value + ";" + expires + ";path=/";
}

function getCookie(cookie_name) {
	var name = cookie_name + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}