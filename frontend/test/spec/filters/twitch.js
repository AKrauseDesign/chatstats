'use strict';

describe('Filter: twitch', function () {

  // load the filter's module
  beforeEach(module('websiteApp'));

  // initialize a new instance of the filter before each test
  var twitch;
  beforeEach(inject(function ($filter) {
    twitch = $filter('twitch');
  }));

  it('should return the input prefixed with "twitch filter:"', function () {
    var text = 'angularjs';
    expect(twitch(text)).toBe('twitch filter: ' + text);
  });

});
