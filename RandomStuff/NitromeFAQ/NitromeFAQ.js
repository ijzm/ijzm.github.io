window.addEventListener('load', function() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			RenderPage(this.responseText);
		}
	};
	xhttp.open("GET", "NitromeFAQ.json", true);
	xhttp.send();
});

function RenderPage(data) {
	CreateNavigator(data);
	data = JSON.parse(data);

	parent = document.getElementById("FAQ");
	/*
	<div class="Question">
	<h1>
		QUESTION
	</h1>
	<a href="#">
		ANSWER1
	</a>
	</div>
	*/


	Object.keys(data.Categories).forEach(function(CurrentCategory){
		var Category = data.Categories[CurrentCategory]

		var htmlCategory = document.createElement("div");
		htmlCategory.classList.add("Expand");

		var htmlCategoryText = document.createElement("h1");
		htmlCategoryText.innerHTML = CurrentCategory;
		htmlCategory.append(htmlCategoryText);
		htmlCategory.id = CurrentCategory;

		Object.keys(Category).forEach(function(CurrentQuestion){
			var Question = Category[CurrentQuestion];

			var htmlQuestion = document.createElement("div");
			htmlQuestion.classList.add("Question");
			htmlQuestion.classList.add("FullBox");
			htmlQuestionText = document.createElement("h2");
			htmlQuestionText.innerHTML = Question.q;
			htmlQuestion.append(htmlQuestionText);

			//console.log(Question.q);

			Object.keys(Question.a).forEach(function(CurrentAnswer){
				var Answer = Question.a[CurrentAnswer];
				var Source = Question.s[CurrentAnswer];

				var htmlAnswer = document.createElement("a");
				htmlAnswer.href = Source;

				Object.keys(Answer).forEach(function(CurrentLine){
					//console.log(Answer[CurrentLine]);

					htmlAnswer.innerHTML += Answer[CurrentLine];
					htmlAnswer.innerHTML += "</br>";
				});
				//console.log(Source);

				htmlQuestion.append(htmlAnswer);

			});

			htmlCategory.appendChild(htmlQuestion);
		});

		parent.appendChild(htmlCategory);
	});
}

function CreateNavigator(data) {
	//TODO
}