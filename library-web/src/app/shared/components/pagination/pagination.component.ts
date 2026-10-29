import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    @if (totalPages() > 1) {
      <nav class="flex items-center justify-between gap-4 border-t border-stone-200 px-4 py-3 text-sm">
        <span class="text-stone-500">
          {{ from() }}–{{ to() }} de {{ total() }}
        </span>
        <div class="flex items-center gap-1">
          <button type="button" class="btn-ghost" [disabled]="page() === 1" (click)="pageChange.emit(page() - 1)">
            ← Anterior
          </button>
          <span class="px-2 text-stone-600">{{ page() }} / {{ totalPages() }}</span>
          <button type="button" class="btn-ghost" [disabled]="page() === totalPages()" (click)="pageChange.emit(page() + 1)">
            Siguiente →
          </button>
        </div>
      </nav>
    }
  `,
})
export class PaginationComponent {
  page = input.required<number>();
  pageSize = input.required<number>();
  total = input.required<number>();
  pageChange = output<number>();

  totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize())));
  from = computed(() => (this.total() === 0 ? 0 : (this.page() - 1) * this.pageSize() + 1));
  to = computed(() => Math.min(this.page() * this.pageSize(), this.total()));
}
