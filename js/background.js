var currentTheme = '';
var currentSettings = '';

isNight = () => {
	const date = new Date();
	const hours = date.getHours();
	if ( hours > currentSettings.o_nightEnd && hours < currentSettings.o_nightStart )
	{
		return false;
	}
	return true;
}

isAuthorized = ( globalAuth, localAuth = 1 ) =>{
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

applyThemeSettings = theme => {
	if( isAuthorized( currentSettings.o_cssT ) )
	{
		browser.theme.update({
			images: {
				headerURL: currentSettings.o_bgURL,
			},
			colors: {
				accentcolor: currentSettings.o_accentcolor,
				textcolor: currentSettings.o_textcolor,
			}
		});
	}
}

refreshSetting = () => {
	var getdata = browser.storage.sync.get();
	getdata.then( ( res ) => {
		currentSettings = res;
		applyThemeSettings();
	});
}

handleClick = () =>{
	browser.runtime.openOptionsPage();
}

browser.browserAction.onClicked.addListener(handleClick);
// On start up, check the time to see what theme to show.
applyThemeSettings();

// Set up an alarm to check this regularly.
browser.alarms.onAlarm.addListener(applyThemeSettings);
browser.alarms.create('applyThemeSettings', {periodInMinutes: 5});

/*
Toggle CSS: based on the current title, insert or remove the CSS.
Update the page action's title and icon to reflect its state.
*/
toggleCSS = tab => {
	applySkin( tab, ['github.com'], 'github', isAuthorized( currentSettings.o_cssW, currentSettings.o_github ) );
	applySkin( tab, ['www.google.', 'encrypted.google.'], 'google', isAuthorized( currentSettings.o_cssW, currentSettings.o_google ) );
	applySkin( tab, ['nicovideo.jp'], 'nicovideo', isAuthorized( currentSettings.o_cssW, currentSettings.o_nicovideo ) );
	applySkin( tab, ['stackoverflow.com'], 'stackoverflow', isAuthorized( currentSettings.o_cssW, currentSettings.o_stackoverflow ) );
	applySkin( tab, ['wikipedia.org'], 'wikipedia', isAuthorized( currentSettings.o_cssW, currentSettings.o_wikipedia ) );
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

refreshSetting();
