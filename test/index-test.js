"use strict";
var assert = require("assert");

// Array
var esf = require("../");
it("should return same input", function () {
    var code = "fn([1,2,3]);";
    assert.equal(esf(code), code);
});
