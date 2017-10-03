function saveOptions(e) {
	browser.storage.sync.set({
		d_accentcolor: document.querySelector("#d_accentcolor").value,
		d_textcolor: document.querySelector("#d_textcolor").value,
		d_bgURL: document.querySelector("#d_bgURL").value,
		n_accentcolor: document.querySelector("#n_accentcolor").value,
		n_textcolor: document.querySelector("#n_textcolor").value,
		n_bgURL: document.querySelector("#n_bgURL").value,
	});
	e.preventDefault();
}

function restoreOptions() {
	var getdata = browser.storage.sync.get(['d_accentcolor','d_textcolor','n_accentcolor','n_textcolor']);
	getdata.then((res) => {
		document.querySelector("#d_accentcolor").value = res.d_accentcolor || '#000';
		document.querySelector("#d_textcolor").value = res.d_textcolor || '#fff';
		document.querySelector("#d_bgURL").value = res.d_bgURL || '../img/sun.jpg';
		document.querySelector("#n_accentcolor").value = res.n_accentcolor || '#000';
		document.querySelector("#n_textcolor").value = res.n_textcolor || '#fff';
		document.querySelector("#n_bgURL").value = res.n_bgURL || '../img/moon.jpg';
	});
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("form").addEventListener("submit", checkTime);
