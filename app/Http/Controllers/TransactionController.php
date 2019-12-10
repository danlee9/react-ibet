<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transaction;
use App\User;
use Illuminate\Pagination\LengthAwarePaginator;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $userId = auth()->id();
        // $transactions = Transaction::where('user_id', $userId)->get();
        // $response = [];
        // for ($i = count($transactions) - 1; $i >= 0; $i--) {
        //     $transaction = $transactions[$i];
        //     $transaction->bet;
        //     if ($transaction->bet)
        //         $transaction->bet->game; // adds bet and game data to response
        //     $response[] = $transaction;
        // }
        // return json_encode($response);
        $transactions = Transaction::where('user_id', $userId)->orderBy('created_at', 'desc')->with('bet')->get();
        $results = [];
        foreach ($transactions as $transaction) {
            if ($transaction->bet)
                $transaction->bet->game; // adds bet and game data to response
            $results[] = $transaction;
        }
        $page = $request->query('page');
        $perPage = 30;
        if (is_null($page)) {
            $offset = 0;
        } else {
            $offset = ($page - 1) * $perPage;
        }
        $portion = array_slice($results, $offset, $perPage);
        $paginate = new LengthAwarePaginator($portion, count($results), $perPage, $page);
        return json_encode($paginate);
    }

    public function test(Request $request)
    {
        $userId = auth()->id();
        $transactions = Transaction::where('user_id', $userId)->orderBy('created_at', 'desc')->with('bet')->get();
        $results = [];
        foreach ($transactions as $transaction) {
            if ($transaction->bet)
                $transaction->bet->game; // adds bet and game data to response
            $results[] = $transaction;
        }
        $page = $request->query('page');
        $perPage = 3;
        if (is_null($page)) {
            $offset = 0;
        } else {
            $offset = ($page - 1) * $perPage;
        }
        $portion = array_slice($results, $offset, $perPage);
        $paginate = new LengthAwarePaginator($portion, count($results), $perPage, $page);
        return json_encode($paginate);
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
