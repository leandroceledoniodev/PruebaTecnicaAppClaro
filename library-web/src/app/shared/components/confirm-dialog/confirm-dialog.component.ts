import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <app-modal [open]="open()" [title]="title()" size="sm" (closed)="cancelled.emit()">
      <p class="text-sm text-stone-600">{{ message() }}</p>
      <div class="mt-6 flex justify-end gap-2">
        <button type="button" class="btn-secondary" [disabled]="busy()" (click)="cancelled.emit()">Cancelar</button>
        <button type="button" class="btn-danger" [disabled]="busy()" (click)="confirmed.emit()">
          {{ busy() ? 'Eliminando…' : confirmText() }}
        </button>
      </div>
    </app-modal>
  `,
})
export class ConfirmDialogComponent {
  open = input(false);
  title = input('Confirmar');
  message = input('');
  confirmText = input('Eliminar');
  busy = input(false);
  confirmed = output<void>();
  cancelled = output<void>();
}
