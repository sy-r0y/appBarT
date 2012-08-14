// define global map variable
//var bartMap;
// define static routes
var route1 = [
	            new google.maps.LatLng(37.803664, -122.271604),
	            new google.maps.LatLng(37.765062, -122.419694),
	            new google.maps.LatLng(37.80787, -122.269029)
	        ];
var route2 = [
	            new google.maps.LatLng(37.752254, -122.418466),
	            new google.maps.LatLng(37.853024, -122.26978),
	            new google.maps.LatLng(37.72198087, -122.4474142)
	        ];
function displayRoute(route, map)
{
    var routeMap = new google.maps.Polyline(
	            {
	                path: route,
	                strokeColor: "black",
	                strokeOpacity: 1.0,
	                strokeWeight: 2
	            });
    routeMap.setMap(map);
};
