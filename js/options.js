saveOptions = e =>{
	browser.storage.sync.set({
		d_accentcolor: document.querySelector("#d_accentcolor").value,
		d_textcolor: document.querySelector("#d_textcolor").value,
		d_bgURL: document.querySelector("#d_bgURL").value,
		n_accentcolor: document.querySelector("#n_accentcolor").value,
		n_textcolor: document.querySelector("#n_textcolor").value,
		n_bgURL: document.querySelector("#n_bgURL").value,
		o_github: document.querySelector(".o_github:checked").value,
		o_google: document.querySelector(".o_google:checked").value,
		o_niconico: document.querySelector(".o_niconico:checked").value,
		o_stackoverflow: document.querySelector(".o_stackoverflow:checked").value,
		o_wikipedia: document.querySelector(".o_wikipedia:checked").value,
	});
	e.preventDefault();
}

restoreOptions = () => {
	var getdata = browser.storage.sync.get();
	getdata.then( (res) => {
		aplyValue( "#d_accentcolor", res.d_accentcolor, '#000' );
		aplyValue( "#d_textcolor", res.d_textcolor, '#fff' );
		aplyValue( "#d_bgURL", res.d_bgURL, '../img/sun.jpg' );
		aplyValue( "#n_accentcolor", res.n_accentcolor, '#000' );
		aplyValue( "#n_textcolor", res.n_textcolor, '#fff' );
		aplyValue( "#n_bgURL", res.n_bgURL, '../img/moon.jpg' );
		aplyValue( ".o_github", res.o_github, false, true );
		aplyValue( ".o_google", res.o_google, false, true );
		aplyValue( ".o_niconico", res.o_niconico, false, true );
		aplyValue( ".o_stackoverflow", res.o_stackoverflow, false, true );
		aplyValue( ".o_wikipedia", res.o_wikipedia, false, true );
	} );
}

aplyValue = ( selector, inptValue, inptDefaultValue = false, isRadio = false ) => {
	if ( isRadio == true )
	{
		if ( inptValue == 0 )
		{
			document.querySelector( selector + ".disable").checked = true;
		}
		else
		{
			document.querySelector( selector + ".enable").checked = true;
		}
	}
	else
	{
		document.querySelector( selector ).value = inptValue || inptDefaultValue;
	}
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("form").addEventListener("submit", checkTime);
