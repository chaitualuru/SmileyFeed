README
======
Fill this file in with information on your project, along with any known bugs.

Features:
- New tweets appear at the top. In fact every appended tweet appears above the last.
- Maximum tweets at any given point of time is <= 75 depending on if duplicates were present or not. After a point it stays at a constant 75. This is also logged in the console with tweetNumber's value.
- Removes duplicates. You can check this in console. It logs "skipped duplicates", every time it skips duplicates.
- Tweet container has overflow:auto, so the tweet container is independently scrollable.
- Feed refreshes every 5 seconds. 5 seconds is not too long nor too short.
- When there is no picture associated with the tweet, it displays no_photo image provided in the img folder. This is vary rare though so it might be tough to check for it.
- Added regex to take care of encoding problem (something is wrong with the utf-8 encoding tag, does not encode all content properly).
- Added start feed and stop feed features. Start feed also has a slideDown animation. 
- Converted entities -> user mentions into links.

Additional Features:
- Made a nice little favicon for the website.
- Clear clears the feed completely. Press start again to restart querying tweets. Clear also has a slideUp animation.
- Added some music! (warning: it is a remix, so even if you do not like miley cyrus you can give it a try).
- Added links to twitter handle, username and profile picture. They have no decoration but you can press on them to check if the links work.
- When name is "", it displays No Name, empty names are rare but sometimes you will see one or two appear.
- Used both google fonts and custom fonts.
- Added border radius to create rounded edges for images.

Note: 
I use SASS for CSS but at a point I just started typing into CSS so you can ignore the SASS file as well (.scss file).

Issues:
Old browsers will not be supported especially because the <audio> tag was used in HTML.