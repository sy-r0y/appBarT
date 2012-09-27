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
    //    drawinfo(mark,abbr,name);	  
    google.maps.event.addListener(mark,'click',function() {
	infowindow.close();
	$.getJSON("getetd.php",{abbr:abbr},function(result) {
	    $.each(result,function(key,value) {
		$.each(this,function(k,v) {
		    //		    strContent+="<tr><td>|"+k+"</td>";
		    //		strContent+='<tr><td style="font-size:0.5em;"></td>';
		    $.each(this,function(k2,v2) {
			$.each(this,function(k3,v3) {
			    var content+=v3;
			    console.log(k2+'  '+v3);
//			    infowindow.setContent(content+"|"+v3);
			    //			    strContent+="<td>"+v3+"</td>";
			    //			strContent+='<td style="font-size:0.5em;"></td>';
			});
		    });
		    //		    strContent+="</tr>";
		});
	    });
	}); //getJSON() ends
//	infowindow.setContent("HAHAHA:- "+mark.title);
	infowindow.open(map,mark);
    }); //addListener() Ends.
    drawpoly();
}
//function drawinfo(mark,abbr,name) {
//    var strContent='<div id="content" style="width:300px;height:100px;"><div id="stn" style="font-weight:bold;margin:auto;padding:2px;"><p>Station: '+name+'</p></div><br/><div id="route" style="margin-top:0.5em;padding:2px;background-color:'+Clr+';float:left;font-size:0.8em;font-weight:bold">HahaRoute: '+Rt+'</div><div id="arrdep" style="margin-left:2px;float:right;"><table style="border:0px;font-size:0.5em;color:#666"><thead>Departure</thead><tr><td>Destination: </td><td>Time1 </td><td>Time2 </td><td>Time3 </td></tr></table></div></div>';
//    var strContent2;
/*    google.maps.event.addListener(mark,'click',function(){
	infowindow.close();
	//	alert("KEY:- "+stn);
	//	$.getJSON("getetd.php",{abbr:
	infowindow.setContent(strContent);
	$('#content').append("<p>Hello World</p>");
	infowindow.setContent(strContent);
	infowindow.open(map,mark);
   });
  */  
/*    var strContent='<div id="content" style="position:absolute;overflow:auto;width:490px;height:200px;"><div id="stn" style="font-weight:bold;margin:auto;padding:0.5em;"><p>Station: '+name+'</p></div><br/><div id="route" style="margin-top:0.5em;padding:0.5em;background-color:'+Clr+';float:left;font-size:0.8em;font-weight:bold">Route: '+Rt+'</div><div id="arrdep" style="margin-left:0.5em;float:right;"><table style="border:0px;font-size:0.5em;color:#666"><thead><tr><td>Departures</td></tr></thead><tbody>';
*/

/*    var strContent="<div style=\"width:400px;height:240px;\"><div style=\"font-weight:bold;padding:0.5em;\"><p>Station:"+name+"</p></div><br/><div style=\"margin-top:0.3em;background-color:"+Clr+";float:left;font-size:0.8em;font-weight:bold;\"><p>Route:"+Rt+"</p></div><div style=\"float:right;\"><table style=\"border:0;color:#666;\"><tr><td>Departures</td></tr>";

//  <tr><td>Destination: </td><td>Time1 </td><td>Time2 </td><td>Time3 </td></tr></table></div></div>;
    $.getJSON("getetd.php",{abbr:abbr},function(result) {
	$.each(result,function(key,value) {
	    $.each(this,function(k,v) {
		strContent+="<tr><td>|"+k+"</td>";
//		strContent+='<tr><td style="font-size:0.5em;"></td>';
		$.each(this,function(k2,v2) {
		    $.each(this,function(k3,v3) {
			strContent+="<td>"+v3+"</td>";
//			strContent+='<td style="font-size:0.5em;"></td>';
		    });
		});
		strContent+="</tr>";
	    });
	});
    }); //getJSON() ends
    strContent+="</table></div></div>";
//    infowindow.setContent(strContent);
    google.maps.event.addListener(mark,'click',function(){
	infowindow.close();
	infowindow.setContent(strContent);
	infowindow.open(map,mark);
    });
    /*
     {
      "etd":{
            "Dublin\/Pleasanton":[
	              {"0":"Leaving"},
		      {"0":"4"},
		      {"0":"19"}
		      ],
	    "Fremont":[
	              {"0":"11"},
		      {"0":"26"},
		      {"0":"41"}
	              ],
	    "Millbrae":[
	               {"0":"3"},
		       {"0":"28"},
		       {"0":"34"}
		       ],
	    "Pittsburg\/Bay Point":[
	               {"0":"7"},
		       {"0":"22"},
		       {"0":"37"}
		       ],
	    "Richmond":[
	               {"0":"14"},
		       {"0":"30"},
		       {"0":"45"}
		       ],
	    "SF Airport":[
	               {"0":"11"},
		       {"0":"30"},
		       {"0":"42"}
		       ]
	}
 }
 */
/*    var strContent='<div id="content" style="width:300px;height:100px;"><div id="stn" style="font-weight:bold;margin:auto;padding:2px;"><p>Station: '+name+'</p></div><br/><div id="route" style="margin-top:0.5em;padding:2px;background-color:'+Clr+';float:left;font-size:0.8em;font-weight:bold">Route: '+Rt+'</div><div id="arrdep" style="margin-left:2px;float:right;"><table style="border:0px;"><thead>Departure</thead><tr><td></td></tr></table></div></div>';

    google.maps.event.addListener(mark,'click',function(){
	infowindow.close();
//	alert("KEY:- "+stn);
//	$.getJSON("getetd.php",{abbr:
	infowindow.setContent(strContent);
	infowindow.open(map,mark);
    });*/
//}

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
