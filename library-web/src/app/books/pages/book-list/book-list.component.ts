import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { NotificationService } from '../../../shared/services/notification.service';
import { normalize, paginate } from '../../../shared/utils/paginate';
import { Book, SaveBookRequest } from '../../models/book.model';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
})
export class BookListComponent implements OnInit {
  private readonly booksService = inject(BooksService);
  private readonly notifications = inject(NotificationService);

  readonly pageSize = 10;

  readonly books = signal<Book[]>([]);
  readonly loading = signal(true);
  readonly loadFailed = signal(false);
  readonly search = signal('');
  readonly page = signal(1);

  readonly formOpen = signal(false);
  readonly editing = signal<Book | null>(null);
  readonly saving = signal(false);

  readonly toDelete = signal<Book | null>(null);
  readonly deleting = signal(false);

  readonly filtered = computed(() => {
    const term = normalize(this.search());
    if (!term) return this.books();
    return this.books().filter(
      (b) => normalize(b.title).includes(term) || normalize(b.description).includes(term),
    );
  });

  readonly visible = computed(() => paginate(this.filtered(), this.page(), this.pageSize));

  readonly deleteMessage = computed(
    () => `¿Seguro que deseas eliminar "${this.toDelete()?.title ?? ''}"? Esta acción no se puede deshacer.`,
  );

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.loadFailed.set(false);

    this.booksService
      .getAll()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (books) => this.books.set(books),
        error: () => this.loadFailed.set(true),
      });
  }

  onSearch(value: string): void {
    this.search.set(value);
    this.page.set(1);
  }

  openCreate(): void {
    this.editing.set(null);
    this.formOpen.set(true);
  }

  openEdit(book: Book): void {
    this.editing.set(book);
    this.formOpen.set(true);
  }

  closeForm(): void {
    if (!this.saving()) this.formOpen.set(false);
  }

  save(request: SaveBookRequest): void {
    const current = this.editing();
    this.saving.set(true);

    const request$ = current
      ? this.booksService.update(current.id, request)
      : this.booksService.create(request);

    request$.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: (saved) => {
        if (current) {
          this.books.update((list) => list.map((b) => (b.id === current.id ? { ...saved, id: current.id } : b)));
          this.notifications.success('Libro actualizado.');
        } else {
          const id = saved.id || this.nextId();
          this.books.update((list) => [{ ...saved, id }, ...list]);
          this.page.set(1);
          this.notifications.success('Libro creado.');
        }
        this.formOpen.set(false);
      },
    });
  }

  confirmDelete(book: Book): void {
    this.toDelete.set(book);
  }

  delete(): void {
    const book = this.toDelete();
    if (!book) return;

    this.deleting.set(true);
    this.booksService
      .delete(book.id)
      .pipe(finalize(() => this.deleting.set(false)))
      .subscribe({
        next: () => {
          this.books.update((list) => list.filter((b) => b.id !== book.id));
          this.toDelete.set(null);
          this.notifications.success(`"${book.title}" eliminado.`);
        },
      });
  }

  private nextId(): number {
    return this.books().reduce((max, b) => Math.max(max, b.id), 0) + 1;
  }
}
