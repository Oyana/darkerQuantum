saveOptions = e =>{
	browser.storage.sync.set({
		o_cssT: document.querySelector(".o_cssT:checked").value,
		t_accentcolor: document.querySelector("#t_accentcolor").value,
		t_textcolor: document.querySelector("#t_textcolor").value,
		t_bgURL: document.querySelector("#t_bgURL").value,

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
		aplyValue( "#t_accentcolor", res.t_accentcolor, '#000' );
		aplyValue( "#t_textcolor", res.t_textcolor, '#fff' );
		aplyValue( "#t_bgURL", res.t_bgURL, '../img/moon.jpg' );

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
