<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $guarded = [];

    public function bet()
    {
        return $this->belongsTo('App\Bet');
    }
}
