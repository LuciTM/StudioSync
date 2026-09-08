<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\ResourceController;
use Illuminate\Support\Facades\Route;

Route::apiResource('resources', ResourceController::class);
Route::apiResource('bookings', BookingController::class);