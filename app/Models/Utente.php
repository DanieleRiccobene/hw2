<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Utente extends Model{
    protected $table = 'utenti';
    protected $primaryKey = 'id';
    public $timestamps = false;

    public function prenotazioni(){
        return $this->hasMany("App\Models\Prenotazione", "utente");
    }

    public function bagagli(){
        return $this->hasMany("App\Models\Bagaglio", "utente");
    }
}
