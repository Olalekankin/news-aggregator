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
        return ['technology'];
//        return ['technology', 'business', 'sports', 'health', 'politics'];
    }
}

