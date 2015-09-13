'use strict';

angular.module('mjocoApp')

  .filter('reverse', function() {
    return function(input, uppercase) {
      var out = "";
      for (var i = 0; i < input.length; i++) {
        out = input.charAt(i) + out;
      }
      // conditional based on optional argument
      if (uppercase) {
        out = out.toUpperCase();
      }
      return out;
    };
  })

  .filter('range', function() {
    return function(input, currentIndex) {
      var output = [];
      for (var i in input) {
        if (i > currentIndex - 8 && i < currentIndex + 6) {
          output.push(input[i]);
        }
      }
      return output;
    };
  })

  .filter('encodeURI', function() {
    return function(input) {
      return window.encodeURI(input);
    };
  })

  .filter('encodeURIComponent', function() {
    return function(input) {
      return window.encodeURIComponent(input);
    };
  })

  .filter('fromNow', function() {
    return function(date) {
      return moment.utc(date).local().fromNow();
    };
  })

  .filter('longDate', function() {
    return function(date) {
      return moment(date).format('Do MMMM YYYY');
    };
  })

  .filter('shortDate', function() {
    return function(date) {
      return moment(date).format('DD.MM.YY');
    };
  })

  .filter('pad', function() {
    return function(n, l, z) {
      z = z || '0';
      l = l || 2;
      n = n + '';
      return n.length >= l ? n : new Array(l - n.length + 1).join(z) + n;
    };
  })

  .filter('if', function() {
    return function(input, trueValue, falseValue) {
      return input ? trueValue : falseValue;
    };
  })

  .filter('noneBreaking', function() {
    return function(input) {
      if (input !== undefined) {
        return input.replace(/ /g, "&nbsp;");
      }
    };
  })
  .filter('widowFix', function() {
    return function(input) {
      if (input !== undefined) {

        var wrapper= document.createElement('div');
        wrapper.innerHTML = input;

        var elems = wrapper.querySelectorAll('div, p, h1, h2, h3, h4');
        var minWords = 5;

        angular.forEach(elems, function(value, key){
          var htmlString = elems[key].innerHTML;
          htmlString = htmlString.replace(/>\s+</g,'');
          var wordArray = htmlString.trim().split(' ');
          if (wordArray.length > minWords) {
            wordArray[wordArray.length-2] += '\u00A0' + wordArray[wordArray.length-1];
            wordArray.pop();
            htmlString = wordArray.join(' ');
          }
          elems[key].innerHTML = htmlString;
        });

        return wrapper.innerHTML;
      }
    };
  })
  .filter('smartQuotes', function() {
    return function(input) {
      if (input !== undefined) {
        return input
          .replace(/\s"/, ' “')
          .replace(/"\s/, '” ')
          .replace(/\s'/, ' ‘')
          .replace(/'\s/, '’ ')
          .replace(/^'/, '‘')
          .replace(/'$/, '’');
      }
    };
  });
