// Test suites for testing for equality any JavaScript type.
// Discussions and reference: http://philrathe.com/articles/equiv
// Latest test suites: http://philrathe.com/tests/equiv
// Author: Philippe Rathé <prathe@gmail.com>

module("equiv");

// When testing with same, diff, allSame and notAllSame
// it requires at least 2 arguments.
var skipTooFewArgumentsTests = true;

// ############################################################################
// ### start assertion definition
// ### There is 3 possibilities
// ### 1 - equals
// ### 2 - ok
// ### 3 - same, diff, allSame and notAllSame

// What function are we testing to compare arguments together?
var testedFn = QUnit.equiv;

/* 1- TEST equiv with equals */
//var assertionFn = equals;

/* 2 - TEST equiv with ok.
   It is safest because it uses the output of testedFn
   and compare it with type checking with the boolean expected value. */
var assertionFn = function () {
    var actual = arguments[0];
    var expected = arguments[1];
    ok.apply(this, [actual === expected, arguments[2]]);
};

/* 3 - TEST same, diff, allSame and notAllSame */
/*
skipTooFewArgumentsTests = true;
testedFn = function () {
    var args = Array.prototype.slice.apply(arguments);
    return args;
};
var assertionFn = function () {
    var args = Array.prototype.slice.apply(arguments);
    var fn = same;
    var fnArgs = args[0];
    var expected = args[1];

    // Use allSame assertion for multiple arguments.
    if (fnArgs.length > 2) {
        fnArgs = [fnArgs];
        if (expected === true) {
            fn = allSame;
        } else if (expected === false) {
            fn = notAllSame;
        }
    // diff is the negative form assertion of same
    } else if (expected === false) {
        fn = diff;
    }

    // test same, diff, allSame or notAllSame
    fn.apply(this, fnArgs.concat(args.splice(2,args.length - 1)));
};
*/

// ### end assertion definition
// ############################################################################





// Test our assertionFn overwriting of 'equals', 'ok', same, diff, allSame and notAllSame
// At least one test should failed. Otherwise we could have mess with it and we don't know.
/*
test("Testing assertion method overwrite: MUST FAIL!", function () {
    assertionFn(testedFn(true, false), true, "Must fail. Otherwise all other tests are useless.");
});
*/


if (!skipTooFewArgumentsTests) {
    test("Too few arguments", function () {
        assertionFn(testedFn(), true, "No arguments");
        assertionFn(testedFn(undefined), true, "One arguments");
        assertionFn(testedFn(null), true, "One arguments");
        assertionFn(testedFn(0), true, "One arguement");
        assertionFn(testedFn(1), true, "One arguement");
        assertionFn(testedFn(true), true, "One arguement");
        assertionFn(testedFn(false), true, "One arguement");
        assertionFn(testedFn([]), true, "One arguement");
        assertionFn(testedFn({}), true, "One arguement");
        assertionFn(testedFn(function () {}), true, "One arguement"); // anonymous function
        assertionFn(testedFn(/./), true, "One arguement"); // RegExp
        assertionFn(testedFn(new Date()), true, "One arguement"); // Date
        assertionFn(testedFn(1/0), true, "One arguement"); // Infinity
        assertionFn(testedFn(-1/0), true, "One arguement"); // -Infinity
        assertionFn(testedFn(0/0), true, "One arguement"); // NaN
    });
}


test("Primitive types and constants", function () {
    assertionFn(testedFn(null, null), true, "null");
    assertionFn(testedFn(null, {}), false, "null");
    assertionFn(testedFn(null, undefined), false, "null");
    assertionFn(testedFn(null, 0), false, "null");
    assertionFn(testedFn(null, false), false, "null");
    assertionFn(testedFn(null, ''), false, "null");
    assertionFn(testedFn(null, []), false, "null");

    assertionFn(testedFn(undefined, undefined), true, "undefined");
    assertionFn(testedFn(undefined, null), false, "undefined");
    assertionFn(testedFn(undefined, 0), false, "undefined");
    assertionFn(testedFn(undefined, false), false, "undefined");
    assertionFn(testedFn(undefined, {}), false, "undefined");
    assertionFn(testedFn(undefined, []), false, "undefined");
    assertionFn(testedFn(undefined, ""), false, "undefined");

    // Nan usually doest not equal to Nan using the '==' operator.
    // Only isNaN() is able to do it.
    assertionFn(testedFn(0/0, 0/0), true, "NaN"); // NaN VS NaN
    assertionFn(testedFn(1/0, 2/0), true, "Infinity"); // Infinity VS Infinity
    assertionFn(testedFn(-1/0, 2/0), false, "-Infinity, Infinity"); // -Infinity VS Infinity
    assertionFn(testedFn(-1/0, -2/0), true, "-Infinity, -Infinity"); // -Infinity VS -Infinity
    assertionFn(testedFn(0/0, 1/0), false, "NaN, Infinity"); // Nan VS Infinity
    assertionFn(testedFn(1/0, 0/0), false, "NaN, Infinity"); // Nan VS Infinity
    assertionFn(testedFn(0/0, null), false, "NaN");
    assertionFn(testedFn(0/0, undefined), false, "NaN");
    assertionFn(testedFn(0/0, 0), false, "NaN");
    assertionFn(testedFn(0/0, false), false, "NaN");
    assertionFn(testedFn(0/0, function () {}), false, "NaN");
    assertionFn(testedFn(1/0, null), false, "NaN, Infinity");
    assertionFn(testedFn(1/0, undefined), false, "NaN, Infinity");
    assertionFn(testedFn(1/0, 0), false, "NaN, Infinity");
    assertionFn(testedFn(1/0, 1), false, "NaN, Infinity");
    assertionFn(testedFn(1/0, false), false, "NaN, Infinity");
    assertionFn(testedFn(1/0, true), false, "NaN, Infinity");
    assertionFn(testedFn(1/0, function () {}), false, "NaN, Infinity");

    assertionFn(testedFn(0, 0), true, "number");
    assertionFn(testedFn(0, 1), false, "number");
    assertionFn(testedFn(1, 0), false, "number");
    assertionFn(testedFn(1, 1), true, "number");
    assertionFn(testedFn(1.1, 1.1), true, "number");
    assertionFn(testedFn(0.0000005, 0.0000005), true, "number");
    assertionFn(testedFn(0, ''), false, "number");
    assertionFn(testedFn(0, '0'), false, "number");
    assertionFn(testedFn(1, '1'), false, "number");
    assertionFn(testedFn(0, false), false, "number");
    assertionFn(testedFn(1, true), false, "number");

    assertionFn(testedFn(true, true), true, "boolean");
    assertionFn(testedFn(true, false), false, "boolean");
    assertionFn(testedFn(false, true), false, "boolean");
    assertionFn(testedFn(false, 0), false, "boolean");
    assertionFn(testedFn(false, null), false, "boolean");
    assertionFn(testedFn(false, undefined), false, "boolean");
    assertionFn(testedFn(true, 1), false, "boolean");
    assertionFn(testedFn(true, null), false, "boolean");
    assertionFn(testedFn(true, undefined), false, "boolean");

    assertionFn(testedFn('', ''), true, "string");
    assertionFn(testedFn('a', 'a'), true, "string");
    assertionFn(testedFn("foobar", "foobar"), true, "string");
    assertionFn(testedFn("foobar", "foo"), false, "string");
    assertionFn(testedFn('', 0), false, "string");
    assertionFn(testedFn('', false), false, "string");
    assertionFn(testedFn('', null), false, "string");
    assertionFn(testedFn('', undefined), false, "string");
});

test("Objects Basics.", function() {
    assertionFn(testedFn({}, {}), true);
    assertionFn(testedFn({}, null), false);
    assertionFn(testedFn({}, undefined), false);
    assertionFn(testedFn({}, 0), false);
    assertionFn(testedFn({}, false), false);

    // This test is a hard one, it is very important
    // REASONS:
    //      1) They are of the same type "object"
    //      2) [] instanceof Object is true
    //      3) Their properties are the same (doesn't exists)
    assertionFn(testedFn({}, []), false);

    assertionFn(testedFn({a:1}, {a:1}), true);
    assertionFn(testedFn({a:1}, {a:"1"}), false);
    assertionFn(testedFn({a:[]}, {a:[]}), true);
    assertionFn(testedFn({a:{}}, {a:null}), false);
    assertionFn(testedFn({a:1}, {}), false);
    assertionFn(testedFn({}, {a:1}), false);

    // Hard ones
    assertionFn(testedFn({a:undefined}, {}), false);
    assertionFn(testedFn({}, {a:undefined}), false);
    assertionFn(testedFn(
        {
            a: [{ bar: undefined }]
        },
        {
            a: [{ bat: undefined }]
        }
    ), false);
});


test("Arrays Basics.", function() {

    assertionFn(testedFn([], []), true);

    // May be a hard one, can invoke a crash at execution.
    // because their types are both "object" but null isn't
    // like a true object, it doesn't have any property at all.
    assertionFn(testedFn([], null), false);

    assertionFn(testedFn([], undefined), false);
    assertionFn(testedFn([], false), false);
    assertionFn(testedFn([], 0), false);
    assertionFn(testedFn([], ""), false);

    // May be a hard one, but less hard
    // than {} with [] (note the order)
    assertionFn(testedFn([], {}), false);

    assertionFn(testedFn([null],[]), false);
    assertionFn(testedFn([undefined],[]), false);
    assertionFn(testedFn([],[null]), false);
    assertionFn(testedFn([],[undefined]), false);
    assertionFn(testedFn([null],[undefined]), false);
    assertionFn(testedFn([[]],[[]]), true);
    assertionFn(testedFn([[],[],[]],[[],[],[]]), true);
    assertionFn(testedFn(
                            [[],[],[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]],
                            [[],[],[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]),
                            true);
    assertionFn(testedFn(
                            [[],[],[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]],
                            [[],[],[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]), // shorter
                            false);
    assertionFn(testedFn(
                            [[],[],[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[{}]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]],
                            [[],[],[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]), // deepest element not an array
                            false);

    // same multidimensional
    assertionFn(testedFn(
                            [1,2,3,4,5,6,7,8,9, [
                                1,2,3,4,5,6,7,8,9, [
                                    1,2,3,4,5,[
                                        [6,7,8,9, [
                                            [
                                                1,2,3,4,[
                                                    2,3,4,[
                                                        1,2,[
                                                            1,2,3,4,[
                                                                1,2,3,4,5,6,7,8,9,[
                                                                    0
                                                                ],1,2,3,4,5,6,7,8,9
                                                            ],5,6,7,8,9
                                                        ],4,5,6,7,8,9
                                                    ],5,6,7,8,9
                                                ],5,6,7
                                            ]
                                        ]
                                    ]
                                ]
                            ]]],
                            [1,2,3,4,5,6,7,8,9, [
                                1,2,3,4,5,6,7,8,9, [
                                    1,2,3,4,5,[
                                        [6,7,8,9, [
                                            [
                                                1,2,3,4,[
                                                    2,3,4,[
                                                        1,2,[
                                                            1,2,3,4,[
                                                                1,2,3,4,5,6,7,8,9,[
                                                                    0
                                                                ],1,2,3,4,5,6,7,8,9
                                                            ],5,6,7,8,9
                                                        ],4,5,6,7,8,9
                                                    ],5,6,7,8,9
                                                ],5,6,7
                                            ]
                                        ]
                                    ]
                                ]
                            ]]]),
                            true, "Multidimensional");

    // different multidimensional
    assertionFn(testedFn(
                            [1,2,3,4,5,6,7,8,9, [
                                1,2,3,4,5,6,7,8,9, [
                                    1,2,3,4,5,[
                                        [6,7,8,9, [
                                            [
                                                1,2,3,4,[
                                                    2,3,4,[
                                                        1,2,[
                                                            1,2,3,4,[
                                                                1,2,3,4,5,6,7,8,9,[
                                                                    0
                                                                ],1,2,3,4,5,6,7,8,9
                                                            ],5,6,7,8,9
                                                        ],4,5,6,7,8,9
                                                    ],5,6,7,8,9
                                                ],5,6,7
                                            ]
                                        ]
                                    ]
                                ]
                            ]]],
                            [1,2,3,4,5,6,7,8,9, [
                                1,2,3,4,5,6,7,8,9, [
                                    1,2,3,4,5,[
                                        [6,7,8,9, [
                                            [
                                                1,2,3,4,[
                                                    2,3,4,[
                                                        1,2,[
                                                            '1',2,3,4,[                 // string instead of number
                                                                1,2,3,4,5,6,7,8,9,[
                                                                    0
                                                                ],1,2,3,4,5,6,7,8,9
                                                            ],5,6,7,8,9
                                                        ],4,5,6,7,8,9
                                                    ],5,6,7,8,9
                                                ],5,6,7
                                            ]
                                        ]
                                    ]
                                ]
                            ]]]),
                            false, "Multidimensional");

    // different multidimensional
    assertionFn(testedFn(
                            [1,2,3,4,5,6,7,8,9, [
                                1,2,3,4,5,6,7,8,9, [
                                    1,2,3,4,5,[
                                        [6,7,8,9, [
                                            [
                                                1,2,3,4,[
                                                    2,3,4,[
                                                        1,2,[
                                                            1,2,3,4,[
                                                                1,2,3,4,5,6,7,8,9,[
                                                                    0
                                                                ],1,2,3,4,5,6,7,8,9
                                                            ],5,6,7,8,9
                                                        ],4,5,6,7,8,9
                                                    ],5,6,7,8,9
                                                ],5,6,7
                                            ]
                                        ]
                                    ]
                                ]
                            ]]],
                            [1,2,3,4,5,6,7,8,9, [
                                1,2,3,4,5,6,7,8,9, [
                                    1,2,3,4,5,[
                                        [6,7,8,9, [
                                            [
                                                1,2,3,4,[
                                                    2,3,[                   // missing an element (4)
                                                        1,2,[
                                                            1,2,3,4,[
                                                                1,2,3,4,5,6,7,8,9,[
                                                                    0
                                                                ],1,2,3,4,5,6,7,8,9
                                                            ],5,6,7,8,9
                                                        ],4,5,6,7,8,9
                                                    ],5,6,7,8,9
                                                ],5,6,7
                                            ]
                                        ]
                                    ]
                                ]
                            ]]]),
                            false, "Multidimensional");
});

test("Functions.", function() {
    var f0 = function () {};
    var f1 = function () {};

    // f2 and f3 have the same code, formatted differently
    var f2 = function () {var i = 0;};
    var f3 = function () {
        var i = 0 // this comment and no semicoma as difference
    };

    assertionFn(testedFn(function() {}, function() {}), false, "Anonymous functions"); // exact source code
    assertionFn(testedFn(function() {}, function() {return true;}), false, "Anonymous functions");

    assertionFn(testedFn(f0, f0), true, "Function references"); // same references
    assertionFn(testedFn(f0, f1), false, "Function references"); // exact source code, different references
    assertionFn(testedFn(f2, f3), false, "Function references"); // equivalent source code, different references
    assertionFn(testedFn(f1, f2), false, "Function references"); // different source code, different references
    assertionFn(testedFn(function() {}, true), false);
    assertionFn(testedFn(function() {}, undefined), false);
    assertionFn(testedFn(function() {}, null), false);
    assertionFn(testedFn(function() {}, {}), false);
});


test("Date instances.", function() {
    // Date, we don't need to test Date.parse() because it returns a number.
    // Only test the Date instances by setting them a fix date.
    // The date use is midnight January 1, 1970
    
    var d1 = new Date();
    d1.setTime(0); // fix the date

    var d2 = new Date();
    d2.setTime(0); // fix the date

    var d3 = new Date(); // The very now

    // Anyway their types differs, just in case the code fails in the order in which it deals with date
    assertionFn(testedFn(d1, 0), false); // d1.valueOf() returns 0, but d1 and 0 are different
    // test same values date and different instances equality
    assertionFn(testedFn(d1, d2), true);
    // test different date and different instances difference
    assertionFn(testedFn(d1, d3), false);
});


test("RegExp.", function() {
    // Must test cases that imply those traps:
    // var a = /./;
    // a instanceof Object;        // Oops
    // a instanceof RegExp;        // Oops
    // typeof a === "function";    // Oops, false in IE and Opera, true in FF and Safari ("object")

    // Tests same regex with same modifiers in different order
    var r = /foo/;
    var r5 = /foo/gim;
    var r6 = /foo/gmi;
    var r7 = /foo/igm;
    var r8 = /foo/img;
    var r9 = /foo/mig;
    var r10 = /foo/mgi;
    var ri1 = /foo/i;
    var ri2 = /foo/i;
    var rm1 = /foo/m;
    var rm2 = /foo/m;
    var rg1 = /foo/g;
    var rg2 = /foo/g;

    assertionFn(testedFn(r5, r6), true, "Modifier order");
    assertionFn(testedFn(r5, r7), true, "Modifier order");
    assertionFn(testedFn(r5, r8), true, "Modifier order");
    assertionFn(testedFn(r5, r9), true, "Modifier order");
    assertionFn(testedFn(r5, r10), true, "Modifier order");
    assertionFn(testedFn(r, r5), false, "Modifier");

    assertionFn(testedFn(ri1, ri2), true, "Modifier");
    assertionFn(testedFn(r, ri1), false, "Modifier");
    assertionFn(testedFn(ri1, rm1), false, "Modifier");
    assertionFn(testedFn(r, rm1), false, "Modifier");
    assertionFn(testedFn(rm1, ri1), false, "Modifier");
    assertionFn(testedFn(rm1, rm2), true, "Modifier");
    assertionFn(testedFn(rg1, rm1), false, "Modifier");
    assertionFn(testedFn(rm1, rg1), false, "Modifier");
    assertionFn(testedFn(rg1, rg2), true, "Modifier");

    // Different regex, same modifiers
    var r11 = /[a-z]/gi;
    var r13 = /[0-9]/gi; // oops! different
    assertionFn(testedFn(r11, r13), false, "Regex pattern");

    var r14 = /0/ig;
    var r15 = /"0"/ig; // oops! different
    assertionFn(testedFn(r14, r15), false, "Regex pattern");

    var r1 = /[\n\r\u2028\u2029]/g;
    var r2 = /[\n\r\u2028\u2029]/g;
    var r3 = /[\n\r\u2028\u2028]/g; // differs from r1
    var r4 = /[\n\r\u2028\u2029]/;  // differs from r1

    assertionFn(testedFn(r1, r2), true, "Regex pattern");
    assertionFn(testedFn(r1, r3), false, "Regex pattern");
    assertionFn(testedFn(r1, r4), false, "Regex pattern");

    // More complex regex
    var regex1 = "^[-_.a-z0-9]+@([-_a-z0-9]+\\.)+([A-Za-z][A-Za-z]|[A-Za-z][A-Za-z][A-Za-z])|(([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5]))$";
    var regex2 = "^[-_.a-z0-9]+@([-_a-z0-9]+\\.)+([A-Za-z][A-Za-z]|[A-Za-z][A-Za-z][A-Za-z])|(([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5]))$";
    // regex 3 is different: '.' not escaped
    var regex3 = "^[-_.a-z0-9]+@([-_a-z0-9]+.)+([A-Za-z][A-Za-z]|[A-Za-z][A-Za-z][A-Za-z])|(([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5]))$";

    var r21 = new RegExp(regex1);
    var r22 = new RegExp(regex2);
    var r23 = new RegExp(regex3); // diff from r21, not same pattern
    var r23a = new RegExp(regex3, "gi"); // diff from r23, not same modifier
    var r24a = new RegExp(regex3, "ig"); // same as r23a

    assertionFn(testedFn(r21, r22), true, "Complex Regex");
    assertionFn(testedFn(r21, r23), false, "Complex Regex");
    assertionFn(testedFn(r23, r23a), false, "Complex Regex");
    assertionFn(testedFn(r23a, r24a), true, "Complex Regex");

    // typeof r1 is "function" in some browsers and "object" in others so we must cover this test
    var re = / /;
    assertionFn(testedFn(re, function () {}), false, "Regex internal");
    assertionFn(testedFn(re, {}), false, "Regex internal");
});


test("Complex Objects.", function() {

    function fn1() {
        return "fn1";
    }
    function fn2() {
        return "fn2";
    }
    
    // Try to invert the order of some properties to make sure it is covered.
    // It can failed when properties are compared between unsorted arrays.
    assertionFn(testedFn(
        {
            a: 1,
            b: null,
            c: [{}],
            d: {
                a: 3.14159,
                b: false,
                c: {
                    e: fn1,
                    f: [[[]]],
                    g: {
                        j: {
                            k: {
                                n: {
                                    r: "r",
                                    s: [1,2,3],
                                    t: undefined,
                                    u: 0,
                                    v: {
                                        w: {
                                            x: {
                                                y: "Yahoo!",
                                                z: null
                                            }
                                        }
                                    }
                                },
                                q: [],
                                p: 1/0,
                                o: 99
                            },
                            l: undefined,
                            m: null
                        }
                    },
                    d: 0,
                    i: true,
                    h: "false"
                }
            },
            e: undefined,
            g: "",
            h: "h",
            f: {},
            i: []
        },
        {
            a: 1,
            b: null,
            c: [{}],
            d: {
                b: false,
                a: 3.14159,
                c: {
                    d: 0,
                    e: fn1,
                    f: [[[]]],
                    g: {
                        j: {
                            k: {
                                n: {
                                    r: "r",
                                    t: undefined,
                                    u: 0,
                                    s: [1,2,3],
                                    v: {
                                        w: {
                                            x: {
                                                z: null,
                                                y: "Yahoo!"
                                            }
                                        }
                                    }
                                },
                                o: 99,
                                p: 1/0,
                                q: []
                            },
                            l: undefined,
                            m: null
                        }
                    },
                    i: true,
                    h: "false"
                }
            },
            e: undefined,
            g: "",
            f: {},
            h: "h",
            i: []
        }
    ), true);

    assertionFn(testedFn(
        {
            a: 1,
            b: null,
            c: [{}],
            d: {
                a: 3.14159,
                b: false,
                c: {
                    d: 0,
                    e: fn1,
                    f: [[[]]],
                    g: {
                        j: {
                            k: {
                                n: {
                                    //r: "r",   // different: missing a property
                                    s: [1,2,3],
                                    t: undefined,
                                    u: 0,
                                    v: {
                                        w: {
                                            x: {
                                                y: "Yahoo!",
                                                z: null
                                            }
                                        }
                                    }
                                },
                                o: 99,
                                p: 1/0,
                                q: []
                            },
                            l: undefined,
                            m: null
                        }
                    },
                    h: "false",
                    i: true
                }
            },
            e: undefined,
            f: {},
            g: "",
            h: "h",
            i: []
        },
        {
            a: 1,
            b: null,
            c: [{}],
            d: {
                a: 3.14159,
                b: false,
                c: {
                    d: 0,
                    e: fn1,
                    f: [[[]]],
                    g: {
                        j: {
                            k: {
                                n: {
                                    r: "r",
                                    s: [1,2,3],
                                    t: undefined,
                                    u: 0,
                                    v: {
                                        w: {
                                            x: {
                                                y: "Yahoo!",
                                                z: null
                                            }
                                        }
                                    }
                                },
                                o: 99,
                                p: 1/0,
                                q: []
                            },
                            l: undefined,
                            m: null
                        }
                    },
                    h: "false",
                    i: true
                }
            },
            e: undefined,
            f: {},
            g: "",
            h: "h",
            i: []
        }
    ), false);

    assertionFn(testedFn(
        {
            a: 1,
            b: null,
            c: [{}],
            d: {
                a: 3.14159,
                b: false,
                c: {
                    d: 0,
                    e: fn1,
                    f: [[[]]],
                    g: {
                        j: {
                            k: {
                                n: {
                                    r: "r",
                                    s: [1,2,3],
                                    t: undefined,
                                    u: 0,
                                    v: {
                                        w: {
                                            x: {
                                                y: "Yahoo!",
                                                z: null
                                            }
                                        }
                                    }
                                },
                                o: 99,
                                p: 1/0,
                                q: []
                            },
                            l: undefined,
                            m: null
                        }
                    },
                    h: "false",
                    i: true
                }
            },
            e: undefined,
            f: {},
            g: "",
            h: "h",
            i: []
        },
        {
            a: 1,
            b: null,
            c: [{}],
            d: {
                a: 3.14159,
                b: false,
                c: {
                    d: 0,
                    e: fn1,
                    f: [[[]]],
                    g: {
                        j: {
                            k: {
                                n: {
                                    r: "r",
                                    s: [1,2,3],
                                    //t: undefined,                 // different: missing a property with an undefined value
                                    u: 0,
                                    v: {
                                        w: {
                                            x: {
                                                y: "Yahoo!",
                                                z: null
                                            }
                                        }
                                    }
                                },
                                o: 99,
                                p: 1/0,
                                q: []
                            },
                            l: undefined,
                            m: null
                        }
                    },
                    h: "false",
                    i: true
                }
            },
            e: undefined,
            f: {},
            g: "",
            h: "h",
            i: []
        }
    ), false);

    assertionFn(testedFn(
        {
            a: 1,
            b: null,
            c: [{}],
            d: {
                a: 3.14159,
                b: false,
                c: {
                    d: 0,
                    e: fn1,
                    f: [[[]]],
                    g: {
                        j: {
                            k: {
                                n: {
                                    r: "r",
                                    s: [1,2,3],
                                    t: undefined,
                                    u: 0,
                                    v: {
                                        w: {
                                            x: {
                                                y: "Yahoo!",
                                                z: null
                                            }
                                        }
                                    }
                                },
                                o: 99,
                                p: 1/0,
                                q: []
                            },
                            l: undefined,
                            m: null
                        }
                    },
                    h: "false",
                    i: true
                }
            },
            e: undefined,
            f: {},
            g: "",
            h: "h",
            i: []
        },
        {
            a: 1,
            b: null,
            c: [{}],
            d: {
                a: 3.14159,
                b: false,
                c: {
                    d: 0,
                    e: fn1,
                    f: [[[]]],
                    g: {
                        j: {
                            k: {
                                n: {
                                    r: "r",
                                    s: [1,2,3],
                                    t: undefined,
                                    u: 0,
                                    v: {
                                        w: {
                                            x: {
                                                y: "Yahoo!",
                                                z: null
                                            }
                                        }
                                    }
                                },
                                o: 99,
                                p: 1/0,
                                q: {}           // different was []
                            },
                            l: undefined,
                            m: null
                        }
                    },
                    h: "false",
                    i: true
                }
            },
            e: undefined,
            f: {},
            g: "",
            h: "h",
            i: []
        }
    ), false);

    var same1 = {
        a: [
            "string", null, 0, "1", 1, {
                prop: null,
                foo: [1,2,null,{}, [], [1,2,3]],
                bar: undefined
            }, 3, "Hey!", "Κάνε πάντα γνωρίζουμε ας των, μηχανής επιδιόρθωσης επιδιορθώσεις ώς μια. Κλπ ας"
        ],
        unicode: "老 汉语中存在 港澳和海外的华人圈中 贵州 我去了书店 现在尚有争",
        b: "b",
        c: fn1
    };

    var same2 = {
        a: [
            "string", null, 0, "1", 1, {
                prop: null,
                foo: [1,2,null,{}, [], [1,2,3]],
                bar: undefined
            }, 3, "Hey!", "Κάνε πάντα γνωρίζουμε ας των, μηχανής επιδιόρθωσης επιδιορθώσεις ώς μια. Κλπ ας"
        ],
        unicode: "老 汉语中存在 港澳和海外的华人圈中 贵州 我去了书店 现在尚有争",
        b: "b",
        c: fn1
    };

    var diff1 = {
        a: [
            "string", null, 0, "1", 1, {
                prop: null,
                foo: [1,2,null,{}, [], [1,2,3,4]], // different: 4 was add to the array
                bar: undefined
            }, 3, "Hey!", "Κάνε πάντα γνωρίζουμε ας των, μηχανής επιδιόρθωσης επιδιορθώσεις ώς μια. Κλπ ας"
        ],
        unicode: "老 汉语中存在 港澳和海外的华人圈中 贵州 我去了书店 现在尚有争",
        b: "b",
        c: fn1
    };

    var diff2 = {
        a: [
            "string", null, 0, "1", 1, {
                prop: null,
                foo: [1,2,null,{}, [], [1,2,3]],
                newprop: undefined, // different: newprop was added
                bar: undefined
            }, 3, "Hey!", "Κάνε πάντα γνωρίζουμε ας των, μηχανής επιδιόρθωσης επιδιορθώσεις ώς μια. Κλπ ας"
        ],
        unicode: "老 汉语中存在 港澳和海外的华人圈中 贵州 我去了书店 现在尚有争",
        b: "b",
        c: fn1
    };

    var diff3 = {
        a: [
            "string", null, 0, "1", 1, {
                prop: null,
                foo: [1,2,null,{}, [], [1,2,3]],
                bar: undefined
            }, 3, "Hey!", "Κάνε πάντα γνωρίζουμε ας των, μηχανής επιδιόρθωσης επιδιορθώσεις ώς μια. Κλπ α" // different: missing last char
        ],
        unicode: "老 汉语中存在 港澳和海外的华人圈中 贵州 我去了书店 现在尚有争",
        b: "b",
        c: fn1
    };

    var diff4 = {
        a: [
            "string", null, 0, "1", 1, {
                prop: null,
                foo: [1,2,undefined,{}, [], [1,2,3]], // different: undefined instead of null
                bar: undefined
            }, 3, "Hey!", "Κάνε πάντα γνωρίζουμε ας των, μηχανής επιδιόρθωσης επιδιορθώσεις ώς μια. Κλπ ας"
        ],
        unicode: "老 汉语中存在 港澳和海外的华人圈中 贵州 我去了书店 现在尚有争",
        b: "b",
        c: fn1
    };

    var diff5 = {
        a: [
            "string", null, 0, "1", 1, {
                prop: null,
                foo: [1,2,null,{}, [], [1,2,3]],
                bat: undefined // different: property name not "bar"
            }, 3, "Hey!", "Κάνε πάντα γνωρίζουμε ας των, μηχανής επιδιόρθωσης επιδιορθώσεις ώς μια. Κλπ ας"
        ],
        unicode: "老 汉语中存在 港澳和海外的华人圈中 贵州 我去了书店 现在尚有争",
        b: "b",
        c: fn1
    };

    assertionFn(testedFn(same1, same2), true);
    assertionFn(testedFn(same2, same1), true);
    assertionFn(testedFn(same2, diff1), false);
    assertionFn(testedFn(diff1, same2), false);

    assertionFn(testedFn(same1, diff1), false);
    assertionFn(testedFn(same1, diff2), false);
    assertionFn(testedFn(same1, diff3), false);
    assertionFn(testedFn(same1, diff3), false);
    assertionFn(testedFn(same1, diff4), false);
    assertionFn(testedFn(same1, diff5), false);
    assertionFn(testedFn(diff5, diff1), false);
});


test("Complex Arrays.", function() {

    function fn() {
    }

    assertionFn(testedFn(
                [1, 2, 3, true, {}, null, [
                    {
                        a: ["", '1', 0]
                    },
                    5, 6, 7
                ], "foo"],
                [1, 2, 3, true, {}, null, [
                    {
                        a: ["", '1', 0]
                    },
                    5, 6, 7
                ], "foo"]),
            true);

    assertionFn(testedFn(
                [1, 2, 3, true, {}, null, [
                    {
                        a: ["", '1', 0]
                    },
                    5, 6, 7
                ], "foo"],
                [1, 2, 3, true, {}, null, [
                    {
                        b: ["", '1', 0]         // not same property name
                    },
                    5, 6, 7
                ], "foo"]),
            false);

    var a = [{
        b: fn,
        c: false,
        "do": "reserved word",
        "for": {
            ar: [3,5,9,"hey!", [], {
                ar: [1,[
                    3,4,6,9, null, [], []
                ]],
                e: fn,
                f: undefined
            }]
        },
        e: 0.43445
    }, 5, "string", 0, fn, false, null, undefined, 0, [
        4,5,6,7,8,9,11,22,33,44,55,"66", null, [], [[[[[3]]]], "3"], {}, 1/0
    ], [], [[[], "foo", null, {
        n: 1/0,
        z: {
            a: [3,4,5,6,"yep!", undefined, undefined],
            b: {}
        }
    }, {}]]];

    assertionFn(testedFn(a,
            [{
                b: fn,
                c: false,
                "do": "reserved word",
                "for": {
                    ar: [3,5,9,"hey!", [], {
                        ar: [1,[
                            3,4,6,9, null, [], []
                        ]],
                        e: fn,
                        f: undefined
                    }]
                },
                e: 0.43445
            }, 5, "string", 0, fn, false, null, undefined, 0, [
                4,5,6,7,8,9,11,22,33,44,55,"66", null, [], [[[[[3]]]], "3"], {}, 1/0
            ], [], [[[], "foo", null, {
                n: 1/0,
                z: {
                    a: [3,4,5,6,"yep!", undefined, undefined],
                    b: {}
                }
            }, {}]]]), true);

    assertionFn(testedFn(a,
            [{
                b: fn,
                c: false,
                "do": "reserved word",
                "for": {
                    ar: [3,5,9,"hey!", [], {
                        ar: [1,[
                            3,4,6,9, null, [], []
                        ]],
                        e: fn,
                        f: undefined
                    }]
                },
                e: 0.43445
            }, 5, "string", 0, fn, false, null, undefined, 0, [
                4,5,6,7,8,9,11,22,33,44,55,"66", null, [], [[[[[2]]]], "3"], {}, 1/0    // different: [[[[[2]]]]] instead of [[[[[3]]]]]
            ], [], [[[], "foo", null, {
                n: 1/0,
                z: {
                    a: [3,4,5,6,"yep!", undefined, undefined],
                    b: {}
                }
            }, {}]]]), false);

    assertionFn(testedFn(a,
            [{
                b: fn,
                c: false,
                "do": "reserved word",
                "for": {
                    ar: [3,5,9,"hey!", [], {
                        ar: [1,[
                            3,4,6,9, null, [], []
                        ]],
                        e: fn,
                        f: undefined
                    }]
                },
                e: 0.43445
            }, 5, "string", 0, fn, false, null, undefined, 0, [
                4,5,6,7,8,9,11,22,33,44,55,"66", null, [], [[[[[3]]]], "3"], {}, 1/0
            ], [], [[[], "foo", null, {
                n: -1/0,                                                                // different, -Infinity instead of Infinity
                z: {
                    a: [3,4,5,6,"yep!", undefined, undefined],
                    b: {}
                }
            }, {}]]]), false);

    assertionFn(testedFn(a,
            [{
                b: fn,
                c: false,
                "do": "reserved word",
                "for": {
                    ar: [3,5,9,"hey!", [], {
                        ar: [1,[
                            3,4,6,9, null, [], []
                        ]],
                        e: fn,
                        f: undefined
                    }]
                },
                e: 0.43445
            }, 5, "string", 0, fn, false, null, undefined, 0, [
                4,5,6,7,8,9,11,22,33,44,55,"66", null, [], [[[[[3]]]], "3"], {}, 1/0
            ], [], [[[], "foo", {                                                       // different: null is missing
                n: 1/0,
                z: {
                    a: [3,4,5,6,"yep!", undefined, undefined],
                    b: {}
                }
            }, {}]]]), false);

    assertionFn(testedFn(a,
            [{
                b: fn,
                c: false,
                "do": "reserved word",
                "for": {
                    ar: [3,5,9,"hey!", [], {
                        ar: [1,[
                            3,4,6,9, null, [], []
                        ]],
                        e: fn
                                                                                // different: missing property f: undefined
                    }]
                },
                e: 0.43445
            }, 5, "string", 0, fn, false, null, undefined, 0, [
                4,5,6,7,8,9,11,22,33,44,55,"66", null, [], [[[[[3]]]], "3"], {}, 1/0
            ], [], [[[], "foo", null, {
                n: 1/0,
                z: {
                    a: [3,4,5,6,"yep!", undefined, undefined],
                    b: {}
                }
            }, {}]]]), false);
});


test("Prototypal inheritance", function() {
    function Gizmo(id) {
        this.id = id;
    }

    function Hoozit(id) {
        this.id = id;
    }
    Hoozit.prototype = new Gizmo();

    var gizmo = new Gizmo("ok");
    var hoozit = new Hoozit("ok");

    // Try this test many times after test on instances that hold function
    // to make sure that our code does not mess with last object constructor memoization.
    assertionFn(testedFn(function () {}, function () {}), false);

    // Hoozit inherit from Gizmo
    // hoozit instanceof Hoozit; // true
    // hoozit instanceof Gizmo; // true
    assertionFn(testedFn(hoozit, gizmo), true);

    Gizmo.prototype.bar = true; // not a function just in case we skip them

    // Hoozit inherit from Gizmo
    // They are equivalent
    assertionFn(testedFn(hoozit, gizmo), true);

    // Make sure this is still true !important
    // The reason for this is that I forgot to reset the last
    // caller to where it were called from.
    assertionFn(testedFn(function () {}, function () {}), false);

    // Make sure this is still true !important
    assertionFn(testedFn(hoozit, gizmo), true);

    Hoozit.prototype.foo = true; // not a function just in case we skip them

    // Gizmo does not inherit from Hoozit
    // gizmo instanceof Gizmo; // true
    // gizmo instanceof Hoozit; // false
    // They are not equivalent
    assertionFn(testedFn(hoozit, gizmo), false);

    // Make sure this is still true !important
    assertionFn(testedFn(function () {}, function () {}), false);
});


test("Instances", function() {
    function A() {} 
    var a1 = new A(); 
    var a2 = new A(); 

    function B() {
        this.fn = function () {};
    } 
    var b1 = new B(); 
    var b2 = new B(); 

    assertionFn(testedFn(a1, a2), true, "Same property, same constructor");

    // b1.fn and b2.fn are functions but they are different references
    // But we decided to skip function for instances.
    assertionFn(testedFn(b1, b2), true, "Same property, same constructor");
    assertionFn(testedFn(a1, b1), false, "Same properties but different constructor"); // failed

    function Car(year) {
        var privateVar = 0;
        this.year = year;
        this.isOld = function() {
            return year > 10;
        };
    }

    function Human(year) {
        var privateVar = 1;
        this.year = year;
        this.isOld = function() {
            return year > 80;
        };
    }

    var car = new Car(30);
    var carSame = new Car(30);
    var carDiff = new Car(10);
    var human = new Human(30);

    var diff = {
        year: 30
    };

    var same = {
        year: 30,
        isOld: function () {}
    };

    assertionFn(testedFn(car, car), true);
    assertionFn(testedFn(car, carDiff), false);
    assertionFn(testedFn(car, carSame), true);
    assertionFn(testedFn(car, human), false);
});


test("Complex Instances Nesting (with function value in literals and/or in nested instances)", function() {
    function A(fn) {
        this.a = {};
        this.fn = fn;
        this.b = {a: []};
        this.o = {};
        this.fn1 = fn;
    }
    function B(fn) {
        this.fn = fn;
        this.fn1 = function () {};
        this.a = new A(function () {});
    }

    function fnOutside() {
    }

    function C(fn) {
        function fnInside() {
        }
        this.x = 10;
        this.fn = fn;
        this.fn1 = function () {};
        this.fn2 = fnInside;
        this.fn3 = {
            a: true,
            b: fnOutside // ok make reference to a function in all instances scope
        };
        this.o1 = {};

        // This function will be ignored.
        // Even if it is not visible for all instances (e.g. locked in a closures),
        // it is from a  property that makes part of an instance (e.g. from the C constructor)
        this.b1 = new B(function () {});
        this.b2 = new B({
            x: {
                b2: new B(function() {})
            }
        });
    }

    function D(fn) {
        function fnInside() {
        }
        this.x = 10;
        this.fn = fn;
        this.fn1 = function () {};
        this.fn2 = fnInside;
        this.fn3 = {
            a: true,
            b: fnOutside, // ok make reference to a function in all instances scope

            // This function won't be ingored.
            // It isn't visible for all C insances
            // and it is not in a property of an instance. (in an Object instances e.g. the object literal)
            c: fnInside
        };
        this.o1 = {};

        // This function will be ignored.
        // Even if it is not visible for all instances (e.g. locked in a closures),
        // it is from a  property that makes part of an instance (e.g. from the C constructor)
        this.b1 = new B(function () {});
        this.b2 = new B({
            x: {
                b2: new B(function() {})
            }
        });
    }

    function E(fn) {
        function fnInside() {
        }
        this.x = 10;
        this.fn = fn;
        this.fn1 = function () {};
        this.fn2 = fnInside;
        this.fn3 = {
            a: true,
            b: fnOutside // ok make reference to a function in all instances scope
        };
        this.o1 = {};

        // This function will be ignored.
        // Even if it is not visible for all instances (e.g. locked in a closures),
        // it is from a  property that makes part of an instance (e.g. from the C constructor)
        this.b1 = new B(function () {});
        this.b2 = new B({
            x: {
                b1: new B({a: function() {}}),
                b2: new B(function() {})
            }
        });
    }


    var a1 = new A(function () {});
    var a2 = new A(function () {});
    assertionFn(testedFn(a1, a2), true);

    assertionFn(testedFn(a1, a2), true); // different instances

    var b1 = new B(function () {});
    var b2 = new B(function () {});
    assertionFn(testedFn(a1, a2), true);

    var c1 = new C(function () {});
    var c2 = new C(function () {});
    assertionFn(testedFn(c1, c2), true);

    var d1 = new D(function () {});
    var d2 = new D(function () {});
    assertionFn(testedFn(d1, d2), false);

    var e1 = new E(function () {});
    var e2 = new E(function () {});
    assertionFn(testedFn(e1, e2), false);

});


test("jQuery.", function() {
    // equals
    var e1 = $(document);
    var e2 = $(document);
    var e3 = $("");
    var e4 = $("");
    var e5 = $([]);
    var e6 = $([]);
    var e7 = $("#this-id-does-not-exists");
    var e8 = $("#this-id-does-not-exists");
    var e9 = $("<div></div>");
    var e10 = $("<div></div>");

    assertionFn(testedFn(jQuery, $), true);
    assertionFn(testedFn(e1, e2), true);
    assertionFn(testedFn(e3, e4), true);
    assertionFn(testedFn(e5, e6), true);
    assertionFn(testedFn(e7, e8), true);
    //console.log(e9);
    //assertionFn(testedFn(e9, e10), true);

    // different
    var d1 = $("<div class='hd'></div>");
    var d2 = $("<div></div>");
    //assertionFn(testedFn(d1, d2), false);
});


test("Multiple arguments.", function() {

    function genPowerZero(from, to) {
        var results = [];
        for (var i = to; i >= from; i--) {
            results.push(Math.pow(i, 0));
        }
        return results;
    }

    function genDivisionByZero(from, to) {
        var results = [];
        for (var i = to; i >= from; i--) {
            results.push((i / 0));
        }
        return results;
    }

    function genNaN(from, to) {
        var results = [];
        for (var i = to; i >= from; i--) {
            results.push((i / "foo"));
        }
        return results;
    }

    assertionFn(testedFn.apply(this, genPowerZero(1,100)), true, "All number from 1 to 100 power 0 equals 1");
    assertionFn(testedFn.apply(this, genDivisionByZero(1,10)), true, "All number from 1 to 10 divided by 0 equals infinity");
    assertionFn(testedFn.apply(this, genDivisionByZero(0,10)), false, "All number from 0 to 10 divided by 0 equals infinity"); // false for 0/0 (NaN)
    assertionFn(testedFn.apply(this, genNaN(0,10)), true, "All number from 0 to 10 divided by a string is NaN");

    assertionFn(testedFn("foobar", "foobar", "foobar", "foobar"), true);
    assertionFn(testedFn("foobar", "foobax"), false);
    assertionFn(testedFn("foobar", "foobar", "foobax", "foobax"), false);

    assertionFn(testedFn(0, 0, 0, 0, 0), true);
    assertionFn(testedFn(0, 0, 0, 1, 0), false);
    assertionFn(testedFn(0, 0, 0, 1, 0), false);
    assertionFn(testedFn(0, 0, 0, {}, 0), false);
    assertionFn(testedFn(0, 0, 0, 0, function() {}), false);

    assertionFn(testedFn(true, false, true), false);
});


test("Test that must be done at the end because they extend some primitive's prototype", function() {
    // Try that a function looks like our regular expression.
    // This tests if we check that a and b are really both instance of RegExp
    Function.prototype.global = true;
    Function.prototype.multiline = true;
    Function.prototype.ignoreCase = false;
    Function.prototype.source = "my regex";
    var re = /my regex/gm;
    assertionFn(testedFn(re, function () {}), false, "A function that looks that a regex isn't a regex");
    // This test will ensures it works in both ways, and ALSO especially that we can make differences
    // between RegExp and Function constructor because typeof on a RegExpt instance is "function"
    assertionFn(testedFn(function () {}, re), false, "Same conversely, but ensures that function and regexp are distinct because their constructor are different");
});

