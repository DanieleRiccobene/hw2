<html lang="en">
<title>Accedi su Flight Search</title>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href='{{ URL::to("login.css") }}'>
    <title>Document</title>
</head>
<body>
    <div class="check">
        <form method="post">
        @csrf
            <p>Login</p>
            <div class="credentials">
                <input type="text" name="username">
                <label>Username</label>
            </div>

            <div class="credentials">
                <input type="password" name="pwd">
                <label>Password</label>
            </div>
            <div><input type="submit" value="Sign in"></div>
            <div class="errors">
                @foreach($errors->all() as $e)
                    <p id='error'>{{ $e }}</p>
                @endforeach
            </div>
            <p class="selection">or <a href='/signup'>Sign up</a></p>
        </form>
    </div>
</body>
</html>