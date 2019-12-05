<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $guarded = [];

    public function bets()
    {
        return $this->hasMany('App\Bet');
    }

    public function teams()
    {
        return $this->belongsToMany('App\Team');
    }
}
