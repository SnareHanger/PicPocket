//Set the background color of the master view
Ti.UI.setBackgroundColor('#fff');
var tabGroup = Ti.UI.createTabGroup();

var login = Ti.UI.createWindow({
	title:'User Login',
	tabBarHidden:true,
	url:'main_windows/login.js'
});

var loginTab = Ti.UI.createTab({
	title:"Login",
	window:login
});

tabGroup.addTab(loginTab);
tabGroup.open();
