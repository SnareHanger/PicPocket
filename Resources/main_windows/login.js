var win = Ti.UI.currentWindow;

var a = Ti.UI.createAlertDialog({
	title: 'Login'
});

var username = Ti.UI.createTextField({
	color:'#336699',
	top:10,
	left:10,
	width:300,
	height:40,
	hintText:'Username',
	keyboardType:Ti.UI.KEYBOARD_DEFAULT,
	returnKeyType:Ti.UI.RETURNKEY_DEFAULT,
	borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

win.add(username);

var password = Ti.UI.createTextField({
	color:'#336699',
	top:60,
	left:10,
	width:300,
	height:40,
	hintText:'Password',
	passwordMask:true,
	keyboardType:Ti.UI.KEYBOARD_DEFAULT,
	returnKeyType:Ti.UI.RETURNKEY_DEFAULT,
	borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

win.add(password);

var loginBtn = Ti.UI.createButton({
	title:'Login',
	top:110,
	width:90,
	height:35,
	borderRadius:1,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});

win.add(loginBtn);

var loginReq = Ti.Network.createHTTPClient();

loginReq.onload = function()
{
	var json = this.responseText;
	var response = JSON.parse(json);
	if(response.logged == true)
	{
		username.blur();
		password.blur();
		Ti.App.fireEvent('grantEntrance', {
			username:response.username,
			email:response.email
		});
		win.close();
	}
	else
	{
		alert(response.message);
	}
};

loginBtn.addEventListener('click', function(e)
{
	if(username.value != '' && password.value != '')
	{
		loginReq.open("POST","http://www.enjoytheblank.com/PicPocket/post_auth.php");
		var params = {
			username: username.value,
			password: Ti.Utils.md5HexDigest(password.value)
		};
		loginReq.send(params);
	}
	else
	{
		alert("Username/Password are required");
	}
});
