       //globals

       	var SUMMONER_NAME="thepartaker";
		var API_KEY="f52fd5ba-04fa-4292-9818-3134d6148f35";
		var sumId;

        $.ajax({
            url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + SUMMONER_NAME + '?api_key=' + API_KEY,
            type: 'GET',
            dataType: 'json',
            data: {

            },
            success: function (json) {

            	sumId=json.SUMMONER_NAME.id;


            }
        });

			var summonerId="67650739";
		
			var call=$.ajax({
            url: 'https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/'+summonerId+'/ranked?api_key='+API_KEY,
            type: 'GET',
            dataType: 'json',
            data: {

            },

            success: function(json){
            	console.log(json);
            }
		});
	console.log(call);

		var gameID;
		var call1=$.ajax({
            url: 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/'+summonerId+'/recent?api_key='+API_KEY,
            type: 'GET',
            dataType: 'json',
            data: {

            },

            success: function(json){
            	console.log(json);
            	console.log(json.games[0].gameId);
            	var champid;
            	for (var i=0; i<10; i++){
            		champid=json.games[i].championId;
            		var call=$.ajax({
            url: 'https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion/'+champid+'?api_key='+API_KEY,
            type: 'GET',
            dataType: 'json',
            data: {

            },

            success: function(champ){
            	console.log(champ);
            	$('#champions').append(champ.name);
            }
		});
      }
            	gameID=json.games[0].gameId;
            			var call3=$.ajax({
            url: 'https://na.api.pvp.net/api/lol/na/v2.2/match/'+gameID+'?api_key='+API_KEY,
            type: 'GET',
            dataType: 'json',
            data: {

            },

            success: function(json){
            	console.log(json);
            }
		});
            }
		});


$("#summoner").append(SUMMONER_NAME);
	
 


