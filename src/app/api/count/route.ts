import { NextRequest, NextResponse } from 'next/server';
import { getCount, incrementCount, subscribeToCount } from '@/lib/db-count';

export async function GET(request: NextRequest): Promise<Response> {
  const acceptHeader = request.headers.get('accept');

  if (acceptHeader !== 'text/event-stream') {
    const currentCount = await getCount();
    return NextResponse.json({ count: currentCount });
  }

  const encoder = new TextEncoder();
  let unsubscribe: (() => void) | null = null;
  let heartbeatInterval: NodeJS.Timeout | null = null;

  const stream = new ReadableStream({
    async start(controller) {
      // Send the current count immediately upon connection
      const initialCount = await getCount();
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ count: initialCount })}\n\n`));

      // Subscribe to changes and stream them
      unsubscribe = subscribeToCount((count) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ count })}\n\n`));
        } catch (error) {
          console.error('SSE: failed to enqueue count update:', error);
        }
      });

      // Send periodic heartbeats to prevent proxies/browsers from dropping idle connection
      heartbeatInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(': heartbeat\n\n'));
        } catch (error) {
          // Stream might be closed already
          if (heartbeatInterval) clearInterval(heartbeatInterval);
          if (unsubscribe) unsubscribe();
          try {
            controller.close();
          } catch (_) {}
        }
      }, 15000);
    },
    cancel() {
      // Cleanup when client disconnects
      if (unsubscribe) {
        unsubscribe();
      }
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}

export async function POST(): Promise<Response> {
  const newCount = await incrementCount();
  return NextResponse.json({ count: newCount });
}
