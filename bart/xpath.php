<?
	// we define a constant value for referencing the XML file by name
	define("STORE_XML_FILENAME", "store.xml");

	$xml = new SimpleXMLElement(file_get_contents(STORE_XML_FILENAME));
	if(!$xml)
	{
		exit("Could not load XML from file '". STORE_XML_FILENAME . "'");
	}
	
	// gimmie the store's name
	$results = $xml->xpath("/store/name");
	
	// retrieve the address xml element
	$results = $xml->xpath("/store/address");
		
	// retrieve all of the categories
	$results = $xml->xpath("//category");

	// retrieve all items with price < 5.00
	//$results = $xml->xpath("/store/menu/category/items/item[price < 5.00]");
	//$results = $xml->xpath("//item[price < 5.00]");
	
	// retrieve the description of the 'Mediterranean' 'Specialty Pizzas' element
//	$results = $xml->xpath("//category[@name='Specialty Pizzas']/items/item[@name='Mediterranean']/description");
	
	// retrieve all categories that contain 'Pizza' in the name
/*	$results = $xml->xpath("//category[contains(@name,'Pizza')]");
 */

//	$results=$xml->xpath("/store/menu/category/items/item/price[@size='small']");

//$results=$xml->xpath("//item[@name='French Fries']/price[@size='small']");


	print_r($results);
?>

  /*----------------*/


<?
	$xml = new SimpleXMLElement(file_get_contents("store.xml"));

	$categories = $xml->xpath("//category");
?>

<? require_once("begin.php"); ?>

		<table cellpadding="10">
		<? foreach($categories as $category) { ?>
			<tr><td><a href="category.php?category=<? print($category['name']); ?>"><? print($category["name"]); ?></a></td></tr>
		<? } ?>
		</table>
		
<? require_once("end.php"); ?>

	  /*-------------------*/

<?
    $dom = simplexml_load_file("lectures.xml");
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Lectures</title>
  </head>
  <body>
    <h1>Lectures</h1>
<!--    <ul>
    <?
        foreach ($dom->lecture as $lecture)
        {
            print("<li>");
            print($lecture["number"]);
            print(": ");
            print($lecture->title);
            print("<ul>");
            foreach ($lecture->resources->resource as $resource)
            {
                print("<li>");
                print($resource["name"]);
                print(": ");
                foreach ($resource->format as $format)
                {
                    $path = $format["path"];
                    print("<a href=\"$path\">");
                    print($format["label"]);
                    print("</a>");
                    print(" | ");
                }
                print("</li>");
            }
            print("</ul>");-->

<ul>
<?php 
foreach($dom->lecture as $lec)
{
  print("<li>");
  print($lec["number"]);
  print($lec->title);
  print("<ul>");
  foreach($lec->resources as $res)
    {
      print("<li>");
      print($res["name"]);
      print("</li>");
    }
  ?>
  </li>
</ul>
      </body>
      </html>
      
      


	  /*---------------------------*/









<?
	$xml = new SimpleXMLElement(file_get_contents("store.xml"));

	$category = $_GET["category"];
	$items = $xml->xpath("//category[@name='$category']/items/item");
?>
<? require_once("begin.php"); ?>

		<table border="1" cellpadding="10">
		<th colspan="3" align="centre">Item(s): <? print($category); ?></th>
		<? foreach($items as $item) { ?>
			<tr>
				<td><? print($item["name"]); ?></td>
				<? foreach($item->price as $price) { ?>
					<td><a href="add2cart.php?name=<?print(htmlspecialchars($item["name"]));?>&size=<?echo $price["size"]?>"><? print($price); ?></a></td>
				<? } ?>
			</tr>
		<? } ?>
		</table>
		
<? require_once("end.php"); ?>