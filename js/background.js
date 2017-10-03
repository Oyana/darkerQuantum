var currentTheme = '';

function getThemeSettings( theme ) {
	var getdata = browser.storage.sync.get(['d_accentcolor','d_textcolor','d_bgURL','n_accentcolor','n_textcolor','n_bgURL']);
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
		var plop = {
			'day': {
				images: {
					headerURL: '../img/sun.jpg',
				},
				colors: {
					accentcolor: res.d_accentcolor || '#000',
					textcolor: res.d_textcolor || '#fff',
				}
			},
			'night': {
				images: {
					headerURL: '../img/moon.jpg',
				},
				colors: {
					accentcolor: res.n_accentcolor || '#000',
					textcolor: res.n_textcolor || '#fff',
				}
			}
		};
	});
}

const themes = {
	'day': {
		images: {
			headerURL: '../img/sun.jpg',
		},
		colors: {
			accentcolor: '#CF723F',
			textcolor: '#111',
		}
	},
	'night': {
		images: {
			headerURL: '../img/moon.jpg',
		},
		colors: {
			accentcolor: '#000',
			textcolor: '#fff',
		}
	}
};

function setTheme(theme) {
	if (currentTheme === theme) {
		// No point in changing the theme if it has already been set.
		return;
	}
	currentTheme = theme;
	getThemeSettings( theme );
}

function checkTime() {
	let date = new Date();
	let hours = date.getHours();
	// Will set the sun theme between 8am and 8pm.
	if ((hours > 8) && (hours < 20)) {
		setTheme('day');
	} else {
		setTheme('night');
	}
}
function handleClick() {
  browser.runtime.openOptionsPage();
}

browser.browserAction.onClicked.addListener(handleClick);
// On start up, check the time to see what theme to show.
checkTime();

// Set up an alarm to check this regularly.
browser.alarms.onAlarm.addListener(checkTime);
browser.alarms.create('checkTime', {periodInMinutes: 5});

