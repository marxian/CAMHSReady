/* global jQuery */
'use strict';

describe('Directive: d3cloud', function () {
  beforeEach(module('docready'));

  var element;

  // jQuery clicks don't seem to get dispatched by d3 - here's a fix
  jQuery.fn.d3Click = function () {
    this.each(function (i, e) {
      var evt = document.createEvent('MouseEvents');
      evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      e.dispatchEvent(evt);
    });
  };

  it('should contain an svg', inject(function ($rootScope, $compile) {
    $rootScope.words = [{text: 'this', count: 2},{text:'that',count:1}];
    element = angular.element('<d3cloud width=\"200\" height=\"200\" words=\"words\"></d3cloud>');
    element = $compile(element)($rootScope);
    expect(element.children()[0].tagName).toBe('svg');
  }));

  it('should render text from the wordlist into the svg', inject(function ($rootScope, $compile) {
    $rootScope.words = [];
    element = angular.element('<d3cloud width=\"200\" height=\"200\" words=\"words\"></d3cloud>');
    element = $compile(element)($rootScope);
    $rootScope.words = [{text: 'this', count: 2},{text:'that',count:1}];
    $rootScope.$apply();
    expect(element.text()).toEqual(_.pluck($rootScope.words, 'text').join(''));
  }));

  it('should call any navigate function with any clicked text', inject(function ($rootScope, $compile) {
    $rootScope.words = [];
    $rootScope.navigate = function(){};
    spyOn($rootScope, 'navigate');
    element = angular.element('<d3cloud width=\"200\" height=\"200\" words=\"words\" navigate=\"navigate\"></d3cloud>');
    element = $compile(element)($rootScope);
    $rootScope.words = [{text: 'this', count: 2},{text:'that',count:1}];
    $rootScope.$apply();
    jQuery('text:eq(0)', element).d3Click();
    expect($rootScope.navigate).toHaveBeenCalledWith('this');
  }));

  it('should not raise an error if no navigation function is provided', inject(function ($rootScope, $compile) {
    $rootScope.words = [];
    $rootScope.navigate = function(){};
    spyOn($rootScope, 'navigate');
    element = angular.element('<d3cloud width=\"200\" height=\"200\" words=\"words\"></d3cloud>');
    element = $compile(element)($rootScope);
    $rootScope.words = [{text: 'this', count: 2},{text:'that',count:1}];
    $rootScope.$apply();
    jQuery('text:eq(0)', element).d3Click();
    expect($rootScope.navigate.calls.length).toEqual(0);
  }));
});
