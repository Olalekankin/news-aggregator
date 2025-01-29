<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsArticleCollection;
use App\Http\Resources\NewsArticleResource;
use App\Models\NewsArticle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class NewsController extends Controller
{
    /**
     * Fetch all articles with filtering options.
     */
    public function index(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'keyword'  => 'nullable|string',
            'category' => 'nullable|string',
            'source'   => 'nullable|string',
            'date'     => 'nullable|date',
            'author'   => 'nullable|string',
            'id'   => 'nullable|integer',
            'per_page' => 'nullable|integer|min:1|max:100',
        ]);

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
            ->when($request->id, function ($query, $id) {
                $query->where('id', $id);
            })
            ->when($request->date, function ($query, $date) {
                $query->whereDate('published_at', $date);
            })
            ->when($request->author, function ($query, $author) {
                $query->where('author', $author);
            })
            ->paginate($request->get('per_page', 100));

        return new NewsArticleCollection($articles->appends($request->query()));
    }

    /**
     * Fetch a specific article by ID.
     */
    public function show($id): \Illuminate\Http\JsonResponse
    {
        $article = NewsArticle::find($id);

        if (!$article) {
            return response()->json([
                'error' => 'Article not found',
            ], 404);
        }

        return response()->json(new NewsArticleResource($article));
    }


        /**
     * Search articles by keyword.
     */
    /**
 * Search articles by keyword and optionally filter further by source, published_at, and author.
 */
public function search(Request $request): \Illuminate\Http\JsonResponse
{
    // Validate the request
    $request->validate([
        'keyword'      => 'required|string|min:1|max:255',
        'source'       => 'nullable|string',
        'published_at' => 'nullable|date',
        'author'       => 'nullable|string',
    ]);

    $keyword = $request->keyword;

    // Search for articles by matching keyword in multiple fields and applying filters
     $articles = NewsArticle::query()
        ->where(function ($query) use ($keyword) {
            $query->where('title', 'like', "%$keyword%")
                ->orWhere('description', 'like', "%$keyword%")
                ->orWhere('category', 'like', "%$keyword%")
                ->orWhere('source', 'like', "%$keyword%")
                ->orWhere('author', 'like', "%$keyword%");
        })
        ->when($request->source, function ($query, $source) {
            $query->where('source', $source);
        })
        ->when($request->published_at, function ($query, $published_at) {
            $query->whereDate('published_at', $published_at);
        })
        ->when($request->author, function ($query, $author) {
            $query->where('author', $author);
        })
        ->paginate(30);

        // Returned response
        return response()->json([
            'articles' => NewsArticleResource::collection($articles),
            'pagination' => [
                'current_page' => $articles->currentPage(),
                'last_page' => $articles->lastPage(),
                'per_page' => $articles->perPage(),
                'total' => $articles->total(),
            ],
        ]);
    }

    /**
     * Fetch personalized news based on user preferences.
     */
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
            ->paginate(100);

        return new NewsArticleCollection($articles);
    }

    /**
     * Fetch all unique categories.
     */
    public function categories(): \Illuminate\Http\JsonResponse
    {
        $categories = Cache::remember('news_categories', 60, function () {
            return NewsArticle::query()
                ->select('category')
                ->distinct()
                ->orderBy('category')
                ->pluck('category');
        });

        return response()->json([
            'categories' => $categories,
        ]);
    }

    /**
     * Fetch all unique authors.
     */
    public function authors(): \Illuminate\Http\JsonResponse
    {
        $authors = Cache::remember('news_authors', 60, function () {
            return NewsArticle::query()
                ->whereNotNull('author')
                ->select('author')
                ->distinct()
                ->orderBy('author')
                ->pluck('author');
        });

        return response()->json([
            'authors' => $authors,
        ]);
    }

    /**
     * Fetch all unique sources.
     */
    public function sources(): \Illuminate\Http\JsonResponse
    {
        $sources = Cache::remember('news_sources', 60, function () {
            return NewsArticle::query()
                ->select('source')
                ->distinct()
                ->orderBy('source')
                ->pluck('source');
        });

        return response()->json([
            'sources' => $sources,
        ]);
    }
}
