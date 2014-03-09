"use strict";
var assert = require("assert");

// Array
var esf = require("../");
it("should return same input", function () {
    assert.equal(esf("fn([1,2,3])"), "fn([1,2,3])");
});
