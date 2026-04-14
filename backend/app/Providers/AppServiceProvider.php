<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('contact-form', function (Request $request): array {
            $email = mb_strtolower(trim((string) $request->input('email', '')));

            return [
                Limit::perMinute(6)->by('contact-ip:'.$request->ip()),
                Limit::perHour(30)->by('contact-ip-hour:'.$request->ip()),
                Limit::perHour(8)->by('contact-email:'.($email !== '' ? $email : $request->ip())),
            ];
        });
    }
}
