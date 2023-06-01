<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="addBaggage.css">
    <script src="addBaggage.js" defer="true"></script>
    <title>Add Baggage</title>
</head>
<body>
    <div class="content">
        <div class="form-container">
            <form method="post">
                @csrf
                <div id="number-control-hand">
                    <div>
                        <label>Hand luggage</label>
                        <input type="button" value="-" id="decrement-btn-hand"></input>
                        <input type="hidden" value="" name="hand" id="hand"><span id="numberHand">0</span></input>
                        <input type="button" value="+" id="increment-btn-hand"></input>
                    </div>
                </div>

                <div id="number-control-hold">
                    <div>
                        <label>Hold baggage</label>
                        <input type="button" value="-" id="decrement-btn-hold"></input>
                        <input type="hidden" value="" name="hold" id="hold"><span id="numberHold" name="hold">0</span></input>  
                        <input type="button" value="+" id="increment-btn-hold"></input>
                    </div>
                </div>

                <div class="btn-submit"><input type="submit" value="Add"></div>
            </form>
        </div>
    </div>
</body>
</html>