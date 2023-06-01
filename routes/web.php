<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('login');
});

Route::get('login', 'App\Http\Controllers\LoginController@login');
Route::post('login', 'App\Http\Controllers\LoginController@do_login');
Route::get('signup', 'App\Http\Controllers\LoginController@signup');
Route::post('signup', 'App\Http\Controllers\LoginController@do_signup');
Route::post('checkUsername', 'App\Http\Controllers\LoginController@checkUsername');
Route::get('home', 'App\Http\Controllers\HomeController@home');
Route::post('obtainFlights', 'App\Http\Controllers\HomeController@obtainFlights');
Route::post('obtainIata', 'App\Http\Controllers\HomeController@obtainIata');
Route::post('addFlight', 'App\Http\Controllers\HomeController@addFlight');
Route::get('addBaggage', 'App\Http\Controllers\HomeController@addBaggage');
Route::post('addBaggage', 'App\Http\Controllers\HomeController@do_addBaggage');
Route::get('logout', 'App\Http\Controllers\LoginController@logout');
Route::get('myFlight', 'App\Http\Controllers\MyFlightController@myFlight');
Route::get('queryFlight', 'App\Http\Controllers\MyFlightController@queryFlight');
Route::get('checkDateFlight', 'App\Http\Controllers\MyFlightController@checkDateFlight');
Route::post('deleteFlight', 'App\Http\Controllers\MyFlightController@deleteFlight');
Route::get('myBaggage', 'App\Http\Controllers\MyBaggageController@getBaggage');
