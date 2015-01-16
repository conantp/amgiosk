 var active_mode = false;
    var mode_changed = false;
      var socket = io();
       // var socket = io.connect('https://stark-ocean-5135.herokuapp.com');

       socket.emit('get current slide',"please");
      $(".module-button").click(function(){
          console.log('change module: ' + $(this).attr('data-amgiosk-module'));
          socket.emit('change module', $(this).attr('data-amgiosk-module'));
      });

    
      $(".next-page").click(function(){
          socket.emit('page-next', 'page-next');
      });

      $(".home-page").click(function(){
          socket.emit('page-today', 'page-today');
      });

      $(".previous-page").click(function(){
          socket.emit('page-previous', 'page-previous');
      });

      $(".neighborhood-select-button").click(function(){
        $(".neighborhood-picker").slideDown('fast');
        $("body").addClass('overlay-visible');
      });


      $(".venue-show-page-next").click(function(){
          socket.emit('venue show next', 'venue show next');
      });

      $(".venue-show-page-previous").click(function(){
          socket.emit('venue show previous', 'venue show previous');
      });

      $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
      });
      socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
      });

            $('input[type="color"]').change(function(){
//                alert('color' + $(this).val() );
              $('body').css('background-color', $(this).val() );
            });

            $(".search-button").click(function(){
        $(".search-window").slideDown('fast');
      });

      // Real logic

      socket.on('featured show', function(msg){
        // $('#remote-content-window').append($('<li>').text(msg));
         $('#remote-content-window').html("<div class='show-item'>" + msg + "</div>");
         $(".show-action-buttons").slideDown('fast');
      });

       socket.on('venue detail', function(msg){
        // $('#remote-content-window').append($('<li>').text(msg));
         $('#remote-content-window').html("<div class='venue-detail-item'>" + msg + "</div>");
          $(".show-action-buttons").slideUp('fast');

         $(".venue-action-buttons").slideDown('fast');
      });

      socket.on('venue detail', function(msg){
        // $('#remote-content-window').append($('<li>').text(msg));
         $('#remote-content-window').html("<div class='show-item'>" + msg + "</div>");
         $(".show-action-buttons").slideDown('fast');
      });

      socket.on('active slide', function(msg){
        console.log('active slide received: ' + msg);
        // active_slide = msg;
        // // $('#remote-content-window').append($('<li>').text(msg));
        // $(".action-buttons").slideUp('fast');
        // if(active_slide == 'show'){
        //    $(".venue-action-buttons").slideDown('fast');

        // }
        // else if(active_slide == 'venue'){
        //  $(".show-action-buttons").slideDown('fast');          
        // }

        if(active_mode != msg){
          mode_changed = true;
        }

        active_mode = msg;

        if(mode_changed){
          processActiveMode();
          mode_changed = false;
        }
      });


    function processActiveMode(){
      $(".control-group").slideUp('fast');
      $(".control-group-"+active_mode).slideDown('fast');
    }

    function render_venue_list(venue_data){

      for(index in venue_data){
        venue = venue_data[index];
        key =  'venue-'+venue.nid;

        venue_html = "<li class='venue-item' data-id='" + venue.nid + "'>" + venue.image + venue.node_title + "</li>";
        $(".neighborhood-list").append(venue_html);
      }

        $(".venue-item").on('click', function(){
          console.log('neighborhood-list click');
          socket.emit('neighborhood select', $(this).attr('data-id'));

          $(".neighborhood-picker").slideUp('fast');
          $("body").removeClass('overlay-visible');
      });

        $(".cancel").on('click', function(){
          $(".neighborhood-picker").slideUp('fast');
          $("body").removeClass('overlay-visible');
        });


  }

  // SLIDR FOR DATES
   date_nav_slider = slidr.create('date-nav-slidr', {
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
    timing: { 'cube': '0.2s ease-in-ease-out' },
    touch: false,
    transition: 'linear'
  });
    date_nav_slider.start();

  // SLIDR FOR VENUE NAV
   venue_nav_slider = slidr.create('venue-nav-slidr', {
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
    timing: { 'cube': '0.2s ease-in-ease-out' },
    touch: false,
    transition: 'linear'
  });
    venue_nav_slider.start();   

    $('.venue-show-page-next, .venue-pager .next-page').on('click', function(){
       date_nav_slider.slide('right'); 
     });

    $('.venue-show-page-previous, .venue-pager .previous-page').on('click', function(){
       date_nav_slider.slide('left'); 
     });  

     $('.venue-pager .next-page').on('click', function(){
       venue_nav_slider.slide('right'); 
     });

     $('.venue-pager .previous-page').on('click', function(){
       venue_nav_slider.slide('left'); 
     });       

