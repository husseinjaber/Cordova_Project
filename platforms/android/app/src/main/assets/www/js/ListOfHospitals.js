

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
var HospitalsIndexes = [];

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






// -----------------------------
// hospitals
// -----------------------------

var map;
var addressLongLat;
var CurrentPhoneNumber="0";
function ChangeMaps(){
	
	var permanentStorage = window.localStorage;
	var value = permanentStorage.getItem("isDarkMode");
	if(value=="true"){
		changeMapsToB();
	}
	
	// var permanentStorage = window.localStorage;
	//alert("2");
	var value = permanentStorage.getItem("CurrentHospital");
	var HospitalsFromDatabase = JSON.parse(permanentStorage.getItem("Hospitals"));
	// alert(HospitalsFromDatabase[value].name);
	
	// plugin.google.maps.environment.setEnv({
	  // 'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAH6eEhX9nywS8gKW3ATY7Cyg-Gqj9-ufY',
	  // 'API_KEY_FOR_BROWSER_DEBUG': ''  // optional
	// });
	
	// addressLongLat = HospitalsFromDatabase[value].longg+','+HospitalsFromDatabase[value].lat;
	
	addressLongLat = HospitalsFromDatabase[value].name+" "+HospitalsFromDatabase[value].street;
	CurrentPhoneNumber=HospitalsFromDatabase[value].phone;
	IntializeMap(HospitalsFromDatabase[value].longg,HospitalsFromDatabase[value].lat);
	document.getElementById("phoneNumberHere").innerText= "Call "+CurrentPhoneNumber;
	
}


var isMylocationPressed=false;

function FromMylocation() 
{    
if(!isMylocationPressed){
	navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError);
	isMylocationPressed=true;
	document.getElementById("MyLocation").click();
}

}

function OpenInGoogleMaps() 
 {    
 
     if (cordova.platformId === "browser") {
		window.open("http://maps.google.com/?q="+addressLongLat, '_system');
    }else{
		window.open("geo://?q="+addressLongLat);
	}
 

}
function CallTheHospital() 
 {    
 window.plugins.CallNumber.callNumber(onSuccesss, onErrorr, CurrentPhoneNumber, true);

}

function onSuccesss(result){
  console.log("Success:"+result);
}
 
function onErrorr(result) {
  console.log("Error:"+result);
}

/*
function onDeviceReady() 
 {    
 //alert("ok");
  
navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, { enableHighAccuracy: true });
 // navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError);
 //alert("ok1");

}*/



// Success callback for get geo coordinates

var onMapSuccess = function(position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;

    getMap(Latitude, Longitude);//alert("ok1");

}

// Get map by using coordinates

function IntializeMap(latitude, longitude) {

    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map
    (document.getElementById("map"), mapOptions);


    var latLong = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({
        position: latLong
    });

    marker.setMap(map);
    map.setZoom(15);
    map.setCenter(marker.getPosition());
}


function getMap(latitude, longitude) {

    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // map = new google.maps.Map
    // (document.getElementById("map"), mapOptions);


    var latLong = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({
        position: latLong
    });

    marker.setMap(map);
    map.setZoom(13);
    map.setCenter(marker.getPosition());
}


// Success callback for watching your changing position

var onMapWatchSuccess = function (position) {

    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

        Latitude = updatedLatitude;
        Longitude = updatedLongitude;

        getMap(updatedLatitude, updatedLongitude);
    }
}

// Error callback

function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

// Watch your changing position

function watchMapPosition() {

    return navigator.geolocation.watchPosition
    (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
}















/*

var onMapSuccess = function(position) {
	alert("success");
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
	
    getMap(Latitude, Longitude);//alert("ok1");

}



// Get map by using coordinates
const GOOGLE = {"lat": 37.422476, "lng": -122.08425};
function getMap(latitude, longitude) {
	alert(latitude+" "+longitude);
	
    // var mapOptions = {
        // center: new plugin.google.maps.LatLng(0, 0),
        // zoom: 1,
        // mapTypeId: plugin.google.maps.MapTypeId.ROADMAP
    // };
	
	var mapDiv = document.getElementById("map");
	alert("before map creation");
    var map = plugin.google.maps.Map.getMap(mapDiv, {
    'camera': {
      'latLng': GOOGLE,
      // 'zoom': 17
    }
  });
	alert("after map creation");

    // var latLong = new plugin.google.maps.LatLng(latitude, longitude);

    // var marker = new plugin.google.maps.Marker({
        // position: latLong
    // });
	
	
	map.one(plugin.google.maps.event.MAP_READY, onMapInit);
	
	
    // marker.setMap(map);
    // map.setZoom(15);
    // map.setCenter(marker.getPosition());
}


function onMapInit(map) {

  // Add a marker
  map.addMarker({
    'position': GOOGLE,
    'title': "Hello GoogleMap for Cordova!"
  }, function(marker) {

    // Show the infoWindow
    marker.showInfoWindow();

  });
}




var onMapWatchSuccess = function (position) {

    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

        Latitude = updatedLatitude;
        Longitude = updatedLongitude;

        getMap(updatedLatitude, updatedLongitude);
    }
}

// Error callback

function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
	alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

// Watch your changing position

function watchMapPosition() {

    return navigator.geolocation.watchPosition
    (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
}




*/



function openMaps(CurrentHospitalindex){
	 var permanentStorage = window.localStorage;
	 permanentStorage.setItem("CurrentHospital", CurrentHospitalindex);
	 openedWindow = window.open("SingleHospitalMap.html");
}

function backToTop(){
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}


function GetHospitals(){
	// alert("getting hospitals");
	// var storedHospitals = JSON.parse(localStorage.getItem("Hospitals"));
	
	// temp = "";
	// for(var i=0;i<storedHospitals.length;i++){
		// temp = temp + " " + storedHospitals[i].name;
	// }
	// alert(temp);
	var permanentStorage = window.localStorage;
	var value = permanentStorage.getItem("isDarkMode");
	if(value=="true"){
		changeHospitalsToB();
		// changeMapsToB();
	}
	
	// make the list
	
	var Hospitals = JSON.parse(localStorage.getItem("Hospitals"));
	// Hospitals = window.localStorage["Hospitals"];
	
	// alert(Hospitals);
	// alert(Hospitals.length);
	// alert(window.localStorage["Hospitals"]);
	// alert(window.lls);
	// alert(Hospitals.length);
	// alert(window.localStorage["Hospitals"]);
	// alert(window.localStorage["Hospitals"].length);
	for(var i =0;i <Hospitals.length;i++){
		HospitalsIndexes.push(i);
		var table = document.createElement('table');
		// table.onclick = openMaps;
		table.id = "table"+i;
		// alert(table.id);
		// table.addEventListener('click',function(){
			// openMaps(table.id);
		// });
		table.style.width = "95%";
		
		
		table.style="border:1px gray solid; margin-top:10px; overflow-x:auto; border-collapse: collapse; border-spacing: 0; width: 100%;";
		var tr = table.insertRow(-1);
		var td = tr.insertCell(-1);
		td.style.width = "180px";
		td.style.height = "130px";
		td.style.textAlign = "center";
		td.style.verticalAlign = "middle";
		var img = document.createElement('img');
		// img.src = "https://firebasestorage.googleapis.com/v0/b/cordova-project-94dd9.appspot.com/o/CentrHospitalier-min.PNG?alt=media&token=c14da567-ee19-4b65-b4ac-52b18a318373";
		img.src = Hospitals[i].img;
		img.style.width = "100%";
		img.style.height = "100%";
		// img.style= "display:block;";
		td.appendChild(img);
		var td2 = tr.insertCell(-1);
		var h5 = document.createElement('h5');
		h5.style.marginLeft = "5px";
		// h5.style.textAlign = "center";
		// h5.innerHTML = "Centre Hospitalier de Soins et de Santé";
		h5.innerHTML = Hospitals[i].name;
		var p1 = document.createElement('p');
		p1.style.fontSize  = "70%";
		p1.style.marginLeft = "5px";
		// p1.innerHTML = "<b>Address:</b> 16 Rue Alfred Engel, 90800 Bavilliers";
		p1.innerHTML = "<b>Address:</b>"+Hospitals[i].street;
		var p2 = document.createElement('p');
		p2.style.fontSize  = "70%";
		p2.style.marginLeft = "5px";
		// p2.innerHTML = "<b>Phone:</b> 03 84 55 52 52";
		p2.innerHTML = "<b>Phone:</b>"+Hospitals[i].phone;
		td2.appendChild(h5);
		td2.appendChild(p1);
		td2.appendChild(p2);
		document.getElementById('listHospitals').appendChild(table);
	}
	
	
	HospitalsIndexes.forEach(function(index) {
		document.getElementById("table"+index).addEventListener('click',function(){
			openMaps(index);
		});
		 
	});
	
	// for(var i =0;i <Hospitals.length;i++){
		
		// document.getElementById("table"+i).addEventListener('click',function(){
			// openMaps(i);
		// });
	// }
	
	
	
	// alert("okay");
	// var card = document.createElement('div');
	// card.classList.add("blog-card");
	// alert("okay card");
	// var meta = document.createElement('div');
	// meta.classList.add("meta");
	// alert("okay card hor");
	// var imgSquareWrapper = document.createElement('div');
	// imgSquareWrapper.classList.add("photo");
	// imgSquareWrapper.style.backgroundImage  = "https://firebasestorage.googleapis.com/v0/b/cordova-project-94dd9.appspot.com/o/CentrHospitalier-min.PNG?alt=media&token=c14da567-ee19-4b65-b4ac-52b18a318373";
	// alert("okay img");
	// alert("okay added img");
	// var desc = document.createElement('div');
	// desc.classList.add("description");
	// alert("okay caed body");
	// var title = document.createElement('h4');
	// title.innerHTML = "Test";
	// alert("okay title");
	// var par = document.createElement('p');
	// par.innerHTML = "Testing the thing to see if it is going to work";
	// alert("okay par");
	// desc.appendChild(title); 
	// desc.appendChild(par); 
	// alert("okay card body added");
	// meta.appendChild(imgSquareWrapper); 
	// card.appendChild(meta);
	// card.appendChild(des); 
	
	
	// alert(Hospitals);
	// var img = document.createElement('img'); 
	// img.src = Hositals[0].img;

	// document.getElementById('listOfHospitals').appendChild(card); 
}





function  changeHospitalsToB() {
	// alert("changing");
    var currentTheme = $('#MyHospitalsPage').attr('data-theme');
    var selectedTheme = "b";
	
    $('#MyHospitalsPage').attr('data-theme', selectedTheme).removeClass('ui-body-' + currentTheme).addClass('ui-body-' + selectedTheme).trigger('create');
}


function  changeMapsToB() {
	// alert("changing");
    var currentTheme = $('#MyMapPage').attr('data-theme');
    var selectedTheme = "b";
	
    $('#MyMapPage').attr('data-theme', selectedTheme).removeClass('ui-body-' + currentTheme).addClass('ui-body-' + selectedTheme).trigger('create');
}




// -----------------------------
// Maps
// -----------------------------
























