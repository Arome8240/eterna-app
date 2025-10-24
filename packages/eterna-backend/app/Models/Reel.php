<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reel extends Model
{
    use HasFactory;

    protected $fillable = [
        'creator_id',
        'title',
        'video_url',
        'faith',
        'views',
        'likes',
        'duration',
    ];

    protected $casts = [
        'views' => 'integer',
        'likes' => 'integer',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function faithData()
    {
        return $this->belongsTo(Faith::class, 'faith', 'name');
    }
}
