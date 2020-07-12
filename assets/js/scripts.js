$(document).ready(function() {
	SetFooter();
});


//Sets the Year in the Footer Section
function SetFooter() {
	var date = new Date();
	var year = date.getFullYear();
	document.getElementById("footer").innerHTML += year;
}