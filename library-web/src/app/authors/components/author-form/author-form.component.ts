import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Author, SaveAuthorRequest } from '../../models/author.model';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
})
export class AuthorFormComponent {
  private readonly fb = inject(FormBuilder);

  author = input<Author | null>(null);
  saving = input(false);
  save = output<SaveAuthorRequest>();
  cancel = output<void>();

  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.maxLength(100)]],
    lastName: ['', [Validators.required, Validators.maxLength(100)]],
    idBook: [1, [Validators.required, Validators.min(1)]],
  });

  constructor() {
    effect(() => {
      const author = this.author();
      this.form.reset({
        firstName: author?.firstName ?? '',
        lastName: author?.lastName ?? '',
        idBook: author?.idBook ?? 1,
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
      firstName: value.firstName.trim(),
      lastName: value.lastName.trim(),
      idBook: Number(value.idBook),
    });
  }
}
