# Base Image
FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    sqlite3 \
    libsqlite3-dev \
    && docker-php-ext-install pdo pdo_sqlite

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application code to container
COPY . /var/www/html

# Set permissions for Laravel storage and cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Install Laravel dependencies
RUN composer install --no-dev --optimize-autoloader

# Copy environment variables
COPY .env.example .env

# Generate application key
RUN php artisan key:generate

# Expose port 9000 (for PHP-FPM)
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
