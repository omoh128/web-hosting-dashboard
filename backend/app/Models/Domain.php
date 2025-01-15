<?php

// Domain.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Domain extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'user_id',
        'hosting_plan_id',
        'status',
        'nameservers',
        'auto_renew',
        'ssl_status',
        'expires_at',
    ];

    protected $casts = [
        'nameservers' => 'array',
        'ssl_status' => 'array',
        'meta' => 'array',
        'expires_at' => 'datetime',
        'auto_renew' => 'boolean',
    ];

    protected $appends = ['is_expired', 'days_until_expiry'];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function hostingPlan()
    {
        return $this->belongsTo(HostingPlan::class);
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    // Accessors
    public function getIsExpiredAttribute(): bool
    {
        return $this->expires_at && $this->expires_at->isPast();
    }

    public function getDaysUntilExpiryAttribute(): int
    {
        return $this->expires_at ? now()->diffInDays($this->expires_at, false) : 0;
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeExpiringWithin($query, int $days)
    {
        return $query->where('expires_at', '<=', now()->addDays($days))
                    ->where('expires_at', '>', now());
    }

    // Methods
    public function getStorageUsage(): float
    {
        // Implement storage calculation logic
        return 0.0;
    }

    public function getBandwidthUsage(): float
    {
        // Implement bandwidth calculation logic
        return 0.0;
    }
}

