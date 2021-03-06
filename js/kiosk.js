var show_block;
var venue_block;
var date_block;
var main_slide_controller;
var venue_block2;
var venue_show_block;

var active_slide;

var show_block_index;
var active_venue_index;
var active_mode = 'venue';

var venue_array = {}; 
var show_array = {};

var active_venue_show_page_index;

var active_venue_show_page_number = 0;

var active_show = false;

var active_date_slidr_elm = 1;

function handleNewSlide(e){
        console.log( e); 

      active_venue_index = e.in.slidr.split('-')[1];
      console.log(active_venue_index);
      venue_show_block.slide('venue-show-page-'+active_venue_index+"-0");

      active_venue_selector = 'venue-' + active_venue_index;
    active_html = $(".venue-item[data-slidr='" + active_venue_selector + "']").html();
    active_html += $(".venue-show-page-item[data-slidr='venue-show-page-"+active_venue_index+"-0']").html();

    socket.emit('venue detail', active_html);
}

function amgiosk_load_venue_image_json(input){
  venue_data = input;

  venue_image_array = [];
  active_venue_index = venue_data[0].nid;
  for(index in venue_data){
    venue = venue_data[index];
    key =  'venue-'+venue.nid;


    if(typeof venue_show_array[venue.nid] == "undefined"){
      continue;
    }

    venue.shows = venue_show_array[venue.nid];

    venue_array[venue.nid] = venue;

    venue_html = "<div class='venue-item' data-slidr='"+ key + "'>" + venue.image + "<div class='slide-content-wrapper'><h2>" + venue.node_title + "</h2>" + venue.address + "</div></div>";
    $("#venue-block-slidr").append(venue_html);
    $("#venue-block-slidr-2").append(venue_html);

    venue_image_array.push("" + key);
  }

  venue_image_array.push(venue_image_array[0]);

   venue_block = slidr.create('venue-block-slidr', {
    // after: function(e) { console.log('in: ' + e.in.slidr); },
    // before: function(e) { console.log('out: ' + e.out.slidr); },
    breadcrumbs: false,
    controls: 'corner',
    direction: 'horizontal',
    fade: false,
    keyboard: true,
    overflow: true,
    pause: false,
    theme: '#222',
    timing: { 'cube': '0.5s ease-in' },
    touch: true,
    transition: 'cube'
  });
    venue_block.add('h', venue_image_array );
    venue_block.start();


     venue_block2 = slidr.create('venue-block-slidr-2', {
    // after: function(e) { console.log('in: ' + e.in.slidr); },
    before: function(e) { 
      console.log('venue block', e); 

        active_venue_index = e.in.slidr.split('-')[1];
        console.log(active_venue_index);
        venue_show_block.slide('venue-show-page-'+active_venue_index+"-0");

        sendVenueHTML();
    },
    breadcrumbs: false,
    controls: 'corner',
    direction: 'horizontal',
    fade: false,
    keyboard: true,
    overflow: true,
    pause: false,
    theme: '#222',
    timing: { 'cube': '0.5s ease-in' },
    touch: true,
    transition: 'cube'
  });
    venue_block2.add('h', venue_image_array );
    venue_block2.start();

}

function amgiosk_load_show_data_json(input){
  show_data = input;

  show_key_array = [];
  for(index in show_data){
    show = show_data[index];
    show_array[index] = show;

    key =  'show-'+index;

    if(show.image){
      active_image = show.image;
    }
    else{
      active_image = show.image_imported;
    }

    if(! active_image){
      continue;
    }

    show_html = "<div class='show-item' data-slidr='" + key + "' >"  
            + active_image + 
            "<div class='slide-content-wrapper'>" + 
              "<h2>" + show.node_title + "</h2> " + 
              "<h4>Rock/Country</h4> " + 
            "</div>" +
          "</div>";

    $("#show-block-slidr").append(show_html);

    show_key_array.push("" + key);
  }
// console.log(show_key_array);
  // show_key_array.push('show-0');

  show_block_index = 0;

  show_key_array.push(show_key_array[0]);

   show_block = slidr.create('show-block-slidr', {
    // after: function(e) { console.log('in: ' + e.in.slidr); },
    // before: function(e) { console.log('out: ' + e.out.slidr); },
    breadcrumbs: false,
    controls: 'corner',
    direction: 'horizontal',
    fade: false,
    keyboard: true,
    overflow: true,
    pause: false,
    theme: '#222',
    timing: { 'cube': '0.5s ease-in' },
    touch: true,
    transition: 'cube'
  });
    show_block.add('h', show_key_array );
    show_block.start();
    updateShowPageContent();
}




date_block = slidr.create('date-block-slidr', {
    // after: function(e) { console.log('in: ' + e.in.slidr); },
    before: function(e) { 
      console.log('out: ' + e.out.slidr); 
      active_date_slidr_elm=e.out.slidr.replace('date-', '');   },
    breadcrumbs: false,
    controls: 'corner',
    direction: 'horizontal',
    fade: false,
    keyboard: true,
    overflow: true,
    pause: false,
    theme: '#222',
    timing: { 'cube': '0.5s ease-in' },
    touch: true,
    transition: 'cube'
  });

date_key_array = ['date-0', 'date-1', 'date-0'];
    date_block.add('h', date_key_array );
    date_block.start();




function updateShowPageContent(){
  active_show = show_array[parseInt(show_key_array[show_block_index].replace("show-", ""))];

  console.log('active show', active_show);

  show_block.slide(show_key_array[show_block_index]);

  if(active_show.date){
    date_text = $(active_show.date).html()+"<br />";
  }
  else{
    date_text = "";
  }
  if(active_show.time){
    time_text = active_show.time;
  }
  else{
    time_text = "";
  }

  if(active_show.price){
    price_text = " | "+active_show.price;
  }
  else{
    price_text = "";
  }

  $(".date-container[data-slidr='date-" + active_date_slidr_elm + "']").find("h3").html(date_text + " "+ time_text + price_text);

  setTimeout( date_block.slide('right'), 100);
  setTimeout( venue_block.slide('venue-'+active_show.venue), 300);

  sendContentWindow();
}

function showPageNext(){ 


  show_block_index++;

  if(show_block_index >= show_key_array.length){
    show_block_index = 1;
  }
  
  updateShowPageContent();
}

function showPagePrevious(){
  show_block_index--;

  if(show_block_index < 0){
    show_block_index = show_key_array.length-2;
  }

  updateShowPageContent();

  // active_show_id = show_key_array[show_block_index];
  // active_show_html = $(".show-item[data-slidr='" + active_show_id + "']");
  // socket.emit('featured show', $(active_show_html).html() );

}


function venueShowPageNext(){
  active_venue_show_page_number++;
  // Check for need to loop
  console.log(active_venue_id);
  console.log(active_venue_show_page_number);
  console.log($(".venue-show-page-item[data-slidr='venue-show-page-"+active_venue_index+"-"+active_venue_show_page_number+"']"));


  if(! $(".venue-show-page-item[data-slidr='venue-show-page-"+active_venue_index+"-"+active_venue_show_page_number+"']").length){
    active_venue_show_page_number = active_venue_show_page_number-1;
  }

  venue_show_block.slide("venue-show-page-"+active_venue_index+"-"+active_venue_show_page_number);
  sendVenueHTML();
  // active_show_id = show_key_array[show_block_index];
  // active_show_html = $(".show-item[data-slidr='" + active_show_id + "']");
  // socket.emit('featured show', $(active_show_html).html() );
}


function venueShowPagePrevious(){

  active_venue_show_page_number--;
  // Check for need to loop
  console.log(active_venue_id);
  console.log(active_venue_show_page_number);
  console.log($(".venue-show-page-item[data-slidr='venue-show-page-"+active_venue_index+"-"+active_venue_show_page_number+"']"));

  if(! $(".venue-show-page-item[data-slidr='venue-show-page-"+active_venue_index+"-"+active_venue_show_page_number+"']").length){
    active_venue_show_page_number = 0;
  }

  venue_show_block.slide("venue-show-page-"+active_venue_index+"-"+active_venue_show_page_number);



  sendVenueHTML();

}

function venuePagePrevious(){
  venue_block2.slide('left');
}

function venuePageNext(){
  venue_block2.slide('right');
}

function setActiveSlide(){
  // test_value = $(".kiosk-main-slide-show").attr('style').indexOf('visibility: hidden;');
  // console.log(test_value);
  // if( test_value > 100){
  //     active_slide = "show";
  // }
  // else{
  //   active_slide = "venue";

  // }

  socket.emit('active slide',active_mode);
  console.log('active slide message');
}

function handleNext(){
  setActiveSlide();

  console.log(active_mode);
  // active_slide = $(".show-item:visible");

  if(active_mode == "show"){
    showPageNext();
  }
  
  if(active_mode == "venue"){
    venuePageNext();
  }
}

function handlePrevious(){
  setActiveSlide();

  if(active_mode == "show"){
    showPagePrevious();
  }

  if(active_mode == "venue"){
    venuePagePrevious();
  }
}

$(".next").click(function(){

});

$(".show-next").click(function(){
  venue_block2.slide('right');

  // setTimeout( moveVenueMiddle, 300);
});


main_slide_controller = slidr.create('kiosk-slide-container', {
    // after: function(e) { console.log('in: ' + e.in.slidr); },
    // before: function(e) { console.log('out: ' + e.out.slidr); },
    breadcrumbs: false,
    controls: 'none',
    direction: 'horizontal',
    fade: false,
    keyboard: true,
    overflow: true,
    pause: false,
    theme: '#222',
    // timing: { 'cube': '0.5s ease-in' },
    touch: true,
    transition: 'linear'
  });

main_key_array = [ 'main-slide-venue', 'main-slide-show', 'main-slide-social',  'main-slide-video'];
main_key_array.push(main_key_array[0]);
    main_slide_controller.add('h', main_key_array );
    main_slide_controller.start();



function startKioskLoop(){
  setTimeout(handleNext, 5000);
  setTimeout(startKioskLoop, 5000);
}

// var socket = io.connect('https://stark-ocean-5135.herokuapp.com');
var socket = io.connect();


var kiosk = {};

kiosk.id = 1;

   socket.on('get current slide', function(msg){

      console.log("Message received: "+ msg);
      setActiveSlide();

      sendContentWindow();
    });

  
  
  socket.on('page-next', function(msg){
      console.log("Message received: "+ msg);
      handleNext();
    });

    socket.on('page-previous', function(msg){
      console.log("Message received: "+ msg);
      handlePrevious();
    });


    socket.on('page-up', function(msg){
      console.log("Message received: "+ msg);
      main_slide_controller.slide('left');

      setActiveSlide();
    });


    socket.on('page-down', function(msg){
      console.log("Message received: "+ msg);
      main_slide_controller.slide('right');
      setActiveSlide();
    });

    socket.on('neighborhood select', function(msg){
        console.log("Message received: "+ msg);
        venue_block2.slide('venue-'+msg);
        sendContentWindow();
            // venue_show_block.slide('venue-show-page-'+msg+"-0");

    });

    socket.on('venue show next', function(msg){
      console.log("Message received: "+ msg);
      venueShowPageNext();
    });

    socket.on('venue show previous', function(msg){
      console.log("Message received: "+ msg);
      venueShowPagePrevious();
    });

    socket.on('change module', function(msg){
      console.log('change module: ' + msg);


      active_mode = msg;

      sendContentWindow();
      setActiveSlide();
      main_slide_controller.slide('main-slide-'+msg);

    });


    // VIDEO STUFF
     socket.on('play_video', function(msg){
        console.log("Message received: "+ msg);
        player.setPlaybackQuality('hd1080');
        player.playVideo();
      });

     socket.on('pause_video', function(msg){
        console.log("Message received: "+ msg);
        player.pauseVideo();
      });

    // startKioskLoop();

        // socket.emit('chat message',"nextpage");

function sendContentWindow(){
  if(active_mode == 'show'){
    sendShowHTML();
  }
  else if(active_mode == 'venue'){
    console.log('Sending Venue Content');
    sendVenueHTML();
  }
  else if(active_mode == 'social'){
    sendSocialHTML();
  }
  else if(active_mode == 'video'){
    sendVideoHTML();
  }
}

function sendVenueHTML(){
    active_venue_selector = 'venue-' + active_venue_index;
    // active_html = $(".venue-item[data-slidr='" + active_venue_selector + "']").html();
    // active_html += $(".venue-show-page-item[data-slidr='" + active_venue_show_page_index + "']").html();

      data = {};
      data.venue_html = $(".venue-item[data-slidr='" + active_venue_selector + "']").html();
      // data.shows_html = $(".venue-show-page-item[data-slidr='venue-show-page-"+active_venue_index+"-"+active_venue_show_page_number+"']").html();

      data.venue = venue_array[active_venue_index];
      data.active_venue_show_page_number = active_venue_show_page_number;

    socket.emit('venue detail', data);

}

function sendSocialHTML(){
    active_html = $(".social-slide-content").html();

    socket.emit('venue detail', active_html);
}

function sendVideoHTML(){
    active_html = $(".social-slide-content").html();

    socket.emit('venue detail', active_html);
}

function sendShowHTML(){
        active_show_id = show_key_array[show_block_index];

          data = {};

          // data.show = show_data[show_block_index];
           data.show = show_array[parseInt(show_key_array[show_block_index].replace("show-", ""))];

   //       data.show_html =  $(".show-item[data-slidr='" + active_show_id + "']");
// console.log('data', data);
        socket.emit('featured show', data );
}

function amgiosk_load_venue_show_json(input){
  venue_show_data = input;
  console.log('Venue Show');
  console.log(input);

  

  venue_show_array = {};

  current_page = 0;

    active_venue_id = venue_show_data[1].venue;


  for(index in venue_show_data){
    venue_show = venue_show_data[index];
current_page = 0;




    date_string = venue_show.date; 

    var yr1   = parseInt(date_string.substring(0,4));
    var mon1  = parseInt(date_string.substring(5,7));
    var dt1   = parseInt(date_string.substring(8,10));
    var date1 = new Date(yr1, mon1-1, dt1);

    // console.log(date1);

    formatted_date_string = date1.toDateString();


    revised_title = venue_show.node_title.substring(0, 20);

    // if(index > 8){
    //   break;
    // }

    if(venue_show.node_title.length > 24){
      revised_title = revised_title + "...";
    }

    venue_show.revised_title = revised_title;
    venue_show.formatted_date_string = formatted_date_string;
    venue_show.month = date1.getMonth();
    venue_show.year = date1.getYear();


    if(typeof venue_show_array[venue_show.venue] == 'undefined'){
      venue_show_array[venue_show.venue] = [];
    }

    
    if(typeof venue_show_array[venue_show.venue][current_page] == 'undefined'){
      venue_show_array[venue_show.venue][current_page] = [];
    }

    while(venue_show_array[venue_show.venue][current_page].length > 8){
      current_page++;

      if(typeof venue_show_array[venue_show.venue][current_page] == 'undefined'){
        venue_show_array[venue_show.venue][current_page] = [];
      }
    }

    venue_show_array[venue_show.venue][current_page].push(venue_show);
  }


  venue_show_image_array = setupVenueShows();

 venue_show_block = slidr.create('venue-show-block-slidr', {
    // after: function(e) { console.log('in: ' + e.in.slidr); },
    before: function(e) { 
      console.log('venue show block', e);
      active_venue_show_page_index = e.in.slidr;
              active_venue_id = e.in.slidr.split('-')[3];
              active_venue_show_page_number = e.in.slidr.split('-')[4];


       },
    breadcrumbs: false,
    controls: 'corner',
    direction: 'horizontal',
    fade: false,
    keyboard: true,
    overflow: true,
    pause: false,
    theme: '#222',
    timing: { 'cube': '0.5s ease-in' },
    touch: true,
    transition: 'cube'
  });
    venue_show_block.add('h', venue_show_image_array );
    venue_show_block.start();

}

function setupVenueShows(){
  $("#venue-show-block-slidr").html("");
  venue_show_image_array = [];

  active_venue_show_page_index = 'venue-show-page-'+active_venue_id+"-"+0;

  for(active_venue_id in venue_show_array){

    active_venue_shows = venue_show_array[active_venue_id];


    for(page_index in active_venue_shows){
      active_venue_show_page = active_venue_shows[page_index];

      page_key =  'venue-show-page-'+active_venue_id+"-"+page_index;
      venue_show_image_array.push("" + page_key);

      show_page_html = "<div class='venue-show-page-item' data-slidr='"+ page_key + "'>";

      show_page_html += "<div class='padded-date'><h2><i class='fa fa-calendar'></i>";
      show_page_html += active_venue_show_page[0].formatted_date_string;
      show_page_html += " - ";
      show_page_html += active_venue_show_page[active_venue_show_page.length-1].formatted_date_string;
      show_page_html += "</h2></div>";

      for(index in active_venue_show_page){
        show = active_venue_show_page[index];
        if(show.venue == null){
          continue;
        }
        key =  'venue-show-'+show.nid;

        show_page_html += "<div class='venue-show-item' data-slidr='"+ key + "'><div>" + "<div class='show-title'><h2>" + show.revised_title + "<span>" + show.formatted_date_string + "</span>" + "</h2></div>" + show.image + "</div></div>";

      }
      show_page_html += "</div>"
      $("#venue-show-block-slidr").append(show_page_html);

    }
  }
  venue_show_image_array.push(venue_show_image_array[0]);
  return venue_show_image_array;
}



// VIDEO STUFF
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '1820',
    width: '1080',
    videoId: 'LeoAbZtHSb0',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  console.log("GO Video");
  // event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}


