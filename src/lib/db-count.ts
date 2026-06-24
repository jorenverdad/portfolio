import { EventEmitter } from 'events';
import fs from 'fs/promises';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'src/lib/db-count.json');

type DbState = {
  count: number;
  emitter: EventEmitter;
  isLoaded: boolean;
  writePromise: Promise<void>;
};

// Next.js development hot-reload protection
const globalState = globalThis as unknown as {
  __count_db_state__?: DbState;
};

if (!globalState.__count_db_state__) {
  globalState.__count_db_state__ = {
    count: 0,
    emitter: new EventEmitter(),
    isLoaded: false,
    writePromise: Promise.resolve(),
  };
}

const state = globalState.__count_db_state__;

// Ensure state is loaded from disk once
async function ensureLoaded(): Promise<void> {
  if (state.isLoaded) return;

  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    const parsed = JSON.parse(data) as { count: number };
    state.count = typeof parsed.count === 'number' ? parsed.count : 0;
  } catch {
    // If file doesn't exist, create it with 0
    state.count = 0;
    try {
      await fs.writeFile(DB_FILE, JSON.stringify({ count: 0 }, null, 2));
    } catch (writeErr) {
      console.error('Failed to create count db file:', writeErr);
    }
  } finally {
    state.isLoaded = true;
  }
}

// Queue file writing sequentially to avoid race conditions/corruption
function queueWrite(newCount: number): void {
  state.writePromise = state.writePromise
    .then(async () => {
      await fs.writeFile(DB_FILE, JSON.stringify({ count: newCount }, null, 2));
    })
    .catch((error) => {
      console.error('Failed to persist count to disk:', error);
    });
}

/**
 * Gets the current count of 'count me in' taps.
 */
export async function getCount(): Promise<number> {
  await ensureLoaded();
  return state.count;
}

/**
 * Increments the 'count me in' tap count.
 * Emits a change event to notify any live streaming endpoints.
 */
export async function incrementCount(): Promise<number> {
  await ensureLoaded();
  state.count += 1;
  
  // Persist asynchronously (no need to block the response)
  queueWrite(state.count);
  
  // Notify listeners
  state.emitter.emit('change', state.count);
  
  return state.count;
}

/**
 * Subscribes to count changes.
 * Returns an unsubscribe function.
 */
export function subscribeToCount(callback: (count: number) => void): () => void {
  state.emitter.on('change', callback);
  return () => {
    state.emitter.off('change', callback);
  };
}
