$(document).ready(function(){
//function to retreive random quote
 function get(){
   //get JSON from https://andruxnet-random-famous-quotes.p.mashape.com
  $.ajax( {
       headers: {
      "X-Mashape-Key": "KnDu4MScLomshc5rRYyErEMhRgOCp1NZoe4jsn8XEcI77kXIGg",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=',
      success: function(data) {
        var post = JSON.parse(data);

        var q = post.quote;
        var a = post.author;

        sizeCheck(q);

  $("#tweet-button").attr('href', 'https://twitter.com/intent/tweet?text=' + q + '%0A' + "~" + a);

        $('#quote-content').animate({opacity: "1"}, 1000).html('" ' + q + ' "');
        $('#quote-author').animate({opacity: "1"}, 1000).html('- ' + a);

        // If the Source is available, use it. Otherwise hide it.
        if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
          $('#quote-source').html('Source:' + post.custom_meta.Source);
        } else {
          $('#quote-source').text('');
        }
      },
      cache: false
    });
 };

//function to fade the content
   function fade(){
     $('#quote-content').animate({opacity: ".0", maxHeight: "100%"}, 200);
     $('#quote-author').animate({opacity: ".0"}, 200);
 //after the animation it retreives new quote
     get()
   };

//prevents overflow of #quote-content on media queries less than 500px
function sizeCheck(c){
    if(c.length >= 105 && window.innerWidth <= 500){
      get();
    }
  };

  get();
  $("#btn").on("click", fade);
  });
