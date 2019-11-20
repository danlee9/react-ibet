<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bet extends Model
{
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function game()
    {
        return $this->belongsTo('App\Game');
    }

    public function transactions()
    {
        return $this->hasMany('App\Transaction');
    }
}
