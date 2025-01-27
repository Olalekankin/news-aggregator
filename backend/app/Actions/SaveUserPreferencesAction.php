<?php

namespace App\Actions;

use App\Models\User;
use App\Models\UserPreference;

class SaveUserPreferencesAction
{
    public function execute(User $user, ?array $preferredSources = null, ?array $preferredCategories = null, ?array $preferredAuthors= null)
    {
        // Save or update preferences
        return UserPreference::updateOrCreate(
            ['user_id' => $user->id],
            [
                'preferred_sources' => $preferredSources,
                'preferred_categories' => $preferredCategories,
                'preferred_authors' => $preferredAuthors,
            ]
        );
    }
}
