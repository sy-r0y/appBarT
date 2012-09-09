/*
'<div id="content">
                      <div id="stn" style="position:absolute;">Station: '+name+'</div>
                      <br/>
                      <div style="background-color:'+Clr+';float:left;">Route: '+Rt+'</div>
                      <div id="arrdep" style="float:right;">
                        <table style="width:100%;border:0px;">
                          <thead>Arrival-Departure</thead><tr><td></td></tr>
                        </table>
                      </div>
                    </div>';
*/

/******************************************/
var map;
var stations=[];
var polyRoute=[];
var Rt;
var Clr;
function init()
{
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
/* Will draw the new station markers onto the map.
 * Will create the info windows for the markers(stations).
 * Will draw the polyline along the stations for showing the route map.
 */ 

//    console.log("Lat: "+lat+", Lon: "+lon+", Name: "+name);
    var mark=new google.maps.Marker({
	position:new google.maps.LatLng(lat,lon),
	title:name,
	clickable:true,
	map:map
    });
    stations.push(mark);
    polyRoute.push(lat,lon);
    var strContent='<div id="content" style="width:300px;height:100px;"><div id="stn" style="font-weight:bold;margin:auto;padding:2px;">Station: '+name+'</div><br/><div id="route" style="margin-top:0.5em;padding:2px;background-color:'+Clr+';float:left;font-size:0.8em;font-weight:bold">Route: '+Rt+'</div><div id="arrdep" style="margin-left:2px;float:right;"><table style="border:0px;"><thead>Arrival-Departure</thead><tr><td></td></tr></table></div></div>';


    var infowindow=new google.maps.InfoWindow({
	content:strContent
    });
    google.maps.event.addListener(mark,'click',function(){infowindow.open(map,mark);});

    return false;
}
function clearOverlays() {
    for(var i=0;i<stations.length;i++) {
	stations[i].setMap(null); //Take the station markers one by one and clear them.
    }
    stations=[]; // De-reference all the station markers.
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
    clearOverlays();
    var stn;
    $(document).ready(function() {
	var marker;var lat;var lon;var name;
	if(routenum=='') { return false; }
	$.getJSON('getroute.php',{route:routenum},function(data) {
            $.each(data,function(key,value) {
		if(key=='route') { 
		    alert("Key: Route.");
		    $.each(this,function(k,v) {
			if(k=='name'){Rt=v;}
			if(k=='color'){Clr=v;}
			//           stn=JSON.stringify({stn,key:{"name":name,"lat":lat,"lon":lon}});
		    }); 
		}
		//          $.each(stn,function(x,y){$.each(this,function(p,q){console.log(p+" : "+q)});});
		if(key=='station') { 
		    alert("Key: Station");
		    $.each(this,function(k,v) {
			//console.log("Key:- "+k);
			$.each(this,function(k2,v2) {
			    if(k2=='name'){ name=v2; }
			    if(k2=='slat'){ lat=v2; }
			    if(k2=='slong'){ lon=v2; }
//			    stn=JSON.stringify({stn,key:{"name":name,"lat":lat,"lon":lon}});
			    
			});
//			var mark=new google.maps.Marker( {
//			    position:new google.maps.LatLng(lat,lon),
//			    title:name,clickable:true,map:map
//			});
			draw(lat,lon,name);
		    });
		}
		//draw(lat,lon,name);
            }); //$.each
//            console.log("Route Name: "+Rt+" ,Route Color: "+Clr);
//	    draw(lat,lon,name);
	}); //$.getJSON
//	draw(lat,lon,name);
    });//$(document)
   

}
