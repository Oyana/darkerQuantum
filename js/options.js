saveOptions = e =>{
	browser.storage.sync.set({
		o_cssT: document.querySelector(".o_cssT:checked").value,
		o_accentcolor: document.querySelector(".o_accentcolor").value,
		o_textcolor: document.querySelector(".o_textcolor").value,
		o_bgURL: document.querySelector(".o_bgURL").value,

		o_cssW: document.querySelector(".o_cssW:checked").value,
		o_github: document.querySelector(".o_github:checked").value,
		o_google: document.querySelector(".o_google:checked").value,
		o_nicovideo: document.querySelector(".o_nicovideo:checked").value,
		o_stackoverflow: document.querySelector(".o_stackoverflow:checked").value,
		o_wikipedia: document.querySelector(".o_wikipedia:checked").value,
	});
	e.preventDefault();
}

restoreOptions = () => {
	var getdata = browser.storage.sync.get();
	getdata.then( (res) => {
		aplyValue( ".o_cssT", res.o_cssT, false, true );
		aplyValue( ".o_accentcolor", res.o_accentcolor, '#000' );
		aplyValue( ".o_textcolor", res.o_textcolor, '#fff' );
		aplyValue( ".o_bgURL", res.o_bgURL, '../img/grey.png' );

		aplyValue( ".o_cssW", res.o_cssW, false, true );
		aplyValue( ".o_github", res.o_github, false, true );
		aplyValue( ".o_google", res.o_google, false, true );
		aplyValue( ".o_nicovideo", res.o_nicovideo, false, true );
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

toggle1 = () =>{
	document.querySelector( "#advanced-1" ).css("display","block");
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("form").addEventListener("submit", applyThemeSettings);
document.querySelector("#toggle-1").addEventListener("click", toggle1);
