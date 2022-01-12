<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;

class Payment extends Model
{
    use HasFactory;

    protected $table = 'payments';

    protected $fillable = [
        'user_id',
        'payment_type',
        'card_number',
        'valid',
        'games',
        'code_pay',
        'created_at'
    ];

    protected $primaryKey = 'payment_id';

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}