
document.addEventListener('deviceready', getNews, false);

class News {
  constructor(title,date,desc) {
      this.title = title;
      this.date = date;
      this.desc = desc;
  }
}

var Newss = [];

function NewsStarted(){
	// alert("hi");
	var permanentStorage = window.localStorage;
	var value = permanentStorage.getItem("isDarkMode");
	if(value=="true"){
		// alert("true");
		changeNewsToB();
	}	
	// getNews();	
}

function getNews(){		
	var options = {
        "datePrefix": '__DATE:',
        "fieldValueDelete": "__DELETE",
        "fieldValueServerTimestamp" : "__SERVERTIMESTAMP",
        "persist": true,
		"apiKey": "AIzaSyAm_kCWBoPlYVQXrMYWcEiG_BAF4BvG82k",
		"authDomain": "cordova-project-94dd9.firebaseapp.com",
		"projectId": "cordova-project-94dd9",
		"storageBucket": "cordova-project-94dd9.appspot.com",
		"messagingSenderId": "314491801318",
		"appId": "1:314491801318:web:c567834c99c5dbd6a8f527",
		"measurementId": "G-S8ZPS594BN"
    };

    if (cordova.platformId === "browser") {
        options.config = {
                apiKey: "AIzaSyAm_kCWBoPlYVQXrMYWcEiG_BAF4BvG82k",
				authDomain: "cordova-project-94dd9.firebaseapp.com",
				projectId: "cordova-project-94dd9",
				storageBucket: "cordova-project-94dd9.appspot.com",
				messagingSenderId: "314491801318",
				appId: "1:314491801318:web:c567834c99c5dbd6a8f527",
				measurementId: "G-S8ZPS594BN"
        };
    }
	
    frb= Firestore.initialise(options);
	
	frb.then(function(fb) {
        fb.get().collection('NEWS').get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
					const TempNew = new News(doc.data().title,doc.data().date,doc.data().newsDetails);	
					Newss.push(TempNew);
                });
	
					for(var i =0;i <Newss.length;i++){
						var container = document.createElement('table');
						container.style="-moz-border-radius:6px; border-radius:6px; border:2px gray solid; margin-top:30px; margin-left:10px; margin-right:10px; overflow-x:auto; border-collapse: seperate; width: 95%;";
						var row = container.insertRow(-1);
						var col1 = row.insertCell(-1);
						var h4 = document.createElement('h4');
						h4.align = "justify";
						h4.style.padding = "10px";
						// h4.innerHTML = "New strain of Covid-19 tripled infections despite UK lockdown";
						h4.innerHTML = Newss[i].title;
						col1.appendChild(h4);
						var row2 = container.insertRow(-1);
						var col2 =  row2.insertCell(-1);
						var p1 = document.createElement('p');
						p1.align = "justify";
						p1.style.textAlign = "right";
						p1.style.padding = "10px";
						// p1.innerHTML = "10/08/2020 <hr />";
						p1.innerHTML = Newss[i].date + "<hr />";
						col2.appendChild(p1);
						// row2.appendChils("< hr/>");
						var row3 = container.insertRow(-1);
						var col3 =  row3.insertCell(-1);
						var p2 = document.createElement('p');
						p2.align = "justify";
						p2.style.padding = "10px";
						// p2.innerHTML = "CThe new, more contagious strain of Covid-19 that first emerged in the southeast of England was already spreading rapidly even during the nation’s second lockdown in November, according to a report published Thursday by scientists at Imperial College London. A report by scientists at Imperial College London released on December 31 estimated that the new coronavirus strain tripled its number of infections in England during the November lockdown while the number of new cases caused by the previous variant decreased by a third. The new strain registered a higher reproduction (R) rate – which determines how contagious a disease is based on the number of people infected by each infected person – of 0.7 versus 0.4 for the previous strain, even with the “high levels of social distancing” during the pre-Christmas lockdown.";
						p2.innerHTML = Newss[i].desc;
						col3.appendChild(p2);
						document.getElementById('listNews').appendChild(container);
						document.getElementById('listNews').appendChild(document.createElement('br'));
					}
				
				
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
				alert(error);
            });
    });

}

function CloseWindow(){
	window.history.back();
				
}


function backToTop(){
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}


function  changeNewsToB(){
    var currentTheme = $('#MyNewsPage').attr('data-theme');
    var selectedTheme = "b";
	
    $('#MyNewsPage').attr('data-theme', selectedTheme).removeClass('ui-body-' + currentTheme).addClass('ui-body-' + selectedTheme).trigger('create');
}


