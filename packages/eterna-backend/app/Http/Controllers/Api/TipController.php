<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tip;

class TipController extends Controller
{
  public function sendTip(Request $request)
  {
    $request->validate([
      'to_user_id' => 'required|exists:users,id',
      'amount' => 'required|numeric|min:0.01',
      'token' => 'nullable|string',
      'tx_hash' => 'nullable|string',
    ]);

    $tip = Tip::create([
      'from_user_id' => auth()->id(),
      'to_user_id' => $request->to_user_id,
      'amount' => $request->amount,
      'token' => $request->token ?? 'ETH',
      'tx_hash' => $request->tx_hash ?? 'simulated',
    ]);

    return response()->json(['message' => 'Tip recorded successfully', 'data' => $tip]);
  }

  public function sentTips()
  {
    return response()->json(Tip::where('from_user_id', auth()->id())->latest()->get());
  }

  public function receivedTips()
  {
    return response()->json(Tip::where('to_user_id', auth()->id())->latest()->get());
  }
}
