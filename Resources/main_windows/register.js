var win = Ti.UI.currentWindow;

var scrollView = Ti.UI.createScrollView({
	contentWidth:'auto',
	contentHeight:'height',
	top:0,
	showVerticalScrollIndicator:true,
	showHorizontalScrollIndicator:false
});

win.add(scrollView);

var username = Ti.UI.createTextField({
	color:'#336699',
	top:10,
	left:10,
	width:300,
	height:40,
	hintText:'Username',
	autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
	keyboardType:Ti.UI.KEYBOARD_DEFAULT,
	returnKeyType:Ti.UI.RETURNKEY_DEFAULT,
	borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
scrollView.add(username);

var password1 = Ti.UI.createTextField({
	color:'#336699',
	top:60,
	left:10,
	width:300,
	height:40,
	hintText:'Password',
	passwordMask:true,
	autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
	keyboardType:Ti.UI.KEYBOARD_DEFAULT,
	returnKeyType:Ti.UI.RETURNKEY_DEFAULT,
	borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
scrollView.add(password1);

var password2 = Ti.UI.createTextField({
	color:'#336699',
	top:110,
	left:10,
	width:300,
	height:40,
	hintText:'Password Again',
	passwordMask:true,
	autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
	keyboardType:Ti.UI.KEYBOARD_DEFAULT,
	returnKeyType:Ti.UI.RETURNKEY_DEFAULT,
	borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
scrollView.add(password2);

var email = Ti.UI.createTextField({
	color:'#336699',
	top:160,
	left:10,
	width:300,
	height:40,
	hintText:'email',
	autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
	keyboardType:Ti.UI.KEYBOARD_DEFAULT,
	returnKeyType:Ti.UI.RETURNKEY_DEFAULT,
	borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
scrollView.add(email);

var createBtn = Ti.UI.createButton({
	title:'Register',
	top:210,
	width:130,
	height:35,
	borderRadius:1,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});
scrollView.add(createBtn);

var testresults;

function checkemail(emailAddress)
{
	var str = emailAddress;
	var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
	if(filter.test(str))
	{
		testresults = true;
	}
	else
	{
		testresults = false;
	}
	return (testresults);
};

var createReq = Ti.Network.createHTTPClient();

createReq.onload = function()
{
	if(this.responseText == "Insert failed" || this.responseText == "That username or email already exists")
	{
		createBtn.enabled = true;
		createBtn.opacity = 1;
		alert(this.responseText);
	}
	else
	{
		var alertDialog = Ti.UI.createAlertDialog({
			title:'Alert',
			message:this.responseText,
			buttonNames:['OK']
		});
		alertDialog.show();
		alertDialog.addEventListener('click',function(e)
		{
			win.tabGroup.setActiveTab(0);
		});
	}
}

createBtn.addEventListener('click', function(e)
{
	if(username.value != '' && password1.value != '' && password2.value != '')
	{
		if(password1.value != password2.value)
		{
			alert("Your passwords do not match");
		}
		else
		{
			if(!checkemail(email.value))
			{
				alert("Please enter a valid email");
			}
			else
			{
				createBtn.enabled = false;
				createBtn.opacity = 0.3;
				createReq.open("POST","http://www.enjoytheblank.com/PicPocket/post_register.php");
				var params = {
					username:username.value,
					password:Ti.Utils.md5HexDigest(password1.value),
					email:email.value
				};
				createReq.send(params);
			}
		}
	}
	else
	{
		alert("All fields are required");
	}
});
