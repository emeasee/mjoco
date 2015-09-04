'use strict';

describe('Controller: VitalsCtrl', function () {

  // load the controller's module
  beforeEach(module('mjocoApp'));

  var VitalsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VitalsCtrl = $controller('VitalsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
