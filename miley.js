/*
    miley.js
    An implementation of the MileyFeed project.
*/

var tweetNumber = 0;

var intId;

var tweetIds = [];

$(document).ready(function() {
	$("#tweet_container").css('visibility', 'hidden');

	$("#start").click(function() {
		$("#tweet_container").css('visibility', 'visible');
		$("#tweet_container").hide();
		$("#tweet_container").slideDown("slow");
		twtReq('http://miley.djroomba.com/feed/kaluru', twtParse);
		startReq();
	});

	$("#stop").click(function() {
		twtStop();
	});

	$("#clear").click(function() {
		$("#tweets").empty();
		$("#tweet_container").slideUp("slow", function() {
			$("#tweet_container").show();
			$("#tweet_container").css('visibility', 'hidden');
		});
		twtStop();
	});

	var cssChanged = false;

	$("#music").click(function() {
		console.log(cssChanged);
		if(cssChanged == false) {
			var music_player = document.createElement('audio');
			music_player.id = "miley_audio";
			music_player.src = "audio/wrecking_ball.mp3";
			music_player.type = "audio/mpeg";
			document.body.appendChild(music_player);
			music_player.play();
			cssChanged = true;
		}
		else{
			$("#miley_audio").remove();
			cssChanged = false;
		}
	});
});

function startReq() {
	intId = setInterval(function() {twtReq('http://miley.djroomba.com/feed/kaluru', twtParse);
									},
						5000);
}

function twtReq(theURL, callback) {
	var request = new XMLHttpRequest();

		request.open('GET', theURL, true);

		request.addEventListener('load', function(e){
    		if (request.status == 200) {
        		var content = request.responseText;
        		callback(content);
    		} else {
    			;
    		}
		}, false);

		request.send(null); 
}

function twtParse(jsoncontent) {
	var data = JSON.parse(jsoncontent);
    console.log(data);
    twtDisplay(data);
}

function twtStop() {
	clearInterval(intId);
}

function twtDisplay(tweetcontent) {
	var ul = document.getElementById('tweets');
    for (var i=0;i<tweetcontent.length;i++) {
		var li = document.createElement('li');

		if(tweetcontent[i].user.name === "") {
				var username = "No Name";
			}
			else {
				var username = tweetcontent[i].user.name;
			}

		var mentions = tweetcontent[i].entities.user_mentions;
		var mentions_length = tweetcontent[i].entities.user_mentions.length;

		li.id='tweet';

		var screenname = tweetcontent[i].user.screen_name;
		var tweet_text = tweetcontent[i].text;
		if(mentions_length > 0) {
			for (var k=0; k<1; k++){
				var mention_string = tweet_text.substring(mentions[k].indices[0], mentions[k].indices[1]);
				tweet_with_url = tweet_text.replace(mention_string, '<a id = "entity_link" href = https://twitter.com/' + mentions[k].screen_name + '>' + mention_string + '</a>');
				tweet_text = tweet_with_url;
			}
		}
		else {
			tweet_with_url = tweet_text;
		}
		li.innerHTML = '<a id = "picture_link" href = https://twitter.com/' + screenname + '>' + '<img src ="' + tweetcontent[i].user.profile_image_url + '" id = "userimage" width = "48" height = "48" style = "float:left;" onError="noImage(this)"></img>' + '</a>'
		+ '<br>' + '<div id="username">' + '<a id = "username_link" href = https://twitter.com/' + screenname + '>' + '<strong>' + username + '</strong>' + '</a>' + '</div>' + '<div id="screenname">' + '<a id = "screenname_link" href = https://twitter.com/' + screenname + '>' 
		+ '@' + screenname + '</a>' + '</div>'+ '<br>' + '<div id="text">' + tweet_text + '</div>' + '<br>' + '<br>';

		li.innerHTML = li.innerHTML.replace(/\uFFFD/g, '');
		
		if(tweetIds.indexOf(tweetcontent[i].id) == -1) {
            ul.insertBefore(li, ul.childNodes[0]);
			tweetIds.push(tweetcontent[i].id);
			tweetNumber++;
			console.log(tweetNumber);
		}
		else {
			console.log("skipped duplicate/s");
		}

		if(tweetNumber > 75) {
			$('#tweets li:last-child').remove();
			tweetNumber--;
		}
		else {
			;
		}
	}
}

function noImage(image) {
	console.log('no profile picture existing');
	image.onerror="";
	image.src = "img/no_photo.png";
	return true;
}
