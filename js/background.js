var gettingAllTabs = browser.tabs.query({});
var currentSettings = '';

// check if is night time based on darkerQuantum settings.
isNight = () => {
	const date = new Date();
	const hours = date.getHours();
	if ( hours > currentSettings.o_nightEnd && hours < currentSettings.o_nightStart )
	{
		return false;
	}
	return true;
}

// check if action is athorized by darkerQuantum settings.
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

// apply theme if darkerQuantum settings allow it.
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

// apply css to a specific tab if darkerQuantum settings allow it.
applySkin = ( tab, matchedDomains, cssKey, isAuthorized = false, ...exclude) => {
	if ( isAuthorized == true )
	{
		matchedDomains.forEach( matchedDomain => {
			if ( tab.url.indexOf( matchedDomain ) > -1 )
			{
				browser.tabs.insertCSS( {
					file: "../css/" + cssKey + ".css",
					allFrames: true
				},
				() => {
						console.log("CSS loaded on" + cssKey + "🦄" );
				});
			}
		});
	}
}

// reload darkerQuantum settings & apply it to theme.
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

// handle button click to load settings.
browser.browserAction.onClicked.addListener(handleClick);

// Set up an alarm to check this regularly.
browser.alarms.onAlarm.addListener(applyThemeSettings);
browser.alarms.create('applyThemeSettings', {periodInMinutes: 5});

// When first loaded, initialize the page action for all tabs.
gettingAllTabs.then((tabs) => {
	for (let tab of tabs) {
		toggleCSS(tab);
	}
});

// Each time a tab is updated, reset the page action for that tab.
browser.tabs.onUpdated.addListener( (id, changeInfo, tab) => {
	toggleCSS(tab);
});

// When first loaded, initialize darkerQuantum settings.
refreshSetting();
