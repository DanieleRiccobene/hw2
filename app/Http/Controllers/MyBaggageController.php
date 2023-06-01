<?php
namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\Bagaglio;
use App\Models\Prenotazione;
use Illuminate\Support\Facades\DB;
use Request;
use Session;


class MyBaggageController extends BaseController
{
    public function myBaggage(){
        return view('myBaggage');
    }

    public function getBaggage(){
        if(!Session::has('user_id')){
            return redirect('login');
        }
        $userID = Session::get('user_id');

        $data = DB::table('bagagli')->where('utente', '=', $userID)->get()->toArray();
        $data2 = DB::table('prenotazione')->whereIn('prenotazione', function ($query) use ($userID) {
            $query->select('prenotazione')->from('bagagli')->where('utente', '=', $userID);
        })->get()->toArray();
        //dd($data);
        //dd($data2);
        
        //$combinedData = array_merge($data, $data2);
        //dd($combinedData);
        return view('myBaggage',compact('data','data2'));
    }
}