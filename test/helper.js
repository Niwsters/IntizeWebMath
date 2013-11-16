

function flunk(msg) {
	expect(false).toBeTruthy(msg);
}

function unimplemented() {
	flunk('Unimplemented');
}

function isEmpty(el){
    return !$.trim(el.html())
}