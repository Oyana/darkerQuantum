var currentTheme = '';

getThemeSettings = theme => {
	var getdata = browser.storage.sync.get();
	getdata.then((res) => {
		if ( theme == "day" )
		{
			browser.theme.update({
				images: {
					headerURL: res.d_bgURL || '../img/sun.jpg',
				},
				colors: {
					accentcolor: res.d_accentcolor || '#000',
					textcolor: res.d_textcolor || '#fff',
				}
			});
		}
		else
		{
			browser.theme.update({
				images: {
					headerURL: res.n_bgURL || '../img/moon.jpg',
				},
				colors: {
					accentcolor: res.n_accentcolor || '#000',
					textcolor: res.n_textcolor || '#fff',
				}
			});
		}
	});
}

setTheme = theme => {
	if (currentTheme !== theme)
	{
		currentTheme = theme;
		getThemeSettings( theme );
	}
}

checkTime = () => {
	const date = new Date();
	const hours = date.getHours();
	// Will set the sun theme between 8am and 8pm.
	if ( (hours > 8) && (hours < 20) )
	{
		setTheme('day');
	}
	else
	{
		setTheme('night');
	}
}
handleClick = () =>{
	browser.runtime.openOptionsPage();
}

browser.browserAction.onClicked.addListener(handleClick);
// On start up, check the time to see what theme to show.
checkTime();

// Set up an alarm to check this regularly.
browser.alarms.onAlarm.addListener(checkTime);
browser.alarms.create('checkTime', {periodInMinutes: 5});

