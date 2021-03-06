// store settings from option page (retrived from input value).
saveOptions = e =>{
	browser.storage.sync.set({
		o_cssT: document.querySelector(".o_cssT:checked").value,
		o_accentcolor: document.querySelector(".o_accentcolor").value,
		o_textcolor: document.querySelector(".o_textcolor").value,
		o_bgURL: document.querySelector(".o_bgURL").value,

		o_cssW: document.querySelector(".o_cssW:checked").value,
		o_4chan: document.querySelector(".o_4chan:checked").value,
		o_amazon: document.querySelector(".o_amazon:checked").value,
		o_ebay: document.querySelector(".o_ebay:checked").value,
		o_facebook: document.querySelector(".o_facebook:checked").value,
		o_github: document.querySelector(".o_github:checked").value,
		o_google: document.querySelector(".o_google:checked").value,
		o_leboncoin: document.querySelector(".o_leboncoin:checked").value,
		o_nicovideo: document.querySelector(".o_nicovideo:checked").value,
		o_reddit: document.querySelector(".o_reddit:checked").value,
		o_stackoverflow: document.querySelector(".o_stackoverflow:checked").value,
		o_twitter: document.querySelector(".o_twitter:checked").value,
		o_wikipedia: document.querySelector(".o_wikipedia:checked").value,

		o_nightStart: document.querySelector(".o_nightStart").value,
		o_nightEnd: document.querySelector(".o_nightEnd").value,
	});
	e.preventDefault();
}

// Load option value into settings form.
restoreOptions = () => {
	var getdata = browser.storage.sync.get();
	getdata.then( (res) => {
		aplyValue( ".o_cssT", res.o_cssT, false, true );
		aplyValue( ".o_accentcolor", res.o_accentcolor, '#000' );
		aplyValue( ".o_textcolor", res.o_textcolor, '#fff' );
		aplyValue( ".o_bgURL", res.o_bgURL, '../img/bg/black.jpg' );

		aplyValue( ".o_cssW", res.o_cssW, false, true );
		aplyValue( ".o_4chan", res.o_4chan, false, true );
		aplyValue( ".o_amazon", res.o_amazon, false, true );
		aplyValue( ".o_ebay", res.o_ebay, false, true );
		aplyValue( ".o_facebook", res.o_facebook, false, true );
		aplyValue( ".o_github", res.o_github, false, true );
		aplyValue( ".o_google", res.o_google, false, true );
		aplyValue( ".o_leboncoin", res.o_leboncoin, false, true );
		aplyValue( ".o_nicovideo", res.o_nicovideo, false, true );
		aplyValue( ".o_reddit", res.o_reddit, false, true );
		aplyValue( ".o_stackoverflow", res.o_stackoverflow, false, true );
		aplyValue( ".o_twitter", res.o_twitter, false, true );
		aplyValue( ".o_wikipedia", res.o_wikipedia, false, true );

		aplyValue( ".o_nightStart", res.o_nightStart, 20 );
		aplyValue( ".o_nightEnd", res.o_nightEnd, 8 );
	} );
}

// restoreOptions hellper (aply value to a specific selector)
aplyValue = ( selector, inptValue, inptDefaultValue = false, isRadio = false ) => {
	if ( isRadio == true )
	{
		if ( inptValue == 0 )
		{
			document.querySelector( selector + ".disable").checked = true;
		}
		else if ( inptValue == 2 )
		{
			document.querySelector( selector + ".atnight").checked = true;
		}
		else // 1 or unset
		{
			document.querySelector( selector + ".enable").checked = true;
		}
	}
	else
	{
		document.querySelector( selector ).value = inptValue || inptDefaultValue;
	}
}

toggle = selector =>{
	document.querySelector( selector ).classList.toggle('active');
}


document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("form").addEventListener("submit", refreshSetting);
document.querySelector("#toggle-1").addEventListener("click", () => { toggle('#advanced-1'); } );
document.querySelector("#toggle-2").addEventListener("click", () => { toggle('#advanced-2'); } );
