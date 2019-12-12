<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'bankroll'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function bets()
    {
        return $this->hasMany('App\Bet');
    }

    public function placeWager($wager)
    {
        $this->bankroll = $this->bankroll - $wager;
        $this->money_in_play = $this->money_in_play + $wager;
        $this->save();
    }

    public function addMoneyWon($money_won, $wager)
    {
        $this->bankroll = $this->bankroll + $money_won;
        $this->money_in_play = $this->money_in_play - $wager;
        $this->save();
    }

    public function removeMoneyInPlay($wager)
    {
        $this->money_in_play = $this->money_in_play - $wager;
        $this->save();
    }

    public function adjustBankroll($amount)
    {
        $this->bankroll += $amount;
        $this->save();
    }
}
