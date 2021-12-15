
function OnStart() {
	var permanentStorage = window.localStorage;
	var value = permanentStorage.getItem("isDarkMode");
	if(value=="true"){
		changeSymptomsPreventionsToB();
	}
}

function CloseWindow(){
	window.history.back();
}

function backToTop(){
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

function  changeSymptomsPreventionsToB() {
    var currentTheme = $('#MySymptomsPreventionsPage').attr('data-theme');
    var selectedTheme = "b";
	
    $('#MySymptomsPreventionsPage').attr('data-theme', selectedTheme).removeClass('ui-body-' + currentTheme).addClass('ui-body-' + selectedTheme).trigger('create');
}
























