<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sermon;
use Illuminate\Support\Facades\Storage;

class SermonController extends Controller
{
  public function index(Request $request)
  {
    $faiths = $request->input('faiths', []);
    $query = Sermon::with('creator')->latest();

    if (!empty($faiths)) {
      $query->whereIn('faith', $faiths);
    }

    return response()->json($query->paginate(10));
  }

  public function show($id)
  {
    $sermon = Sermon::with('creator')->findOrFail($id);
    return response()->json($sermon);
  }

  public function store(Request $request)
  {
    $request->validate([
      'title' => 'required|string|max:255',
      'audio' => 'required|file|mimes:mp3,wav,aac',
      'faith' => 'required|string',
      'description' => 'nullable|string',
    ]);

    $path = $request->file('audio')->store('sermons', 'public');

    $sermon = Sermon::create([
      'creator_id' => auth()->id(),
      'title' => $request->title,
      'description' => $request->description,
      'faith' => $request->faith,
      'audio_url' => Storage::url($path),
    ]);

    return response()->json(['message' => 'Sermon uploaded successfully', 'data' => $sermon]);
  }

  public function mint($id)
  {
    $sermon = Sermon::findOrFail($id);
    $sermon->is_minted = true;
    $sermon->nft_token_id = rand(1000, 9999); // simulate
    $sermon->nft_contract_address = "0xFakeContractAddress";
    $sermon->save();

    return response()->json(['message' => 'Sermon minted successfully', 'data' => $sermon]);
  }
}
