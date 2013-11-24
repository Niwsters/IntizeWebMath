function flunk(msg) {
	expect(false).toBeTruthy(msg);
};

function unimplemented() {
	flunk('Unimplemented');
};

function isEmpty(element){
    return !$.trim(element.html());
};

function exists(element) {
	return element.length > 0;
};

function hasFunction(fn) {
	expect(function() { fn }).not.toThrow();
};

function initElements(obj) {
	obj.answerInput = $('input.iwm_answer');
	obj.submitButton = $('button.iwm_submit');
	obj.instructionsField = $('.iwm_instructions');
	obj.feedbackField = $('.iwm_feedback');
	obj.chooseAdditionButton = $('button.iwm_choose_addition');
	obj.chooseSubtractionButton = $('button.iwm_choose_subtraction');
};

function randomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
	};
	
    return text;
}

function randomInt() {
	-25 + Math.floor(Math.random()*50)
}

size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};