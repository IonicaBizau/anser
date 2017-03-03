// This file was originally written by @drudru (https://github.com/drudru/Anser), MIT, 2011

const Anser = require("..");
const should = require("should");

describe("Anser", function() {
    describe("escapeForHtml", function() {
        describe("ampersands", function() {
            it("should escape a single ampersand", function() {
                let start = "&";
                let expected = "&amp;";
                let l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });

            it("should escape some text with ampersands", function() {
                let start = "abcd&efgh";
                let expected = "abcd&amp;efgh";
                let l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });

            it("should escape multiple ampersands", function() {
                let start = " & & ";
                let expected = " &amp; &amp; ";
                let l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });

            it("should escape an already escaped ampersand", function() {
                let start = " &amp; ";
                let expected = " &amp;amp; ";
                let l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });
        });

        describe("less-than", function() {
            it("should escape a single less-than", function() {
                let start = "<";
                let expected = "&lt;";
                let l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });

            it("should escape some text with less-thans", function() {
                let start = "abcd<efgh";
                let expected = "abcd&lt;efgh";
                let l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });

            it("should escape multiple less-thans", function() {
                let start = " < < ";
                let expected = " &lt; &lt; ";
                let l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });
        });

        describe("greater-than", function() {
            it("should escape a single greater-than", function() {
                let start = ">";
                let expected = "&gt;";

                let l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });
            it("should escape some text with greater-thans", function() {
                let start = "abcd>efgh";
                let expected = "abcd&gt;efgh";
                let l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });
            it("should escape multiple greater-thans", function() {
                let start = " > > ";
                let expected = " &gt; &gt; ";
                let l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });
        });

        describe("mixed characters", function() {
            it("should escape a mix of characters that require escaping", function() {
                let start = "<&>/\\'\"";
                let expected = "&lt;&amp;&gt;/\\'\"";;
                let l = Anser.escapeForHtml(start);
                l.should.eql(expected);
            });
        });
    });

    describe("linkify", function() {
        it("should linkify a url", function() {
            let start = "http://link.to/me";
            let expected = "<a href=\"http://link.to/me\">http://link.to/me</a>";
            let l = Anser.linkify(start);
            l.should.eql(expected);
        });

    });

    describe("ansi to html", function() {
        describe("default colors", function() {
            it("should transform a foreground to html", function() {
                let attr = 0;
                let fg = 32;
                let start = "\x1B[" + fg + "m " + fg + " \x1B[0m";
                let expected = "<span style=\"color:rgb(0, 187, 0)\"> " + fg + " </span>";
                let l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            it("should transform a attr;foreground to html", function() {
                let attr = 0;
                let fg = 32;
                let start = "\x1B[" + attr + ";" + fg + "m " + fg + "  \x1B[0m";
                let expected = "<span style=\"color:rgb(0, 187, 0)\"> " + fg + "  </span>";
                let l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            it("should transform an empty code to a normal/reset html", function() {
                let attr = 0;
                let fg = 32;
                let start = "\x1B[" + attr + ";" + fg + "m " + fg + "  \x1B[m x";
                let expected = "<span style=\"color:rgb(0, 187, 0)\"> " + fg + "  </span> x";
                let l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            it("should transform a bold attr;foreground to html", function() {
                let attr = 1;
                let fg = 32;
                let start = "\x1B[" + attr + ";" + fg + "m " + attr + ";" + fg + " \x1B[0m";
                let expected = "<span style=\"color:rgb(0, 255, 0)\"> " + attr + ";" + fg + " </span>";
                let l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            it("should transform a bold-foreground to html", function() {
                let fg = 92;
                let start = "\x1B[" + fg + "m " + fg + " \x1B[0m";
                let expected = "<span style=\"color:rgb(0, 255, 0)\"> " + fg + " </span>";
                let l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            it("should transform a bold attr;background;foreground to html", function() {
                let attr = 1;
                let fg = 33;
                let bg = 42;
                let start = "\x1B[" + attr + ";" + bg + ";" + fg + "m " + attr + ";" + bg + ";" + fg + " \x1B[0m";
                let expected = "<span style=\"color:rgb(255, 255, 85);background-color:rgb(0, 187, 0)\"> " + attr + ";" + bg + ";" + fg + " </span>";
                let l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            it("should transform a bold-background;foreground to html", function() {
                let fg = 33;
                let bg = 102;
                let start = "\x1B[" + bg + ";" + fg + "m " + bg + ";" + fg + " \x1B[0m";
                let expected = "<span style=\"color:rgb(187, 187, 0);background-color:rgb(0, 255, 0)\"> " + bg + ";" + fg + " </span>";
                let l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            it("should transform a complex multi-line sequence to html", function() {
                let attr = 1;
                let fg = 32;
                let bg = 42;
                let start = "\n \x1B[" + fg + "m " + fg + "  \x1B[0m \n  \x1B[" + bg + "m " + bg + "  \x1B[0m \n zimpper ";
                let expected = "\n <span style=\"color:rgb(0, 187, 0)\"> " + fg + "  </span> \n  <span style=\"background-color:rgb(0, 187, 0)\"> " + bg + "  </span> \n zimpper ";
                let l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            it("should transform a foreground and background and reset foreground to html", function() {
                let fg = 37;
                let bg = 42;
                let start = "\n\x1B[40m \x1B[49m\x1B[" + fg + ";" + bg + "m " + bg + " \x1B[39m foobar ";
                let expected = "\n<span style=\"background-color:rgb(0, 0, 0)\"> </span><span style=\"color:rgb(255,255,255);background-color:rgb(0, 187, 0)\"> " + bg + " </span><span style=\"background-color:rgb(0, 187, 0)\"> foobar </span>";
                let l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            it("should transform a foreground and background and reset background to html", function() {
                let fg = 37;
                let bg = 42;
                let start = "\n\x1B[40m \x1B[49m\x1B[" + fg + ";" + bg + "m " + fg + " \x1B[49m foobar ";
                let expected = "\n<span style=\"background-color:rgb(0, 0, 0)\"> </span><span style=\"color:rgb(255,255,255);background-color:rgb(0, 187, 0)\"> " + fg + " </span><span style=\"color:rgb(255,255,255)\"> foobar </span>";
                let l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            it("should transform a foreground and background and reset them to html", function() {
                let fg = 37;
                let bg = 42;
                let start = "\n\x1B[40m \x1B[49m\x1B[" + fg + ";" + bg + "m " + fg + ";" + bg + " \x1B[39;49m foobar ";
                let expected = "\n<span style=\"background-color:rgb(0, 0, 0)\"> </span><span style=\"color:rgb(255,255,255);background-color:rgb(0, 187, 0)\"> " + fg + ";" + bg + " </span> foobar ";
                let l = Anser.ansiToHtml(start);
                l.should.eql(expected);
            });
            describe("transform extend colors (palette)", function() {
                it("system color, foreground", function() {
                    let start = "\x1B[38;5;1m" + "red" + "\x1B[0m";
                    let expected = "<span style=\"color:rgb(187, 0, 0)\">red</span>";
                    let l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("system color, foreground (bright)", function() {
                    let start = "\x1B[38;5;9m" + "red" + "\x1B[0m";
                    let expected = "<span style=\"color:rgb(255, 85, 85)\">red</span>";
                    let l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("system color, background", function() {
                    let start = "\x1B[48;5;1m" + "red" + "\x1B[0m";
                    let expected = "<span style=\"background-color:rgb(187, 0, 0)\">red</span>";
                    let l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("system color, background (bright)", function() {
                    let start = "\x1B[48;5;9m" + "red" + "\x1B[0m";
                    let expected = "<span style=\"background-color:rgb(255, 85, 85)\">red</span>";
                    let l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("palette, foreground", function() {
                    let start = "\x1B[38;5;171m" + "foo" + "\x1B[0m";
                    let expected = "<span style=\"color:rgb(215, 95, 255)\">foo</span>";
                    let l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("palette, background", function() {
                    let start = "\x1B[48;5;171m" + "foo" + "\x1B[0m";
                    let expected = "<span style=\"background-color:rgb(215, 95, 255)\">foo</span>";
                    let l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("combination of bold and palette", function() {
                    let start = "\x1B[1;38;5;171m" + "foo" + "\x1B[0m";
                    let expected = "<span style=\"color:rgb(215, 95, 255)\">foo</span>";
                    let l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("combination of palette and bold", function() {
                    let start = "\x1B[38;5;171;1m" + "foo" + "\x1B[0m";
                    let expected = "<span style=\"color:rgb(215, 95, 255)\">foo</span>";
                    let l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
            });

            describe("transform extend colors (true color)", function() {
                it("foreground", function() {
                    let start = "\x1B[38;2;42;142;242m" + "foo" + "\x1B[0m";
                    let expected = "<span style=\"color:rgb(42, 142, 242)\">foo</span>";
                    let l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("background", function() {
                    let start = "\x1B[48;2;42;142;242m" + "foo" + "\x1B[0m";
                    let expected = "<span style=\"background-color:rgb(42, 142, 242)\">foo</span>";
                    let l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("both foreground and background", function() {
                    let start = "\x1B[38;2;42;142;242;48;2;1;2;3m" + "foo" + "\x1B[0m";
                    let expected = "<span style=\"color:rgb(42, 142, 242);background-color:rgb(1, 2, 3)\">foo</span>";
                    let l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
            });
        });

        describe("themed colors", function() {
            it("should transform a foreground to html", function() {
                let attr = 0;
                let fg = 32;
                let start = "\x1B[" + fg + "m " + fg + " \x1B[0m";
                let expected = "<span class=\"ansi-green-fg\"> " + fg + " </span>";
                let l = Anser.ansiToHtml(start, {use_classes: true});
                l.should.eql(expected);
            });


            it("should transform a attr;foreground to html", function() {
                let attr = 0;
                let fg = 32;
                let start = "\x1B[" + attr + ";" + fg + "m " + fg + "  \x1B[0m";

                let expected = "<span class=\"ansi-green-fg\"> " + fg + "  </span>";

                let l = Anser.ansiToHtml(start, {use_classes: true});
                l.should.eql(expected);
            });

            it("should transform a bold attr;foreground to html", function() {
                let attr = 1;
                let fg = 32;
                let start = "\x1B[" + attr + ";" + fg + "m " + attr + ";" + fg + " \x1B[0m";
                let expected = "<span class=\"ansi-bright-green-fg ansi-bright\"> " + attr + ";" + fg + " </span>";
                let l = Anser.ansiToHtml(start, {use_classes: true});
                l.should.eql(expected);
            });

            it("should transform a bold attr;background;foreground to html", function() {
                let attr = 1;
                let fg = 33;
                let bg = 42;
                let start = "\x1B[" + attr + ";" + bg + ";" + fg + "m " + attr + ";" + bg + ";" + fg + " \x1B[0m";
                let expected = "<span class=\"ansi-bright-yellow-fg ansi-green-bg ansi-bright\"> " + attr + ";" + bg + ";" + fg + " </span>";
                let l = Anser.ansiToHtml(start, {use_classes: true});
                l.should.eql(expected);
            });

            it("should transform a complex multi-line sequence to html", function() {
                let attr = 1;
                let fg = 32;
                let bg = 42;
                let start = "\n \x1B[" + fg + "m " + fg + "  \x1B[0m \n  \x1B[" + bg + "m " + bg + "  \x1B[0m \n zimpper ";
                let expected = "\n <span class=\"ansi-green-fg\"> " + fg + "  </span> \n  <span class=\"ansi-green-bg\"> " + bg + "  </span> \n zimpper ";
                let l = Anser.ansiToHtml(start, {use_classes: true});
                l.should.eql(expected);
            });

            describe("transform extend colors (palette)", function() {
                it("system color, foreground", function() {
                    let start = "\x1B[38;5;1m" + "red" + "\x1B[0m";
                    let expected = "<span class=\"ansi-red-fg\">red</span>";
                    let l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });

                it("system color, foreground (bright)", function() {
                    let start = "\x1B[38;5;9m" + "red" + "\x1B[0m";
                    let expected = "<span class=\"ansi-bright-red-fg\">red</span>";
                    let l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });

                it("system color, background", function() {
                    let start = "\x1B[48;5;1m" + "red" + "\x1B[0m";
                    let expected = "<span class=\"ansi-red-bg\">red</span>";
                    let l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });

                it("system color, background (bright)", function() {
                    let start = "\x1B[48;5;9m" + "red" + "\x1B[0m";
                    let expected = "<span class=\"ansi-bright-red-bg\">red</span>";
                    let l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });

                it("palette, foreground", function() {
                    let start = "\x1B[38;5;171m" + "foo" + "\x1B[0m";
                    let expected = "<span class=\"ansi-palette-171-fg\">foo</span>";
                    let l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });

                it("palette, background", function() {
                    let start = "\x1B[48;5;171m" + "foo" + "\x1B[0m";
                    let expected = "<span class=\"ansi-palette-171-bg\">foo</span>";
                    let l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });

                it("combination of bold and palette", function() {
                    let start = "\x1B[1;38;5;171m" + "foo" + "\x1B[0m";
                    let expected = "<span class=\"ansi-palette-171-fg ansi-bright\">foo</span>";
                    let l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });

                it("combination of palette and bold", function() {
                    let start = "\x1B[38;5;171;1m" + "foo" + "\x1B[0m";
                    let expected = "<span class=\"ansi-palette-171-fg ansi-bright\">foo</span>";
                    let l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });
            });

            describe("transform extend colors (true color)", function() {
                it("foreground", function() {
                    let start = "\x1B[38;2;42;142;242m" + "foo" + "\x1B[0m";
                    let expected = "<span class=\"ansi-truecolor-fg\" data-ansi-truecolor-fg=\"42, 142, 242\">foo</span>";
                    let l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });
                it("background", function() {
                    let start = "\x1B[48;2;42;142;242m" + "foo" + "\x1B[0m";
                    let expected = "<span class=\"ansi-truecolor-bg\" data-ansi-truecolor-bg=\"42, 142, 242\">foo</span>";
                    let l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });
                it("both foreground and background", function() {
                    let start = "\x1B[38;2;42;142;242;48;2;1;2;3m" + "foo" + "\x1B[0m";
                    let expected = "<span class=\"ansi-truecolor-fg ansi-truecolor-bg\" data-ansi-truecolor-fg=\"42, 142, 242\" data-ansi-truecolor-bg=\"1, 2, 3\">foo</span>";
                    let l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });
            });
        });

        describe("transform text attributes", function() {
            describe("default", function() {
                it("underline", function() {
                    let start = "\x1B[4m" + "foo" + "\x1B[0m";
                    let expected = "<span style=\"text-decoration:underline\">foo</span>";
                    let l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("blink", function() {
                    let start = "\x1B[5m" + "foo" + "\x1B[0m";
                    let expected = "<span style=\"text-decoration:blink\">foo</span>";
                    let l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
                it("dim", function() {
                    let start = "\x1B[2m" + "foo" + "\x1B[0m";
                    let expected = "<span style=\"\">foo</span>";
                    let l = Anser.ansiToHtml(start);
                    l.should.eql(expected);
                });
            });

            describe("with classes", function() {
                it("underline", function() {
                    let start = "\x1B[4m" + "foo" + "\x1B[0m";
                    let expected = "<span class=\"ansi-underline\">foo</span>";
                    let l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });
                it("blink", function() {
                    let start = "\x1B[5m" + "foo" + "\x1B[0m";
                    let expected = "<span class=\"ansi-blink\">foo</span>";
                    let l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });
                it("dim", function() {
                    let start = "\x1B[2m" + "foo" + "\x1B[0m";
                    let expected = "<span class=\"ansi-dim\">foo</span>";
                    let l = Anser.ansiToHtml(start, {use_classes: true});
                    l.should.eql(expected);
                });
            });
        });

        describe("ignore unsupported CSI", function() {
            it("should correctly convert a string similar to CSI", function() {
                // https://github.com/drudru/Anser/pull/15
                // "[1;31m" is a plain text. not an escape sequence.
                let start = "foo\x1B[1@bar[1;31mbaz\x1B[0m";
                let l = Anser.ansiToHtml(start);

                // is all plain texts exist?
                l.should.containEql("foo");
                l.should.containEql("bar");
                l.should.containEql("baz");
                l.should.containEql("1;31m");
            });
            it("(italic)", function() {
                let start = "foo\x1B[3mbar\x1B[0mbaz";
                let l = Anser.ansiToHtml(start);
                l.should.eql("foobarbaz");
            });
            it("(cursor-up)", function() {
                let start = "foo\x1B[1Abar";
                let l = Anser.ansiToHtml(start);
                l.should.eql("foobar");
            });
            it("(scroll-left)", function() {
                // <ESC>[1 @ (including ascii space)
                let start = "foo\x1B[1 @bar";
                let l = Anser.ansiToHtml(start);
                l.should.eql("foobar");
            });
            it("(DECMC)", function() {
                let start = "foo\x1B[?11ibar";
                let l = Anser.ansiToHtml(start);
                l.should.eql("foobar");
            });
            it("(RLIMGCP)", function() {
                let start = "foo\x1B[<!3ibar";
                let l = Anser.ansiToHtml(start);
                l.should.eql("foobar");
            });
            it("(DECSCL)", function() {
                let start = "foo\x1B[61;0\"pbar"
                let l = Anser.ansiToHtml(start);
                l.should.eql("foobar");
            });
        });
    });

    describe("ansi to text", function() {
        it("should remove color sequence", function() {
            let start = "foo \x1B[1;32mbar\x1B[0m baz";
            let l = Anser.ansiToText(start);
            l.should.eql("foo bar baz");
        });
        it("should remove unsupported sequence", function() {
            let start = "foo \x1B[1Abar";
            let l = Anser.ansiToText(start);
            l.should.eql("foo bar");
        });
        it("should keep multiline", function() {
            let start = "foo \x1B[1;32mbar\nbaz\x1B[0m qux";
            let l = Anser.ansiToText(start);
            l.should.eql("foo bar\nbaz qux");
        });
    });

    describe("ansi to json", function() {
        it("should convert ansi to json", function() {
            let attr = 0;
            let fg = 32;
            let start = "\x1B[" + fg + "m " + fg + " \x1B[0m";
            let output = Anser.ansiToJson(start, {
                remove_empty: true
            });
            output[0].fg.should.eql("0, 187, 0");
            output[0].content.should.eql(" 32 ");
        });
        it("should convert ansi with carriageReturn to json with positive clearLine flag", function() {
            let attr = 0;
            let fg = 32;
            let start = "\x1B[" + fg + "m " + fg + " \x1B[0mfoo\r";
            let output = Anser.ansiToJson(start, {
                remove_empty: true
            });
            output[0].fg.should.eql("0, 187, 0");
            output[0].content.should.eql(" 32 ");
            output[0].clearLine.should.eql(true);
            output[1].clearLine.should.eql(true);
        });
        it("should convert ansi without carriageReturn to json with negative clearLine flag", function() {
            let attr = 0;
            let fg = 32;
            let start = "\x1B[" + fg + "m " + fg + " \x1B[0mfoo";
            let output = Anser.ansiToJson(start, {
                remove_empty: true
            });
            output[0].fg.should.eql("0, 187, 0");
            output[0].content.should.eql(" 32 ");
            output[0].clearLine.should.eql(false);
            output[1].clearLine.should.eql(false);
        });
    });
});
