<?php
namespace App\Http\Controllers;

use App\Models\Domain;
use App\Services\AnalyticsService;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    protected $analyticsService;

    public function __construct(AnalyticsService $analyticsService)
    {
        $this->analyticsService = $analyticsService;
    }

    public function getDomainMetrics(Domain $domain)
    {
        $this->authorize('view', $domain);

        $metrics = $this->analyticsService->getDomainMetrics($domain);

        return response()->json([
            'domain' => $domain->name,
            'metrics' => $metrics
        ]);
    }

    public function getUserDashboard(Request $request)
    {
        $domains = $request->user()->domains;
        $aggregateMetrics = $this->analyticsService->getAggregateMetrics($domains);

        return response()->json([
            'user_metrics' => $aggregateMetrics,
            'domains_count' => $domains->count()
        ]);
    }
}
