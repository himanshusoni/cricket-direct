var args = arguments[0] || {};

var myTeams = Alloy.Collections.teams;

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

myTeams.fetch(teamsRequest);


function selectTeam(e) {
    var item = e.section.getItemAt(e.itemIndex);
    
    detailController = Alloy.createController('detail', {
        parentTab : $.teamsTab,
        data : myTeams.at(e.itemIndex)//get(item.teamItem.id)
    });
    $.teamsTab.open(detailController.getView());
}
