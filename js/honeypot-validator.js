// Contact Form Honeypot & Timing Bot Detection
// Rejects automated submissions submitted instantaneously or populating hidden fields.

export class BotDefense {
    private formRenderTime: number;
    private minHumanSubmitMs: number;

    constructor(minHumanSubmitMs = 2500) {
        this.formRenderTime = Date.now();
        this.minHumanSubmitMs = minHumanSubmitMs;
    }

    public validateSubmission(honeypotValue: string): { valid: boolean; reason?: string } {
        if (honeypotValue && honeypotValue.trim().length > 0) {
            return { valid: false, reason: 'Honeypot field triggered' };
        }

        const elapsed = Date.now() - this.formRenderTime;
        if (elapsed < this.minHumanSubmitMs) {
            return { valid: false, reason: 'Submission completed faster than human threshold' };
        }

        return { valid: true };
    }
}
