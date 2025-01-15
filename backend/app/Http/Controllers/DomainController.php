<?php
// DomainController.php
namespace App\Http\Controllers;

use App\Http\Requests\DomainRequest;
use App\Models\Domain;
use App\Services\DNSService;
use Illuminate\Http\Request;

class DomainController extends Controller
{
    protected $dnsService;

    public function __construct(DNSService $dnsService)
    {
        $this->dnsService = $dnsService;
    }

    public function index(Request $request)
    {
        $domains = $request->user()
            ->domains()
            ->with('hostingPlan')
            ->paginate(10);

        return response()->json($domains);
    }

    public function store(DomainRequest $request)
    {
        $validated = $request->validated();

        // Verify domain availability through DNS service
        if (!$this->dnsService->isDomainAvailable($validated['domain_name'])) {
            return response()->json([
                'message' => 'Domain is not available'
            ], 422);
        }

        $domain = $request->user()->domains()->create([
            'name' => $validated['domain_name'],
            'hosting_plan_id' => $validated['hosting_plan_id'],
            'status' => 'pending',
        ]);

        // Initialize DNS records
        $this->dnsService->setupDomainRecords($domain);

        return response()->json([
            'message' => 'Domain created successfully',
            'domain' => $domain
        ], 201);
    }

    public function show(Domain $domain)
    {
        $this->authorize('view', $domain);

        return response()->json([
            'domain' => $domain->load('hostingPlan')
        ]);
    }

    public function destroy(Domain $domain)
    {
        $this->authorize('delete', $domain);

        $this->dnsService->removeDomainRecords($domain);
        $domain->delete();

        return response()->json([
            'message' => 'Domain deleted successfully'
        ]);
    }
}



