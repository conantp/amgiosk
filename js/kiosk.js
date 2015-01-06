var show_block;
var venue_block;
var date_block;
var main_slide_controller;
var venue_block2;
var venue_show_block;

function amgiosk_load_venue_image_json(input){
  venue_data = input;

  venue_image_array = [];
  for(index in venue_data){
    venue = venue_data[index];
    key =  'venue-'+index;

    venue_html = "<div class='venue-item' data-slidr='"+ key + "'>" + venue.image + "<h2>" + venue.node_title + "</h2>" + venue.address + "</div>";
    $("#venue-block-slidr").append(venue_html);
    $("#venue-block-slidr-2").append(venue_html);

    venue_image_array.push("" + key);
  }

  venue_image_array.push('venue-0');

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

    show_html = "<div class='show-item' data-slidr='" + key + "' >"  
            + active_image + 
            "<div class='artist-slide-caption'>" + 
              "<h2>" + show.node_title + "</h2> " + 
              "<h4>Rock/Country</h4> " + 
            "</div>" +
          "</div>";

    $("#show-block-slidr").append(show_html);

    show_key_array.push("" + key);
  }

  show_key_array.push('show-0');

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



venue_show_block = slidr.create('venue-show-block-slidr', {
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

venue_show_key_array = ['venue-show-0', 'venue-show-1', 'venue-show-0'];
    venue_show_block.add('h', venue_show_key_array );
    venue_show_block.start();
    


function moveBottom(){
    venue_block.slide('right');

}

function moveMiddle(){
    date_block.slide('left');
}

function moveVenueMiddle(){
    venue_show_block.slide('left');
}

$(".next").click(function(){
  show_block.slide('right');

  setTimeout( moveMiddle, 100);
  setTimeout( moveBottom, 300);
});

$(".show-next").click(function(){
  venue_block2.slide('right');

  setTimeout( moveVenueMiddle, 300);
});


main_slide_controller = slidr.create('kiosk-slide-container', {
    // after: function(e) { console.log('in: ' + e.in.slidr); },
    // before: function(e) { console.log('out: ' + e.out.slidr); },
    breadcrumbs: false,
    controls: 'corner',
    direction: 'vertical',
    fade: false,
    keyboard: true,
    overflow: true,
    pause: false,
    theme: '#222',
    timing: { 'cube': '0.5s ease-in' },
    touch: true,
    transition: 'cube'
  });

main_key_array = ['main-slide-show', 'main-slide-venue', 'main-slide-show'];
    main_slide_controller.add('v', main_key_array );
    main_slide_controller.start();