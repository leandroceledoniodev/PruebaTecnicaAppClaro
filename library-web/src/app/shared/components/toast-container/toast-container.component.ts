import { Component, inject } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-toast-container',
  template: `
    <div class="pointer-events-none fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0">
      @for (toast of notifications.toasts(); track toast.id) {
        <div class="pointer-events-auto flex items-start gap-3 rounded-md border px-4 py-3 text-sm shadow-md"
             [class.border-emerald-200]="toast.type === 'success'"
             [class.bg-emerald-50]="toast.type === 'success'"
             [class.text-emerald-800]="toast.type === 'success'"
             [class.border-red-200]="toast.type === 'error'"
             [class.bg-red-50]="toast.type === 'error'"
             [class.text-red-800]="toast.type === 'error'"
             [class.border-stone-200]="toast.type === 'info'"
             [class.bg-white]="toast.type === 'info'"
             role="status">
          <span class="flex-1">{{ toast.message }}</span>
          <button type="button" class="opacity-60 hover:opacity-100" aria-label="Cerrar" (click)="notifications.dismiss(toast.id)">✕</button>
        </div>
      }
    </div>
  `,
})
export class ToastContainerComponent {
  readonly notifications = inject(NotificationService);
}
