<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transaction;
use App\User;

class TransactionController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
        $transactions = Transaction::where('user_id', $userId)->get();
        $response = [];
        // foreach ($transactions as $transaction) {
        //     $transaction->game; // adds game data to response
        //     $response[] = $transaction;
        // }
        for ($i = count($transactions) - 1; $i >= 0; $i--) {
            $transaction = $transactions[$i];
            $transaction->bet;
            if ($transaction->bet)
                $transaction->bet->game; // adds bet and game data to response
            $response[] = $transaction;
        }
        return json_encode($response);
    }

    public function store()
    {
        $userId = auth()->id();
        $type = request('type');
        $amount = request('amount');
        $transaction = Transaction::create([
            'user_id' => $userId,
            'type' => $type,
            'amount' => $amount
        ]);
        $user = User::find(+$userId);
        $user->adjustBankroll($amount);
        return json_encode($transaction);
    }
}
