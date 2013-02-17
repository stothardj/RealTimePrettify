var handle = null;
var old = null;

function htmlEscape(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function updateBox() {
    var ugly = document.getElementById("ugly");
    var pretty = document.getElementById("pretty");
    var hb = document.getElementById("textCopy");
    if( ugly.value !== old ) {
	console.log( ugly.value );
	var escaped = htmlEscape(ugly.value);
	pretty.innerHTML = escaped;
	if( hb !== null ) {
	    hb.innerHTML = escaped;
	}
	// For some odd reason prettyPrintOne puts everything on one line in chromium
	prettyPrint();
	old = ugly.value;
	// Also, for some reason chromium scrolls unnecessarily. WTF Google
	ugly.scrollTop = 0;
    }
}

function update() {
    // Throw away an update if it happened really recently
    // Trust me, this makes it actually feel more responsive
    if( handle !== null ) {
    	clearTimeout( handle );
    }
    handle = setTimeout( "updateBox()", 250 );
}
