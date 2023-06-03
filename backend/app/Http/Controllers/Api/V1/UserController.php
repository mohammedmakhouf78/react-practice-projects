<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function users()
    {
        return User::select(['id', 'name', 'email'])->get();
    }
    public function store(Request $request)
    {
        User::create([
            'name' => $request->name,
            'email' => $request->email
        ]);
        return response()->json([
            'status' => 200,
            'message' => 'success'
        ]);
    }

    public function update(User $user, Request $request)
    {
        $user->update([
            'name' => $request->name,
            'email' => $request->email
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'success'
        ]);
    }

    public function delete(User $user)
    {
        $user->delete();
        return response()->json([
            'status' => 200,
            'message' => 'success'
        ]);
    }
}
