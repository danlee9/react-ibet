<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('user/{id}', 'UserController@info');

Route::get('token/{id}', 'ApiTokenController@update');

// Route::get('user/{id}', 'UserController@info');

Route::get('test', 'UserController@test');
Route::get('games/{league}/upcoming', 'GameController@getUpcomingGames');
Route::get('games/{league}/completed', 'GameController@getCompletedGames');
Route::middleware('auth:api')->get('bets', 'BetController@index');
Route::middleware('auth:api')->get('transactions', 'TransactionController@index');
// Route::get('bets', 'BetController@index');
Route::middleware('auth:api')->post('bets', 'BetController@store');
Route::middleware('auth:api')->post('transactions', 'TransactionController@store');