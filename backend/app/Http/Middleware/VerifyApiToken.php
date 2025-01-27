<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

// Verify incoming calls

class VerifyApiToken
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $apiToken = env('API_TOKEN'); // Fetch the token from .env

        if ($request->header('Authorization') !== "Bearer {$apiToken}") {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
