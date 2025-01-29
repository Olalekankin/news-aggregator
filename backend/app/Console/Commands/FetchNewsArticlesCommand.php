<?php

namespace App\Console\Commands;

use App\Services\NewsAIApiService;
use App\Services\NewYorkTimesApiService;
use Illuminate\Console\Command;


use App\Models\NewsArticle;
use App\Services\NewsOrgApiService;
use Illuminate\Support\Carbon;

class FetchNewsArticlesCommand extends Command
{
    protected $signature = 'fetch:news';
    protected $description = 'Fetch news articles from different data sources and store them in the database';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $categories = NewsArticle::categories();

        foreach ($categories as $category) {

            //NewsApi.org
            $articles = (new NewsOrgApiService())->fetchArticles($category);

            foreach ($articles as $article) {
                NewsArticle::updateOrCreate(
                    ['url' => $article['url']],
                    [
                        'title' => $article['title'],
                        'description' => $article['description'] ?? $article['content'] ?? null,
                        'source' => $article['source']['name'],
                        'category' => $category,
                        'published_at' => isset($article['publishedAt'])
                            ? Carbon::parse($article['publishedAt'])->format('Y-m-d H:i:s')
                            : null,
                        'url' => $article['url'],
                        'author' => $article['author'] ?? 'Allen Jones',
                        'image_url' => $article['urlToImage'] ?? "https://plus.unsplash.com/premium_photo-1681492405224-b787ee736768?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    ]
                );
            }

            //New York times source

            $articles = (new NewYorkTimesApiService())->fetchArticles($category);

            foreach ($articles as $article) {
                NewsArticle::updateOrCreate(
                    ['url' => $article['url']],
                    [
                        'title' => $article['title'],
                        'description' => $article['abstract'] ?? null,
                        'source' => 'New York Times',
                        'category' => $article['section'],
                        'published_at' => isset($article['published_date'])
                            ? Carbon::parse($article['published_date'])->format('Y-m-d H:i:s')
                            : null,
                        'url' => $article['url'],
                        'author' => $article['byline'] ?? 'Jane Doe',
                        'image_url' => $article['multimedia'][0]['url'] ?? "https://plus.unsplash.com/premium_photo-1681492405224-b787ee736768?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    ]
                );
            }

            //NewsApi.ai
            $articles = (new NewsAIApiService())->fetchArticles($category);
            foreach ($articles as $article) {
                NewsArticle::updateOrCreate(
                    ['url' => $article['url']],
                    [
                        'title' => $article['title'],
                        'description' => $article['body'] ?? null,
                        'source' => $article['source']['title'] ?? null,
                        'category' => $category,
                        'published_at' => isset($article['dateTimePub'])
                            ? Carbon::parse($article['dateTimePub'])->format('Y-m-d H:i:s')
                            : null,
                        'url' => $article['url'],
                        'author' => !empty($article['authors'])? $article['authors'][0]['name'] : 'Jane Doe',
                        'image_url' => $article['image'] ?? "https://plus.unsplash.com/premium_photo-1681492405224-b787ee736768?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    ]
                );
            }
        }

        $this->info('Articles fetched and stored successfully.');
    }
}

