describe("WebMath", function() {
	
	testExercise = function() {
		
		it("renders answer input", function() {
			expect(exists(this.answerInput)).toBeTruthy();
		});
		
		it("renders instructions container", function() {
			expect(exists(this.instructionsField)).toBeTruthy();
		});
		
		it("renders any instructions", function() {
			expect(isEmpty($(this.instructionsField))).toBeFalsy();
		});
		
		it("renders its exercise instruction", function() {
			expect($(this.instructionsField).text()).toEqual(WebMath.getCurrentExercise().getInstructions());
		});
		
		it("renders submit button", function() {
			expect(exists(this.submitButton)).toBeTruthy();
		});
		
		it("renders submit button with value submit", function() {
			expect(this.submitButton.text()).toEqual('Submit');
		});
		
		it("has feedback field", function() {
			expect(exists(this.feedbackField)).toBeTruthy();
		});
		
		it("checks whether submitted answer is correct", function() {
			this.answerInput.val(WebMath.getCurrentExercise().getAnswer());
			this.submitButton.click();
			
			expect(this.feedbackField.text()).toEqual('Correct!');
		});
	};
	
	beforeEach(function() {
		initElements(this);
	});
	
	/* it("has a working start function", function() {
		expect(function() { WebMath.start() }).not.toThrow();
	});
	
	it("has a working getAllElements function", function() {
		expect(function() { WebMath.getAllElements() }).not.toThrow();
	});
	
	it("gives all elements", function() {
		expect(WebMath.getAllElements()).toEqual(WebMath.elements);
	});
	
	it("resets when start function is called twice", function() {
		WebMath.start();
		WebMath.start();
		
		elements = WebMath.getAllElements();
		for(element in elements) {
			expect($('.' + elements[element].attr('class')).length > 1).toBeFalsy();
		};
	});
	
	it("starts without chosen exercise", function() {
		expect(typeof(WebMath.getCurrentExercise())).toEqual('undefined');
	});
	
	it("clears elements object", function() {
		WebMath.elements.test = $('<span></span>', {
			'class' : 'iwm_feedback'
		});
		WebMath.clearElements();
		expect(size(WebMath.elements) == 0).toBeTruthy();
	});
	
	it("clears all rendered elements", function() {
		WebMath.elements.test = $('<span></span>', {
			'class' : 'iwm_feedback'
		}).appendTo('body');
		WebMath.clearElements();
		expect(exists($('.iwm_feedback'))).toBeFalsy();
	});
	
	
	/*describe("addition exercise", function() {
		
		beforeEach(function() {
			WebMath.start();
			this.chooseAdditionButton.click();
			initElements(this);
			this.correctForm = /\b[a-z] \+ [1-9][0-9]* = 0/
		});
		
		it("has a choose addition button", function() {
			expect(exists(this.chooseAdditionButton)).toBeTruthy();
		});
		
		it("has a choose addition button with correct label", function() {
			expect(this.chooseAdditionButton.text()).toEqual("Addition");
		});
		
		it("has a choose button that switches to addition", function() {
			this.chooseAdditionButton.click();
			expect(WebMath.getCurrentExercise().getInstructions()).toMatch(this.correctForm);
		});
		
		testExercise();
		
		it("checks whether submitted answer is incorrect", function() {
			var ans = 1 + Math.floor(Math.random());
			while(ans == WebMath.getCurrentExercise().getAnswer()) {
				ans = 1 + Math.floor(Math.random());
			}
			this.answerInput.val(ans);
			this.submitButton.click();
			
			expect(this.feedbackField.text()).toEqual('Incorrect!');
		});
		
		it("has a choose button that updates instruction", function() {
			this.chooseAdditionButton.click();
			initElements(this);
			expect(this.instructionsField.text()).toEqual(
				WebMath.getCurrentExercise().getInstructions());
		});
	});
	
	describe("subtraction exercise", function() {
		beforeEach(function() {
			WebMath.start();
			this.chooseSubtractionButton.click();
			initElements(this);
			this.correctForm = /\b[a-z] \- [1-9][0-9]* = 0/
		});
		
		testExercise();
		
		it("has a choose addition button", function() {
			expect(exists(this.chooseSubtractionButton)).toBeTruthy();
		});
		
		it("has a choose addition button with correct label", function() {
			expect(this.chooseSubtractionButton.text()).toEqual("Subtraction");
		});
		
		it("has a choose button that switches to subtraction", function() {
			this.chooseSubtractionButton.click();
			expect(WebMath.getCurrentExercise().getInstructions()).toMatch(this.correctForm);
		});
		
		it("has a choose button that updates instruction", function() {
			this.chooseSubtractionButton.click();
			initElements(this);
			expect(this.instructionsField.text()).toEqual(
				WebMath.getCurrentExercise().getInstructions());
		});
	});*/
});
