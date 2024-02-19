<?php
  // Replace your API key with your OpenWeather API key:
  $appid = "32180dc978b51e3c268039ae19a019ec";

  header("Content-type: application/json\n\n");
  $params = $_SERVER['QUERY_STRING'];
  $host = "https://api.openweathermap.org/data/2.5/weather?$params&appid=$appid";
  $ch = curl_init($host);
  curl_exec($ch);
  curl_close($ch);
?>
