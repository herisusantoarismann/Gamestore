<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'code_pay',
        'game',
        'price',
        'create_at',
        'update_at',
    ];

    protected $primaryKey = 'order_id';
}