<?php

namespace App\Http\Controllers;

use App\Actions\SaveUserPreferencesAction;
use App\Http\Resources\UserResource;
use App\Models\NewsArticle;
use App\Models\User;
use App\Models\UserPreference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request): \Illuminate\Http\JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'preferred_sources' => 'nullable|array',        // Array of sources
            'preferred_categories' => 'nullable|array',    // Array of categories
            'preferred_authors' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        //save preferences
        (new SaveUserPreferencesAction())->execute($user, $request->input('preferred_sources'), $request->input('preferred_categories'), $request->input('preferred_authors'));

        return response()->json([
            'message' => 'User registered successfully',
            'user' => (new UserResource($user)),
        ], 201);
    }
    public function login(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => (new UserResource($user)),
        ]);
    }

    public function savePreferences(Request $request): \Illuminate\Http\JsonResponse
    {
        $validated = $request->validate([
            'preferred_sources' => 'nullable|array',
            'preferred_categories' => 'nullable|array',
            'preferred_authors' => 'nullable|array',
        ]);

        $user = $request->user();

        $preferences = (new SaveUserPreferencesAction())->execute($user, $validated['preferred_sources'], $validated['preferred_categories'], $validated['preferred_authors']);

        return response()->json([
            'message' => 'Preferences saved successfully',
            'preferences' => $preferences,
        ]);
    }

}
