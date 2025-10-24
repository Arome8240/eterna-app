<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Faith;

class FaithController extends Controller
{
  public function index()
  {
    return response()->json(Faith::all());
  }
}
