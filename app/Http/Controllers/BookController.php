<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = DB::table('books')
        ->orderBy('id', 'desc') // 'asc' for ascending, 'desc' for descending
        ->limit(100)
        ->get();
        //$books = Book::all(); // Fetch all books

        return Inertia::render('Books/Index', [
            'books' => $books,
            'flash' => session('flash')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Books/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'price' => 'nullable|string|max:50',
            'detail' => 'nullable|string',
            'filename' => 'nullable|file|max:10240',
        ]);

        $filename = null;
        if ($request->hasFile('filename')) {
            $path = $request->file('filename')->store('books');
            $filename = basename($path);
        }

        $book = Book::create([
            'title' => $request->title,
            'author' => $request->author,
            'category' => $request->category,
            'price' => $request->price,
            'detail' => $request->detail,
            'filename' => $filename,
        ]);

        //return response()->json(['message' => 'Book created successfully.']);
        //return back()->with('success', 'Book updated successfully.');
        return redirect()->route('books.index', $book)->with('success', 'Updated');
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        return Inertia::render('Books/Show', [
            'book' => $book,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        return Inertia::render('Books/Edit', [
            'book' => $book,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'price' => 'nullable|string|max:50',
            'detail' => 'nullable|string',
            'filename' => 'nullable|file|mimes:jpg,jpeg,png,webp|max:10240',
            'remove_image' => 'nullable|boolean',
        ]);

        // Update text fields
        $data = collect($validated)->except(['filename', 'remove_image'])->toArray();

        /**
         * Remove existing image
         */
        if ($request->boolean('remove_image') && $book->filename) {
            \Storage::delete('books/' . $book->filename);
            $data['filename'] = null;
        }

        /**
         * Upload new image
         */
        if ($request->hasFile('filename')) {

            // Delete old image
            if ($book->filename) {
                \Storage::delete('books/' . $book->filename);
            }

            $path = $request->file('filename')->store('books');
            $data['filename'] = basename($path);
        }

        $book->update($data);

        //return back()->with('success', 'Book updated successfully.');
        return redirect()->route('books.index', $book)->with('success', 'Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $book->delete();

        //return back()->with('success', 'Book deleted successfully.');
        return redirect()->route('books.index', $book)->with('success', 'Updated');
    }
}
