var map;
var poly=[];
var stations=[];
var route=[];
var Rt;
var Clr;
var polyroute;
var infowindow=new google.maps.InfoWindow();

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

function draw(lat,lon,abbr,name)
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
    google.maps.event.addListener(mark,'click',function() {
	infowindow.setContent(null);
	infowindow.close();
	var content='<div style="width:400px;"><div>Station: '+name+'</div>';
	content+='<div style="margin-top:12%;float:left;background-color:'+Clr+'">'+Rt+'</div>';
	content+='<div style="float:right;"><table style="border:0;font-weight:bold;"><tr><td>Departures<span style="font-size:0.6em;">(in Mins)</span></td></tr>';
	
	$.ajaxSetup({async:false}); /* To ensure, the DOM is not altered until data is at hand(otherwise                                             * setContent() gets called withouth any data at hand, which then overflows.
				     */
	$.getJSON("getetd.php",{abbr:abbr},function(result) {
	    $.each(result,function(key,value) {
		$.each(this,function(k,v) {
//		    console.log('K:-'+k+', V:-'+v);
		    content+='<tr style="font-size:0.5em;color:#666;"><td>'+k+':-</td>';
		    $.each(this,function(k2,v2) {
			$.each(this,function(k3,v3) {
 			    content+='<td>'+v3+'</td>';
			    
			});
		    });
		    content+='</tr>';
		});
	    });
	}); //getJSON() ends
	content+='</table></div></div>';
	infowindow.setContent(content);
	infowindow.open(map,mark);
    }); //addListener() Ends.
    drawpoly();
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
    clearOverlays();
    $(document).ready(function() {
	var lat;var lon;var name;var abbr;
	if(routenum=='') { return false; }
	$.getJSON('getroute.php',{route:routenum},function(data) {
            $.each(data,function(key,value) {
		if(key=='route') { 
		    $.each(this,function(k,v) {
			if(k=='name'){Rt=v;}
			if(k=='color'){Clr=v;}
		    }); 
		}
		if(key=='station') { 
		    $.each(this,function(k,v) {
			abbr=k;
//			console.log("Key:- "+abbr);
			$.each(this,function(k2,v2) {
			    if(k2=='name'){ name=v2; }
			    if(k2=='slat'){ lat=v2; }
			    if(k2=='slong'){ lon=v2; }
			});
			draw(lat,lon,abbr,name);
//			console.log("Lat:- "+lat+", Lon:- "+lon+", Name:- "+name);
		    });
		}
            }); //$.each
//            console.log("Route Name: "+Rt+" ,Route Color: "+Clr);
	}); //$.getJSON()
    });//$(document)
}
