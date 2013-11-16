<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Seb's Mathematics Exercises Unit Tests</title>
		<link rel="stylesheet" href="qunit.css">
	</head>
<body>
	<?php
	include('../template.php');
	?>
	
	<div id="qunit"></div>
	<div id="qunit-fixture"></div>
	<script src="qunit.js"></script>
	<script src="../jquery.js"></script>
	<script src="../MathExercises.js"></script>
	<script>
	mathExercises = new MathExercises();
	mathExercises.init();
	</script>
	<script>
		function exists(query) {
			return $("body").has(query).length != 0;
		}
		
		test("Start page", function() {
			equal($("h1.math-header").html(), "Math Exercises", 
				"Header exists");
			equal(exists("nav.math-navigation"), 
				true, "Navigation exists");
			equal(exists("div.math-exercise"),true, 
				"Exercise container exists");
		});
		
		test("Addition exercise", function() {
			$(".math-choose-addition").trigger("click");
			ok(exists("h2.math-exercise-header"),"Exercise header exists");
		});
	</script>
</body>
</html>