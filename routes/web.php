<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

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

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', [LoginController::class, 'index'])->name('login');
Route::get('/register', [LoginController::class, 'index']);
Route::get('/home', [LoginController::class, 'index'])->name('home');
Route::get('/beranda', [LoginController::class, 'index'])->name('beranda');
Route::get("/checkout", [LoginController::class, 'index'])->name('checkout');
Route::get("/payment", [LoginController::class, 'index'])->name('payment');
Route::get("/profile", [LoginController::class, 'index'])->name('profile');
Route::get("/about", [LoginController::class, 'index'])->name('about');

Route::get("/admin/dashboard", [LoginController::class, 'index'])->name('dashboard');
Route::get("/admin/orderlist", [LoginController::class, 'index'])->name('order');

Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [LoginController::class, 'register']);
Route::post('/search', [GameController::class, 'search']);

Route::get('/games', [GameController::class, 'index']);
Route::post('/user', [UsersController::class, 'getUser']);
Route::put('/user', [UsersController::class, 'editUser']);

Route::get('admin/games', [AdminController::class, 'getGames']);
Route::post('admin/games', [AdminController::class, 'storeGames']);
Route::post('admin/search', [AdminController::class, 'search']);
Route::put('/admin/games', [AdminController::class, 'editGames']);
Route::delete('/admin/games', [AdminController::class, 'deleteGame']);
Route::get('admin/order', [OrderController::class, 'getOrder']);
Route::post('admin/oneorder', [OrderController::class, 'getOneOrder']);
Route::put('/admin/order', [OrderController::class, 'editOrder']);
Route::delete('/admin/order', [OrderController::class, 'deleteOrder']);
Route::post('admin/order/search', [OrderController::class, 'search']);
Route::get('admin/paymentlist', [AdminController::class, 'getPayment']);
Route::get('admin/export', [AdminController::class, 'export']);
Route::get('admin/export/order', [AdminController::class, 'exportOrder']);
Route::get('admin/games/json', [AdminController::class, 'jsonGames']);
Route::get('admin/games/xml', [AdminController::class, 'xmlGames']);

Route::post('order', [OrderController::class, 'store']);