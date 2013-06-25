function saveOptions() {
	
	var scTarget = document.getElementById("scTarget");
	localStorage["scTarget"] = scTarget.children[scTarget.selectedIndex].value;

	var status = document.getElementById("status");
	status.innerHTML = "Options Saved.";
	
	setTimeout( function() {
		status.innerHTML = "";
	}, 2000);
	
}

function restoreOptions() {
	
	var target = localStorage["scTarget"];
	if( !target ) {
		return;
	}
	
	var scTarget = document.getElementById("scTarget");
	for( var i = 0; i < scTarget.children.length; i++ ) {
		
		var child = scTarget.children[i];
		if( child.value == target ) {
			child.selected = "true";
			break;
		}
		
	}
	
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#save').addEventListener('click', saveOptions);