<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Bet;
use App\Transaction;
use App\User;

class BetController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
        $bets = Bet::where('user_id', $userId)->get();
        $response = [];
        foreach ($bets as $bet) {
            $bet->game; // adds game data to response
            $response[] = $bet;
        }
        return json_encode($response);
    }

    public function store(Request $request)
    {
        $userId = auth()->id();
        $bet = Bet::create([
            'user_id' => $userId,
            'game_id' => request('id'),
            'bet_type' => request('bet_type'),
            'team' => request('team'),
            'point_spread' => request('spread'),
            'position' => request('position'),
            'over_under' => request('over_under'),
            'odds' => request('odds'),
            'wager' => request('wager'),
            'status' => 'pending'
        ]);
        $bet->game; // adds game data to response
        $transaction = Transaction::create([
            'user_id' => $userId,
            'bet_id' => $bet->id,
            'type' => 'wager',
            'amount' => -1 * $bet->wager,
            'in_play' => 1
        ]);
        $bet->transaction_id = $transaction->id;
        $user = User::find(+$userId);
        $user->bankroll = $user->bankroll - $bet->wager;
        $user->money_in_play = $user->money_in_play + $bet->wager;
        $user->save();
        return json_encode($bet);
    }
}
