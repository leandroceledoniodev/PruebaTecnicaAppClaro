import { Component, HostListener, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    @if (open()) {
      <div class="fixed inset-0 z-40 flex items-end justify-center bg-stone-900/40 p-4 sm:items-center"
           (click)="closed.emit()">
        <div class="card w-full max-h-[90vh] overflow-y-auto"
             [class]="size() === 'sm' ? 'max-w-md' : 'max-w-xl'"
             role="dialog" aria-modal="true"
             (click)="$event.stopPropagation()">
          <div class="flex items-center justify-between border-b border-stone-200 px-5 py-4">
            <h2 class="text-base font-semibold text-stone-900">{{ title() }}</h2>
            <button type="button" class="btn-ghost" aria-label="Cerrar" (click)="closed.emit()">✕</button>
          </div>
          <div class="px-5 py-4">
            <ng-content />
          </div>
        </div>
      </div>
    }
  `,
})
export class ModalComponent {
  open = input(false);
  title = input('');
  size = input<'sm' | 'md'>('md');
  closed = output<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) this.closed.emit();
  }
}
