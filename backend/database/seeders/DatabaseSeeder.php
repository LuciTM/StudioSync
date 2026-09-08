<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Resource;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $studioA = Resource::create([
            'title' => 'Studio A - Soundstage & Live Room',
            'slug' => 'studio-a-soundstage',
            'category' => 'Recording',
            'capacity' => 8,
            'price_per_hour' => 55.00,
            'amenities' => ['Neumann U87 Mics', 'SSL Preamp', 'Drum Kit', 'Acoustic Treatment'],
            'is_active' => true,
        ]);

        $studioB = Resource::create([
            'title' => 'Studio B - Podcast & Voiceover Suite',
            'slug' => 'studio-b-podcast-suite',
            'category' => 'Podcast',
            'capacity' => 4,
            'price_per_hour' => 30.00,
            'amenities' => ['Shure SM7B Mics', 'Rodecaster Pro', 'Headphones', 'Video Capture 4K'],
            'is_active' => true,
        ]);

        $photoStudio = Resource::create([
            'title' => 'Studio C - Cyclorama & Lighting Bay',
            'slug' => 'studio-c-cyclorama',
            'category' => 'Photography',
            'capacity' => 12,
            'price_per_hour' => 65.00,
            'amenities' => ['White Infinity Cyc', 'Aputure Continuous Lights', 'C-Stands', 'Changing Room'],
            'is_active' => true,
        ]);

        // Add a sample upcoming booking to Studio A
        Booking::create([
            'resource_id' => $studioA->id,
            'customer_name' => 'Alex Rivera',
            'customer_email' => 'alex@example.com',
            'customer_phone' => '09171234567',
            'start_time' => now()->addDay()->setHour(14)->setMinute(0)->setSecond(0),
            'end_time' => now()->addDay()->setHour(18)->setMinute(0)->setSecond(0),
            'total_price' => 220.00,
            'status' => 'confirmed',
            'notes' => 'Vocal tracking session',
        ]);
    }
}