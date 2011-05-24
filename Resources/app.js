//Set the background color of the master view
Ti.UI.setBackgroundColor('#fff');
var tabGroup = Ti.UI.createTabGroup();
var main = Ti.UI.createWindow();
var mainTab = Ti.UI.createTab();

var login = Ti.UI.createWindow({
	title:'User Login',
	url:'main_windows/login.js'
});

var loginTab = Ti.UI.createTab({
	title:"Login",
	window:login
});

var registration = Ti.UI.createWindow({
	title:'Register',
	url:'main_windows/register.js'
});

var registrationTab = Ti.UI.createTab({
	title:'Register',
	// icon:'images/account_icon.png',
	window:registration
});

Ti.App.addEventListener('grantEntrance', function(event){
	main.tabBarHidden	= true;
	main.title			= 'Welcome ' + event.username;
	main.url			= 'main_windows/main.js';
	main.username		= event.username;
	main.email			= event.email;
	mainTab.window		= main;
	
	tabGroup.addTab(mainTab);
	tabGroup.removeTab(loginTab);
	tabGroup.removeTab(registrationTab);
});

tabGroup.addTab(loginTab);
tabGroup.addTab(registrationTab);
tabGroup.open();
