<?php
namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use App\Models\Prenotazione;
use Request;
use Session;
use Carbon\Carbon;


class MyFlightController extends BaseController
{
    public function myFlight(){
        return view('myFlight');
    }

    public function queryFlight(){
        if(!Session::has('user_id')){
            return redirect('login');
        }
        $prenotation = Prenotazione::where("utente",Session::get('user_id'))->get();
        return $prenotation;
    }

    public function checkDateFlight(){
        $currentDate = Carbon::now();
        $prenotation = Prenotazione::whereDate("dataPartenza", "<", $currentDate)->get();
        return $prenotation;
    }

    public function deleteFlight(){
        $idPrenotazione = Request::post('idPrenotazione');
        $prenotazione = Prenotazione::find($idPrenotazione);
        $result = $prenotazione->delete();
        if($result){
            return json_encode(array('delete'=>true));
        }else{
            return json_encode(array('delete'=>false));
        }
    }
}