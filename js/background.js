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

isNight = () => {
	const date = new Date();
	const hours = date.getHours();
	// Will set the sun theme between 8am and 8pm.
	if ( ( hours > 8 ) && ( hours < 20 ) )
	{
		return false;
	}
	return true;
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

/*
Toggle CSS: based on the current title, insert or remove the CSS.
Update the page action's title and icon to reflect its state.
*/
toggleCSS = tab => {
	var getdata = browser.storage.sync.get();
	getdata.then( ( res ) => {
		applySkin( tab, ['github.com'], 'github', isAuthorized( res.o_cssW, res.o_github ) );
		applySkin( tab, ['www.google.', 'encrypted.google.'], 'google', isAuthorized( res.o_cssW, res.o_google ) );
		applySkin( tab, ['nicovideo.jp'], 'nicovideo', isAuthorized( res.o_cssW, res.o_nicovideo ) );
		applySkin( tab, ['stackoverflow.com'], 'stackoverflow', isAuthorized( res.o_cssW, res.o_stackoverflow ) );
		applySkin( tab, ['wikipedia.org'], 'wikipedia', isAuthorized( res.o_cssW, res.o_wikipedia ) );
	});
}

isAuthorized = ( globalAuth, localAuth ) =>{
	let authorize = false;
	if ( globalAuth == 1 && localAuth == 1 )
	{
		authorize = true;
	}
	else if ( localAuth == 1 && globalAuth == 2 && isNight() )
	{
		authorize = true;
	}
	return authorize;
}

/*
When first loaded, initialize the page action for all tabs.
*/
var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
	for (let tab of tabs) {
		toggleCSS(tab);
	}
});
/*
Each time a tab is updated, reset the page action for that tab.
*/
browser.tabs.onUpdated.addListener( (id, changeInfo, tab) => {
	toggleCSS(tab);
});

applySkin = ( tab, matchedDomains, cssKey, isAuthorized = false, ...exclude) => {
	console.log( cssKey );
	console.log( isAuthorized );
	if ( isAuthorized == true )
	{
		matchedDomains.forEach( matchedDomain => {
			if ( tab.url.indexOf( matchedDomain ) > -1 )
			{
				browser.tabs.insertCSS( {file: "../css/" + cssKey + ".css"} );
			}
		});
	}
}
