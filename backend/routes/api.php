<?php

use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// header('Access-Control-Allow-Origin: *');
// Access-Control-Allow-Origin: *
// header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
// header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');

Route::group([], function () {
    Route::post('user/store', [UserController::class, 'store']);
    Route::delete('user/delete/{user}', [UserController::class, 'delete']);
    Route::put('user/update/{user}', [UserController::class, 'update']);
    Route::get('users', [UserController::class, 'users']);
});
