<?php
$_POST = json_decode(file_get_contents("php://input",true));
   echo vae_dump($_POST)