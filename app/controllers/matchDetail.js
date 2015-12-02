var args = arguments[0] || {};

var match = Alloy.Models.matches;

$.win.title = args.data.attributes.Team[0].Team + ' vs ' + args.data.attributes.Team[1].Team;

match.set(args.data.attributes);

match.set('matchVenue', args.data.attributes.Venue.content);
match.set('teamName1', args.TeamDetails[0] ? args.TeamDetails[0].attributes.TeamName : '');
match.set('teamName2', args.TeamDetails[1] ? args.TeamDetails[1].attributes.TeamName : '');
match.set('TeamLogoPath1', args.TeamDetails[0] ? args.TeamDetails[0].attributes.TeamLogoPath : '');
match.set('TeamLogoPath2', args.TeamDetails[1] ? args.TeamDetails[1].attributes.TeamLogoPath : '');

console.log(match.toJSON());

$.win.addEventListener('open', function(e) {
    if (OS_ANDROID) {
        // for android actionbar
        var activity = detailController.getView().getActivity();
        if (activity != undefined && activity.actionBar != undefined) {
            activity.actionBar.displayHomeAsUp = true;
        }

        activity.actionBar.onHomeIconItemSelected = function() {
            Ti.API.info("Home clicked!");
            $.win.close();
        };
    }
});

// merge results.PhotoAlbum[each].Photos[each], get first 20 for initial test.
var photoAlbum = Alloy.Collections.photoAlbums;
var albumRequest = {
    // requestMethod : 'POST',
    data : {
        q : "select * from cricket.photos where region = \"India\"",
        format : "json",
        diagnostics : "true",
        env : "store://0TxIGQMQbObzvU4Apia0V0"
    },
    // it is weird that console.log is not working in ios and hence causing the application to crash
    // success : function(e){
    // console.log("SUCCESS", e);
    // },
    // error : function(e){
    // console.log("ERROR", e);
    // }
};

// if(photoAlbum && photoAlbum.length == 0)
    photoAlbum.fetch(albumRequest);
    
function cleanup(e) {
    $.destroy();
}

