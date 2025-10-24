<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
  public function register(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'nullable|email|unique:users',
      'wallet_address' => 'nullable|string|unique:users',
      'faith' => 'nullable|string',
      'role' => 'in:listener,creator',
    ]);

    $user = User::create([
      'name' => $request->name,
      'email' => $request->email,
      'wallet_address' => $request->wallet_address,
      'faith' => $request->faith,
      'role' => $request->role ?? 'listener',
      'password' => Hash::make('password'), // optional for wallet users
    ]);

    return response()->json([
      'status' => true,
      'message' => 'Registration successful',
      'token' => $user->createToken('eterna')->plainTextToken,
      'data' => $user
    ]);
  }

  public function login(Request $request)
  {
    $request->validate(['email' => 'required|email', 'password' => 'required']);
    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
      throw ValidationException::withMessages(['email' => ['Invalid credentials']]);
    }

    return response()->json([
      'status' => true,
      'token' => $user->createToken('eterna')->plainTextToken,
      'data' => $user
    ]);
  }
}
