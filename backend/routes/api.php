<?php

use App\Http\Controllers\NewsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//Route to register user
Route::post('/register', [UserController::class, 'register']);

Route::post('/login', [UserController::class, 'login']);

//route to display articles
Route::get('/articles', [NewsController::class, 'index']);

//Return a list of sources, categories and authors
Route::get('/news/sources', [NewsController::class, 'sources']);
Route::get('/news/categories', [NewsController::class, 'categories']);
Route::get('/news/authors', [NewsController::class, 'authors']);

// user authenticated routes
Route::middleware(['auth:sanctum'])->group(function () {
    //save user preferences
    Route::post('/preferences', [UserController::class, 'savePreferences']);

    //Route for user personalized articles
    Route::get('/articles/personalized', [NewsController::class, 'personalisedNews']);

    //log user out
    Route::post('/logout', function (Request $request) {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    });
});

