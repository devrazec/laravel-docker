<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Faker\Factory as Faker;

class BooksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonPath = database_path('seeders/dataset_books.json');
        $jsonData = file_get_contents($jsonPath);
        $books = json_decode($jsonData, true);

        $faker = Faker::create();
        $now = Carbon::now();

        // Add timestamps to each book
        foreach ($books as &$book) {
            $book['created_at'] = $now;
            $book['updated_at'] = $now;
            $book['detail'] = $faker->paragraphs(
                rand(2, 5),
                true // return as string instead of array
            );
        }

        DB::table('books')->insert($books);
    }
}
