<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Reel;
use Illuminate\Support\Facades\Storage;

class ReelController extends Controller
{
  public function index()
  {
    $reels = Reel::with('creator')->latest()->paginate(10);
    return response()->json($reels);
  }

  public function store(Request $request)
  {
    $request->validate([
      'title' => 'required|string|max:255',
      'video' => 'required|file|mimes:mp4,mov',
      'faith' => 'required|string',
    ]);

    $path = $request->file('video')->store('reels', 'public');

    $reel = Reel::create([
      'creator_id' => auth()->id(),
      'title' => $request->title,
      'video_url' => Storage::url($path),
      'faith' => $request->faith,
    ]);

    return response()->json(['message' => 'Reel uploaded successfully', 'data' => $reel]);
  }
}
