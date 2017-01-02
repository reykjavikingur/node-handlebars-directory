# handlebars-directory

Handlebars asynchronous file system compiler and rendering engine with simple interface

## Example

```
var HandlebarsDirectory = require('handlebars-directory');

var renderView = HandlebarsDirectory('views', 'hb');

renderView('main', { title: 'Demo' })
.then(function(output) {
    console.log(output);
});
```

The above code will render the Handlebars template file `views/main.hb` and output the result.

## Usage

### `renderView = HandlebarsDirectory(path, extension, options)`

The function takes a directory path, a file extension, and options,
and it returns a "rendering" function.

### `options`

* `handlebars` (in case you want to override the default Handlebars engine)

### `renderView(filePath, data).then(`...`)`

The rendering function takes a file path and a data object, and it returns a promise,
which resolves to the rendered string, if possible.

## Automatic Registration of Partials

Before a view is rendered, the rendering function recursively scans the directory for files with the given extension
and registers them as partials using the relative file path, so they are available for all templates to include.

For example, given these file paths and contents:

*views/comp.hb*
```
You are here
```

*views/main.hb*
```
Welcome
{{>comp}}
```

Then, the result of rendering "main" would be:
```
Welcome
You are here
```

## Partials can be at any directory level

So if you have these file paths and contents:

*views/lib/widgets/component.hb*
```
Specialized chunk
```

*views/main.hb*
```
Welcome
{{>lib/widgets/component}}
```

Then, it would work as you expect:
```
Welcome
Specialized chunk
```

## Don't forget about block partials

Consider the following file paths and contents:

*views/layout.hb*
```
Header
{{>@partial-block}}
Footer
```

*views/main.hb*
```
{{#>layout}}
Welcome
{{/layout}}
```

Then the result of rendering "main" would be:
```
Header
Welcome
Footer
```

## Even block partials can be at any directory level

Though it may seem odd, the syntax allows for full paths to block partials as well, if that's how you want to organize things:

*views/brand/layouts/main-wrapper.hb*
```
<div class="main-wrapper">
{{>@partial-block}}
</div>
```

*views/main.hb*
```
{{#>brand/layouts/main-wrapper}}
Welcome
{{/brand/layouts/main-wrapper}}
```

Result of rendering "main" would be:
```
<div class="main-wrapper">
Welcome
</div>
```
