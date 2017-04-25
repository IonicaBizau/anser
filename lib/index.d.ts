interface JsonEntry {
    content: string;
    fg: string;
    bg: string;
    fg_truecolor: string;
    bg_truecolor: string;
    clearLine: boolean;
    was_processed: boolean;
    isEmpty(): boolean;
}

export = Anser
declare class Anser {


    ansiToHtml(txt: any, options: any): any;

    ansiToJson(txt: any, options: any): any;

    ansiToText(txt: any): any;

    escapeForHtml(txt: any): any;

    linkify(txt: any): any;

    process(txt: any, options: any, markup: any): any;

    processChunk(text: any, options: any, markup: any): any;

    processChunkJson(text: any, options: any, markup: any): any;

    setupPalette(): any;

    static ansiToHtml(txt: any, options: any): any;

    static ansiToJson(txt: any, options: any): JsonEntry[];

    static ansiToText(txt: any): any;

    static escapeForHtml(txt: any): any;

    static linkify(txt: any): any;
}
