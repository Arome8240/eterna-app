<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faith extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'icon'];

    public function sermons()
    {
        return $this->hasMany(Sermon::class, 'faith', 'name');
    }

    public function reels()
    {
        return $this->hasMany(Reel::class, 'faith', 'name');
    }
}
