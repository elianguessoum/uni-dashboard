loadData();

function loadData(){	
	httpRequest = new XMLHttpRequest();	
	httpRequest.open('GET', '/api/data');
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			data_JSON = JSON.parse(httpRequest.response);
			update_Bars(data_JSON);			
		}
	};
	httpRequest.send();
	httpRequest2 = new XMLHttpRequest();	
	httpRequest2.open('GET', '/api/data2');
	httpRequest2.onreadystatechange = function () {
		if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
			data_JSON2 = JSON.parse(httpRequest2.response);
			update_Lines(data_JSON2);
		}
	};
	httpRequest2.send();

	httpRequest3 = new XMLHttpRequest();	
	httpRequest3.open('GET', '/api/data4');
	httpRequest3.onreadystatechange = function () {
		if (httpRequest3.readyState === 4 && httpRequest3.status === 200) {
			data_JSON4 = JSON.parse(httpRequest3.response);
			update_Pie(data_JSON4);
		}
	};
	httpRequest3.send();
	httpRequest4 = new XMLHttpRequest();	
	httpRequest4.open('GET', '/api/data5');
	httpRequest4.onreadystatechange = function () {
		if (httpRequest4.readyState === 4 && httpRequest4.status === 200) {
			data_JSON5 = JSON.parse(httpRequest4.response);
			update_polar(data_JSON5);
		}
	};
	httpRequest4.send();
	httpRequest5 = new XMLHttpRequest();	
	httpRequest5.open('GET', '/api/data3');
	httpRequest5.onreadystatechange = function () {
		if (httpRequest5.readyState === 4 && httpRequest5.status === 200) {
			data_JSON3  = JSON.parse(httpRequest5.response);
			update_barchartgrouped(data_JSON3);
		}
	};
	httpRequest5.send();
	httpRequest6 = new XMLHttpRequest();	
	httpRequest6.open('GET', '/api/data6');
	httpRequest6.onreadystatechange = function () {
		if (httpRequest6.readyState === 4 && httpRequest6.status === 200) {
			data_JSON6  = JSON.parse(httpRequest6.response);
			update_echec_bar_chart(data_JSON6);
		}
	};
	httpRequest6.send();
}
function update_Bars(data_JSON){	

	var labels = data_JSON.map(function(e) {
	   return e.annee;
	});
	
	var data = data_JSON.map(function(e) {
	   return e.data;
	});
	new Chart(document.getElementById("bar-chart"), {
		type: 'bar',
		data: {
		  labels: labels,
		  datasets: [
			{
			  label: "le nombre d’étudiants",
			  backgroundColor: ["#6b146b","#d30d59","#c45850"],
			  data: data
			}
		  ]
		},
		options: {
		  responsive: false,
		  maintainAspectRatio: true,	
		  legend: { display: false },
		  title: {
			display: true,
			text: 'le nombre d’étudiants par années'
		  }
		}
	});
}
function update_Lines(data_JSON2){
	var labels = data_JSON2.annee;
	for(d of data_JSON2.datasets){
		d.fill = false;				  
		d.borderColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		d.borderWidth=2;
		d.radius=1;			
	}			
	var data =data_JSON2.datasets;
	new Chart(document.getElementById("line-chart"), {
		type: 'line',
		data: {
			labels: labels,
			datasets: data
		},
		options: {						
			responsive: false,
			maintainAspectRatio: true,
			title: {
				display: false,
				text: 'le nombre d’étudiants par sexe'
			},
			legend:{
				position:'top'
			}
		}
	});
}

function update_Pie(data_JSON4){
	var labels = data_JSON4.map(function(e) {return e.annee;});
	
	var data = data_JSON4.map(function(e) {
	   return e.data;
	});
	
	new Chart(document.getElementById("pie-chart"), {
		type: 'pie',
		data: {
		  labels: labels,
		  datasets: [{
			label: "le nombre de réussite par année",
			backgroundColor: ["#6b146b","#d30d59","#c45850"],
			data: data
		  }]
		},
		options: {
		  responsive: false,
		  maintainAspectRatio: true,
		  title: {
			display: false,
			text: 'le nombre de réussite par année'
		  },
		  legend:{
			position:'right'
		  }
		}
	});	
}
function update_polar(data_JSON5){
	var labels = data_JSON5.map(function(e) {return e.annee;});
	
	var data = data_JSON5.map(function(e) {
	   return e.data;
	});
new Chart(document.getElementById("polar-chart"), {
    type: 'polarArea',
    data: {
      labels:labels,
      datasets: [
        {
          label: "nombre de réussite",
          backgroundColor: ["#a32506", "#ffea30","#00d4a6","#0016dd","#6b146b"
		  ,"#d30d59","rgba(255, 108, 23, 0.966)"],
          data: data
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'le nombre de réussite par spécialité en 2021'
      }
    }
});
}
function update_echec_bar_chart(data_JSON6) {

	var label = data_JSON6.map(function(e) {
		return e.specialite;
	 });

	 var data = data_JSON6.map(function(e) {
		return e.data;
	 });
    new Chart(document.getElementById("bar-chart-echec-specialite"), {
		type: 'doughnut',
		data: {
		  labels: label,
		  datasets: [
			{
			  label: "le nombre d’étudiants",
			  backgroundColor: ["#a32506", "#ffea30","#00d4a6","#0016dd","#6b146b"
			  ,"#d30d59","rgba(255, 108, 23, 0.966)"],
			  data: data
			}
		  ]
		},
		options: {
			responsive: false,
			maintainAspectRatio: true,
			title: {
			  display: false,
			  text: 'le nombre dechec par specialite'
			},
			legend:{
			  position:'right'
			}
		  }
	});
}
function update_barchartgrouped(data_JSON3){
	var labels = data_JSON3.annee;
	
	for(d of data_JSON3.datasets){
		d.fill = false;				  
		d.backgroundColor= '#'+Math.floor(Math.random()*16777215).toString(16);
		d.borderWidth=2;
		d.radius=1;			
	}			
	
	var data =data_JSON3.datasets;
	new Chart(document.getElementById("bar-chart-grouped"), {
    	type: 'bar',
    	data: {
      	labels:labels,
      	datasets: data
    	},
  	  options: {
    	  	title: {
          	display: true,
	        text: ''
      	}
    	}
});}


   