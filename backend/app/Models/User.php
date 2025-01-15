<?php

// User.php
namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class User extends Authenticatable
{
    use HasApiTokens, Notifiable, SoftDeletes;
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'hosting_plan_id',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'settings' => 'array',
        'last_login_at' => 'datetime',
    ];

    protected $appends = ['domain_count'];

    // Relationships
    public function hostingPlan()
    {
        return $this->belongsTo(HostingPlan::class);
    }

    public function domains()
    {
        return $this->hasMany(Domain::class);
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    // Accessors
    public function getDomainCountAttribute()
    {
        return $this->domains()->count();
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeWithValidPlan($query)
    {
        return $query->whereHas('hostingPlan', function ($query) {
            $query->where('expires_at', '>', now())
                  ->orWhereNull('expires_at');
        });
    }

    // Methods
    public function canAddDomain(): bool
    {
        return $this->domains()->count() < $this->hostingPlan->domain_limit;
    }

    public function hasReachedResourceLimit(string $resource): bool
    {
        return $this->domains()
            ->sum($resource . '_usage') >= $this->hostingPlan->features[$resource . '_limit'];
    }
}
