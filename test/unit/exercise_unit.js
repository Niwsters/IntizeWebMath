describe("Exercise", function() {
	
	testExercise = function(instructionsRegex) {
		it("has instructions", function() {
			expect(this.exercise.getInstructions().length > 0).toBeTruthy();
		});
		
		it("has answer in the form of a number", function() {
			expect(isNaN(this.exercise.getAnswer())).toBeFalsy();
		});
		
		it("gives instructions on the correct form", function() {
			expect(this.exercise.getInstructions()).toMatch(instructionsRegex);
		});
		
		it("has correct answer", function() {
			regex = /\b([1-9]?[0-9]*)x\/?([1-9]?[0-9]*) ([\-\+]?)\s?([1-9]?[0-9]*)\s?= ([0-9]*)/g
			instructions = this.exercise.getInstructions();
			result = regex.exec(instructions);
			if(!result) alert(instructions);
			
			a = parseInt(result[1]);
			if(isNaN(a)) a = 1;
			
			d = parseInt(result[2]);
			if(isNaN(d)) d = 1;
			
			sign = result[3];
			b = parseInt(result[4]);
			c = parseInt(result[5]);
			
			if(sign == '+') {
				correctAnswer = (c-b)/a*d;
			} else if(sign == '-') {
				correctAnswer = (c+b)/a*d;
			} else {
				correctAnswer = c/a*d;
			};
			
			answer = this.exercise.getAnswer();
			expect(answer).toEqual(correctAnswer);
		});
	};
	
	describe("factory", function() {
		it("should create exercise of given values", function() {
			instructions = randomString();
			answer = randomInt();
			exercise = new Exercise.getExercise(instructions, answer);
			
			expect(exercise.getInstructions()).toEqual(instructions);
			expect(exercise.getAnswer()).toEqual(answer);
		});
	});
	
	describe("[x + b = 0]", function() {
		beforeEach(function() {
			this.exercise = Exercise.get("x + b = 0");
		});
		
		testExercise(/\b[a-z] \+ [1-9][0-9]* = 0/);
	});
	
	describe("[x - b = 0]", function() {
		beforeEach(function() {
			this.exercise = Exercise.get("x - b = 0");
		});
		
		testExercise(/\b[a-z] \- [1-9][0-9]* = 0/);
	});
	
	describe("[x + b = c]", function() {
		beforeEach(function() {
			this.exercise = Exercise.get("x + b = c");
		});
		
		testExercise(/\b[a-z] \+ [1-9][0-9]* = [1-9][0-9]*/);
	});
	
	describe("[x - b = c]", function() {
		beforeEach(function() {
			this.exercise = Exercise.get("x - b = c");
		});
		
		testExercise(/\b[a-z] \- [1-9][0-9]* = [1-9][0-9]*/);
	});
	
	describe("[ax = c]", function() {
		beforeEach(function() {
			this.exercise = Exercise.get("ax = c");
		});
		
		testExercise(/\b[1-9][0-9]*[a-z] = [1-9][0-9]*/);
	});
	
	describe("[ax + b = c]", function() {
		beforeEach(function() {
			this.exercise = Exercise.get("ax + b = c");
		});
		
		testExercise(/\b[1-9][0-9]*[a-z] \+ [1-9][0-9]* = [1-9][0-9]*/);
	});
	
	describe("[ax - b = c]", function() {
		beforeEach(function() {
			this.exercise = Exercise.get("ax - b = c");
		});
		
		testExercise(/\b[1-9][0-9]*[a-z] \- [1-9][0-9]* = [1-9][0-9]*/);
	});
	
	describe("[ax +/- b = c]", function() {
		beforeEach(function() {
			this.exercise = Exercise.get("ax +/- b = c");
		});
		
		testExercise(/\b[1-9][0-9]*[a-z] [\+\-] [1-9][0-9]* = [1-9][0-9]*/);
	});
	
	describe("[ax +/- b = c]", function() {
		beforeEach(function() {
			this.exercise = Exercise.get("x/d = c");
		});
		
		testExercise(/\b[a-z]\/[1-9][0-9]* = [1-9][0-9]*/);
	});
});
