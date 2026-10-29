import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { NotificationService } from '../../../shared/services/notification.service';
import { BookDetail, SaveBookRequest } from '../../models/book.model';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
})
export class BookDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly booksService = inject(BooksService);
  private readonly notifications = inject(NotificationService);

  readonly book = signal<BookDetail | null>(null);
  readonly loading = signal(true);
  readonly notFound = signal(false);

  readonly formOpen = signal(false);
  readonly saving = signal(false);
  readonly confirmOpen = signal(false);
  readonly deleting = signal(false);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id) || id <= 0) {
      this.notFound.set(true);
      this.loading.set(false);
      return;
    }

    this.booksService
      .getById(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (book) => this.book.set(book),
        error: () => this.notFound.set(true),
      });
  }

  save(request: SaveBookRequest): void {
    const current = this.book();
    if (!current) return;

    this.saving.set(true);
    this.booksService
      .update(current.id, request)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: (saved) => {
          this.book.set({ ...current, ...saved, id: current.id });
          this.formOpen.set(false);
          this.notifications.success('Libro actualizado.');
        },
      });
  }

  delete(): void {
    const current = this.book();
    if (!current) return;

    this.deleting.set(true);
    this.booksService
      .delete(current.id)
      .pipe(finalize(() => this.deleting.set(false)))
      .subscribe({
        next: () => {
          this.notifications.success(`"${current.title}" eliminado.`);
          this.router.navigate(['/books']);
        },
      });
  }
}
