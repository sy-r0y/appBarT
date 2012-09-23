<?php

error_reporting(E_ALL); //Show All Errors.
class Etd {
  public $etd=array();
}

$obj=new Etd();
$abbr=htmlentities($_GET['abbr']);
header("Content-type:application/json");
$xml=new SimpleXMLElement(file_get_contents('http://api.bart.gov/api/etd.aspx?cmd=etd&key=RRHP-6MUK-EEXT-7WIS&orig='.$abbr));

$result=$xml->xpath('//etd');

/* Sample:--
 * $etd['FRMT'][0]=12
 * $etd['FRMT'][1]=19
 * $etd['RICH'][0]=4
 * $etd['RICH'][1]=15
 * $etd['RICH'][2]=30
 */
/*
 * Start outer loop(get destination).
 * Declare counter=0
 * dest=Destination.
 * start inner loop for every estimates on that DEST.
 * For the current DEST & counter, assign the minute value.
 * Increase counter by 1.
 * Close the inner loop.
 * Close Outer Loop.
 */
foreach($result as $result) {
  //  echo $result->destination.": ".$result->abbreviation;
  $dest=$result->destination;
  $counter=0;
  foreach($result->estimate as $estimate) {
    $obj->etd["{$dest}"][$counter]=$estimate->minutes;
    $counter++;
    //    echo $estimate->minutes."  ".$estimate->direction." <br/> "; 
  }
}
print(json_encode($obj));

/*
 * echo "<pre>";
 * print_r($obj->etd);
 * echo "</pre>";
*/
?>