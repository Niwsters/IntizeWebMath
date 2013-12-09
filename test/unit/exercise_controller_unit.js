describe("Exercise controller", function() {
	beforeEach(function() {
		this.container = $('<div />', {
			id : 'container'
		}).appendTo('body');
	});
	
	afterEach(function() {
		if(this.container != undefined) {
			this.container.remove();
		};
	});
	
	testForExercises = function(exercise) {
		it("doesn't render instructions without container", function() {
			expect(function() { ExerciseController.renderExercise(exercise) }).toThrow();
		});
		
		it("renders instructions to container", function() {
			id = randomString();
			el = $('<div />', {
				'id' : id
			}).appendTo(this.container);
			
			ExerciseController.renderExercise(exercise, el);
			expect(exists($('#' + id + ' .iwm_instructions'))).toBeTruthy();
		});
		
		it("renders correct instructions", function() {
			ExerciseController.renderExercise(exercise, this.container);
			
			expect($('.iwm_instructions').text()).toEqual(exercise.getInstructions());
		});
		
		it("renders answer input field", function() {
			ExerciseController.renderExercise(exercise, this.container);
			
			expect(exists($('input.iwm_input'))).toBeTruthy();
		});
		
		it("renders submit button", function() {
			ExerciseController.renderExercise(exercise, this.container);
			
			expect(exists($('button.iwm_submit'))).toBeTruthy();
		});
		
		it("renders submit button with submit text", function() {
			ExerciseController.renderExercise(exercise, this.container);
			
			expect($('button.iwm_submit').text()).toEqual('Submit');
		});
		
		it("gives feedback when incorrect answer submitted", function() {
			ExerciseController.renderExercise(exercise, this.container);
			$('button.iwm_submit').click();
			expect($('.iwm_feedback').text()).toEqual('Incorrect!');
		});
		
		it("gives feedback when correct answer submitted", function() {
			ExerciseController.renderExercise(exercise, this.container);
			$('input.iwm_input').val(exercise.getAnswer());
			$('button.iwm_submit').click();
			expect($('.iwm_feedback').text()).toEqual('Correct!');
		});
	}
	
	describe("container picker", function() {
		beforeEach(function() {
			this.container1 = $('<div />', {
				exercise : 'x + b = 0'
			}).appendTo(this.container);
			
			this.container2 = $('<div />', {
				exercise : 'ax +/- b = c'
			}).appendTo(this.container);
			
			this.containers = $('[exercise]').toArray();
		});
		
		it("renders exercises in picked container", function() {
			ExerciseController.pickContainers();
			ExerciseController.render();
			
			expect(containsExercise(this.container1)).toBeTruthy();
		});
		
		it("renders exercises in picked containers", function() {
			ExerciseController.pickContainers();
			ExerciseController.render();
			
			expect(contains(this.container1, $('.iwm_instructions'))).toBeTruthy();
			expect(contains(this.container2, $('.iwm_instructions'))).toBeTruthy();
		});
		
		it("renders unique exercises in picked containers", function() {
			ExerciseController.pickContainers();
			ExerciseController.render();
			
			expect(this.container1.find('.iwm_instructions').text()).not.toEqual(this.container2.find('.iwm_instructions').text());
		});
		
		it("renders exercise defined in picked container", function() {
			ExerciseController.pickContainers();
			ExerciseController.render();
			
			expect(this.container1.find('.iwm_instructions').text()).toMatch(/\b[a-z] \+ [1-9][0-9]* = 0/);
			expect(this.container2.find('.iwm_instructions').text()).toMatch(/\b[1-9][0-9]*[a-z] [\+\-] [1-9][0-9]* = [1-9][0-9]*/);
		});
		
		afterEach(function() {
			ExerciseController.containers = [];
		});
	});
	
	describe("exercise container", function() {
		
		beforeEach(function() {
			this.container1 = $('<div />', {
				exercise : ''
			}).appendTo(this.container);
			
			this.container2 = $('<div />', {
				exercise : ''
			}).appendTo(this.container);
			
			this.containers = $('[exercise]').toArray();
			
			this.exerciseContainer = {};
			this.exerciseContainer.exercise = Exercise.get('x + b = 0');
			this.exerciseContainer.element = $(this.container1);
			
			this.exerciseContainer2 = {};
			this.exerciseContainer2.exercise = Exercise.get('x + b = 0');
			this.exerciseContainer2.element = $(this.container2);
		});
		
		afterEach(function() {
			ExerciseController.containers = [];
			ExerciseController.exerciseContainers = [];
		});
		
		it("gives exercise containers", function() {
			containers = [exerciseContainer, exerciseContainer]
			ExerciseController.exerciseContainers = containers;
			
			expect(ExerciseController.getExerciseContainers()).toEqual(containers);
		});
		
		it("adds exercise container", function() {
			ExerciseController.addExerciseContainer(this.exerciseContainer);
			
			expect(ExerciseController.getExerciseContainers()).toContain(this.exerciseContainer);
		});
		
		it("renders multiple exercises", function() {
			ExerciseController.addExerciseContainer(this.exerciseContainer);
			ExerciseController.addExerciseContainer(this.exerciseContainer2);
			
			ExerciseController.render();
			
			expect(containsExercise(this.container1)).toBeTruthy();
			expect(containsExercise(this.container2)).toBeTruthy();
		});
		
		it("gives feedback for correct exercise", function() {
			ExerciseController.addExerciseContainer(this.exerciseContainer);
			ExerciseController.addExerciseContainer(this.exerciseContainer2);
			
			ExerciseController.render();
			
			input = this.exerciseContainer.element.find('.iwm_input');
			submit = this.exerciseContainer.element.find('.iwm_submit');
			exercise = this.exerciseContainer.exercise;
			
			input.val(exercise.getAnswer());
			submit.click();
			
			feedback = this.exerciseContainer.element.find('.iwm_feedback');
			expect(feedback.text()).toEqual('Correct!');
		});
		
		it("doesn't stack feedback", function() {
			ExerciseController.addExerciseContainer(this.exerciseContainer);
			
			ExerciseController.render();
			
			submit = this.exerciseContainer.element.find('.iwm_submit');
			submit.click();
			submit.click();
			
			feedback = this.exerciseContainer.element.find('.iwm_feedback');
			expect(feedback.length > 1).toBeFalsy();
		});
		
		it("allows answers in fractions", function() {
			this.exerciseContainer.exercise = Exercise.get('ax/d = c');
			
			ExerciseController.addExerciseContainer(this.exerciseContainer);
			ExerciseController.render();
			
			input = this.exerciseContainer.element.find('.iwm_input');
			instructions = this.exerciseContainer.element.find('.iwm_instructions');
			
			regex = /\b([1-9][0-9]*)x\/([1-9][0-9]*) = ([0-9]*)/g;
			result = regex.exec(instructions.text());
			
			a = parseInt(result[1]);
			d = parseInt(result[2]);
			c = parseInt(result[3]);
			answer = String(c*d) + '/' + String(a);
			
			input.val(answer);
			submit = this.exerciseContainer.element.find('.iwm_submit');
			submit.click();
			
			feedback = this.exerciseContainer.element.find('.iwm_feedback');
			expect(feedback.text()).toEqual('Correct!');
		});
		
		it("allows rounded answers", function() {
			this.exerciseContainer.exercise = Exercise.get('ax/d = c');
			
			ExerciseController.addExerciseContainer(this.exerciseContainer);
			ExerciseController.render();
			
			input = this.exerciseContainer.element.find('.iwm_input');
			instructions = this.exerciseContainer.element.find('.iwm_instructions');
			
			regex = /\b([1-9][0-9]*)x\/([1-9][0-9]*) = ([0-9]*)/g;
			result = regex.exec(instructions.text());
			
			if(!result) alert(instructions.text());
			
			a = parseInt(result[1]);
			d = parseInt(result[2]);
			c = parseInt(result[3]);
			answer = String(Math.round(c*d/a * 100)/100);
			
			input.val(answer);
			submit = this.exerciseContainer.element.find('.iwm_submit');
			submit.click();
			
			feedback = this.exerciseContainer.element.find('.iwm_feedback');
			expect(feedback.text()).toEqual('Correct!');
		});
		
		it("allows answer with comma", function() {
			this.exerciseContainer.exercise = Exercise.get('ax/d = c');
			
			ExerciseController.addExerciseContainer(this.exerciseContainer);
			ExerciseController.render();
			
			input = this.exerciseContainer.element.find('.iwm_input');
			instructions = this.exerciseContainer.element.find('.iwm_instructions');
			
			regex = /\b([1-9][0-9]*)x\/([1-9][1-9]*) = ([0-9]*)/g;
			result = regex.exec(instructions.text());
			
			if(!result) alert(instructions);
			
			a = parseInt(result[1]);
			d = parseInt(result[2]);
			c = parseInt(result[3]);
			answer = String(Math.round(c*d/a * 100)/100);
			
			answer = answer.replace('.',',');
			input.val(answer);
			submit = this.exerciseContainer.element.find('.iwm_submit');
			submit.click();
			
			feedback = this.exerciseContainer.element.find('.iwm_feedback');
			expect(feedback.text()).toEqual('Correct!');
		});
	});
	
	describe("renderer", function() {
		
		exercises = [
				Exercise.get("x + b = 0"),
				Exercise.get("x - b = 0"),
				Exercise.get("ax + b = c"),
				Exercise.get("ax +/- b = c")
				];
		
		for(var i = 0; i < exercises.length; i++) {
			testForExercises(exercises[i]);
		};
	});
});
