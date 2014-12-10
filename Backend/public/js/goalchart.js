$(document).ready(function() {
    createChart();
});

var goalsArray; 
completed = 0;
notCompleted = 0;

function createChart() {
  google.load("visualization", "1", {packages:["corechart"]});
  google.setOnLoadCallback(runTableLoop);
}

function runTableLoop() {
 	goalsArray = [['Whether Completed', 'percentage'],
		          		['Completed',     completed],
		          		['Not Completed',  notCompleted]];

	currentData = google.visualization.arrayToDataTable(goalsArray);

	var options = {
	  width: 300,
  	title: 'My Goals',
  	is3D: true
  };

  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));

  chart.draw(currentData, options);
}

function updateData(ifCompleted) {
	if (ifCompleted == 1) {
		if (notCompleted > 0) {
			notCompleted -= 1;
		}
		completed += 1;
	//for 
	} else if (ifCompleted == 2) {
		completed += 1;
	}
	else notCompleted += 1;
	runTableLoop();
}