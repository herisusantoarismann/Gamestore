<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function getUser(Request $request)
    {
        $user = Users::find($request->user_id);

        if ($user) {
            return response()->json([
                'message' => "Registrasi Berhasil",
                'user' => $user
            ]);
        } else {
            return response()->json([
                'message' => $request->user_id
            ]);
        }
    }

    public function editUser(Request $request)
    {
        $users = Users::find($request->user_id)->update([
            'name' => $request->name,
            'surname' => $request->surname,
        ]);

        if ($users) {
            return response()->json([
                'message' => $request,
            ]);
        } else {
            return response()->json([
                'message' => "Registrasi Gagal"
            ]);
        };
    }
}