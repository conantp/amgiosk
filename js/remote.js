 var active_mode = false;
    var mode_changed = false;
      var socket = io();
      var venue_nav_visible = 'one';
      var temp_array;

       // var socket = io.connect('https://stark-ocean-5135.herokuapp.com');

       socket.emit('get current slide',"please");

      $(".module-button").click(function(){
          console.log('change module: ' + $(this).attr('data-amgiosk-module'));
          socket.emit('change module', $(this).attr('data-amgiosk-module'));
      });

    

      $(".neighborhood-select-button").click(function(){
        $(".neighborhood-picker").slideDown('fast');
        $("body").addClass('overlay-visible');
      });


      // Real logic

      socket.on('featured show', function(msg){
        // $('#remote-content-window').append($('<li>').text(msg));
         $('.show-content-window').html("<div class='show-item'>" + msg + "</div>");
         $(".show-action-buttons").slideDown('fast');
      });

     socket.on('venue detail', function(msg){
        // console.log(msg);



        // $('#remote-content-window').append($('<li>').text(msg));
       //  $('#remote-content-window').html("<div class='venue-detail-item'>" + msg.shows_html + "</div>");
          $(".show-action-buttons").slideUp('fast');

         $(".venue-action-buttons").slideDown('fast');

// console.log(msg.venue);
        // Populate the hidden item



        var scope = angular.element($("#amgRemoteAppContainer")).scope();

        scope.$apply(function(){
            console.log('scope apply');

            new_venue = false;
            if(msg.venue.nid != scope.active_venue.nid){
              scope.active_venue = msg.venue;
              new_venue = true;
            }

            new_show_page_number = parseInt(msg.active_venue_show_page_number);

            if(new_venue || scope.active_show_page_number != new_show_page_number){
              scope.active_show_page_number = new_show_page_number;
              scope.active_show_page = scope.active_venue.shows[scope.active_show_page_number];
              


              date_string = scope.active_show_page[0].date; 

              var yr1   = parseInt(date_string.substring(0,4));
              var mon1  = parseInt(date_string.substring(5,7));
              var dt1   = parseInt(date_string.substring(8,10));
              var date1 = new Date(yr1, mon1-1, dt1);

              // console.log(date1);

              formatted_date_string = date1.toDateString();
              scope.activeDateMin = formatted_date_string;

              date_string = scope.active_show_page[scope.active_show_page.length-1].date; 

              var yr1   = parseInt(date_string.substring(0,4));
              var mon1  = parseInt(date_string.substring(5,7));
              var dt1   = parseInt(date_string.substring(8,10));
              var date1 = new Date(yr1, mon1-1, dt1);

              // console.log(date1);

              formatted_date_string = date1.toDateString();
              scope.activeDateMax = formatted_date_string;


            }

            scope.venue_nav_visible = venue_nav_visible;
            
            if(new_venue){
              scope.showNewVenue();
            }

        });



      });





    function processContentWIndow(){

    }



    function render_venue_list(venue_data){

        temp_array = {};
        for(index in venue_data){
            venue = venue_data[index];
            key =  'venue-'+venue.nid;

            temp_array[venue.nid] = venue;
        }

        


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
    before: function(e) { 
        console.log('out: ' + e.in.slidr); 

        venue_nav_visible = e.in.slidr;

      },
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

   venue_nav_array = ['one', 'two', 'one'];
    venue_nav_slider.add('h', venue_nav_array );
    venue_nav_slider.start();   

    $('.venue-show-page-next, .venue-pager .next-page').on('click', function(){
       date_nav_slider.slide('right'); 
     });

    $('.venue-show-page-previous, .venue-pager .previous-page').on('click', function(){
       date_nav_slider.slide('left'); 
     });  

    // Temp location for this
          // $(document).on('click', ".next-page", function(){
          //   console.log('new next page click');
          //   var scope = angular.element($("#amgRemoteAppContainer")).scope();

          //   scope.$apply(function(){
          //       console.log('scope apply');
          //   });


          //     socket.emit('page-next', 'page-next');
          // });


    socket.on('active slide', function(msg){
        console.log('active slide received: ' + msg);

        var scope = angular.element($("#amgRemoteAppContainer")).scope();

        scope.$apply(function(){
            console.log('scope apply');
          scope.setActiveMode(msg);

        });

        // console.log($scope);
        // active_slide = msg;
        // // $('#remote-content-window').append($('<li>').text(msg));
        // $(".action-buttons").slideUp('fast');
        // if(active_slide == 'show'){
        //    $(".venue-action-buttons").slideDown('fast');

        // }
        // else if(active_slide == 'venue'){
        //  $(".show-action-buttons").slideDown('fast');          
        // }

        
        


      });


$(".cancel").on('click', function(){
  $(".neighborhood-picker").slideUp('fast');
  $("body").removeClass('overlay-visible');
});


// ANGULAR
var amgioskRemoteApp = angular.module('amgioskRemote', []);

amgioskRemoteApp.controller('amgioskRemoteController', ['$scope', function($scope) {
    $scope.active_venue = false;
    $scope.active_show = false;
    $scope.active_show_page_number = 0;
    $scope.active_mode = false;
    $scope.venue_nav_direction = 'right';
    $scope.venue_nav_visible = 'one';

    $scope.active_show_page = false;

    $scope.venue_array = temp_array;

    $scope.socket = socket;

    $scope.activeDateMin = '231';
    $scope.activeDateMax = '456';

    $scope.getShowImageSrc = function(showImage){
        return $(showImage).attr('src');
    }

    $scope.getClass = function(ind){
      // console.log('get class');

        if( ind === $scope.selectedIndex ){
            return "selected";
        } else{
            return "test";
        }
    }

    $scope.getActiveVenueList = function(){
        new_array = [];
        for(index in $scope.venue_array){
            venue2= $scope.venue_array[index];
            // console.log(venue2);
           // if(typeof venue.shows != 'undefined' && venue.shows.length){
                new_array.push(venue2);
            // }
        }
        return new_array;
    }

    $scope.showNewVenue = function() {
        // $scope.active_show_page_number = 0;

        pop = "one"
        if(venue_nav_visible == 'one'){
          pop = "two";
        }

        $('.remote-venue-item[data-slidr="'+ pop + '"] img').replaceWith($($scope.active_venue.image).attr('width', '100').removeAttr('height'));
        $('.remote-venue-item[data-slidr="'+ pop + '"] h4').html($scope.active_venue.node_title);
        venue_nav_slider.slide($scope.venue_nav_direction); 
    }

    $scope.venueListClick = function(item){
        $scope.active_venue = item;
                  console.log('neighborhood-list click');

          socket.emit('neighborhood select', item.nid);

          $(".neighborhood-picker").slideUp('fast');
          $("body").removeClass('overlay-visible');
    }

    $scope.setActiveMode = function(new_mode){
      if($scope.active_mode != new_mode){
        mode_changed = true;
      }

      $scope.active_mode = new_mode;

      console.log('mode changed');

      if(mode_changed){
            //     $(".control-group").slideUp('fast');
            // $(".control-group-"+$scope.active_mode).slideDown('fast');



        mode_changed = false;
      }
    }

    $scope.processVenueShowPageClick = function(next){
      if(next){
        // $scope.active_show_page_number++;
              socket.emit('venue show next', 'venue show next');

      }
      else{
        // $scope.active_show_page_number--;
          socket.emit('venue show previous', 'venue show previous');

      }

      console.log('Active page number: ' + $scope.active_show_page_number);


    }

    $scope.getVenueShowPageNextClass = function(){
      // console.log('get next class');

      if(! $scope.active_venue){
        return "good";
      }

      // console.log($scope.active_venue.shows);
      // console.log($scope.active_show_page_number+1);
      // console.log(typeof $scope.active_venue.shows[$scope.active_show_page_number+1]);

      if(typeof $scope.active_venue.shows[$scope.active_show_page_number+1] != 'undefined'){
        return "good-1";
      }
      else{
        return "bad";
      }
    }

    $scope.getVenueShowPageBackClass = function(){
      // console.log('get back class');

      if(! $scope.active_venue){
        return "bad";
      }


      if($scope.active_show_page_number > 0){
        return "good-1";
      }
      else{
        return "bad";
      }
    }

    $scope.sendMessage = function(message){
      console.log('sending message: ' + message);
      socket.emit(message, message);
    }

    $scope.showDetail = function(show){
      console.log('show detail: ', show);


      // socket.emit(message, message);
    }



}]);

    
