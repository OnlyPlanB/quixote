// Copyright (c) 2014-2016 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var assert = require("../util/assert.js");
var Position = require("./position.js");
var Value = require("./value.js");
var Pixels = require("./pixels.js");
var Size = require("./size.js");

describe("VALUE: Position", function() {

	var x1 = Position.x(10);
	var x2 = Position.x(20);
	var x1b = Position.x(10);

	var y1 = Position.y(50);
	var y2 = Position.y(80);

	var noX = Position.noX();
	var noY = Position.noY();

	it("is a value object", function() {
		assert.implements(x1, Value);
	});

	it("can be constructed from pixels", function() {
		assert.objEqual(Position.x(Pixels.create(10)), x1);
	});

	it("can be be non-rendered", function() {
		assert.objEqual(Position.noX(), noX, "x");
		assert.objEqual(Position.noY(), noY, "y");
	});

	it("responds to value()", function() {
		assert.equal(x1.value(), x1);    // note identity comparison, not objEqual()
	});

	it("performs arithmetic on itself", function() {
		assert.objEqual(x1.plus(x2), Position.x(30), "plus x");
		assert.objEqual(y1.plus(y2), Position.y(130), "plus y");
		assert.objEqual(x2.minus(x1), Position.x(10), "minus x");
		assert.objEqual(y2.minus(y1), Position.y(30), "minus y");
	});

	it("performs arithmetic on size", function() {
		assert.objEqual(x1.plus(Size.create(42)), Position.x(52), "plus");
		assert.objEqual(x1.minus(Size.create(7)), Position.x(3), "minus");
	});

	it("computes midpoint", function() {
		assert.objEqual(x1.midpoint(x2), Position.x(15), "left to right");
		assert.objEqual(x2.midpoint(x1), Position.x(15), "right to left");
		assert.objEqual(y1.midpoint(y2), Position.y(65), "top to bottom");
		assert.objEqual(y2.midpoint(y1), Position.y(65), "bottom to top");
	});

	it("allows computation with non-rendered values (but result is always non-rendered)", function() {
		assert.objEqual(noX.plus(noX), noX, "non-rendered + non-rendered");
		assert.objEqual(noX.plus(x1), noX, "non-rendered + on-screen");
		assert.objEqual(x1.plus(noX), noX, "on-screen + non-rendered");

		assert.objEqual(noX.plus(Size.create(42)), noX, "non-rendered + size");
	});

	it("determines difference between displayed positions", function() {
		assert.equal(x1.diff(x1b), "", "same");

		assert.equal(x1.diff(x2), "10px further left than expected", "less than expected - horizontal");
		assert.equal(x2.diff(x1), "10px further right than expected", "more than expected - horizontal");

		assert.equal(y1.diff(y2), "30px higher than expected", "less than expected - vertical");
		assert.equal(y2.diff(y1), "30px lower than expected", "more than expected - vertical");
	});

	it("determines difference between undisplayed positions", function() {
		assert.equal(noX.diff(noX), "", "same");
		assert.equal(x1.diff(noX), "rendered when not expected", "rendered");
		assert.equal(noX.diff(x1), "not rendered", "non-rendered");
	});

	it("fails fast when doing stuff with incompatible dimensions", function() {
		var expected = "Can't compare X coordinate to Y coordinate";
		assert.exception(function() { x1.plus(y1); }, expected, "plus");
		assert.exception(function() { x1.minus(y1); }, expected, "minus");
		assert.exception(function() { x1.midpoint(y1); }, expected, "midpoint");
		assert.exception(function() { x1.equals(y1); }, expected, "equals");
		assert.exception(function() { x1.diff(y1); }, expected, "diff");
	});

	it("converts to pixels", function() {
		assert.objEqual(x1.toPixels(), Pixels.create(10));
	});

	it("converts to string", function() {
		assert.equal(x1.toString(), "10px");
		assert.equal(noX.toString(), "not rendered");
	});

});

