/*
* rwdImageMaps AngularJS Directive v1.0
*
* Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize
* 
* Original Copyright (c) 2013 Matt Stow
* https://github.com/stowball/jQuery-rwdImageMaps
* http://mattstow.com
* Licensed under the MIT license
*
* angular-rwdImageMaps.js (by Philip Saa)
* https://github.com/cowglow/
* @cowglow
*
* http://mlwmlw.org
* Remove jQuery dependency
* @mlwmlw
*/

angular.module('rwdImageMaps',[])
	.directive('rwdimgmap', function($window){
		return{
			restrict: 'CA',
			link:function(scope, element, attrs) {

				element.bind('load', function() {

					var w = element[0].naturalWidth,
						h = element[0].naturalHeight,
						origin = [];
					function resize() {
						if (!w || !h) {
							var temp = new Image();
							temp.src = element[0].src;
							if(temp.src == undefined)
								temp.src = element[0].ng-src;

							if (!w)
								w = temp.width;
							if (!h)
								h = temp.height;
						}
						
						var wPercent = element[0].width/w,
							hPercent = element[0].height/h,
							map = attrs.usemap.replace('#', ''),
							c = 'coords';
						angular.forEach(angular.element(document.getElementsByName(map)).find('area'), function(area, i){
							if (!area[c]){
								return;
							}
							if(!origin[i])
								origin[i] = area[c];

							var coords = origin[i].split(','),
								coordsPercent = new Array(coords.length);
							
							for (var i = 0; i<coordsPercent.length; ++i){
								if (i % 2 === 0){
									coordsPercent[i] = parseInt(coords[i] * wPercent);
								} else {
									coordsPercent[i] = parseInt(coords[i] * hPercent);
								};
							};
							area[c] = coordsPercent.toString();
						});
					}
					angular.element($window).bind('resize', resize).triggerHandler('resize');
				});
			}
		};
	});