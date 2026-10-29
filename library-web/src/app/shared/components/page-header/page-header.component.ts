import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  template: `
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="font-serif text-2xl font-semibold text-stone-900 sm:text-3xl">{{ title() }}</h1>
        @if (subtitle()) {
          <p class="mt-1 text-sm text-stone-500">{{ subtitle() }}</p>
        }
      </div>
      <div class="flex shrink-0 gap-2">
        <ng-content />
      </div>
    </div>
  `,
})
export class PageHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>();
}
