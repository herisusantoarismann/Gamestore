<?php

namespace App\Http\Controllers;

use App\Models\Developer;
use App\Models\Games;
use App\Models\Payment;
use App\Models\Publisher;
use App\Models\Orders;
use Illuminate\Http\Request;
use Codedge\Fpdf\Fpdf\Fpdf;
use SimpleXMLElement;

class AdminController extends Controller
{
    public function getGames()
    {
        $games = Games::select('games.game_id AS game_id', 'games.name as GameName', 'publishers.publisher_id AS publisher_id', 'publishers.name AS PublisherName', 'games.release_date AS release_date', 'developers.developer_id AS developer_id', 'developers.name AS DeveloperName', 'games.genre as Genre', 'games.price as Price')->join('publishers', 'games.publisher', '=', 'publishers.publisher_id')->join('developers', 'games.developer', '=', 'developers.developer_id')->paginate(10);

        $publisher = Publisher::get();
        $developer = Developer::get();

        return response()->json([
            'games' => $games,
            'publisher' => $publisher,
            'developer' => $developer
        ]);
    }

    public function storeGames(Request $request)
    {
        $games = Games::create([
            'name' => $request->name,
            'publisher' => $request->publisher_id,
            'developer' => $request->developer_id,
            'release_date' => $request->release_date,
            'genre' => $request->genre,
            'price' => $request->price
        ]);

        if ($games) {
            return response()->json([
                'message' => "Registrasi Berhasil",
                'order' => $games
            ]);
        } else {
            return response()->json([
                'message' => "Registrasi Gagal"
            ]);
        }
    }

    public function editGames(Request $request)
    {
        $games = Games::find($request->game_id)->update([
            'name' => $request->name,
            'publisher' => $request->publisher_id,
            'developer' => $request->developer_id,
            'genre' => $request->genre,
            'price' => $request->price,
            'release_date' => $request->release_date,
        ]);

        if ($games) {
            return response()->json([
                'message' => $request->release_date,
            ]);
        } else {
            return response()->json([
                'message' => "Registrasi Gagal"
            ]);
        };
    }

    public function deleteGame(Request $request)
    {
        $games = Games::destroy($request->game_id);

        if ($games) {
            return response()->json([
                'message' => $request,
            ]);
        } else {
            return response()->json([
                'message' => "GAGAL"
            ]);
        };
    }

    public function search(Request $request)
    {
        if ($request->search === null) {
            $games = Games::select('games.game_id AS game_id', 'games.name as GameName', 'publishers.publisher_id AS publisher_id', 'publishers.name AS PublisherName', 'games.release_date AS release_date', 'developers.developer_id AS developer_id', 'developers.name AS DeveloperName', 'games.genre as Genre', 'games.price as Price')->join('publishers', 'games.publisher', '=', 'publishers.publisher_id')->join('developers', 'games.developer', '=', 'developers.developer_id')->paginate(10);
        } else {
            $games = Games::select('games.game_id AS game_id', 'games.name as GameName', 'publishers.publisher_id AS publisher_id', 'publishers.name AS PublisherName', 'games.release_date AS release_date', 'developers.developer_id AS developer_id', 'developers.name AS DeveloperName', 'games.genre as Genre', 'games.price as Price')->join('publishers', 'games.publisher', '=', 'publishers.publisher_id')->join('developers', 'games.developer', '=', 'developers.developer_id')->where('games.name', 'LIKE', '%'.$request->search.'%')->paginate(10);
        }
        
        return response()->json([
            'games' => $games
        ]);
    }

    public function getPayment()
    {
        $payment = Payment::select('users.name as UserName', 'payments.code_pay AS CodePay', 'payments.games AS GamesList')->join('users', 'payments.user_id', '=', 'users.user_id')->paginate(10);

        return response()->json([
            'payment' => $payment,
        ]);
    }

    public function export()
    {
        $games = Games::select('games.name as GameName', 'publishers.name AS PublisherName', 'games.release_date AS release_date', 'games.price AS Price', 'games.genre AS Genre')->join('publishers', 'games.publisher', '=', 'publishers.publisher_id')->join('developers', 'games.developer', '=', 'developers.developer_id')->get();

        $this->fpdf = new Fpdf;
        $this->fpdf->AddPage("L", 'Letter');
        $this->fpdf->SetFont('Arial', 'B', 16);
        $this->fpdf->Text(100, 10, "Laporan GameStore", 1, 0, 'C');
        $this->fpdf->Cell(10, 7, ' ', 0, 1);
        $this->fpdf->SetFont('Arial', '', 10);
        $this->fpdf->Cell(8, 10, 'No', 1, 0);
        $this->fpdf->Cell(60, 10, 'Game Name', 1, 0);
        $this->fpdf->Cell(65, 10, 'Publisher Name', 1, 0);
        $this->fpdf->Cell(30, 10, 'Release Date', 1, 0);
        $this->fpdf->Cell(15, 10, 'Price', 1, 0);
        $this->fpdf->Cell(80, 10, 'Genre', 1, 1);
        $i = 1;
        foreach ($games as $game) {
            $this->fpdf->Cell(8, 10, $i, 1, 0);
            $this->fpdf->Cell(60, 10, $game->GameName, 1, 0);
            $this->fpdf->Cell(65, 10, $game->PublisherName, 1, 0);
            $this->fpdf->Cell(30, 10, $game->release_date, 1, 0);
            $this->fpdf->Cell(15, 10, $game->Price, 1, 0);
            $this->fpdf->Cell(80, 10, print_r($game->Genre, true), 1, 1);
            $i++;
        }
        $this->fpdf->Output();
        exit;
    }

    public function exportOrder()
    {
        $orders = Orders::select('orders.order_id AS order_id', 'orders.code_pay AS code_pay', 'orders.game AS game', 'orders.price AS price', 'users.user_id AS user_id', 'users.name AS user_name')->join('users', 'orders.user_id', '=', 'users.user_id')->get();


        $this->fpdf = new Fpdf;
        $this->fpdf->AddPage("L", 'Letter');
        $this->fpdf->SetFont('Arial', 'B', 16);
        $this->fpdf->Text(100, 10, "Laporan GameStore - Order", 1, 0, 'C');
        $this->fpdf->Cell(10, 7, ' ', 0, 1);
        $this->fpdf->SetFont('Arial', '', 10);
        $this->fpdf->Cell(8, 10, 'No', 1, 0);
        $this->fpdf->Cell(30, 10, 'User', 1, 0);
        $this->fpdf->Cell(30, 10, 'Code Pay', 1, 0);
        $this->fpdf->Cell(60, 10, 'Game', 1, 0);
        $this->fpdf->Cell(15, 10, 'Price', 1, 1);
        $i = 1;
        foreach ($orders as $order) {
            $orderGame = explode(',', $order->game);
            $this->fpdf->Cell(8, 10, $i, 1, 0);
            $this->fpdf->Cell(30, 10, $order->user_name, 1, 0);
            $this->fpdf->Cell(30, 10, $order->code_pay, 1, 0);
            $this->fpdf->Cell(60, 10, count($orderGame)." Game", 1, 0);
            $this->fpdf->Cell(15, 10, $order->price, 1, 1);
            $i++;
        }
        $this->fpdf->Output();
        exit;
    }

    public function jsonGames()
    {
        $games = Games::select('games.name as GameName', 'publishers.name AS PublisherName', 'games.release_date AS release_date', 'games.price AS Price', 'games.genre AS Genre')->join('publishers', 'games.publisher', '=', 'publishers.publisher_id')->join('developers', 'games.developer', '=', 'developers.developer_id')->get();

        return response()->json([
            'games' => $games,
        ]);
    }

    public function xmlGames()
    {
        $games = Games::select('games.name as GameName', 'publishers.name AS PublisherName', 'games.release_date AS release_date', 'games.price AS Price', 'games.genre AS Genre')->join('publishers', 'games.publisher', '=', 'publishers.publisher_id')->join('developers', 'games.developer', '=', 'developers.developer_id')->get()->toArray();

        $g = "";
        $g .= "<data>";
        foreach ($games as $k => $v) {
            $g .= "<game>";
            $g .= "<nama>".$v['GameName']."</nama>";
            $g .= "<publisher>".$v['PublisherName']."</publisher>";
            $g .= "<release>".$v['release_date']."</release>";
            $g .= "<price>".$v['Price']."</price>";
            $g .= "</game>";
        }
        $g .= "</data>";

        return response()->xml($g, 200, ['Content-Type: text/xml'], 'games');
    }
}