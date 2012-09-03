<?php

/* Get the route number from getRoute().
 * Receive the "route" value via AJAX call from getroute() in index.html
 * Sanitize it.
 * Query bart.db
 * Don't ship Junk!!
 */
class RouteInfo {
  //public $noerror=false;
  public $station=array();
  public $route=array();
}
$routeinfo=new RouteInfo();

header("Content-type:application/json");
$db=new SQLite3('bart.db');
//$route=mysql_real_escape_string($_GET['route']);
$route=mysql_real_escape_string($_POST['route']);

$stmt=$db->prepare("SELECT stations.name as stname,stations.abbr,stations.slan,stations.slong,
                    routes.color,routes.name as rtname
                    FROM stations,routes,rtstn
                    WHERE stations.id=rtstn.stnid AND rtstn.rtid=routes.id AND rtstn.rtid=:route");

$stmt->bindValue(':route',$route,SQLITE3_INTEGER);
$result=$stmt->execute();

while($row=$result->fetchArray(SQLITE3_ASSOC)) {

  //echo "<pre>";
  //print_r($row);
  //echo "</pre>";
  $routeinfo->route['name']=$row['rtname'];
  $routeinfo->route['color']=$row['color'];
  $routeinfo->station[$row['abbr']]['name']=$row['stname'];
  $routeinfo->station[$row['abbr']]['slat']=$row['slan'];  
  $routeinfo->station[$row['abbr']]['slong']=$row['slong'];
}
//echo "<pre>";
print(json_encode($routeinfo));
//print_r($routeinfo);
//echo "</pre>";

?>