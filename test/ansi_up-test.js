// This file was originally written by @drudru (https://github.com/drudru/Anser), MIT, 2011

const Anser = require("..");
const should = require("should");

describe("Anser", () => {
    describe("escapeForHtml", () => {
        describe("ampersands", () => {
            it("should escape a single ampersand", () => {
                const start = "&";
                const expected = "&amp;";
                const l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });
            it("should escape some text with ampersands", () => {
                const start = "abcd&efgh";
                const expected = "abcd&amp;efgh";
                const l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });
            it("should escape multiple ampersands", () => {
                const start = " & & ";
                const expected = " &amp; &amp; ";
                const l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });
            it("should escape an already escaped ampersand", () => {
                const start = " &amp; ";
                const expected = " &amp;amp; ";
                const l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });
        });

        describe("less-than", () => {
            it("should escape a single less-than", () => {
                const start = "<";
                const expected = "&lt;";
                const l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });

            it("should escape some text with less-thans", () => {
                const start = "abcd<efgh";
                const expected = "abcd&lt;efgh";
                const l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });

            it("should escape multiple less-thans", () => {
                const start = " < < ";
                const expected = " &lt; &lt; ";
                const l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });
        });

        describe("greater-than", () => {
            it("should escape a single greater-than", () => {
                const start = ">";
                const expected = "&gt;";

                const l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });
            it("should escape some text with greater-thans", () => {
                const start = "abcd>efgh";
                const expected = "abcd&gt;efgh";
                const l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });
            it("should escape multiple greater-thans", () => {
                const start = " > > ";
                const expected = " &gt; &gt; ";
                const l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });
        });

        describe("mixed characters", () => {
            it("should escape a mix of characters that require escaping", () => {
                const start = "<&>/\\'\"";
                const expected = "&lt;&amp;&gt;/\\'\"";;
                const l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });
        });
    });

    describe("linkify", () => {
        it("should linkify a url", () => {
            const start = "http://link.to/me";
            const expected = "<a href=\"http://link.to/me\">http://link.to/me</a>";
            const l = Anser.linkify(start);
            l.should.eql(expected);
        });

    });

    describe("ansi to html", () => {
        describe("default colors", () => {
            it("should transform a foreground to html", () => {
                const attr = 0;
                const fg = 32;
                const start = "\x1B[" + fg + "m " + fg + " \x1B[0m";
                const expected = "<span style=\"color:rgb(0, 187, 0)\"> " + fg + " </span>";
                const l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            it("should transform a attr;foreground to html", () => {
                const attr = 0;
                const fg = 32;
                const start = "\x1B[" + attr + ";" + fg + "m " + fg + "  \x1B[0m";
                const expected = "<span style=\"color:rgb(0, 187, 0)\"> " + fg + "  </span>";
                const l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            it("should transform an empty code to a normal/reset html", () => {
                const attr = 0;
                const fg = 32;
                const start = "\x1B[" + attr + ";" + fg + "m " + fg + "  \x1B[m x";
                const expected = "<span style=\"color:rgb(0, 187, 0)\"> " + fg + "  </span> x";
                const l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            it("should transform a bold attr;foreground to html", () => {
                const attr = 1;
                const fg = 32;
                const start = "\x1B[" + attr + ";" + fg + "m " + attr + ";" + fg + " \x1B[0m";
                const expected = "<span style=\"color:rgb(0, 255, 0);text-decoration:bold\"> " + attr + ";" + fg + " </span>";
                const l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            it("should transform a bold-foreground to html", () => {
                const fg = 92;
                const start = "\x1B[" + fg + "m " + fg + " \x1B[0m";
                const expected = "<span style=\"color:rgb(0, 255, 0)\"> " + fg + " </span>";
                const l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            it("should transform a bold attr;background;foreground to html", () => {
                const attr = 1;
                const fg = 33;
                const bg = 42;
                const start = "\x1B[" + attr + ";" + bg + ";" + fg + "m " + attr + ";" + bg + ";" + fg + " \x1B[0m";
                const expected = "<span style=\"color:rgb(255, 255, 85);background-color:rgb(0, 187, 0);text-decoration:bold\"> " + attr + ";" + bg + ";" + fg + " </span>";
                const l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            it("should transform a bold-background;foreground to html", () => {
                const fg = 33;
                const bg = 102;
                const start = "\x1B[" + bg + ";" + fg + "m " + bg + ";" + fg + " \x1B[0m";
                const expected = "<span style=\"color:rgb(187, 187, 0);background-color:rgb(0, 255, 0)\"> " + bg + ";" + fg + " </span>";
                const l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            it("should transform a complex multi-line sequence to html", () => {
                const attr = 1;
                const fg = 32;
                const bg = 42;
                const start = "\n \x1B[" + fg + "m " + fg + "  \x1B[0m \n  \x1B[" + bg + "m " + bg + "  \x1B[0m \n zimpper ";
                const expected = "\n <span style=\"color:rgb(0, 187, 0)\"> " + fg + "  </span> \n  <span style=\"background-color:rgb(0, 187, 0)\"> " + bg + "  </span> \n zimpper ";
                const l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            it("should transform a foreground and background and reset foreground to html", () => {
                const fg = 37;
                const bg = 42;
                const start = "\n\x1B[40m \x1B[49m\x1B[" + fg + ";" + bg + "m " + bg + " \x1B[39m foobar ";
                const expected = "\n<span style=\"background-color:rgb(0, 0, 0)\"> </span><span style=\"color:rgb(255,255,255);background-color:rgb(0, 187, 0)\"> " + bg + " </span><span style=\"background-color:rgb(0, 187, 0)\"> foobar </span>";
                const l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            it("should transform a foreground and background and reset background to html", () => {
                const fg = 37;
                const bg = 42;
                const start = "\n\x1B[40m \x1B[49m\x1B[" + fg + ";" + bg + "m " + fg + " \x1B[49m foobar ";
                const expected = "\n<span style=\"background-color:rgb(0, 0, 0)\"> </span><span style=\"color:rgb(255,255,255);background-color:rgb(0, 187, 0)\"> " + fg + " </span><span style=\"color:rgb(255,255,255)\"> foobar </span>";
                const l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            it("should transform a foreground and background and reset them to html", () => {
                const fg = 37;
                const bg = 42;
                const start = "\n\x1B[40m \x1B[49m\x1B[" + fg + ";" + bg + "m " + fg + ";" + bg + " \x1B[39;49m foobar ";
                const expected = "\n<span style=\"background-color:rgb(0, 0, 0)\"> </span><span style=\"color:rgb(255,255,255);background-color:rgb(0, 187, 0)\"> " + fg + ";" + bg + " </span> foobar ";
                const l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            describe("transform extend colors (palette)", () => {
                it("system color, foreground", () => {
                    const start = "\x1B[38;5;1m" + "red" + "\x1B[0m";
                    const expected = "<span style=\"color:rgb(187, 0, 0)\">red</span>";
                    const l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("system color, foreground (bright)", () => {
                    const start = "\x1B[38;5;9m" + "red" + "\x1B[0m";
                    const expected = "<span style=\"color:rgb(255, 85, 85)\">red</span>";
                    const l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("system color, background", () => {
                    const start = "\x1B[48;5;1m" + "red" + "\x1B[0m";
                    const expected = "<span style=\"background-color:rgb(187, 0, 0)\">red</span>";
                    const l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("system color, background (bright)", () => {
                    const start = "\x1B[48;5;9m" + "red" + "\x1B[0m";
                    const expected = "<span style=\"background-color:rgb(255, 85, 85)\">red</span>";
                    const l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("palette, foreground", () => {
                    const start = "\x1B[38;5;171m" + "foo" + "\x1B[0m";
                    const expected = "<span style=\"color:rgb(215, 95, 255)\">foo</span>";
                    const l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("palette, background", () => {
                    const start = "\x1B[48;5;171m" + "foo" + "\x1B[0m";
                    const expected = "<span style=\"background-color:rgb(215, 95, 255)\">foo</span>";
                    const l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("combination of bold and palette", () => {
                    const start = "\x1B[1;38;5;171m" + "foo" + "\x1B[0m";
                    const expected = "<span style=\"color:rgb(215, 95, 255);text-decoration:bold\">foo</span>";
                    const l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("combination of palette and bold", () => {
                    const start = "\x1B[38;5;171;1m" + "foo" + "\x1B[0m";
                    const expected = "<span style=\"color:rgb(215, 95, 255);text-decoration:bold\">foo</span>";
                    const l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
            });

            describe("transform extend colors (true color)", () => {
                it("foreground", () => {
                    const start = "\x1B[38;2;42;142;242m" + "foo" + "\x1B[0m";
                    const expected = "<span style=\"color:rgb(42, 142, 242)\">foo</span>";
                    const l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("background", () => {
                    const start = "\x1B[48;2;42;142;242m" + "foo" + "\x1B[0m";
                    const expected = "<span style=\"background-color:rgb(42, 142, 242)\">foo</span>";
                    const l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("both foreground and background", () => {
                    const start = "\x1B[38;2;42;142;242;48;2;1;2;3m" + "foo" + "\x1B[0m";
                    const expected = "<span style=\"color:rgb(42, 142, 242);background-color:rgb(1, 2, 3)\">foo</span>";
                    const l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
            });
        });

        describe("themed colors", () => {
            it("should transform a foreground to html", () => {
                const attr = 0;
                const fg = 32;
                const start = "\x1B[" + fg + "m " + fg + " \x1B[0m";
                const expected = "<span class=\"ansi-green-fg\"> " + fg + " </span>";
                const l = Anser.ansiToHtml(start, {use_classes: true});
                l.should.eql(expected);
            });


            it("should transform a attr;foreground to html", () => {
                const attr = 0;
                const fg = 32;
                const start = "\x1B[" + attr + ";" + fg + "m " + fg + "  \x1B[0m";

                const expected = "<span class=\"ansi-green-fg\"> " + fg + "  </span>";

                const l = Anser.ansiToHtml(start, {use_classes: true});
                l.should.eql(expected);
            });

            it("should transform a bold attr;foreground to html", () => {
                const attr = 1;
                const fg = 32;
                const start = "\x1B[" + attr + ";" + fg + "m " + attr + ";" + fg + " \x1B[0m";
                const expected = "<span class=\"ansi-bright-green-fg ansi-bold\"> " + attr + ";" + fg + " </span>";
                const l = Anser.ansiToHtml(start, {use_classes: true});
                l.should.eql(expected);
            });

            it("should transform a bold attr;background;foreground to html", () => {
                const attr = 1;
                const fg = 33;
                const bg = 42;
                const start = "\x1B[" + attr + ";" + bg + ";" + fg + "m " + attr + ";" + bg + ";" + fg + " \x1B[0m";
                const expected = "<span class=\"ansi-bright-yellow-fg ansi-green-bg ansi-bold\"> " + attr + ";" + bg + ";" + fg + " </span>";
                const l = Anser.ansiToHtml(start, {use_classes: true});
                l.should.eql(expected);
            });

            it("should transform a complex multi-line sequence to html", () => {
                const attr = 1;
                const fg = 32;
                const bg = 42;
                const start = "\n \x1B[" + fg + "m " + fg + "  \x1B[0m \n  \x1B[" + bg + "m " + bg + "  \x1B[0m \n zimpper ";
                const expected = "\n <span class=\"ansi-green-fg\"> " + fg + "  </span> \n  <span class=\"ansi-green-bg\"> " + bg + "  </span> \n zimpper ";
                const l = Anser.ansiToHtml(start, {use_classes: true});
                l.should.eql(expected);
            });

            describe("transform extend colors (palette)", () => {
                it("system color, foreground", () => {
                    const start = "\x1B[38;5;1m" + "red" + "\x1B[0m";
                    const expected = "<span class=\"ansi-red-fg\">red</span>";
                    const l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });

                it("system color, foreground (bright)", () => {
                    const start = "\x1B[38;5;9m" + "red" + "\x1B[0m";
                    const expected = "<span class=\"ansi-bright-red-fg\">red</span>";
                    const l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });

                it("system color, background", () => {
                    const start = "\x1B[48;5;1m" + "red" + "\x1B[0m";
                    const expected = "<span class=\"ansi-red-bg\">red</span>";
                    const l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });

                it("system color, background (bright)", () => {
                    const start = "\x1B[48;5;9m" + "red" + "\x1B[0m";
                    const expected = "<span class=\"ansi-bright-red-bg\">red</span>";
                    const l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });

                it("palette, foreground", () => {
                    const start = "\x1B[38;5;171m" + "foo" + "\x1B[0m";
                    const expected = "<span class=\"ansi-palette-171-fg\">foo</span>";
                    const l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });

                it("palette, background", () => {
                    const start = "\x1B[48;5;171m" + "foo" + "\x1B[0m";
                    const expected = "<span class=\"ansi-palette-171-bg\">foo</span>";
                    const l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });

                it("combination of bold and palette", () => {
                    const start = "\x1B[1;38;5;171m" + "foo" + "\x1B[0m";
                    const expected = "<span class=\"ansi-palette-171-fg ansi-bold\">foo</span>";
                    const l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });

                it("combination of palette and bold", () => {
                    const start = "\x1B[38;5;171;1m" + "foo" + "\x1B[0m";
                    const expected = "<span class=\"ansi-palette-171-fg ansi-bold\">foo</span>";
                    const l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });
            });

            describe("transform extend colors (true color)", () => {
                it("foreground", () => {
                    const start = "\x1B[38;2;42;142;242m" + "foo" + "\x1B[0m";
                    const expected = "<span class=\"ansi-truecolor-fg\" data-ansi-truecolor-fg=\"42, 142, 242\">foo</span>";
                    const l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });
                it("background", () => {
                    const start = "\x1B[48;2;42;142;242m" + "foo" + "\x1B[0m";
                    const expected = "<span class=\"ansi-truecolor-bg\" data-ansi-truecolor-bg=\"42, 142, 242\">foo</span>";
                    const l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });
                it("both foreground and background", () => {
                    const start = "\x1B[38;2;42;142;242;48;2;1;2;3m" + "foo" + "\x1B[0m";
                    const expected = "<span class=\"ansi-truecolor-fg ansi-truecolor-bg\" data-ansi-truecolor-fg=\"42, 142, 242\" data-ansi-truecolor-bg=\"1, 2, 3\">foo</span>";
                    const l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });
            });
        });

        describe("transform text attributes", () => {
            describe("default", () => {
                it("underline", () => {
                    const start = "\x1B[4m" + "foo" + "\x1B[0m";
                    const expected = "<span style=\"text-decoration:underline\">foo</span>";
                    const l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("blink", () => {
                    const start = "\x1B[5m" + "foo" + "\x1B[0m";
                    const expected = "<span style=\"text-decoration:blink\">foo</span>";
                    const l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("dim", () => {
                    const start = "\x1B[2m" + "foo" + "\x1B[0m";
                    const expected = "<span style=\"opacity:0.5\">foo</span>";
                    const l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
            });

            describe("with classes", () => {
                it("underline", () => {
                    const start = "\x1B[4m" + "foo" + "\x1B[0m";
                    const expected = "<span class=\"ansi-underline\">foo</span>";
                    const l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });
                it("blink", () => {
                    const start = "\x1B[5m" + "foo" + "\x1B[0m";
                    const expected = "<span class=\"ansi-blink\">foo</span>";
                    const l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });
                it("dim", () => {
                    const start = "\x1B[2m" + "foo" + "\x1B[0m";
                    const expected = "<span class=\"ansi-dim\">foo</span>";
                    const l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });
            });
        });

        describe("ignore unsupported CSI", () => {
            it("should correctly convert a string similar to CSI", () => {
                // https://github.com/drudru/Anser/pull/15
                // "[1;31m" is a plain text. not an escape sequence.
                const start = "foo\x1B[1@bar[1;31mbaz\x1B[0m";
                const l = Anser.ansiToHtml(start);

                // is all plain texts exist?
                l.should.containEql("foo");
                l.should.containEql("bar");
                l.should.containEql("baz");
                l.should.containEql("1;31m");
            });
            it("(italic)", () => {
                const start = "foo\x1B[3mbar\x1B[0mbaz";
                const l = Anser.ansiToHtml(start);
                l.should.eql("foo<span style=\"text-decoration:italic\">bar</span>baz");
            });
            it("(cursor-up)", () => {
                const start = "foo\x1B[1Abar";
                const l = Anser.ansiToHtml(start);
                l.should.eql("foobar");
            });
            it("(scroll-left)", () => {
                // <ESC>[1 @ (including ascii space)
                const start = "foo\x1B[1 @bar";
                const l = Anser.ansiToHtml(start);
                l.should.eql("foobar");
            });
            it("(DECMC)", () => {
                const start = "foo\x1B[?11ibar";
                const l = Anser.ansiToHtml(start);
                l.should.eql("foobar");
            });
            it("(RLIMGCP)", () => {
                const start = "foo\x1B[<!3ibar";
                const l = Anser.ansiToHtml(start);
                l.should.eql("foobar");
            });
            it("(DECSCL)", () => {
                const start = "foo\x1B[61;0\"pbar"
                const l = Anser.ansiToHtml(start);
                l.should.eql("foobar");
            });
        });
    });

    describe("ansi to text", () => {
        it("should remove color sequence", () => {
            const start = "foo \x1B[1;32mbar\x1B[0m baz";
            const l = Anser.ansiToText(start);
            l.should.eql("foo bar baz");
        });
        it("should remove unsupported sequence", () => {
            const start = "foo \x1B[1Abar";
            const l = Anser.ansiToText(start);
            l.should.eql("foo bar");
        });
        it("should keep multiline", () => {
            const start = "foo \x1B[1;32mbar\nbaz\x1B[0m qux";
            const l = Anser.ansiToText(start);
            l.should.eql("foo bar\nbaz qux");
        });
    });

    describe("ansi to json", () => {
        it("should convert ansi to json", () => {
            const attr = 0;
            const fg = 32;
            const start = "\x1B[" + fg + "m " + fg + " \x1B[0m";
            const output = Anser.ansiToJson(start, {
                remove_empty: true
            });
            output[0].fg.should.eql("0, 187, 0");
            output[0].content.should.eql(" 32 ");
        });
        it("should convert ansi with carriageReturn to json with positive clearLine flag", () => {
            const attr = 0;
            const fg = 32;
            const start = "\x1B[" + fg + "m " + fg + " \x1B[0mfoo\r";
            const output = Anser.ansiToJson(start, {
                remove_empty: true
            });
            output[0].fg.should.eql("0, 187, 0");
            output[0].content.should.eql(" 32 ");
            output[0].clearLine.should.eql(true);
            output[1].clearLine.should.eql(true);
        });
        it("should convert ansi without carriageReturn to json with negative clearLine flag", () => {
            const attr = 0;
            const fg = 32;
            const start = "\x1B[" + fg + "m " + fg + " \x1B[0mfoo";
            const output = Anser.ansiToJson(start, {
                remove_empty: true
            });
            output[0].fg.should.eql("0, 187, 0");
            output[0].content.should.eql(" 32 ");
            output[0].clearLine.should.eql(false);
            output[1].clearLine.should.eql(false);
        });
        it("should convert ansi with carriageReturn at start of line to json with positive clearLine", () => {
            const start = "\r  zc = 9  zm = 9  zs = 3  f = 4";
            const output = Anser.ansiToJson(start, {
                remove_empty: true
            });
            output[0].clearLine.should.eql(true);
        });
    });
});
