<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function getOrder()
    {
        $orders = Orders::select('orders.order_id AS order_id', 'orders.code_pay AS code_pay', 'orders.game AS game', 'orders.price AS price', 'users.user_id AS user_id', 'users.name AS user_name')->join('users', 'orders.user_id', '=', 'users.user_id')->paginate(10);

        return response()->json([
            'orders' => $orders,
        ]);
    }

    public function getOneOrder(Request $request)
    {
        $order = Orders::find($request->order_id);

        if ($order) {
            return response()->json([
                'message' => "Berhasil dapatkan order",
                'order' => $order
            ]);
        } else {
            return response()->json([
                'message' => "Registrasi Gagal"
            ]);
        };
    }

    public function editOrder(Request $request)
    {
        $order = Orders::find($request->order_id)->update([
            'user_id' => $request->user_id,
            'code_pay' => $request->code_pay,
            'game' => $request->game,
            'price' => $request->price,
        ]);

        if ($order) {
            return response()->json([
                'message' => $request->code_pay,
            ]);
        } else {
            return response()->json([
                'message' => "Registrasi Gagal"
            ]);
        };
    }

    public function deleteOrder(Request $request)
    {
        $order = Orders::destroy($request->order_id);

        if ($order) {
            return response()->json([
                'message' => $request,
            ]);
        } else {
            return response()->json([
                'message' => "GAGAL"
            ]);
        };
    }
    
    public function store(Request $request)
    {
        $order = Orders::create([
            'code_pay' => $request->code_pay,
            'user_id' => $request->user_id,
            'game' => $request->game,
            'price' => $request->price,
        ]);

        if ($order) {
            return response()->json([
                'message' => "Registrasi Berhasil",
                'order' => $order
            ]);
        } else {
            return response()->json([
                'message' => "Registrasi Gagal"
            ]);
        }
    }

    public function search(Request $request)
    {
        if ($request->search === null) {
            $orders = Orders::select('orders.order_id AS order_id', 'orders.code_pay AS code_pay', 'orders.game AS game', 'orders.price AS price', 'users.user_id AS user_id', 'users.name AS user_name')->join('users', 'orders.user_id', '=', 'users.user_id')->paginate(10);
        } else {
            $orders = Orders::select('orders.order_id AS order_id', 'orders.code_pay AS code_pay', 'orders.game AS game', 'orders.price AS price', 'users.user_id AS user_id', 'users.name AS user_name')->join('users', 'orders.user_id', '=', 'users.user_id')->where('orders.code_pay', 'LIKE', '%'.$request->search.'%')->paginate(10);
        }
        
        return response()->json([
            'orders' => $orders
        ]);
    }
}