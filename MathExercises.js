function MathExercises() {
	this.container = $(".math-exercise");
	var me = this;
	
	this.init = function() {
		$(".math-navigation").on("click",".math-choose-addition",this.renderExercise);
	}
	
	this.renderExercise = function() {
		me.container.append('<h2 class="math-exercise-header">Addition</h2>');
	}
}