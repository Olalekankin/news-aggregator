<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;


use App\Models\NewsArticle;
use App\Services\NewsApiService;
use Illuminate\Support\Carbon;

class FetchNewsArticlesCommand extends Command
{
    protected $signature = 'fetch:news';
    protected $description = 'Fetch news articles and store them in the database';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle(NewsApiService $newsApiService)
    {
        $categories = NewsArticle::categories();

        foreach ($categories as $category) {

            $articles = $newsApiService->fetchArticles($category);

            foreach ($articles as $article) {
                NewsArticle::updateOrCreate(
                    ['url' => $article['url']],
                    [
                        'title' => $article['title'],
                        'description' => $article['description'] ?? $article['content'] ?? $article['content'] ?? null,
                        'source' => $article['source']['name'],
                        'category' => $category,
                        'published_at' => isset($article['publishedAt'])
                            ? Carbon::parse($article['publishedAt'])->format('Y-m-d H:i:s')
                            : null,
                        'url' => $article['url'],
                        'image_url' => $article['urlToImage'],
                    ]
                );
            }
        }

        $this->info('Articles fetched and stored successfully.');
    }
}

