/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);
// var Mode = "a";
// var darkMode=false;

// function FireIfReady() {
	// var key = 'isDarkMode'
	// var permanentStorage = window.localStorage;
	// var value = permanentStorage.getItem(key);
	// if(!value){
		// permanentStorage.setItem(key, "false");
		// document.getElementById("darkThemee").checked = false;
		// darkMode=false;
	// }else{
		// if(value=="true"){
			// document.getElementById("darkThemee").checked = true;
			// changeToB();
			// darkMode=true;
		// }else{
			// changeToA();
			// darkMode=false;
			// document.getElementById("darkThemee").checked = false;
		// }
	// }
	// alert("done");
// }


function onDeviceReady() {
    // Cordova is now initialized. Have fun!
	//alert("ready");
	//alert("readyy");
   // console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
	//var sharedPreferences = window.plugins.SharedPreferences.getInstance();
	
	// alert("start")
	var key = 'isDarkMode'
	//alert("1");
	var permanentStorage = window.localStorage;
	//alert("2");
	var value = permanentStorage.getItem(key);
	//alert("3");
	if(!value){
		// alert("nulll");
		permanentStorage.setItem(key, "false");
		document.getElementById("darkThemee").checked = false;
		darkMode=false;
	}else{
		//alert(value)
		if(value=="true"){
			//alert("trueee");
			// alert(document.getElementById("darkThemee").checked);
			document.getElementById("darkThemee").checked = true;
			// document.getElementById("MyApp").removeAttribute('data-theme');
			// document.getElementById("MyApp").setAttribute('data-theme', 'b');
			
			// alert($("#MyApp").attr("data-theme"));
			// $("#MyApp").attr("data-theme","b");
			changeToB();
			darkMode=true;
			// alert($("#MyApp").attr("data-theme"));
			
			// $("sidenav").attr("data-theme","b");
			// document.getElementById("sidenav").removeAttribute('data-theme');
			// document.getElementById("sidenav").setAttribute('data-theme', 'b');
			// window.location.reload(true);
			// alert(document.getElementById("darkThemee").checked);
			// changeHospitalsToB();
		}else{
			//alert("falsee");
			changeToA();
			darkMode=false;
			document.getElementById("darkThemee").checked = false;
		}
	}
	// alert("must fire firestore");
	firebasedatabase();
	
	//alert(value);
	
}


function calc()
{
  var permanentStorage = window.localStorage;
  var key = 'isDarkMode'
  if (document.getElementById('darkThemee').checked) 
  {	
	  darkMode=true;
      permanentStorage.setItem(key, "true");
	  changeToB();
  } else {
	  darkMode=false;
      permanentStorage.setItem(key, "false");
	  changeToA();
  }
}


function  changeToB() {
    var currentTheme = $('#MyApp').attr('data-theme');
    var selectedTheme = "b";
	
    $('#MyApp').attr('data-theme', selectedTheme).removeClass('ui-body-' + currentTheme).addClass('ui-body-' + selectedTheme).trigger('create');
}

function  changeToA() {
    var currentTheme = $('#MyApp').attr('data-theme');
    var selectedTheme = "a";
	
    $('#MyApp').attr('data-theme', selectedTheme).removeClass('ui-body-' + currentTheme).addClass('ui-body-' + selectedTheme).trigger('create');
}

function backToTop(){
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

// ---------------------------------------------------- firebase

var db = null;
var frb=null;
var Hospitals = [];


function firebasedatabase() {

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
		// "config" : {}
        };

    if (cordova.platformId === "browser") {
		// alert("broweser");
		// alert("broweser");
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
	
	// alert("before initaliz");
    frb= Firestore.initialise(options);
	// alert("after initaliz");
	
	
	
	frb.then(function(fb) {
		
        fb.get().collection('CovidStats').get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
					if(doc.id == "UTBM"){
						document.getElementById('UtbmTotal').innerHTML = doc.data().total;
						document.getElementById('UtbmRecovered').innerHTML = doc.data().recovered;
						document.getElementById('UtbmDeaths').innerHTML = doc.data().deaths;
					}else{
						document.getElementById('BelfortTotal').innerHTML = doc.data().total;
						document.getElementById('BelfortRecovered').innerHTML = doc.data().recovered;
						document.getElementById('BelfortDeaths').innerHTML = doc.data().deaths;
						
					}
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
				alert(error);
            });

    });	
	
	

	
	frb.then(function(fb) {
		
		// alert(frb==null);
		// alert(fb==null);
		
        fb.get().collection('HospitalsAndMedicalCenters').get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
					// alert("new");
					const TempHospital = new Hospital(doc.data().name,doc.data().lat,doc.data().longg,doc.data().phone,doc.data().street,doc.data().img);	
					Hospitals.push(TempHospital);
					// alert(doc.data().name);
					// alert(TempHospital.name);
					// alert(Hospitals.length);
                    // $("#data-list-location-firebase").html($("#data-list-location-firebase").html() +
                        // "<li>"+doc.get("location")+"</li>");
                    // console.log(doc.id, " => ", doc.get("location"));
					
					
					
                });
				// alert(Hospitals.length);
				window.localStorage.removeItem("Hospitals");
				// window.localStorage["Hospitals"] = Hospitals;
				window.localStorage.setItem("Hospitals", JSON.stringify(Hospitals));
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
				alert(error);
            });



    });

}





class Hospital {
  constructor(name,lat,longg,phone,street,img) {
      this.name = name;
      this.lat = lat;
      this.longg = longg;
      this.phone = phone;
      this.img = img;
      this.street = street;
  }
}



// --------------------------------
// buttons clicked


var temp = "";
function ListOfHospClicked()
{
 // temp = "";
 // for(var i=0;i<Hospitals.length;i++){
		// temp = temp + " " + Hospitals[i].name;
	// }
	// alert(temp);
  // localStorage.setItem("Hospitals", JSON.stringify(Hospitals));
  openedWindow = window.open("ListOfHospitals.html");
 
}




function SymptomsClicked()
{
  openedWindow = window.open("SymptomsPreventions.html");

}


function NewsClicked()
{
  openedWindow = window.open("News.html");
}

function AboutUsClicked()
{
  openedWindow = window.open("AboutUs.html");
}

function CloseWindow(){
	// alert("closing");
	// close();
	
	// if(history.length==1){
			// window.open('mobile/close');
    // }else{
		
			window.history.back();
			
			// window.back();
    // }
}
















