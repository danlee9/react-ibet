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