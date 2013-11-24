WebMath = function() {
	this.start = function() {
		this.renderChooseButtons();
	};
	
	this.clearElements = function() {
		for(element in this.elements) {
			this.elements[element].remove();
		};
		this.elements = {};
	};
	
	this.getAllElements = function() {
		return this.elements;
	};
	
	this.getCurrentExercise = function() {
		return this.currentExercise;
	};
	
	this.giveFeedback = function() {
		if(this.elements.input.val() == this.getCurrentExercise().getAnswer()) {
			this.elements.feedback.text('Correct!');
		} else {
			this.elements.feedback.text('Incorrect!');
		}
	};
	
	this.renderChooseButtons = function() {
		this.clearElements();
		
		this.elements.chooseAddition = $('<button />', {
			'class' : 'iwm_choose_addition',
			'text' : 'Addition',
			'onClick' : 'WebMath.startAdditionExercise()'
		});
		
		this.elements.chooseSubtraction = $('<button />', {
			'class' : 'iwm_choose_subtraction',
			'text' : 'Subtraction',
			'onClick' : 'WebMath.startSubtractionExercise()'
		});
		
		for(element in this.elements) {
			this.elements[element].appendTo('body');
		};
	};
	
	this.startExercise = function() {
		this.clearElements();
		this.renderChooseButtons();
		
		this.elements.instructions = $('<span></span>', {
			'class' : 'iwm_instructions',
			'text' : this.getCurrentExercise().getInstructions()
		}).appendTo('body');
		
		this.elements.input = $('<input />', {
			'class' : 'iwm_answer'
		}).appendTo('body');
		
		this.elements.feedback = $('<span></span>', {
			'class' : 'iwm_feedback'
		}).appendTo('body');
		
		this.elements.submit = $('<button />', {
			'class' : 'iwm_submit',
			'text' : 'Submit',
			'onClick' : 'WebMath.giveFeedback()'
		}).appendTo('body');
	};
	
	this.startAdditionExercise = function() {
		this.currentExercise = new Exercise.getAdditionExercise();
		this.startExercise();
	};
	
	this.startSubtractionExercise = function() {
		this.currentExercise = new Exercise.getSubtractionExercise();
		this.startExercise();
	};
	
	this.getAnswer = function() {
		return this.getCurrentExercise().getAnswer();
	};
};

WebMath = new WebMath();

Exercise = function() {
	this.getExercise = function(type, b, instructions, answer) {
		this.type = type;
		this.b = b;
		this.instructions = instructions;
		this.answer = answer;
		
		this.getType = function() {
			return this.type;
		};
		
		this.getB = function() {
			return this.b;
		};
		
		this.getInstructions = function() {
			return this.instructions;
		};
		
		this.getAnswer = function() {
			return this.answer;
		};
	};
	
	this.getAdditionExercise = function() {
		type = 'addition';
		b = 1 + Math.floor(Math.random()*50);
		instructions = 'x + ' + String(b) + " = 0";
		answer = -b;
		
		return new Exercise.getExercise(type, b, instructions, answer);
	};
	
	this.getSubtractionExercise = function() {
		type = 'subtraction'
		b = 1 + Math.floor(Math.random()*50);
		instructions = "x - " + String(b) + " = 0";
		answer = b;
		
		return new Exercise.getExercise(type, b, instructions, answer);
	};
};

Exercise = new Exercise();