"use strict";

// This file was originally written by @drudru (https://github.com/drudru/ansi_up), MIT, 2011

const ANSI_COLORS = [
    [
        { color: "0, 0, 0",        "class": "ansi-black"   }
      , { color: "187, 0, 0",      "class": "ansi-red"     }
      , { color: "0, 187, 0",      "class": "ansi-green"   }
      , { color: "187, 187, 0",    "class": "ansi-yellow"  }
      , { color: "0, 0, 187",      "class": "ansi-blue"    }
      , { color: "187, 0, 187",    "class": "ansi-magenta" }
      , { color: "0, 187, 187",    "class": "ansi-cyan"    }
      , { color: "255,255,255",    "class": "ansi-white"   }
    ]
  , [
        { color: "85, 85, 85",     "class": "ansi-bright-black"   }
      , { color: "255, 85, 85",    "class": "ansi-bright-red"     }
      , { color: "0, 255, 0",      "class": "ansi-bright-green"   }
      , { color: "255, 255, 85",   "class": "ansi-bright-yellow"  }
      , { color: "85, 85, 255",    "class": "ansi-bright-blue"    }
      , { color: "255, 85, 255",   "class": "ansi-bright-magenta" }
      , { color: "85, 255, 255",   "class": "ansi-bright-cyan"    }
      , { color: "255, 255, 255",  "class": "ansi-bright-white"   }
    ]
];

class Anser {

    /**
     * Anser.escapeForHtml
     * Escape the input HTML.
     *
     * This does the minimum escaping of text to make it compliant with HTML.
     * In particular, the '&','<', and '>' characters are escaped. This should
     * be run prior to `ansiToHtml`.
     *
     * @name Anser.escapeForHtml
     * @function
     * @param {String} txt The input text (containing the ANSI snippets).
     * @returns {String} The escaped html.
     */
    static escapeForHtml (txt) {
        return new Anser().escapeForHtml(txt);
    }

    /**
     * Anser.linkify
     * Adds the links in the HTML.
     *
     * This replaces any links in the text with anchor tags that display the
     * link. The links should have at least one whitespace character
     * surrounding it. Also, you should apply this after you have run
     * `ansiToHtml` on the text.
     *
     * @name Anser.linkify
     * @function
     * @param {String} txt The input text.
     * @returns {String} The HTML containing the <a> tags (unescaped).
     */
    static linkify (txt) {
        return new Anser().linkify(txt);
    }

    /**
     * Anser.ansiToHtml
     * This replaces ANSI terminal escape codes with SPAN tags that wrap the
     * content.
     *
     * This function only interprets ANSI SGR (Select Graphic Rendition) codes
     * that can be represented in HTML.
     * For example, cursor movement codes are ignored and hidden from output.
     * The default style uses colors that are very close to the prescribed
     * standard. The standard assumes that the text will have a black
     * background. These colors are set as inline styles on the SPAN tags.
     *
     * Another option is to set `use_classes: true` in the options argument.
     * This will instead set classes on the spans so the colors can be set via
     * CSS. The class names used are of the format `ansi-*-fg/bg` and
     * `ansi-bright-*-fg/bg` where `*` is the color name,
     * i.e black/red/green/yellow/blue/magenta/cyan/white.
     *
     * @name Anser.ansiToHtml
     * @function
     * @param {String} txt The input text.
     * @param {Object} options The options passed to the ansiToHTML method.
     * @returns {String} The HTML output.
     */
    static ansiToHtml (txt, options) {
        return new Anser().ansiToHtml(txt, options);
    }

    /**
     * Anser.ansiToJson
     * Converts ANSI input into JSON output.
     *
     * @name Anser.ansiToJson
     * @function
     * @param {String} txt The input text.
     * @param {Object} options The options passed to the ansiToHTML method.
     * @returns {String} The HTML output.
     */
    static ansiToJson (txt, options) {
        return new Anser().ansiToJson(txt, options);
    }

    /**
     * Anser.ansiToText
     * Converts ANSI input into text output.
     *
     * @name Anser.ansiToText
     * @function
     * @param {String} txt The input text.
     * @returns {String} The text output.
     */
    static ansiToText (txt) {
        return new Anser().ansiToText(txt);
    }

    /**
     * Anser
     * The `Anser` class.
     *
     * @name Anser
     * @function
     * @returns {Anser}
     */
    constructor () {
        this.fg = this.bg = this.fg_truecolor = this.bg_truecolor = null;
        this.isInverted = false;
        this.decorations = [];
    }

    /**
     * setupPalette
     * Sets up the palette.
     *
     * @name setupPalette
     * @function
     */
    setupPalette () {
        this.PALETTE_COLORS = [];

        // Index 0..15 : System color
        for (let i = 0; i < 2; ++i) {
            for (let j = 0; j < 8; ++j) {
                this.PALETTE_COLORS.push(ANSI_COLORS[i][j].color);
            }
        }

        // Index 16..231 : RGB 6x6x6
        // https://gist.github.com/jasonm23/2868981#file-xterm-256color-yaml
        let levels = [0, 95, 135, 175, 215, 255];
        let format = (r, g, b) => levels[r] + ", " + levels[g] + ", " + levels[b];
        let r, g, b;
        for (let r = 0; r < 6; ++r) {
            for (let g = 0; g < 6; ++g) {
                for (let b = 0; b < 6; ++b) {
                    this.PALETTE_COLORS.push(format(r, g, b));
                }
            }
        }

        // Index 232..255 : Grayscale
        let level = 8;
        for (let i = 0; i < 24; ++i, level += 10) {
            this.PALETTE_COLORS.push(format(level, level, level));
        }
    }

    /**
     * escapeForHtml
     * Escapes the input text.
     *
     * @name escapeForHtml
     * @function
     * @param {String} txt The input text.
     * @returns {String} The escpaed HTML output.
     */
    escapeForHtml (txt) {
        return txt.replace(/[&<>]/gm, str =>
            str == "&" ? "&amp;" :
            str == "<" ? "&lt;" :
            str == ">" ? "&gt;" : ""
        );
    }

    /**
     * linkify
     * Adds HTML link elements.
     *
     * @name linkify
     * @function
     * @param {String} txt The input text.
     * @returns {String} The HTML output containing link elements.
     */
    linkify (txt) {
        return txt.replace(/(https?:\/\/[^\s]+)/gm, str => `<a href="${str}">${str}</a>`);
    }

    /**
     * ansiToHtml
     * Converts ANSI input into HTML output.
     *
     * @name ansiToHtml
     * @function
     * @param {String} txt The input text.
     * @param {Object} options The options passed ot the `process` method.
     * @returns {String} The HTML output.
     */
    ansiToHtml (txt, options) {
        return this.process(txt, options, true);
    }

    /**
     * ansiToJson
     * Converts ANSI input into HTML output.
     *
     * @name ansiToJson
     * @function
     * @param {String} txt The input text.
     * @param {Object} options The options passed ot the `process` method.
     * @returns {String} The JSON output.
     */
    ansiToJson (txt, options) {
        options = options || {};
        options.json = true;
        options.clearLine = false;
        return this.process(txt, options, true);
    }

    /**
     * ansiToText
     * Converts ANSI input into HTML output.
     *
     * @name ansiToText
     * @function
     * @param {String} txt The input text.
     * @returns {String} The text output.
     */
    ansiToText (txt) {
        return this.process(txt, {}, false);
    }

    /**
     * process
     * Processes the input.
     *
     * @name process
     * @function
     * @param {String} txt The input text.
     * @param {Object} options An object passed to `processChunk` method, extended with:
     *
     *  - `json` (Boolean): If `true`, the result will be an object.
     *  - `use_classes` (Boolean): If `true`, HTML classes will be appended to the HTML output.
     *
     * @param {Boolean} markup
     */
    process (txt, options, markup) {
        if (options === undefined || options === null) {
            options = {};
        }
        options.clearLine = /\r/.test(txt); // check for Carriage Return

        if (!options.continue) {
            this.fg = this.bg = this.fg_truecolor = this.bg_truecolor = null;
            this.decorations = [];
            this.isInverted = false;
        }

        let raw_text_chunks = txt.split(/\033\[/);
        let chunks = raw_text_chunks.map((chunk, i) => this.processChunk(chunk, options, markup, i === 0))

        if (options && options.json) {
            if (options.remove_empty) {
                chunks = chunks.filter(c => !c.isEmpty());
            }
            return chunks;
        }

        return chunks.join("");
    }

    /**
     * processChunkJson
     * Processes the current chunk into json output.
     *
     * @name processChunkJson
     * @function
     * @param {String} text The input text.
     * @param {Object} options An object containing the following fields:
     *
     *  - `json` (Boolean): If `true`, the result will be an object.
     *  - `use_classes` (Boolean): If `true`, HTML classes will be appended to the HTML output.
     *
     * @param {Boolean} markup If false, the colors will not be parsed.
     * @param {Boolean} no_ansi Set to true if string doesn't start with ANSI coide
     * @return {Object} The result object:
     *
     *  - `content` (String): The text.
     *  - `fg` (String|null): The foreground color.
     *  - `bg` (String|null): The background color.
     *  - `fg_truecolor` (String|null): The foreground true color (if 16m color is enabled).
     *  - `bg_truecolor` (String|null): The background true color (if 16m color is enabled).
     *  - `clearLine` (Boolean): `true` if a carriageReturn \r was fount at end of line.
     *  - `was_processed` (Bolean): `true` if the colors were processed, `false` otherwise.
     *  - `isEmpty` (Function): A function returning `true` if the content is empty, or `false` otherwise.
     *
     */
    processChunkJson (text, options, markup, no_ansi) {

        // Are we using classes or styles?
        options = typeof options == "undefined" ? {} : options;
        let use_classes = options.use_classes = typeof options.use_classes != "undefined" && options.use_classes;
        let key = options.key = use_classes ? "class" : "color";

        let result = {
            content: text
          , fg: null
          , bg: null
          , fg_truecolor: null
          , bg_truecolor: null
          , isInverted: false
          , clearLine: options.clearLine
          , decoration: null
          , decorations: []
          , was_processed: false
          , isEmpty: () => !result.content
        };

        let orig_txt = result.content = text;
        let nums = [];

        if (!no_ansi) {
            // Each "chunk" is the text after the CSI (ESC + "[") and before the next CSI/EOF.
            //
            // This regex matches four groups within a chunk.
            //
            // The first and third groups match code type.
            // We supported only SGR command. It has empty first group and "m" in third.
            //
            // The second group matches all of the number+semicolon command sequences
            // before the "m" (or other trailing) character.
            // These are the graphics or SGR commands.
            //
            // The last group is the text (including newlines) that is colored by
            // the other group"s commands.
            let matches = text.match(/^([!\x3c-\x3f]*)([\d;]*)([\x20-\x2c]*[\x40-\x7e])([\s\S]*)/m);

            if (!matches) return result;

            orig_txt = result.content = matches[4];
            nums = matches[2].split(";");

            // We currently support only "SGR" (Select Graphic Rendition)
            // Simply ignore if not a SGR command.
            if (matches[1] !== "" || matches[3] !== "m") {
                return result;
            }
        }

        if (!markup) {
            return result;
        }

        while (nums.length > 0) {
            let num_str = nums.shift();
            let num = parseInt(num_str);

            if (isNaN(num) || num === 0) {
                this.fg = this.bg = this.fg_truecolor = this.bg_truecolor = null;
                this.decorations = [];
                this.isInverted = false;
            } else if (num === 1) {
                this.decorations.push("bold");
            } else if (num === 2) {
                this.decorations.push("dim");
            } else if (num == 3) {
                this.decorations.push("italic");
            } else if (num == 4) {
                this.decorations.push("underline");
            } else if (num == 5) {
                this.decorations.push("blink");
            } else if (num === 7) {
                this.isInverted = true;
            } else if (num === 8) {
                this.decorations.push("hidden");
            } else if (num === 9) {
                this.decorations.push("strikethrough");
            } else if (num == 39) {
                this.fg = null;
            } else if (num == 49) {
                this.bg = null;
            // Foreground color
            } else if ((num >= 30) && (num < 38)) {
                this.fg = ANSI_COLORS[0][(num % 10)][key];
            // Foreground bright color
            } else if ((num >= 90) && (num < 98)) {
                this.fg = ANSI_COLORS[1][(num % 10)][key];
            // Background color
            } else if ((num >= 40) && (num < 48)) {
                this.bg = ANSI_COLORS[0][(num % 10)][key];
            // Background bright color
            } else if ((num >= 100) && (num < 108)) {
                this.bg = ANSI_COLORS[1][(num % 10)][key];
            } else if (num === 38 || num === 48) { // extend color (38=fg, 48=bg)
                let is_foreground = (num === 38);
                if (nums.length >= 1) {
                    let mode = nums.shift();
                    if (mode === "5" && nums.length >= 1) { // palette color
                        let palette_index = parseInt(nums.shift());
                        if (palette_index >= 0 && palette_index <= 255) {
                            if (!use_classes) {
                                if (!this.PALETTE_COLORS) {
                                    this.setupPalette();
                                }
                                if (is_foreground) {
                                    this.fg = this.PALETTE_COLORS[palette_index];
                                } else {
                                    this.bg = this.PALETTE_COLORS[palette_index];
                                }
                            } else {
                                let klass = (palette_index >= 16)
                                    ? ("ansi-palette-" + palette_index)
                                    : ANSI_COLORS[palette_index > 7 ? 1 : 0][palette_index % 8]["class"];
                                    if (is_foreground) {
                                        this.fg = klass;
                                    } else {
                                        this.bg = klass;
                                    }
                            }
                        }
                    } else if(mode === "2" && nums.length >= 3) { // true color
                        let r = parseInt(nums.shift());
                        let g = parseInt(nums.shift());
                        let b = parseInt(nums.shift());
                        if ((r >= 0 && r <= 255) && (g >= 0 && g <= 255) && (b >= 0 && b <= 255)) {
                            let color = r + ", " + g + ", " + b;
                            if (!use_classes) {
                                if (is_foreground) {
                                    this.fg = color;
                                } else {
                                    this.bg = color;
                                }
                            } else {
                                if (is_foreground) {
                                    this.fg = "ansi-truecolor";
                                    this.fg_truecolor = color;
                                } else {
                                    this.bg = "ansi-truecolor";
                                    this.bg_truecolor = color;
                                }
                            }
                        }
                    }
                }
            }
        }

        if (this.fg !== null
            || this.bg !== null
            || this.decorations.length
            || this.fg_truecolor !== null
            || this.bg_truecolor !== null
            || this.isInverted
        ) {
            result.was_processed = true;
        }

        result.fg = this.fg;
        result.bg = this.bg;
        result.fg_truecolor = this.fg_truecolor;
        result.bg_truecolor = this.bg_truecolor;
        result.decorations = [ ... this.decorations ];
        result.decoration = result.decorations.slice(-1).pop() || null;
        result.isInverted = this.isInverted;
        return result;
    }

    /**
     * processChunk
     * Processes the current chunk of text.
     *
     * @name processChunk
     * @function
     * @param {String} text The input text.
     * @param {Object} options An object containing the following fields:
     *
     *  - `json` (Boolean): If `true`, the result will be an object.
     *  - `use_classes` (Boolean): If `true`, HTML classes will be appended to the HTML output.
     *
     * @param {Boolean} markup If false, the colors will not be parsed.
     * @param {Boolean} no_ansi Set to true if string doesn't start with ANSI coide
     * @return {Object|String} The result (object if `json` is wanted back or string otherwise).
     */
    processChunk (text, options, markup, no_ansi) {
        options = options || {};
        let jsonChunk = this.processChunkJson(text, options, markup, no_ansi);
        let use_classes = options.use_classes;

        // "reverse" decoration reverses foreground and background colors
        if (jsonChunk.isInverted) {
            // when reversing, missing colors are defaulted to black (bg) and white (fg)
            if (!jsonChunk.fg) {
                jsonChunk.fg = ANSI_COLORS[0][7][use_classes ? "class" : "color"];
            }
            if (!jsonChunk.bg) {
                jsonChunk.bg = ANSI_COLORS[0][0][use_classes ? "class" : "color"];
            }
            let tmpFg = jsonChunk.fg;
            jsonChunk.fg = jsonChunk.bg;
            jsonChunk.bg = tmpFg;
            let tmpFgTrue = jsonChunk.fg_truecolor;
            jsonChunk.fg_truecolor = jsonChunk.bg_truecolor;
            jsonChunk.bg_truecolor = tmpFgTrue;
        }

        if (options.json) { return jsonChunk; }
        if (jsonChunk.isEmpty()) { return ""; }
        if (!jsonChunk.was_processed) { return jsonChunk.content; }

        let colors = [];
        let decorations = [];
        let textDecorations = [];
        let data = {};

        let render_data = data => {
            let fragments = [];
            let key;
            for (key in data) {
                if (data.hasOwnProperty(key)) {
                    fragments.push("data-" + key + "=\"" + this.escapeForHtml(data[key]) + "\"");
                }
            }
            return fragments.length > 0 ? " " + fragments.join(" ") : "";
        };

        if (jsonChunk.isInverted) {
          data["ansi-is-inverted"] = "true";
        }

        if (jsonChunk.fg) {
            if (use_classes) {
                colors.push(jsonChunk.fg + "-fg");
                if (jsonChunk.fg_truecolor !== null) {
                    data["ansi-truecolor-fg"] = jsonChunk.fg_truecolor;
                    jsonChunk.fg_truecolor = null;
                }
            } else {
                colors.push("color:rgb(" + jsonChunk.fg + ")");
            }
        }

        if (jsonChunk.bg) {
            if (use_classes) {
                colors.push(jsonChunk.bg + "-bg");
                if (jsonChunk.bg_truecolor !== null) {
                    data["ansi-truecolor-bg"] = jsonChunk.bg_truecolor;
                    jsonChunk.bg_truecolor = null;
                }
            } else {
              colors.push("background-color:rgb(" + jsonChunk.bg + ")");
            }
        }

        jsonChunk.decorations.forEach((decoration) => {
            // use classes
            if (use_classes) {
                decorations.push("ansi-" + decoration);
                return;
            }
            // use styles            
            if (decoration === "bold") {
                decorations.push("font-weight:bold");
            } else if (decoration === "dim") {
                decorations.push("opacity:0.5");
            } else if (decoration === "italic") {
                decorations.push("font-style:italic");
            } else if (decoration === "hidden") {
                decorations.push("visibility:hidden");
            } else if (decoration === "strikethrough") {
                textDecorations.push("line-through");
            } else {
                // underline and blink are treated here
                textDecorations.push(decoration);
            }
        });

        if (textDecorations.length) {
            decorations.push("text-decoration:" + textDecorations.join(" "));
        }

        if (use_classes) {
            return "<span class=\"" + colors.concat(decorations).join(" ") + "\"" + render_data(data) + ">" + jsonChunk.content + "</span>";
        } else {
            return "<span style=\"" + colors.concat(decorations).join(";") + "\"" + render_data(data) + ">" + jsonChunk.content + "</span>";
        }
    }
};

module.exports = Anser;
