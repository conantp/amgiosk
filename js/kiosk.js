
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
