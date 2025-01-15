<?php

// TicketController.php
namespace App\Http\Controllers;

use App\Http\Requests\TicketRequest;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        $tickets = $request->user()
            ->tickets()
            ->with('domain')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json($tickets);
    }

    public function store(TicketRequest $request)
    {
        $validated = $request->validated();

        $ticket = $request->user()->tickets()->create([
            'domain_id' => $validated['domain_id'],
            'subject' => $validated['subject'],
            'description' => $validated['description'],
            'priority' => $validated['priority'],
            'status' => 'open'
        ]);

        return response()->json([
            'message' => 'Support ticket created successfully',
            'ticket' => $ticket
        ], 201);
    }

    public function show(Ticket $ticket)
    {
        $this->authorize('view', $ticket);

        return response()->json([
            'ticket' => $ticket->load(['domain', 'user'])
        ]);
    }

    public function update(TicketRequest $request, Ticket $ticket)
    {
        $this->authorize('update', $ticket);

        $validated = $request->validated();
        $ticket->update($validated);

        return response()->json([
            'message' => 'Ticket updated successfully',
            'ticket' => $ticket
        ]);
    }

    public function close(Ticket $ticket)
    {
        $this->authorize('update', $ticket);

        $ticket->update(['status' => 'closed']);

        return response()->json([
            'message' => 'Ticket closed successfully',
            'ticket' => $ticket
        ]);
    }
}

