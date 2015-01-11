var show_block;
var venue_block;
var date_block;
var main_slide_controller;
var venue_block2;
var venue_show_block;

var active_slide;

var show_block_index;

function amgiosk_load_venue_image_json(input){
  venue_data = input;

  venue_image_array = [];
  for(index in venue_data){
    venue = venue_data[index];
    key =  'venue-'+venue.nid;

    venue_html = "<div class='venue-item' data-slidr='"+ key + "'>" + venue.image + "<div class='slide-content-wrapper'><h2><span>Upcoming Shows</span>" + venue.node_title + "</h2>" + venue.address + "</div></div>";
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
      console.log( e); 

      venue_id = e.in.slidr.split('-')[1];
      console.log(venue_id);
                  venue_show_block.slide('venue-show-page-'+venue_id+"-0");


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
console.log(show_key_array);
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
}




date_block = slidr.create('date-block-slidr', {
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

date_key_array = ['date-0', 'date-1', 'date-0'];
    date_block.add('h', date_key_array );
    date_block.start();




function showPageNext(){
  show_block.slide('right');

  setTimeout( date_block.slide('left'), 100);
  setTimeout( venue_block.slide('right'), 300);

  show_block_index++;

  if(show_block_index >= show_key_array.length){
    show_block_index = 1;
  }

  active_show_id = show_key_array[show_block_index];
  active_show_html = $(".show-item[data-slidr='" + active_show_id + "']");
  socket.emit('featured show', $(active_show_html).html() );
}

function showPagePrevious(){
  show_block.slide('left');

  setTimeout( date_block.slide('right'), 100);
  setTimeout( venue_block.slide('left'), 300);

  show_block_index--;

  if(show_block_index < 0){
    show_block_index = show_key_array.length-2;
  }

  active_show_id = show_key_array[show_block_index];
  active_show_html = $(".show-item[data-slidr='" + active_show_id + "']");
  socket.emit('featured show', $(active_show_html).html() );

}


function venueShowPageNext(){
  venue_show_block.slide('right');
}


function venueShowPagePrevious(){
  venue_show_block.slide('left');
}

function venuePagePrevious(){
  venue_block2.slide('left');
}

function venuePageNext(){
  venue_block2.slide('right');
}

function setActiveSlide(){
  test_value = $(".kiosk-main-slide-show").attr('style').indexOf('visibility: hidden;');
  console.log(test_value);
  if( test_value > 100){
      active_slide = "show";

  }
  else{
    active_slide = "venue";

  }
  socket.emit('active slide',active_slide);
  console.log('active slide message');
}

function handleNext(){
  setActiveSlide();

  console.log(active_slide);
  // active_slide = $(".show-item:visible");

  if(active_slide == "show"){
    showPageNext();
  }
  
  if(active_slide == "venue"){
    venuePageNext();
  }
}

function handlePrevious(){
  setActiveSlide();

  if(active_slide == "show"){
    showPagePrevious();
  }

  if(active_slide == "venue"){
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

main_key_array = ['main-slide-venue', 'main-slide-show', 'main-slide-venue', 'main-slide-show'];
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
            venue_block.slide('venue-'+msg);
            venue_block2.slide('venue-'+msg);

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

    // startKioskLoop();

        // socket.emit('chat message',"nextpage");



function amgiosk_load_venue_show_json(input){
  venue_show_data = input;
  console.log('Venue Show');
  console.log(input);

  

  venue_show_array = {};

  current_page = 0;

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

  active_venue_id = 7311;

  venue_show_image_array = setupVenueShows();

 venue_show_block = slidr.create('venue-show-block-slidr', {
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
    venue_show_block.add('h', venue_show_image_array );
    venue_show_block.start();

}

function setupVenueShows(){
  $("#venue-show-block-slidr").html("");
  venue_show_image_array = [];

  for(active_venue_id in venue_show_array){

    active_venue_shows = venue_show_array[active_venue_id];


    for(page_index in active_venue_shows){
      active_venue_show_page = active_venue_shows[page_index];

      page_key =  'venue-show-page-'+active_venue_id+"-"+page_index;
      venue_show_image_array.push("" + page_key);

      show_page_html = "<div class='venue-show-page-item' data-slidr='"+ page_key + "'>";

      show_page_html += "<h2>";
      show_page_html += active_venue_show_page[0].formatted_date_string;
      show_page_html += " - ";
      show_page_html += active_venue_show_page[active_venue_show_page.length-1].formatted_date_string;
      show_page_html += "</h2>";

      for(index in active_venue_show_page){
        show = active_venue_show_page[index];
        if(show.venue == null){
          continue;
        }
        key =  'venue-show-'+show.nid;

        show_page_html += "<div class='venue-show-item' data-slidr='"+ key + "'><div>" + "<h2>" + show.revised_title + "</h2>" + show.formatted_date_string + show.image + "</div></div>";

      }
      show_page_html += "</div>"
      $("#venue-show-block-slidr").append(show_page_html);

    }
  }
  venue_show_image_array.push(venue_show_image_array[0]);
  return venue_show_image_array;
}

