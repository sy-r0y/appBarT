<?php

/* Get the route number from getRoute().
 * Receive the "route" value via AJAX call from getroute() in index.html
 * Sanitize it.
 * Query bart.db
 * Don't ship Junk!!
 */

class RouteInfo {
  public $stnAbbr;
  public $stnName;
  public $rtColor;
  public $stnLan;
  public $stnLong;
  public $noerror=false;
}
//header("Content-type:application/json");
$route=mysql_real_escape_string($_GET['route']);

$db=new SQLite3('bart.db');

//$route=mysql_real_escape_string($_POST['route']);
//$result=$route."haha";

/* SELECT stations.name,stations.abbr,stations.slan,stations.slong,routes.color,routes.name
 * FROM stations,routes,rtstn
 * WHERE stations.id=rtstn.rtid
 * AND rtstn.rtid=routes.id
 * AND rtstn.rtid='{$route}';
 */
/*$stmt=$db->prepare("SELECT stations.name,stations.abbr,stations.slan,stations.slong,routes.color,routes.name
                    FROM stations,routes,rtstn
                    WHERE stations.id=rtstn.stnid AND rtstn.rtid=routes.id AND rtstn.rtid='{$route}'");
//$stmt->bindValue(':route',$route,SQLITE3_INTEGER);
$result=$stmt->execute();
*/

$result=$db->query("SELECT stations.name,stations.abbr,stations.slan,stations.slong,routes.color,routes.name
                    FROM stations,routes,rtstn
                    WHERE stations.id=rtstn.stnid AND rtstn.rtid=routes.id AND rtstn.rtid='{$route}'");

//$stmt->bindValue(':route',$route,SQLITE3_INTEGER);
//$result=$stmt->execute();

while($row=$result->fetchArray(SQLITE3_ASSOC)) {
  echo "<pre>";
  print(json_encode($row));
  echo "</pre>";
}
//print(json_encode($result));

?>