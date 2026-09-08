<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ResourceController extends Controller
{
    /**
     * Display a listing of active studio resources.
     */
    public function index(): JsonResponse
    {
        $resources = Resource::where('is_active', true)
            ->with(['bookings' => function ($query) {
                $query->where('end_time', '>=', now())
                      ->where('status', '!=', 'cancelled')
                      ->orderBy('start_time');
            }])
            ->get();

        return response()->json($resources);
    }

    /**
     * Store a newly created studio resource.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'capacity' => 'required|integer|min:1',
            'price_per_hour' => 'required|numeric|min:0',
            'amenities' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . Str::lower(Str::random(5));

        $resource = Resource::create($validated);

        return response()->json($resource, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Resource $resource): JsonResponse
    {
        return response()->json($resource->load('bookings'));
    }
}