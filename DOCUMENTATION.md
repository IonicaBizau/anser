## Documentation

You can see below the API reference of this module.

Add several widely used style codes

### `processChunk(text, options, markup)`
Processes the current chunk of text.

#### Params

- **String** `text`: The input text.
- **Object** `options`: An object containing the following fields:
 - `json` (Boolean): If `true`, the result will be an object.
 - `use_classes` (Boolean): If `true`, HTML classes will be appended to the HTML output.
- **Boolean** `markup`: If false, the colors will not be parsed.

#### Return
- **Object|String** The result (object if `json` is wanted back or string otherwise).

