<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sermon extends Model
{
    use HasFactory;

    protected $fillable = [
        'creator_id',
        'title',
        'description',
        'audio_url',
        'faith',
        'is_minted',
        'nft_token_id',
        'nft_contract_address',
        'royalty_bps',
        'duration',
    ];

    protected $casts = [
        'is_minted' => 'boolean',
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
