<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Resource extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'category',
        'capacity',
        'price_per_hour',
        'amenities',
        'is_active',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'amenities' => 'array',
            'is_active' => 'boolean',
            'price_per_hour' => 'decimal:2',
            'capacity' => 'integer',
        ];
    }

    /**
     * Get all bookings for this resource.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}