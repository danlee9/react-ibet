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
});

/*
| All auth routes like register
*/
Auth::routes();

Route::get('/moneyline', 'GameController@updateNFLMoneylines');
Route::get('/points', 'GameController@updateNFLPointSpreads');
Route::get('/totals', 'GameController@updateNFLOverUnders');
Route::get('/scores', 'GameController@updateNFLScores');
Route::get('blah', 'GameController@getUpcomingNFLGames');
Route::get('asdf', 'GameController@getCompletedNFLGames');

/*
| All other urls will get redirected to the welcome page then will be handled with react's router
*/
Route::get('{catchall}', function() {
    return view('welcome');
});

Route::get('games/{league}', function() {
    return view('welcome');
});

// Route::get('/home', 'HomeController@index')->name('home');
