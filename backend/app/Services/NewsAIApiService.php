<?php

namespace App\Services;

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NewsAIApiService
{
    protected $apiKey;
    protected $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.newsapi.news_ai');
        $this->baseUrl = 'https://eventregistry.org/api/v1/article/getArticles';
    }

    public function fetchArticles($category = null, $source = null)
    {


        try{
            $response = Http::post($this->baseUrl, [
                "action" => "getArticles",
                "keyword" => $category,
                "ignoreSourceGroupUri" => "paywall/paywalled_sources",
                "apiKey" => $this->apiKey,
            ]);

            if ($response->successful()) {
                return $response->json()['articles']['results'];
            }

            return [];

        }catch (\Exception $exception){
            Log::info("Error message from NewsAIApiService ". $exception->getMessage());
            return [];
        }
    }
}

// Get News from NewsAPI.ai