import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-loading-state',
  template: `
    <div class="flex flex-col items-center justify-center gap-3 py-16 text-stone-500">
      <span class="h-6 w-6 animate-spin rounded-full border-2 border-stone-300 border-t-brand-600"></span>
      <span class="text-sm">{{ text() }}</span>
    </div>
  `,
})
export class LoadingStateComponent {
  text = input('Cargando…');
}

@Component({
  selector: 'app-empty-state',
  template: `
    <div class="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <p class="text-sm font-medium text-stone-700">{{ title() }}</p>
      @if (description()) {
        <p class="max-w-sm text-sm text-stone-500">{{ description() }}</p>
      }
      @if (actionText()) {
        <button type="button" class="btn-secondary mt-2" (click)="action.emit()">{{ actionText() }}</button>
      }
    </div>
  `,
})
export class EmptyStateComponent {
  title = input('No hay resultados');
  description = input<string>();
  actionText = input<string>();
  action = output<void>();
}
