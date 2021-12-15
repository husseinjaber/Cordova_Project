


function AboutUsStarted(){
	// alert("hi");
	var permanentStorage = window.localStorage;
	var value = permanentStorage.getItem("isDarkMode");
	if(value=="true"){
		// alert("true");
		changeAboutUsToB();
	}	
	// getNews();	
}


function CloseWindow(){
	window.history.back();
				
}


function backToTop(){
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}




function  changeAboutUsToB(){
    var currentTheme = $('#MyAboutUsPage').attr('data-theme');
    var selectedTheme = "b";
	
    $('#MyAboutUsPage').attr('data-theme', selectedTheme).removeClass('ui-body-' + currentTheme).addClass('ui-body-' + selectedTheme).trigger('create');
}


