// Type definitions for Anser
// Project: https://github.com/IonicaBizau/anser

export interface AnserJsonEntry {
  content: string;
  fg: string;
  bg: string;
  fg_truecolor: string;
  bg_truecolor: string;
  clearLine: boolean;
  decoration: null | 'bold' | 'dim' | 'italic' | 'underline' | 'blink' | 'reverse' | 'hidden' | 'strikethrough';
  was_processed: boolean;
  isEmpty(): boolean;
}

export interface AnserOptions {
  json?: boolean;
  use_classes?: boolean;
  remove_empty?: boolean;
}

export function ansiToJson(txt: string, options?: AnserOptions): AnserJsonEntry[];

export function ansiToHtml(txt: string, options?: AnserOptions): string;

export function ansiToText(txt: string, options?: AnserOptions): string;

export function escapeForHtml(txt: string): string;

export function linkify(txt: string): string;
