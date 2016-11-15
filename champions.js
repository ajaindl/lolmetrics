//globals
var API_KEY="f52fd5ba-04fa-4292-9818-3134d6148f35";
var sumId;
var objects=[];
var nameArray=[];

//debug start here:
var getSumName= function(SUMMONER_NAME){
    $.ajax({
        url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + SUMMONER_NAME + '?api_key=' + API_KEY,
        type: 'GET',
        dataType: 'json',
        data: {
            },
        success: function (SUMMONERS) {
            sumId=SUMMONERS[SUMMONER_NAME].id;
            console.log(SUMMONERS);
            console.log("Summoner Name: " +  SUMMONERS[SUMMONER_NAME].name);
            getStats(sumId);
            getGames(sumId);     
            objects.push(SUMMONERS);
            }
        });
            
}

var getStats= function(sumId){
    $.ajax({
        url: 'https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/'+sumId+'/ranked?api_key='+API_KEY,
        type: 'GET',
        dataType: 'json',
        data: {
            },
        success: function(stats){
            objects.push(stats);
            console.log(stats);
            var length=stats.champions.length;
            
            for (var i =0;i<length; i++){
                getStaticData(stats.champions[i].id);
                }
            writeTable(length,stats);
            }
            });
}

var gameID;

var getGames=function(summonerId){
    $.ajax({
        url: 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/'+summonerId+'/recent?api_key='+API_KEY,
        type: 'GET',
        dataType: 'json',
        data: {
            },
        success: function(game){    
            objects.push(game);
            console.log(game);
            var gameID=game.games[0].gameId;
            var champid=[];
            for (var i=0; i<10; i++){
                champid[i]=game.games[i].championId;
            }
            getMatch(gameID);
        }
     });
}
                        

var getStaticData=function(champid){
    $.ajax({
        url: 'https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion/'+champid+'?api_key='+API_KEY,
        type: 'GET',
        dataType: 'json',
        data: {
            },
        success: function(champ){
            nameArray.push(champ.name);
            }
            });
}

var getMatch=function(gameID){
    $.ajax({
        url: 'https://na.api.pvp.net/api/lol/na/v2.2/match/'+gameID+'?api_key='+API_KEY,
        type: 'GET',
        dataType: 'json',
        data: {
            },
        success: function(match){
            objects.push(match);
            console.log(match);
            console.log(objects[1]);
            console.log(objects);
            }
            });
}

      //helper functions

function writeTable(length, stats) {
    var table = $('#champBody');
    console.log(nameArray);
    
    for (var i = 0; i <length; i++) {
        table.append('<tr>');
	    table.append('<td>' + nameArray[i]+ '</td><td>' + stats.champions[i].stats.maxChampionsKilled + '</td><td>' + stats.champions[i].stats.maxNumDeaths + '</td>	<td>' + stats.champions[i].stats.totalDoubleKills + '</td>     	<td>' + stats.champions[i].stats.totalGoldEarned + '</td><td>' + stats.champions[i].stats.totalMinionKills + '</td><td>' + stats.champions[i].stats.totalTurretsKilled + '</td></tr>');
    }
}
      

//begin dom manip

$("#summoner_click").submit(function(event){
      event.preventDefault();
      var SumName=$(".form-control").val();
      console.log(SumName); //initial console log
      //fetch fails on space character
      getSumName(SumName);

});


 


