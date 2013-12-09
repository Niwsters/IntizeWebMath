ExerciseController = function() {
	
	this.exerciseContainers = [];
	
	this.renderExercise = function(exercise, container) {
		if(container == undefined) throw "Container unspecified";
		if(exercise == undefined) {
			container.html("Exercise pattern not recognized")
		};
		
		this.exerciseContainer = {};
		
		this.exerciseContainer.instructions = $('<span />', {
			'class' : 'iwm_instructions',
			'text' : exercise.getInstructions()
		}).appendTo(container);
		
		this.exerciseContainer.input = $('<input />', {
			'class' : 'iwm_input'
		});
		
		this.exerciseContainer.submit = $('<button />', {
			'class' : 'iwm_submit',
			'onClick' : 'ExerciseController.giveFeedback($(this))',
			'text' : 'Submit'
		});
		
		this.exerciseContainer.answer = $('<div />', {
			'class' : 'iwm_answer',
			'display' : 'hidden',
			'val' : exercise.getAnswer()
		});
		
		for(element in this.exerciseContainer) {
			this.exerciseContainer[element].appendTo(container);
		};
	};
	
	this.giveFeedback = function(trigger) {
		container = trigger.parent();
		
		feedback = container.find('.iwm_feedback');
		if(feedback.length == 0) {
			feedback = $('<div />', {
			'class' : 'iwm_feedback'
			}).appendTo(container);
		};
		
		answer = container.find('.iwm_input').val();
		answer = answer.replace(',','.');
		regex = /([1-9][0-9]*)\/([1-9][0-9]*)/g;
		result = regex.exec(answer)
		
		if(result) {
			a = parseInt(result[1]);
			b = parseInt(result[2]);
			
			answer = a/b;
		};
		
		correctAnswer = container.find('.iwm_answer').val();
		
		answer = Math.round(answer * 100)/100;
		correctAnswer = Math.round(correctAnswer * 100)/100;
		if(answer == correctAnswer) {
			feedback.text('Correct!');
		} else {
			feedback.text('Incorrect!');
		};
	};
	
	this.pickContainers = function() {
		containers = $.find('[exercise]');
		
		for(container in containers) {
			exerciseType = $(containers[container]).attr('exercise');
			exercise = Exercise.get(exerciseType);
			
			exerciseContainer = {};
			exerciseContainer.exercise = exercise;
			exerciseContainer.element = containers[container];
			
			this.addExerciseContainer(exerciseContainer);
		};
	};
	
	this.render = function() {
		containers = this.getExerciseContainers();
		for(exerciseContainer in containers) {
			this.renderExercise(containers[exerciseContainer].exercise, containers[exerciseContainer].element);
		};
	};
	
	this.addExerciseContainer = function(exerciseContainer) {
		this.exerciseContainers.push(exerciseContainer);
	};
	
	this.getExerciseContainers = function() {
		return this.exerciseContainers;
	};
};

ExerciseController = new ExerciseController();
