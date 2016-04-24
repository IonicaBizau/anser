"use strict";

const Anser = require("../lib");

let txt  = "\u001b[38;5;196mHello\u001b[39m \u001b[48;5;226mWorld\u001b[49m";

console.log(Anser.ansiToHtml(txt));
// <span style="color:rgb(255, 0, 0)">Hello</span> <span style="background-color:rgb(255, 255, 0)">World</span>

console.log(Anser.ansiToHtml(txt, { use_classes: true }));
// <span class="ansi-palette-196-fg">Hello</span> <span class="ansi-palette-226-bg">World</span>

console.log(Anser.ansiToJson(txt));
// [ { content: '',
//     fg: null,
//     bg: null,
//     fg_truecolor: null,
//     bg_truecolor: null,
//     was_processed: false,
//     isEmpty: [Function] },
//   { content: 'Hello',
//     fg: '255, 0, 0',
//     bg: null,
//     fg_truecolor: null,
//     bg_truecolor: null,
//     was_processed: true,
//     isEmpty: [Function] },
//   { content: ' ',
//     fg: null,
//     bg: null,
//     fg_truecolor: null,
//     bg_truecolor: null,
//     was_processed: false,
//     isEmpty: [Function] },
//   { content: 'World',
//     fg: null,
//     bg: '255, 255, 0',
//     fg_truecolor: null,
//     bg_truecolor: null,
//     was_processed: true,
//     isEmpty: [Function] },
//   { content: '',
//     fg: null,
//     bg: null,
//     fg_truecolor: null,
//     bg_truecolor: null,
//     was_processed: false,
//     isEmpty: [Function] } ]
