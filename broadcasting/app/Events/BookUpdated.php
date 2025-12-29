<?php

namespace App\Events;

use App\Models\Book;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BookUpdated implements ShouldBroadcastNow
{
    //use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Book $book) {}

    public function broadcastOn(): Channel
    {
        return new Channel('books');
    }

    public function broadcastAs(): string
    {
        return 'BookUpdated';
    }
}