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
