let HandlebarsDirectory = require('../lib/handlebars-directory');
let should = require('should');

describe('HandlebarsDirectory', ()=> {

	it('should be a function', ()=> {
		should(HandlebarsDirectory).be.a.Function();
	});

	it('should be equivalent to entrypoint', ()=> {
		let entrypoint = require('../');
		should(entrypoint).equal(HandlebarsDirectory);
	});

	it('should throw error when given no path argument', ()=> {
		should(()=>HandlebarsDirectory()).throw();
	});

	it('should throw error when given no extension argument', ()=> {
		should(()=>HandlebarsDirectory('path')).throw();
	});

	describe('return value', ()=> {
		var result;
		beforeEach(()=> {
			result = HandlebarsDirectory('path', 'html');
		});
		it('should be a function', ()=> {
			should(result).be.a.Function();
		});
	});

});
