var map;
var poly=[];
var stations=[];
var route=[];
var Rt;
var Clr;
var polyroute;
function init()
{
    alert("1. INSIDE init()");
    var elem=document.getElementById('canvas_map');
    var latlng=new google.maps.LatLng(37.752254,-122.418466);
    var opt={zoom:13,
             center:latlng,
             mapTypeId:google.maps.MapTypeId.ROADMAP,
             disableAutoPan:true,
             navigationControl:true,
             navigationControlOptions:{style:google.maps.NavigationControlStyle.small},
             mapTypeControl:true
	    };
    map=new google.maps.Map(elem,opt);
} //init ends here.

function draw(lat,lon,name) 
{
//    console.log("Lat:- "+lat+", Lon:- "+lon+", Name:- "+name+"Color:- "+Clr+" Route:- "+Rt);
    route.push(new google.maps.LatLng(lat,lon));

  var mark=new google.maps.Marker({
	position:new google.maps.LatLng(lat,lon),
	title:name,
	clickable:true,
	map:map
    });
    stations.push(mark);
    drawinfo(mark,name);	  
}

function drawinfo(mark,name) {
    var strContent='<div id="content" style="width:300px;height:100px;"><div id="stn" style="font-weight:bold;margin:auto;padding:2px;">Station: '+this.name+'</div><br/><div id="route" style="margin-top:0.5em;padding:2px;background-color:'+Clr+';float:left;font-size:0.8em;font-weight:bold">Route: '+Rt+'</div><div id="arrdep" style="margin-left:2px;float:right;"><table style="border:0px;"><thead>Arrival-Departure</thead><tr><td></td></tr></table></div></div>';

    var infowindow=new google.maps.InfoWindow({
	content:strContent
    });
    google.maps.event.addListener(mark,'click',function(){infowindow.open(map,mark);});
}
function drawpoly() {
    var polyoptions={
	    path:route,
	    strokeColor:Clr,
	    strokeWeight:10,
	    strokeOpacity:1.0
	};
    polyroute=new google.maps.Polyline(polyoptions);
    poly.push(polyroute);
    polyroute.setMap(map);
}
function clearOverlays() {
    for(var i=0;i<stations.length;i++) {
	stations[i].setMap(null); //Take the station markers one by one and clear them.
    }
    stations=[]; // De-reference all the station markers.
    for(var j=0;j<poly.length;j++) {
	poly[j].setMap(null);

    }
    poly=[]; //Dereference all the polyline elements.
    route=[]; //Dereference all the station markers.
}

/* For getRoute():-
 * Receive the route number from the user.
 * Do sanity check.
 * If pass, send the route number to getroute.php via an AJAX call(using jQuery).
 * Receive the JSON response, parse it. 
 * Add the station overlays onto the map.
 * Change the center to the first station.
 */
function getRoute(routenum) { 
    alert("2. INSIDE getRoute()");
    clearOverlays();
    var stn;
    $(document).ready(function() {
	var lat;var lon;var name;
	if(routenum=='') { return false; }
	$.getJSON('getroute.php',{route:routenum},function(data) {
            $.each(data,function(key,value) {
		if(key=='route') { 
		    alert("Key: Route.");
		    $.each(this,function(k,v) {
			if(k=='name'){Rt=v;}
			if(k=='color'){Clr=v;}
		    }); 
		}
		if(key=='station') { 
		    alert("Key: Station");
		    $.each(this,function(k,v) {
			//console.log("Key:- "+k);
			$.each(this,function(k2,v2) {
			    if(k2=='name'){ name=v2; }
			    if(k2=='slat'){ lat=v2; }
			    if(k2=='slong'){ lon=v2; }
			});
			draw(lat,lon,name);
			drawpoly();
//			console.log("Lat:- "+lat+", Lon:- "+lon+", Name:- "+name);
		    });
		}

            }); //$.each
//            console.log("Route Name: "+Rt+" ,Route Color: "+Clr);

	}); //$.getJSON

    });//$(document)
}
