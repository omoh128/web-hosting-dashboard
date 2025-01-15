<?php

namespace App\Http\Middleware;

use App\Models\Domain;
use App\Models\HostingPlan;
use Closure;
use Illuminate\Http\Request;

class VerifyHostingPlan
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Get the user's active domains count
        $userDomainsCount = $request->user()->domains()->count();

        // Get the user's current hosting plan
        $hostingPlan = $request->user()->hostingPlan;

        if (!$hostingPlan) {
            return response()->json([
                'message' => 'No active hosting plan found',
                'error' => 'hosting_plan_required'
            ], 403);
        }

        // Check if user has reached domain limit
        if ($this->isCreatingNewDomain($request)) {
            if ($userDomainsCount >= $hostingPlan->domain_limit) {
                return response()->json([
                    'message' => 'Domain limit reached for current hosting plan',
                    'current_plan' => $hostingPlan->name,
                    'domain_limit' => $hostingPlan->domain_limit,
                    'error' => 'domain_limit_reached'
                ], 403);
            }
        }

        // Verify resource usage limits
        if ($request->route('domain')) {
            $domain = Domain::find($request->route('domain'));

            if ($domain && !$this->verifyResourceLimits($domain, $hostingPlan)) {
                return response()->json([
                    'message' => 'Resource limits exceeded for current hosting plan',
                    'current_plan' => $hostingPlan->name,
                    'error' => 'resource_limit_exceeded'
                ], 403);
            }
        }

        // Check if hosting plan is expired
        if ($hostingPlan->isExpired()) {
            return response()->json([
                'message' => 'Hosting plan has expired',
                'expired_at' => $hostingPlan->expires_at,
                'error' => 'plan_expired'
            ], 403);
        }

        return $next($request);
    }

    /**
     * Check if the request is for creating a new domain
     */
    private function isCreatingNewDomain(Request $request): bool
    {
        return $request->is('api/domains') && $request->isMethod('post');
    }

    /**
     * Verify resource usage against plan limits
     */
    private function verifyResourceLimits(Domain $domain, HostingPlan $plan): bool
    {
        // Check storage usage
        $storageUsed = $domain->getStorageUsage();
        if ($storageUsed > $plan->storage_limit) {
            return false;
        }

        // Check bandwidth usage
        $bandwidthUsed = $domain->getBandwidthUsage();
        if ($bandwidthUsed > $plan->bandwidth_limit) {
            return false;
        }

        // Check database size
        $databaseSize = $domain->getDatabaseSize();
        if ($databaseSize > $plan->database_limit) {
            return false;
        }

        return true;
    }
}


