/**
 * Angular Truncate - Ellipsis for your templates
 * @version v0.1.0 - 2014-08-22
 * @link http://sparkalow.github.com/angular-truncate
 * @author Brian Mathews (sparkalow)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('truncate', [])
    .filter('characters', function () {
        return function (input, chars, breakOnWord) {
            if (isNaN(chars)) return input;
            if (chars <= 0) return '';
            if (input && input.length > chars) {
                input = input.substring(0, chars);

                if (!breakOnWord) {
                    var lastspace = input.lastIndexOf(' ');
                    //get last space
                    if (lastspace !== -1) {
                        input = input.substr(0, lastspace);
                    }
                }else{
                    while(input.charAt(input.length-1) === ' '){
                        input = input.substr(0, input.length -1);
                    }
                }
                if ( input.charAt(input.length-1) === ',' ) {
                    input = input.substr(0, input.length-1);
                }
                return input + '\u2026';
            }
            return input;
        };
    })
    .filter('words', function () {
        return function (input, words, tolerance) {

            tolerance = parseFloat(tolerance || 0, 10);

            if (isNaN(words)) return input;
            if (words <= 0) return '';
            if ( tolerance && tolerance < 1 ) {
                tolerance = Math.ceil( words * tolerance );
            }

            if (input) {
                var inputWords = input.split(/\s+/);
                if (inputWords.length > words + tolerance ) {
                    input = inputWords.slice(0, words).join(' ');

                    if ( input.charAt(input.length-1) === ',' ) {
                        input = input.substr(0, input.length-1);
                    }

                    input = input + '\u2026'; 
                }
            }
            return input;
        };
    });
