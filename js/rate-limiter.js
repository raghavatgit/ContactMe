// Contact Form Client-Side Sliding Window Rate Limiter
// Enforces a strict quota of maximum submissions per time window to deter spam bots.

export class FormRateLimiter {
    private storageKey: string;
    private maxRequests: number;
    private windowMs: number;

    constructor(storageKey = 'contact_rate_limit', maxRequests = 3, windowMs = 60000) {
        this.storageKey = storageKey;
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
    }

    public isAllowed(): { allowed: boolean; remainingWaitMs: number } {
        const now = Date.now();
        const timestamps: number[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]')
            .filter((t: number) => now - t < this.windowMs);

        if (timestamps.length >= this.maxRequests) {
            const oldest = timestamps[0];
            return {
                allowed: false,
                remainingWaitMs: this.windowMs - (now - oldest)
            };
        }

        timestamps.push(now);
        localStorage.setItem(this.storageKey, JSON.stringify(timestamps));
        return { allowed: true, remainingWaitMs: 0 };
    }
}
