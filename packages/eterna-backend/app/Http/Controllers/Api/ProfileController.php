<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
  public function me()
  {
    return response()->json(auth()->user()->load('sermons', 'reels'));
  }

  public function update(Request $request)
  {
    $user = auth()->user();

    $request->validate([
      'name' => 'nullable|string|max:255',
      'faith' => 'nullable|string',
      'bio' => 'nullable|string',
      'profile_image' => 'nullable|file|mimes:jpg,png,jpeg',
    ]);

    if ($request->hasFile('profile_image')) {
      $path = $request->file('profile_image')->store('profiles', 'public');
      $user->profile_image = Storage::url($path);
    }

    $user->update($request->only('name', 'faith', 'bio'));
    return response()->json(['message' => 'Profile updated', 'data' => $user]);
  }
}
