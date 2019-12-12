<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function info($id)
    {
        $user = User::findOrFail($id);
        return [
            'name' => $user->name,
            'email' => $user->email,
            'bankroll' => $user->bankroll,
            'money_in_play' => $user->money_in_play
        ];
        // dd(User::findOrFail($id));
    }
}
