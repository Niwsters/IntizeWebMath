WebMath = function() {
	this.start = function() {
		
		this.clearElements();
		
		this.elements.chooseAddition = $('<button />', {
			'class' : 'iwm_choose_addition',
			'text' : 'Addition',
			'onClick' : 'WebMath.chooseAddition()'
		});
		
		this.elements.chooseSubtraction = $('<button />', {
			'class' : 'iwm_choose_subtraction',
			'text' : 'Subtraction',
			'onClick' : 'WebMath.chooseSubtraction()'
		});
		
		for(element in this.elements) {
			this.elements[element].appendTo('body');
		};
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
	
	this.getAdditionExercise = function() {
		this.currentExercise =  new Exercise.getAdditionExercise();
		
		this.clearElements();
		this.start();
		
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
		
		return this.getCurrentExercise();
	};
	
	this.getSubtractionExercise = function() {
		this.currentExercise = new Exercise.getSubtractionExercise();
		
		this.clearElements();
		this.start();
		
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
		
		return this.getCurrentExercise();
	};
	
	this.getAnswer = function() {
		return this.getCurrentExercise().getAnswer();
	};
	
	this.chooseSubtraction = function() {
		this.currentExercise = this.getSubtractionExercise();
		this.elements.instructions.text(this.currentExercise.getInstructions());
	};
	
	this.chooseAddition = function() {
		this.currentExercise = this.getAdditionExercise();
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
