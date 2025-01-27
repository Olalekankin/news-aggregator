<?php

namespace App\Models;


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsArticle extends Model
{
    protected $fillable = [
        'title', 'description', 'source', 'category', 'published_at', 'url', 'image_url',
    ];

    public static function categories(): array
    {
        return ['technology', 'business', 'sports'];
    }
}

