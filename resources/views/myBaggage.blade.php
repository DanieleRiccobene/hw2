<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href='{{ URL::to("myBaggage.css") }}'>
    <title>My flights</title>
</head>
<body>
<div class="nav">
    <h1>Hello {{Session::get('name')}} here are your baggage</h1>
</div>
<div id="content">
@if(count($data)==0)
    echo '<p id="noContent">No flight purchased</p>';
@else
    @foreach ($data as $item)
            <div class="ticket">
                <div class="ticket-header">
                <h3>Your Baggage</h3>
                </div>
                <div class="ticket-body">
                <p>Hand baggage: {{ $item->bagaglio_a_mano }}</p>
                <p>Hold baggage:{{ $item->bagaglio_stiva }}</p>
    @foreach ($data2 as $item)
    @endforeach
                <p>Departure: {{ $item->partenza }}</p>
                <p>Destination: {{ $item->destinazione }}</p>
                <p>Departure date: {{ $item->dataPartenza }}</p>
                <p>Return date: {{ $item->dataRitorno }}</p>
                </div>
            </div>
    @endforeach
@endif
</div>
</body>
</html>