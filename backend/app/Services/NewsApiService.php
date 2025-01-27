<?php

namespace App\Services;

namespace App\Services;

use Illuminate\Support\Facades\Http;

class NewsApiService
{
    protected $apiKey;
    protected $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.newsapi.key');
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

        $response = Http::get($this->baseUrl . 'top-headlines', $query);

        if ($response->successful()) {
            return $response->json()['articles'];
        }

        return [];
    }
}

