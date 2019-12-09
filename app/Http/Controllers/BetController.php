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
        // foreach ($bets as $bet) {
        //     $bet->game; // adds game data to response
        //     $response[] = $bet;
        // }
        for ($i = count($bets) - 1; $i >= 0; $i--) {
            $bet = $bets[$i];
            $bet->game;
            $response[] = $bet;
        }
        return json_encode($response);
    }

    public function store()
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
        $bet->game; // adds game data to bet response
        $user = User::find(+$userId);
        $user->placeWager($bet->wager);
        $transaction = Transaction::placeWager($userId, $bet->id, $bet->wager);
        $bet->transaction_id = $transaction->id;
        return json_encode($bet);
    }
}
