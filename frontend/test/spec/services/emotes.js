'use strict';

describe('Service: emotes', function () {

  // load the service's module
  beforeEach(module('websiteApp'));

  // instantiate service
  var emotes;
  beforeEach(inject(function (_emotes_) {
    emotes = _emotes_;
  }));

  it('should do something', function () {
    expect(!!emotes).toBe(true);
  });

});
