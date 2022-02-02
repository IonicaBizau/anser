## Documentation

You can see below the API reference of this module.

### `Anser.escapeForHtml(txt)`
Escape the input HTML.

This does the minimum escaping of text to make it compliant with HTML.
In particular, the '&','<', and '>' characters are escaped. This should
be run prior to `ansiToHtml`.

#### Params

- **String** `txt`: The input text (containing the ANSI snippets).

#### Return
- **String** The escaped html.

### `Anser.linkify(txt)`
Adds the links in the HTML.

This replaces any links in the text with anchor tags that display the
link. The links should have at least one whitespace character
surrounding it. Also, you should apply this after you have run
`ansiToHtml` on the text.

#### Params

- **String** `txt`: The input text.

#### Return
- **String** The HTML containing the <a> tags (unescaped).

### `Anser.ansiToHtml(txt, options)`
This replaces ANSI terminal escape codes with SPAN tags that wrap the
content.

This function only interprets ANSI SGR (Select Graphic Rendition) codes
that can be represented in HTML.
For example, cursor movement codes are ignored and hidden from output.
The default style uses colors that are very close to the prescribed
standard. The standard assumes that the text will have a black
background. These colors are set as inline styles on the SPAN tags.

Another option is to set `use_classes: true` in the options argument.
This will instead set classes on the spans so the colors can be set via
CSS. The class names used are of the format `ansi-*-fg/bg` and
`ansi-bright-*-fg/bg` where `*` is the color name,
i.e black/red/green/yellow/blue/magenta/cyan/white.

#### Params

- **String** `txt`: The input text.
- **Object** `options`: The options passed to the ansiToHTML method.

#### Return
- **String** The HTML output.

### `Anser.ansiToJson(txt, options)`
Converts ANSI input into JSON output.

#### Params

- **String** `txt`: The input text.
- **Object** `options`: The options passed to the ansiToHTML method.

#### Return
- **String** The HTML output.

### `Anser.ansiToText(txt)`
Converts ANSI input into text output.

#### Params

- **String** `txt`: The input text.

#### Return
- **String** The text output.

### `Anser()`
The `Anser` class.

#### Return
- **Anser**

### `setupPalette()`
Sets up the palette.

### `escapeForHtml(txt)`
Escapes the input text.

#### Params

- **String** `txt`: The input text.

#### Return
- **String** The escpaed HTML output.

