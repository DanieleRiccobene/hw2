<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Prenotazione extends Model{
    protected $table = 'prenotazione';
    protected $primaryKey = 'prenotazione';
    public $incrementing = true;
    public $timestamps = false;

    public function BagaglioPrenotazione(){
        return $this->hasOne("Bagaglio","prenotazione");
    }
}
