<!DOCTYPE html>
<html lang="en">
<title>Registrati su Flight Search</title>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href='{{ URL::to("signup.css") }}'>
    <script src="register.js" defer="true"></script>
    <title>Document</title>
</head>
<body>
    <div class="check">
        <form method="post">
        @csrf
            <p>Register</p>
            <div class="type">
                <input id="name" type="text" name="fname" class="fields">
                <label id="labName">Name</label>
            </div>
            <div class="type">
                <input id="surname" type="text" name="surname" class="fields">
                <label id="labSurname">Surname</label>
            </div>
            <div class="type">
                <input id="email" type="text" name="username" class="fields">
                <label id="labEmail">Email<span></span></label>
            </div>
            <div class="type">
                <input id="pwd" type="password" name="password" class="fields">
                <label id="labPwd">Password(> 8 caratteri,!?@#)</label>
            </div>
            <input type="submit" value="Register">
            <div id="progressBar">
                <div id="bar"></div>
                <p id="alert"></p>
            </div>
            
            <p class="selection">Have already an account? <a href="/login">Log In</a></p>
        </form>
    </div>
    @if(isset($errors))
        @foreach($errors->all() as $error)
            <div class='errors'>
                <p class='error'>{{ $error }}</p>
            </div> 
        @endforeach
    @endif
</body>
</html>