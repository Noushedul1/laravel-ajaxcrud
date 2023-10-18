<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/',[CategoryController::class,'index']);
Route::post('/store',[CategoryController::class,'store'])->name('store');
Route::get('/showCategory',[CategoryController::class,'showCategory'])->name('show');
Route::get('/deleteCategory/{id}',[CategoryController::class,'deleteCategory'])->name('delete');
Route::get('/edit/{id}',[CategoryController::class,'edit'])->name('edit');
Route::post('/update/{id}',[CategoryController::class,'update'])->name('update');
Route::get('/active/{id}',[CategoryController::class,'active'])->name('active');
Route::get('/inactive/{id}',[CategoryController::class,'inactive'])->name('inactive');
