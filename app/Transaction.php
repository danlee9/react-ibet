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

    static function placeWager($userId, $betId, $wager)
    {
        $transaction = new Transaction;
        $transaction->user_id = $userId;
        $transaction->bet_id = $betId;
        $transaction->type = 'wager';
        $transaction->amount = -1 * $wager;
        $transaction->in_play = 1;
        $transaction->save();
        return $transaction;
    }

    static function addMoneyWon($userId, $betId, $amount, $type)
    {
        $transaction = new Transaction;
        $transaction->user_id = $userId;
        $transaction->bet_id = $betId;
        $transaction->type = 'bet_win';
        $transaction->amount = $amount;
        $transaction->in_play = 0;
        $transaction->save();
        return $transaction;
    }
}
