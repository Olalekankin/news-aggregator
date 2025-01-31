<?php

namespace App\Models;


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsArticle extends Model
{
    protected $fillable = [
        'title', 'description', 'id', 'source', 'category', 'published_at', 'url', 'image_url', 'author'
    ];

    public static function categories(): array
    {
       return ['business', 'politics', 'sports', 'health', 'technology', 'insider', 'movie', 'theater', 'world', 'art', 'music',];
    }
}

