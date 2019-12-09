<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*
| Home Page
*/
Route::get('/', function () {
    return view('welcome');
})->name('login')->middleware('guest');

Route::get('register', function () {
    return view('welcome');
})->middleware('guest');

/*
| All auth routes like register
*/
Auth::routes();

Route::get('/moneyline/{league}', 'GameController@updateMoneylines');
Route::get('/points/{league}', 'GameController@updatePointSpreads');
Route::get('/totals/{league}', 'GameController@updateOverUnders');
Route::get('/scores/{league}', 'GameController@updateScores');
Route::get('blah/{league}', 'GameController@getUpcomingGames');
Route::get('asdf/{league}', 'GameController@getCompletedGames');

/*
| All other urls will get redirected to the welcome page then will be handled with react's router
*/

// Route::get('about', function() {
//     return "BLAH";
// })->middleware('auth');

// Route::get('{catchall}', function() {
//     return view('welcome');
// });

Route::get('home', function () {
    return view('welcome');
})->middleware('auth');

Route::get('bets', function () {
    return view('welcome');
})->middleware('auth');

Route::get('transactions', function () {
    return view('welcome');
})->middleware('auth');

Route::get('games/{league}', function() {
    return view('welcome');
})->middleware('auth');

// Route::get('/home', 'HomeController@index')->name('home');
