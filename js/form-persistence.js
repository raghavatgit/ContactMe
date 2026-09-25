// Contact Form Draft Auto-Save & Recovery
// Preserves message in progress across accidental browser refreshes.

export class FormPersistence {
    private storageKey = 'contact_draft';

    public bindForm(formElement: HTMLFormElement): void {
        const inputs = formElement.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');

        // Restore draft if present
        const saved = sessionStorage.getItem(this.storageKey);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                inputs.forEach(el => {
                    if (data[el.name]) el.value = data[el.name];
                });
            } catch (e) {
                sessionStorage.removeItem(this.storageKey);
            }
        }

        // Auto-save on input
        formElement.addEventListener('input', () => {
            const data: Record<string, string> = {};
            inputs.forEach(el => {
                if (el.name && el.type !== 'password') {
                    data[el.name] = el.value;
                }
            });
            sessionStorage.setItem(this.storageKey, JSON.stringify(data));
        });

        // Clear on successful submission
        formElement.addEventListener('submit', () => {
            sessionStorage.removeItem(this.storageKey);
        });
    }
}
