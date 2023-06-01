<?php
namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\Prenotazione;
use App\Models\Bagaglio;
use Request;
use Session;
use Illuminate\Support\Facades\Cookie;


class HomeController extends BaseController
{
    public function home(){
        if(!Session::has('user_id')){
            return redirect('login');
        }else{
            $value = Session::get('modal');
            if(!$value){
                Session::put('modal',true);
                $displayWelcomeDiv = true;
            }else{
                $displayWelcomeDiv = false;
            }
            Session::put('insert',false);
            return view('home',compact('displayWelcomeDiv'));
        }
    }

    public function obtainIata(){
        if(!Session::has('user_id')){
            return redirect('login');
        }
        
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL,'https://test.api.amadeus.com/v1/security/oauth2/token');
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_POSTFIELDS,"grant_type=client_credentials&client_id=QQz3qfAWCdthb3ealgDAfQABtWMybevx&client_secret=9SX5xGTtmc7ji6XG");
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
        $res = curl_exec($curl);
        $token = json_decode($res,true);
        curl_close($curl);

        $city = Request::post('el');
        $curl = curl_init();
        curl_setopt($curl,CURLOPT_URL,"https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=".$city);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Authorization: Bearer '.$token['access_token']));
        $result = curl_exec($curl);
        curl_close($curl);
        return $result;
    }

    public function obtainFlights(){

        if(!Session::has('user_id')){
            return redirect('login');
        }

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL,'https://test.api.amadeus.com/v1/security/oauth2/token');
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_POSTFIELDS,"grant_type=client_credentials&client_id=QQz3qfAWCdthb3ealgDAfQABtWMybevx&client_secret=9SX5xGTtmc7ji6XG");
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
        $res = curl_exec($curl);
        $token = json_decode($res,true);
        curl_close($curl);
        
        $departure = Request::post('originLocationCode');
        $destination = Request::post('destinationLocationCode');
        $departureDate = Request::post('departureDate');
        $returnDate = Request::post('returnDate');
        $numPass = Request::post('adults');
        $travelClass = Request::post('travelClass');
        $data = array(
            "originLocationCode" => $departure,
            "destinationLocationCode" => $destination,
            "departureDate" => $departureDate,
            "returnDate" => $returnDate,
            "adults" => $numPass,
            "travelClass" => $travelClass,
            "max" => 20
        );
        $param = http_build_query($data);
        $curl = curl_init();
        curl_setopt($curl,CURLOPT_URL,"https://test.api.amadeus.com/v2/shopping/flight-offers?".$param);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Authorization: Bearer '.$token['access_token']));
        $result = curl_exec($curl);
        echo $result;
        curl_close($curl);
    }

    public function addFlight(){

        if(!Session::has('user_id')){
            return redirect('login');
        }

        $departure = Request::post('partenzaValue');
        $destination = Request::post('destinazioneValue');
        $departureDate = Request::post('dataPartenzaValue');
        $returnDate = Request::post('dataRitornoValue');
        $numPass = Request::post('passeggeriValue');
        $travelClass = Request::post('classeValue');
        $price = Request::post('prezzoValue');

        $prenotazione = new Prenotazione;
        $prenotazione->utente = Session::get('user_id');
        $prenotazione->partenza = Request::post('partenzaValue');
        $prenotazione->destinazione = Request::post('destinazioneValue');
        $prenotazione->dataPartenza = Request::post('dataPartenzaValue');
        $prenotazione->dataRitorno = Request::post('dataRitornoValue');
        $prenotazione->passeggeri = Request::post('passeggeriValue');
        $prenotazione->classe = Request::post('classeValue');
        $prenotazione->prezzo = Request::post('prezzoValue');
        if($prenotazione->save()){
            Session::put('insert',true);
            $last_id = $prenotazione->prenotazione;
            $cookie = cookie('prenotazione', $last_id);
            return response('ok')->cookie($cookie);
        }else{
            return json_encode(['state'=>false]);
        }
    }

    public function addBaggage(){
        return view('addBaggage');
    }

    public function do_addBaggage(Request $request){
        if(!Session::has('user_id')){
            return redirect('login');
        }

        if(Request::post('hand') && Request::post('hold')){
            $last_record = Prenotazione::orderByDesc('prenotazione')->first();
            $last_id = $last_record->prenotazione;
            $bagaglio = new Bagaglio;
            $bagaglio->utente = Session::get('user_id');
            $bagaglio->prenotazione = $last_id;
            $bagaglio->bagaglio_a_mano = Request::post('hand');
            $bagaglio->bagaglio_stiva = Request::post('hold');
            if($bagaglio->save()){
                return redirect('home');
            }else{
                return json_encode(['add'=>false]);
            }
        }
    }
}
