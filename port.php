<?php

/* Aim:-
 * 1. Get data from routes.xml and stations.xml using XPath.
 * 2. Transfer all the relevant data into the apporpriate fields in the 
 *    table(routes, stations) of the sqlite3 database "bart.db".
 */

$xml=new SimpleXMLElement('http://api.bart.gov/api/route.aspx?cmd=routeinfo&route=100&key=RRHP-6MUK-EEXT-7WIS',NULL,TRUE);

$route= $xml->xpath('//route');
$db=new SQLite3('bart.db');
foreach($route as $route)
  {
    $number=$route->number;
    foreach($route->config->station as $station)
      {
	//	echo $number."  ".$station."<br/>";
	$stmt=$db->prepare('SELECT id FROM stations WHERE abbr=:abbr');
	$stmt->bindValue(':abbr',$station,SQLITE3_TEXT);
	$result=$stmt->execute();
	
	$station=$result->fetchArray(SQLITE3_ASSOC); /* Now I've got the ID of the respective station from 
						    * my database table.
						    * All that is needed is to insert the route id and the 
						    * station id into the rtstn table.
						    */
	$stnid=$station["id"];

	$db->exec("INSERT INTO rtstn(rtid,stnid) VALUES('{$number}','{$stnid}')");
	
      }
    

  }



/*echo "<pre>";
print_r($route);
echo "</pre>";
echo "asdf";
*/
/*$routes = new SimpleXMLElement(file_get_contents("routes.xml"));
$route=$routes->xpath('//route');
$db=new SQLite3('bart.db');

foreach($route as $route)
  {
    $name=$route->abbr;
    $color=$route->color;
    $id=$route->number;
        $db->exec('DELETE FROM routes');
        $db->exec("INSERT INTO routes(id,name,color) VALUES('{$id}','{$name}','{$color}')");
  
    echo "asdf";

  }
*/

/*$stations=new SimpleXMLElement(file_get_contents("Stations.xml"));
$station=$stations->xpath('//station');
$db=new Sqlite3('bart.db');
foreach($station as $station)
  {
    $name=$station->name;
    $abbr=$station->abbr;
    $lan=$station->gtfs_latitude;
    $lon=$station->gtfs_longitude;
    $db->exec('delete from stations where id>43');


    //    $db->exec("insert into stations(name,abbr,slan,slong) VALUES('{$name}','{$abbr}','{$lan}','{$long}')");


    //    $db->exec("INSERT INTO stations(name,abbr,slan,slong) VALUES('{$name}','{$abbr}','{$lan}','{$lon}')");


      echo "<br/><pre>";
    print_r($station);
    echo "<br/></pre>";
  

  }

*/


?>