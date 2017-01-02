let HandlebarsDirectory = require('../');

let renderView = HandlebarsDirectory(__dirname + '/views', 'txt');

renderView('main', {
	name: 'Dude'
})
	.then((r) => {
		console.log(r);
	}, (e) => {
		console.error('unable to render view', e.message);
	})
;
