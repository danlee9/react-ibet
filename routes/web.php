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
| Landing Page
*/
Route::get('/', function () {
    return view('welcome');
})->name('login')->middleware('guest');

Route::get('login', function () {
    return view('welcome');
})->middleware('guest');

Route::get('register', function () {
    return view('welcome');
})->middleware('guest');

/*
| All auth routes like register
*/
Auth::routes();

/*
| All other urls will get redirected to the welcome page then will be handled with react's router
*/

Route::get('home', function () {
    return view('welcome');
})->middleware('auth');

Route::get('bets', function () {
    return view('welcome');
})->middleware('auth');

Route::get('bets/{page}', function () {
    return view('welcome');
})->middleware('auth');

Route::get('transactions', function () {
    return view('welcome');
})->middleware('auth');

Route::get('transactions/{page}', function () {
    return view('welcome');
})->middleware('auth');

Route::get('games/{league}', function() {
    return view('welcome');
})->middleware('auth');

Route::get('reset', function() {
    return view('welcome');
});
