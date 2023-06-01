<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href='{{ URL::to("myFlight.css") }}'>
    <script src='{{ URL::to("myFlight.js") }}' defer="true"></script>
    <title>My flights</title>
</head>
<body>
<div class="nav">
    <h1>Hello {{Session::get('name')}} here are your flights</h1>
</div>
<div id="content">

    
</div>
</body>
</html>