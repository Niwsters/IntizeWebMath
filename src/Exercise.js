Exercise = function() {
	this.getExercise = function(instructions, answer) {
		this.instructions = instructions;
		this.answer = answer;
		
		this.getInstructions = function() {
			return this.instructions;
		};
		
		this.getAnswer = function() {
			return this.answer;
		};
	};
	
	this.getAdditionExercise = function() {
		type = 'addition';
		b = this.randomInt();
		instructions = 'x + ' + String(b) + " = 0";
		answer = -b;
		
		return new Exercise.getExercise(instructions, answer);
	};
	
	this.get = function(form) {
		regex = /\b(a?)x\/?(d?) ([\/\-\+]*)\s?(b?)\s?= ([0|c])/g;
		
		if(result = regex.exec(form)) {
			a = result[1]
			d = result[2];
			sign = result[3];
			b = result[4];
			c = result[5];
		} else {
			return;
		}
		
		if(sign == '+/-') {
			positive = Math.random() > 0.5;
			if(positive) {
				sign = '+';
			} else {
				sign = '-';
			};
		};
		
		if(a == 'a') {
			a = this.randomInt();
			aString = String(a);
		} else {
			a = 1;
			aString = '';
		};
		
		if(b == 'b') {
			b = this.randomInt();
			bString = ' ' + sign + ' ' + String(b);
		} else {
			bString = '';
		};
		
		if(c == 'c') {
			c = this.randomInt();
		};
		
		if(d == 'd') {
			d = this.randomInt();
			dString = '/' + String(d);
		} else {
			d = 1;
			dString = '';
		};
		
		if(sign == '+') {
			answer = (c-b)/a*d;
		} else if(sign== '-') {
			answer = (c+b)/a*d;
		} else {
			answer = c/a*d;
		};
		
		instructions = aString + 'x' + dString + bString + ' = ' + String(c);
		
		return new Exercise.getExercise(instructions, answer);
	};
	
	this.getSubtractionExercise = function() {
		type = 'subtraction'
		b = 1 + Math.floor(Math.random()*50);
		instructions = "x - " + String(b) + " = 0";
		answer = b;
		
		return new Exercise.getExercise(instructions, answer);
	};
	
	this.randomInt = function() {
		return 1 + Math.floor(Math.random()*50);
	};
};

Exercise = new Exercise();