<?php

header("Content-type:application/json");
$arr=array();


$arr['Dublin Pleasonton']=["hello","hwllo","hwllo","hwllo",12,545,"First","First"];
$arr['Fremont']=["Hola","Hola","Hola","Hola",54,001,"second","second"];
$arr['Sab Francisco Air']=["Ciao","asfsa","Chia","Ciap",123,100,"third","Third"];

/*$arr['First'][0]="Hello";
$arr['First'][1]="World";
$arr['Second'][0]="How";
$arr['Second'][1]="Are";
$arr['Third'][0]="You";
$arr['Fourth'][0]="Doing";
$arr['Fourth'][1]="My";
$arr['Fifth'][0]="Friend";
$arr['Sixth'][0]="Baby";
*/
//echo "<pre>";
//print_r($arr);
//echo "</pre>";

print(json_encode($arr));



?>