       //globals


		var API_KEY="f52fd5ba-04fa-4292-9818-3134d6148f35";
         
		var sumId;

     


      var getSumName= function(SUMMONER_NAME){
            $.ajax({
                        url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + SUMMONER_NAME + '?api_key=' + API_KEY,
                        type: 'GET',
                        dataType: 'json',
                        data: {

                        },
                        success: function (SUMMONERS) {

                        	sumId=SUMMONERS[SUMMONER_NAME].id;
                              console.log(sumId);
                              getStats(sumId);


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
                        	console.log(stats);
                              var length=stats.champions.length;
                              for (var i =0;i<length; i++){
                                    getStaticData(stats.champions[i].id);

                              }
                        }
            });
      }
	

		var gameID;
	var getGames=function(){
            $.ajax({
                  url: 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/'+summonerId+'/recent?api_key='+API_KEY,
                  type: 'GET',
                  dataType: 'json',
                  data: {

                  },

                  success: function(game){
                  	console.log(game);
                  	console.log(game.games[0].gameId);
                  	var champid=[];
                  	for (var i=0; i<10; i++){
                  		champid[i]=json.games[i].championId;
                        }
                  }
            });
            console.log(champid[1]);
      }
            		

      var getStaticData=function(champid){
            $.ajax({
                  url: 'https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion/'+champid+'?api_key='+API_KEY,
                  type: 'GET',
                  dataType: 'json',
                  data: {

                  },

                  success: function(champ){
                        console.log(champ);
                  	console.log(champ.name);
                  	$('#champions').append(champ.name).append("<br/>");
                        gameID=champ.games[0].gameId;
                  }
		});
      }

            	
            			
      var getMatch=function(){
            $.ajax({
                  url: 'https://na.api.pvp.net/api/lol/na/v2.2/match/'+gameID+'?api_key='+API_KEY,
                  type: 'GET',
                  dataType: 'json',
                  data: {

                  },

                  success: function(match){
                  	console.log(match);
                  }
		});
      }
	

//begin dom manip

$("#summoner_click").submit(function(event){
      event.preventDefault();
      var SumName=$(".form-control").val();
      console.log(SumName);
      getSumName(SumName);
});

	
 


