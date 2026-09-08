<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Resource;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Display a listing of all bookings.
     */
    public function index(): JsonResponse
    {
        $bookings = Booking::with('resource')
            ->orderBy('start_time', 'desc')
            ->paginate(15);

        return response()->json($bookings);
    }

    /**
     * Store a newly created booking with conflict check.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'resource_id' => 'required|exists:resources,id',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'nullable|string|max:20',
            'start_time' => 'required|date|after:now',
            'end_time' => 'required|date|after:start_time',
            'notes' => 'nullable|string',
        ]);

        $resource = Resource::findOrFail($validated['resource_id']);
        $start = Carbon::parse($validated['start_time']);
        $end = Carbon::parse($validated['end_time']);

        // Check for conflicting bookings for this resource
        $hasOverlap = Booking::where('resource_id', $resource->id)
            ->where('status', '!=', 'cancelled')
            ->where(function ($query) use ($start, $end) {
                $query->where('start_time', '<', $end)
                      ->where('end_time', '>', $start);
            })
            ->exists();

        if ($hasOverlap) {
            return response()->json([
                'message' => 'The selected studio resource is already booked for this time slot.'
            ], 422);
        }

        // Calculate total price based on duration and hourly rate
        $hours = ceil($start->floatDiffInHours($end));
        $validated['total_price'] = $hours * $resource->price_per_hour;
        $validated['status'] = 'confirmed';

        $booking = Booking::create($validated);

        return response()->json($booking->load('resource'), 201);
    }
}