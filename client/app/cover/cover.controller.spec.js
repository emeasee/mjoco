'use strict';

describe('Controller: CoverCtrl', function () {

  // load the controller's module
  beforeEach(module('mjocoApp'));

  var CoverCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CoverCtrl = $controller('CoverCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
