<?php
namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Request;
use Session;
use App\Models\Utente;

class LoginController extends BaseController
{
    public function login(){
        return view('login');
    }

    public function do_login(){

        if(Session::has('user_id')){
            return redirect('home');
        }

        $error = array();
        if(!empty(Request::post('username')) && !empty(Request::post('pwd'))){
            $user = Utente::where('email', Request::post('username'))->first();
            if(!$user){
                $error['username'] = "User not found";
            } else {
                $pass = Utente::where('email', Request::post('username'))->where('password',Request::post('pwd'))->first();
                if(!$pass){
                    $error['password'] = "Wrong password";
                }
            }
        }else{
            $error['username'] = "Insert email and password";
        }

        if(count($error) == 0){
            Session::put('user_id', $user->id);
            Session::put('name', $user->name);
            Session::put('modal', false);
            return redirect('home');
        }else{
           return redirect('login')->withInput()->withErrors($error);
        }
    }

    public function signup(){
        return view('signup');
    }
    
    public function do_signup(){
        $error = array();

        if(!empty(Request::post('fname')) && !empty(Request::post('surname')) && !empty(Request::post('username')) && !empty(Request::post('password'))){
            
            if (!filter_var(Request::post('username'), FILTER_VALIDATE_EMAIL)) {
                $error['username'] = "Email not valid";
            }else {
                if(Utente::where('email', Request::post('username'))->first())
                {
                    $error['username'] = "Email already taken";
                }
            }

            if (strlen(Request::post('password')) < 8) {
                $error['password'] = "Password too short";
            }

            if (count($error) == 0) {
                $user = new Utente;
                $user->name = Request::post('fname');
                $user->surname = Request::post('surname');
                $user->email = Request::post('username');
                $user->password = Request::post('password');

                $user->save();
                Session::put('name',$user->name);
                Session::put('user_id', $user->id);
                Session::put('modal',false);
                return redirect('home');
            }  
        }else{
            $error['void'] = "Fill in all fields";
        }
        return redirect('signup')->withInput()->withErrors($error);
    }

    public function logout(){
        Session::flush();
        return redirect('login');
    }

    public function checkUsername(){
        if(Utente::where('email', Request::post('user'))->first())
            {
                return json_encode(array('error'=>true,'message'=>'Email already taken'));
            }
    }
}
