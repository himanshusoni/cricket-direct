var myMatches = Alloy.Collections.matches;
var myTeams = Alloy.Collections.teams;

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

type = 'InternationalODIMens';
var teamsRequest = {
    // requestMethod : 'POST',
    data : {
        q : "select * from cricket.teams(0,50) where team_type=\"" + type + "\"",
        format : "json",
        diagnostics : "true",
        env : "store://0TxIGQMQbObzvU4Apia0V0"
    },
    // success : function(e){
        // console.log("SUCCESS", e);
    // },
    // error : function(e){
        // console.log("ERROR", e);
    // }
};

$.index.open();

myMatches.fetch(matchesRequest);
myTeams.fetch(teamsRequest);

/*
function loadMatchesTable() {
    var httpClient = Titanium.Network.createHTTPClient();
    httpClient.onload = function(e) {
        console.log("loadPlayerTable");
        console.log(e);
        console.log(httpClient.responseData);
        console.log(httpClient.responseText);
        console.log(httpClient.status);

        var tableData = [];

        var resultObject = JSON.parse(httpClient.responseText);
        _.each(resultObject.query.results.Match, function(item) {
            tableData.push({
                heading : {
                    text : item.series_name
                },
                subheading : {
                    text : item.Venue.content
                },
                template : 'matchItem'
            });
        });
        $.matchesSection.setItems(tableData);
    };
    httpClient.onerror = function(e) {

    };

    httpClient.open('POST', "http://query.yahooapis.com/v1/public/yql");
    // httpClient.setRequestHeader('Content-Type', "application/json");

    httpClient.send({
        q : "select * from cricket.upcoming_matches(0,50) where region=\"in\"",
        format : "json",
        diagnostics : "true",
        env : "store://0TxIGQMQbObzvU4Apia0V0"
    });

}

function loadTeamTable() {
    var httpClient = Titanium.Network.createHTTPClient();
    httpClient.onload = function(e) {
        console.log("loadTeamTable");
        console.log(e);
        console.log(httpClient.responseData);
        console.log(httpClient.responseText);
        console.log(httpClient.status);

        var tableData = [];
        var resultObject = JSON.parse(httpClient.responseText);
        _.each(resultObject.query.results.Team, function(item) {
            tableData.push({
                heading : {
                    text : item.TeamName + " - [ " + item.ShortName + " ]"
                },
                subheading : {
                    text : item.TeamType
                },
                leftImage : {
                    image : item.TeamLogoPath
                },
                rightImage : {
                    text : item.TeamFlagPath
                },
                template : 'teamItem'
            });
        });
        $.teamSection.setItems(tableData);
    };
    httpClient.onerror = function(e) {

    };

    httpClient.open('POST', "http://query.yahooapis.com/v1/public/yql");
    // httpClient.setRequestHeader('Content-Type', "application/json");

    httpClient.send({
        q : "select * from cricket.teams(0,50) where team_type=\"" + type + "\"",
        format : "json",
        diagnostics : "true",
        env : "store://0TxIGQMQbObzvU4Apia0V0"
    });

}

var init = function() {
    loadMatchesTable();

    loadTeamTable();
};

init();
*/

function selectMatch(e){
    var item = e.section.getItemAt(e.itemIndex);
    console.log(item);
    select({
        parentTab : $.matchesTab,
        data : myMatches.get(item.matchItem.id)
    });
}

function selectTeam(e){
    var item = e.section.getItemAt(e.itemIndex);
    select({
        parentTab : $.teamsTab,
        data : myTeams.at(e.itemIndex)//get(item.teamItem.id)
    });
}

function select(args){
    detailController = Alloy.createController('detail', args);
    args.parentTab.open(detailController.getView());
}

// unused
function cleanup() {
    $.destroy();
}
