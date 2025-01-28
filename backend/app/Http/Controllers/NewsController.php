<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsArticleCollection;
use App\Http\Resources\NewsArticleResource;
use App\Models\NewsArticle;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $articles = NewsArticle::query()
            ->when($request->keyword, function ($query, $keyword) {
                $query->where('title', 'like', "%$keyword%")
                    ->orWhere('description', 'like', "%$keyword%");
            })
            ->when($request->category, function ($query, $category) {
                $query->where('category', $category);
            })
            ->when($request->source, function ($query, $source) {
                $query->where('source', $source);
            })
            ->when($request->date, function ($query, $date) {
                $query->whereDate('published_at', $date);
            })
            ->when($request->author, function ($query, $author) {
                $query->where('author', $author);
            })
            ->paginate();

        return new NewsArticleCollection($articles);
    }

    public function personalisedNews(Request $request)
    {
        $user = $request->user();
        $preferences = $user->preferences;

        $articles = NewsArticle::query()
            ->when($preferences->preferred_sources, function ($query, $sources) {
                $query->whereIn('source', $sources);
            })
            ->when($preferences->preferred_categories, function ($query, $categories) {
                $query->whereIn('category', $categories);
            })
            ->paginate(10);

        return new NewsArticleCollection($articles);
    }

    public function categories(): \Illuminate\Http\JsonResponse
    {
        $categories = NewsArticle::query()
            ->select('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category');

        return response()->json([
            'categories' => $categories,
        ]);
    }

    public function authors(): \Illuminate\Http\JsonResponse
    {
        $authors = NewsArticle::query()
            ->whereNotNull('author')
            ->select('author')
            ->distinct()
            ->orderBy('author')
            ->pluck('author');

        return response()->json([
            'authors' => $authors,
        ]);
    }

    public function sources(Request $request): \Illuminate\Http\JsonResponse
    {
        $sources = NewsArticle::query()
            ->select('source')
            ->distinct()
            ->orderBy('source')
            ->pluck('source');

        return response()->json([
            'sources' => $sources,
        ]);
    }
}
