<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    AuthController,
    SermonController,
    ReelController,
    FaithController,
    TipController,
    ProfileController
};

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    // User profile
    Route::get('/me', [ProfileController::class, 'me']);
    Route::post('/profile/update', [ProfileController::class, 'update']);

    // Faiths
    Route::get('/faiths', [FaithController::class, 'index']);

    // Sermons
    Route::get('/sermons', [SermonController::class, 'index']);
    Route::get('/sermons/{id}', [SermonController::class, 'show']);
    Route::post('/sermons', [SermonController::class, 'store']);
    Route::post('/sermons/{id}/mint', [SermonController::class, 'mint']);

    // Reels
    Route::get('/reels', [ReelController::class, 'index']);
    Route::post('/reels', [ReelController::class, 'store']);

    // Tips
    Route::post('/tip', [TipController::class, 'sendTip']);
    Route::get('/tips/sent', [TipController::class, 'sentTips']);
    Route::get('/tips/received', [TipController::class, 'receivedTips']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
