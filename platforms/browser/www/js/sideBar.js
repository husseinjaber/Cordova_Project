document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	window.addEventListener('click', function(e){   
	  if (!document.getElementById('mySidenav').contains(e.target) && !document.getElementById('nav').contains(e.target)){
		  closeNav();
	  }
	});
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}