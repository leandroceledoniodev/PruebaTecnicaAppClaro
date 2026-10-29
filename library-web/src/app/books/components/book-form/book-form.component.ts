import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Book, SaveBookRequest } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
})
export class BookFormComponent {
  private readonly fb = inject(FormBuilder);

  book = input<Book | null>(null);
  saving = input(false);
  save = output<SaveBookRequest>();
  cancel = output<void>();

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    description: ['', Validators.maxLength(2000)],
    pageCount: [100, [Validators.required, Validators.min(1)]],
    excerpt: [''],
    publishDate: [this.today(), Validators.required],
  });

  constructor() {
    effect(() => {
      const book = this.book();
      this.form.reset({
        title: book?.title ?? '',
        description: book?.description ?? '',
        pageCount: book?.pageCount ?? 100,
        excerpt: book?.excerpt ?? '',
        publishDate: book ? book.publishDate.substring(0, 10) : this.today(),
      });
    });
  }

  hasError(control: string, error: string): boolean {
    const c = this.form.get(control);
    return !!c && c.touched && c.hasError(error);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.save.emit({
      title: value.title.trim(),
      description: value.description || null,
      pageCount: Number(value.pageCount),
      excerpt: value.excerpt || null,
      publishDate: new Date(value.publishDate).toISOString(),
    });
  }

  private today(): string {
    return new Date().toISOString().substring(0, 10);
  }
}
