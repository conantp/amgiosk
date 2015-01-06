
slidr.create('slidr-id', 
		{
		  after: function(e) { console.log('in: ' + e.in.slidr); },
		  before: function(e) { console.log('out: ' + e.out.slidr); },
		  breadcrumbs: true,
		  controls: 'corner',
		  direction: 'horizontal',
		  fade: false,
		  keyboard: true,
		  overflow: true,
		  theme: '#222',
		  // timing: { 'cube': '0.5s ease-in' },
		  touch: true,
		  transition: 'cube'
		}


	).start();

var s1 = slidr.create('slidr-ul', {
  after: function(e) { console.log('in: ' + e.in.slidr); },
  before: function(e) { console.log('out: ' + e.out.slidr); },
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
}).start();

// Add horizontal slides with default linear transition.
// The extra "one" allows the slidr to circle back and loop infinitely.
s1.add('h', ['one', 'two', 'three', 'one']);

var s2 = slidr.create('slidr-img', {
  after: function(e) { console.log('in: ' + e.in.slidr); },
  before: function(e) { console.log('out: ' + e.out.slidr); },
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
}).start();

s2.add('h', ['one', 'two', 'three', 'one']);

var s3 = slidr.create('slidr-div', {
  after: function(e) { console.log('in: ' + e.in.slidr); },
  before: function(e) { console.log('out: ' + e.out.slidr); },
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
}).start();

s3.add('h', ['one', 'two', 'three', 'one']);

$('.slide-left').click(function(){
	s1.slide('right');
	s2.slide('left');
	s3.slide('right');
});




