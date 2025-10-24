<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'wallet_address',
        'role',
        'faith',
        'bio',
        'profile_image',
    ];

    protected $hidden = ['remember_token'];

    // Relationships
    public function sermons()
    {
        return $this->hasMany(Sermon::class, 'creator_id');
    }

    public function reels()
    {
        return $this->hasMany(Reel::class, 'creator_id');
    }

    public function sentTips()
    {
        return $this->hasMany(Tip::class, 'from_user_id');
    }

    public function receivedTips()
    {
        return $this->hasMany(Tip::class, 'to_user_id');
    }
}
