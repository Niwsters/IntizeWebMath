/* Som matematikstuderande,
vill jag kunna göra repetitiva övningar i ekvationslösning,
så att jag kan förbättra min säkerhet och förståelse i matematik. */

describe("Exercises", function() {
	
	beforeEach(function() {
		WebMath.start();
	});
	
	it("should give instructions", function() {
		expect(isEmpty($('.iwm_instructions'))).toBeFalsy();
	});
	
	it("should allow input answer", function() {
		expect($('.iwm_answer').count() > 0).toBeTruthy();
	});
	
	it("should give feedback when given answer", function() {
		
		it("should output correct when given correct answer", function() {
			inputAnswer(WebMath.getCorrectAnswer());
			expect($('.iwm_feedback').text()).toEqual("Correct!");
		});
		
		it("should output incorrect when given incorrect answer", function() {
			inputAnswer(incorrectAnswer());
			expect($('.iwm_feedback').text()).toEqual("Incorrect!");
		});
	});
});

function inputAnswer(ans) {
	$('.iwm_answer').val(ans);
	$('.iwm_submit').click();
}

function incorrectAnswer() {
	var ans = 0;
	while(ans != WebMath.getCorrectAnswer()) {
		ans = Math.random();
	}
	return ans;
}