<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    use HasFactory;

    protected $table = 'users';

    protected $fillable = [
        'name',
        'surname',
        'username',
        'password',
        'gender',
        'age',
        'email',
        'country',
        'updated_at',
        'created_at'
    ];

    protected $primaryKey = 'user_id';

    public function payment()
    {
        return $this->hasMany(Payment::class);
    }
}