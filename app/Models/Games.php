<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Games extends Model
{
    use HasFactory;

    protected $table = 'games';

    protected $fillable = [
        'name',
        'developer',
        'publisher',
        'genre',
        'price',
        'review',
        'age_limit',
        'release_date',
        'except_country',
        'description',
        'updated_at',
        'created_at'
    ];

    protected $primaryKey = 'game_id';
}