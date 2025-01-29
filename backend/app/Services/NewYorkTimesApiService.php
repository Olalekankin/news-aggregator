<?php

namespace App\Services;

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NewYorkTimesApiService
{
    protected $apiKey;
    protected $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.newsapi.nytimes');
        $this->baseUrl = 'https://api.nytimes.com/svc/topstories/v2/';
    }

    public function fetchArticles($category = null)
    {
        $query = [
            'api-key' => $this->apiKey,
        ];

        try{
            $response = Http::get($this->baseUrl . "{$category}.json", $query);

            if ($response->successful()) {
                return $response->json()['results'];
            }

            return [];
        }catch (\Exception $exception){
            Log::info("Error message ". $exception->getMessage());
            return [];
        }
    }
}

