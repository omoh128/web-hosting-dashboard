<?php

// Ticket.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ticket extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'domain_id',
        'subject',
        'description',
        'priority',
        'status',
        'assigned_to',
        'resolved_at',
    ];

    protected $casts = [
        'meta' => 'array',
        'resolved_at' => 'datetime',
        'attachments' => 'array',
    ];

    protected $appends = ['response_time', 'is_overdue'];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function domain()
    {
        return $this->belongsTo(Domain::class);
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    // Scopes
    public function scopeOpen($query)
    {
        return $query->whereNull('resolved_at')
                    ->where('status', '!=', 'closed');
    }

    public function scopePriority($query, string $priority)
    {
        return $query->where('priority', $priority);
    }

    public function scopeOverdue($query)
    {
        return $query->whereNull('resolved_at')
                    ->where('created_at', '<', $this->getOverdueThreshold());
    }

    // Accessors
    public function getResponseTimeAttribute(): int
    {
        return $this->resolved_at
            ? $this->created_at->diffInHours($this->resolved_at)
            : $this->created_at->diffInHours(now());
    }

    public function getIsOverdueAttribute(): bool
    {
        if ($this->resolved_at) {
            return false;
        }

        return $this->created_at < $this->getOverdueThreshold();
    }

    // Methods
    protected function getOverdueThreshold()
    {
        $hours = config("hosting.support.ticket_priorities.{$this->priority}", 24);
        return now()->subHours($hours);
    }

    public function close(string $resolution = null): bool
    {
        return $this->update([
            'status' => 'closed',
            'resolved_at' => now(),
            'meta->resolution' => $resolution,
        ]);
    }

    public function escalate(): bool
    {
        $priorities = ['low', 'medium', 'high', 'critical'];
        $currentIndex = array_search($this->priority, $priorities);

        if ($currentIndex < count($priorities) - 1) {
            return $this->update([
                'priority' => $priorities[$currentIndex + 1],
                'meta->escalated_at' => now(),
            ]);
        }

        return false;
    }
}
