var args = arguments[0] || {};

var myMatches = Alloy.Collections.matches;
var matchesRequest = {
    // requestMethod : 'POST',
    data : {
        q : "select * from cricket.upcoming_matches(0,50) where region=\"in\"",
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

myMatches.fetch(matchesRequest);

function selectMatch(e) {
    var item = e.section.getItemAt(e.itemIndex);
    match = myMatches.get(item.matchItem.id);

    var findTeam = function(param) {
            // cannot use Collection.findWhere, since this is not available in backbone collection < 1.0.0
            // alloy uses 0.9.2,
            // adding in config.json "backbone": "1.1.2" to explicity use 1.1.2
            
            myTeams = Alloy.Collections.teams;
            return myTeams.findWhere({
                'TeamName' : param
            });
            // return team ? team[0] : '';
        };

    detailController = Alloy.createController('matchDetail', {
        detail : 'match',
        parentTab : $.matchesTab,
        // use the teams collections to get team info for the match
        TeamDetails : [
            findTeam(match.attributes.Team[0].Team),
            findTeam(match.attributes.Team[1].Team)
           ],
        data : match
    });
    $.matchesTab.open(detailController.getView());
}

