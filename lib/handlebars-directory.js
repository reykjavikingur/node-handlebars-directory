let assert = require('assert');
let Promise = require('promise');
let Handlebars = require('handlebars');
let FileTree = require('web-template-file-tree');

function HandlebarsDirectory(path, extension, options) {
	assert(Boolean(path), 'missing required argument for directory path');
	assert(Boolean(extension), 'missing required argument for file extension');
	if (!options) {
		options = {};
	}
	let handlebars = options['handlebars'] || Handlebars;
	let loadDirectory = HandlebarsDirectoryLoader(path, extension, handlebars);

	return (filePath, data) => {
		return loadDirectory()
			.then((handlebars) => {
				return handlebars.compile('{{>' + filePath + '}}')(data);
			});
	};
}

function HandlebarsDirectoryLoader(path, extension, handlebars) {
	assert(Boolean(handlebars), 'missing required argument for handlebars');
	let loaded = false;
	let loadFileTree = FileTreeLoader(path, extension);
	return () => {
		if (loaded) {
			return Promise.resolve(handlebars);
		}
		else {
			return loadFileTree()
				.then((fileTree) => {
					registerFileTree(handlebars, fileTree);
					return handlebars;
				})
				;
		}
	};
}

function FileTreeLoader(path, extension) {
	let fileTree = new FileTree(path, {extension: extension});
	let fileTreeLoaded = false;
	return () => {
		return new Promise((resolve, reject) => {
			if (fileTreeLoaded) {
				resolve(fileTree);
			}
			else {
				fileTree.load((err) => {
					if (err) {
						reject(err);
					}
					else {
						resolve(fileTree);
					}
				});
			}
		});
	};
}

function registerFileTree(handlebars, fileTree) {
	for (let path in fileTree.cache) {
		handlebars.registerPartial(path, fileTree.cache[path]);
	}
}

module.exports = HandlebarsDirectory;
