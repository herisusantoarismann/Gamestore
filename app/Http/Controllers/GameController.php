<?php

namespace App\Http\Controllers;

use App\Models\Games;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index()
    {
        $games = Games::paginate(20);

        return response()->json([
            'games' => $games,
        ]);
    }

    public function search(Request $request)
    {
        if ($request->search === null) {
            $games = Games::paginate(20);
        } else {
            $games = Games::where('name', 'LIKE', '%'.$request->search.'%')->paginate(20);
        }
        
        // $games = Games::join('publishers', 'games.publisher', '=', 'publishers.publisher_id')->join('developers', 'games.developer', '=', 'developers.developer_id')->where('games.name', 'LIKE', '%'.$request->search.'%')->orWhere('publishers.name', 'LIKE', '%'.$request->search.'%')->paginate(20);

        return response()->json([
            'games' => $games
        ]);
    }
}