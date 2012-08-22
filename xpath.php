<?php
// c/xampp/htdocs/CS75/SECTION3-SRC/xml_examples.php
?>

<?
$xml = new SimpleXMLElement(file_get_contents("xml_example.xml"));
?>
<html >
<head>
  <title>xml examples</title>
</head>
<body>
Below are a few xml examples using xpath: <br />
<hr />

<pre>
  <? print_r($xml); ?>
</pre>
<hr />

xpath('//student') will return all student elements: <br />
<?
$test=$xml->xpath('/school//student');
?>
<pre>
  <? print_r($test); ?>
</pre>
<hr />
<strong>Example 0: Using foreach: ($xml->students->student as $student): </strong> <br /><br />
    <? foreach($xml->students->student as $student)
       {
          echo "Student " . $student->name . " has an ID # of " . $student["id"] . "<br />";
       }
    ?>
<hr />

<strong>Example 1: $xml->xpath('//student[status="undergrad"]'); </strong> <br />
<? $results1 = $xml->xpath('//student[status="undergrad"]'); ?>

<pre>
<? print_r($results1);  ?>
</pre>


foreach($results1 as $xyz) {
  echo $xyz->gpa;
}
foreach($results1 as $results1)<br />
{<br />

   echo $results1->name;<br />
}<br /><br />
The above gets me: <br />
<? foreach($results1 as $results1)
{
   echo $results1->name;
   echo "<br />";
}
?>
<hr />

<strong>Example 2: Comparing value of an element: $xml->xpath('//student[gpa>3.0]');</strong>
<? $results2 = $xml->xpath('//student[gpa>3.0]'); ?>

<pre>
<? print_r($results2); ?>
</pre>

<hr />
<strong>Example 3: Using the @ attribute to get all students in class of 2010: </strong>
<br />
<? $xml->xpath('//student[@class = "2010"]');  ?>

<? $results3 = $xml->xpath('//student[@class = "2010"]');  ?>
<pre>
<? print_r($results3); ?>
</pre>

<hr />
<strong>Example 4: Using $variables as part of the xpath: <br /><br /></strong>

$PATH='student[gpa>3.0]'; <br />
$results4 = $xml->xpath("//students/$PATH");<br />
$results4 = <br />

<? $PATH='student[gpa>3.0]';
   $results4 = $xml->xpath("//students/$PATH"); ?>
<pre>
<? print_r($results4); ?>
</pre>

</body>
</html>