// Perform an action when the browser action is clicked
chrome.browserAction.onClicked.addListener( function(tab) {

	// The regular expressions we want to match our URLs against
	var matchEvent = /http:\/\/(?:www\.)?(houstoniamag|seattlemet|portlandmonthlymag)\.com\/events\/([a-z0-9-]+)/g;
	var matchArticle = /^http:\/\/(?:www\.)?(seattlemet|houstoniamag|portlandmonthlymag)\.com(\/[a-z0-9-\/]+)?\/articles\/([a-z0-9-]+)/g;
	var matchBusiness = /http:\/\/(?:www\.)?(houstoniamag|seattlemet|portlandmonthlymag)\.com\/(businesses|restaurants|bars|stores)\/([a-z0-9-]+)/g;
	var matchSlideshow = /http:\/\/(?:www\.)?(houstoniamag|seattlemet|portlandmonthlymag)\.com\/slideshows\/([a-z0-9-]+)/g;
	var matchTags = /http:\/\/(?:www\.)?(houstoniamag|seattlemet|portlandmonthlymag)\.com\/tags\/([a-z0-9-]+)/g;
	
	var matchReverseArticle = /^http:\/\/(?:www\.)?(seattlemet|houstoniamag|portlandmonthlymag)\.com\/admin\/articles\/([a-z0-9-]+)\/edit/g;
	var matchReverseEvent = /^http:\/\/(?:www\.)?(seattlemet|houstoniamag|portlandmonthlymag)\.com\/admin\/calendar_events\/([a-z0-9-]+)\/edit/g;;
  var matchReverseSlideshow = /^http:\/\/(?:www\.)?(seattlemet|houstoniamag|portlandmonthlymag)\.com\/admin\/slideshows\/([a-z0-9-]+)\/edit/g;;
	
	// Run the regexes and store matches
	var resultEvent = matchEvent.exec(tab.url);	
	var resultArticle = matchArticle.exec(tab.url);
	var resultBusiness = matchBusiness.exec(tab.url);
	var resultSlideshow = matchSlideshow.exec(tab.url);	
	var resultTags = matchTags.exec(tab.url);

	var resultReverseArticle = matchReverseArticle.exec(tab.url);
	var resultReverseEvent = matchReverseEvent.exec(tab.url);
  var resultReverseSlideshow = matchReverseSlideshow.exec(tab.url);
	
	var loc = '';
		
	// If we have matches, take the visitor to the edit page for that match type.
	if( resultReverseArticle )
	  loc = 'http://www.' + resultReverseArticle[1] + '.com/articles/' + resultReverseArticle[2];
	else if( resultReverseEvent )
	  loc = 'http://www.' + resultReverseEvent[1] + '.com/events/' + resultReverseEvent[2];
	else if( resultReverseSlideshow)
	  loc = 'http://www.' + resultReverseSlideshow[1] + '.com/slideshows/' + resultReverseSlideshow[2];
	else if( resultEvent )
		loc = 'http://www.' + resultEvent[1] + '.com/admin/calendar_events/' + resultEvent[2] + '/edit';		
	else if( resultArticle )	
		loc = 'http://www.' + resultArticle[1] + '.com/admin/articles/' + resultArticle[3] + '/edit';		
	else if( resultBusiness )	
		loc = 'http://www.' + resultBusiness[1] + '.com/admin/businesses/' + resultBusiness[3] + '/edit';		
	else if( resultSlideshow )	
		loc = 'http://www.' + resultSlideshow[1] + '.com/admin/slideshows/' + resultSlideshow[2] + '/edit';				
	else if( resultTags )
		loc = 'http://www.' + resultTags[1] + '.com/admin/tags/' + resultTags[2] + '/edit';
	if( loc ) 
		visitEditPage( tab, loc );
		
});

function visitEditPage( tab, loc ) {
	
	var target = localStorage["scTarget"];
	
	if( target == 'newTab' ) {
		chrome.tabs.create( 
			{ 
				url: loc, 
				openerTabId: tab.id, 
				index: tab.index + 1 
			} 
		);
	}
	else {
		chrome.tabs.update( tab.id, { url: loc } );
	}	
	
}