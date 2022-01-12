<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function index()
    {
        return view('app');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8|max:15'
        ]);

        $user = Users::where('email', $request->email)->first();
        if ($user && (string)$user->password === $request->password) {
            return response()->json([
                'message' => "Berhasil Login",
                'data' => $user
            ]);
        } else {
            return response()->json([
                'message' => "Gagal Login"
            ]);
        }
    }

    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|max:15|required_with:password_confirmation|same:password_confirmation',
            'password_confirmation' => 'required|min:8|max:15'
        ]);

        $user = Users::create([
            'email' => $request->email,
            'password' => $request->password
        ]);

        if ($user) {
            return response()->json([
                'message' => "Registrasi Berhasil",
                'user_id' => $user->user_id
            ]);
        } else {
            return response()->json([
                'message' => "Registrasi Gagal"
            ]);
        };
    }
}