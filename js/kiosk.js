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
    show_block_index = 0;
  }

  active_show_id = show_key_array[show_block_index];
  console.log(active_show_id);
  active_show_html = $(".show-item[data-slidr='" + active_show_id + "']");
  console.log(active_show_html);
  socket.emit('featured show', $(active_show_html).html() );
  console.log('emitted');
}

function showPagePrevious(){
  show_block.slide('left');

  setTimeout( date_block.slide('right'), 100);
  setTimeout( venue_block.slide('left'), 300);
}

function venuePagePrevious(){
  venue_block2.slide('left');

  setTimeout( venue_show_block.slide('right'), 300);
}

function venuePageNext(){
  venue_block2.slide('right');

  setTimeout( venue_show_block.slide('left'), 300);
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

  setTimeout( moveVenueMiddle, 300);
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

    socket.on('page-previous', function(msg){
      console.log("Message received: "+ msg);
      handlePrevious();
    });

    socket.on('page-next', function(msg){
      console.log("Message received: "+ msg);
      handleNext();
    });

      socket.on('page-up', function(msg){
      console.log("Message received: "+ msg);
      main_slide_controller.slide('left');
    });


    socket.on('page-down', function(msg){
      console.log("Message received: "+ msg);
            main_slide_controller.slide('right');

    });

        socket.on('neighborhood select', function(msg){
      console.log("Message received: "+ msg);
            venue_block.slide('venue-'+msg);
            venue_block2.slide('venue-'+msg);

    });

    // startKioskLoop();

        // socket.emit('chat message',"nextpage");



function amgiosk_load_venue_show_json(input){
  venue_show_data = input;
  console.log('Venue Show');
  console.log(input);

  


  venue_show_image_array = [];
  for(index in venue_show_data){
    venue_show = venue_show_data[index];
    key =  'venue-show-'+venue.nid;
    revised_title = venue_show.node_title.substring(0, 20);

    if(index > 8){
      break;
    }

    if(venue_show.node_title.length > 24){
      revised_title = revised_title + "...";
    }

    venue_show_html = "<div class='venue-show-item' data-slidr='"+ key + "'><div>" + "<h2>" + revised_title + "</h2>" + venue_show.date + venue_show.image + "</div></div>";
    $("#venue-show-block-slidr").append(venue_show_html);

    venue_show_image_array.push("" + key);
  }

  venue_show_image_array.push(venue_show_image_array[0]);

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
    venue_block.add('h', venue_image_array );
    venue_block.start();

}

