<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transaction;

class TransactionController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
        $transactions = Transaction::where('user_id', $userId)->get();
        $response = [];
        foreach ($transactions as $transaction) {
            $transaction->game; // adds game data to response
            $response[] = $transaction;
        }
        return json_encode($response);
    }
}
