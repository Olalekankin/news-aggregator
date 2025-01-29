<?php

namespace App\Services;

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NewsOrgApiService
{
    protected $apiKey;
    protected $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.newsapi.news_org');
        $this->baseUrl = 'https://newsapi.org/v2/';
    }

    public function fetchArticles($category = null, $source = null)
    {
        $query = [
            'apiKey' => $this->apiKey,
            'category' => $category,
            'sources' => $source,
            'language' => 'en',
        ];

        try{
            $response = Http::get($this->baseUrl . 'top-headlines', $query);

            if ($response->successful()) {
                return $response->json()['articles'];
            }
            return [];
        }catch (\Exception $exception){
            Log::info("Error message from NewsOrgApiService ". $exception->getMessage());
            return [];
        }
    }
}

