import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { NotificationService } from '../../../shared/services/notification.service';
import { normalize, paginate } from '../../../shared/utils/paginate';
import { AuthorListItem, SaveAuthorRequest } from '../../models/author.model';
import { AuthorsService } from '../../services/authors.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
})
export class AuthorListComponent implements OnInit {
  private readonly authorsService = inject(AuthorsService);
  private readonly notifications = inject(NotificationService);

  readonly pageSize = 12;

  readonly authors = signal<AuthorListItem[]>([]);
  readonly loading = signal(true);
  readonly loadFailed = signal(false);
  readonly search = signal('');
  readonly page = signal(1);

  readonly formOpen = signal(false);
  readonly editing = signal<AuthorListItem | null>(null);
  readonly saving = signal(false);

  readonly toDelete = signal<AuthorListItem | null>(null);
  readonly deleting = signal(false);

  readonly filtered = computed(() => {
    const term = normalize(this.search());
    if (!term) return this.authors();
    return this.authors().filter((a) => normalize(a.fullName).includes(term));
  });

  readonly visible = computed(() => paginate(this.filtered(), this.page(), this.pageSize));

  readonly deleteMessage = computed(
    () => `¿Seguro que deseas eliminar a ${this.toDelete()?.fullName ?? 'este autor'}? Esta acción no se puede deshacer.`,
  );

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.loadFailed.set(false);

    this.authorsService
      .getAll()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (authors) => this.authors.set(authors),
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

  openEdit(author: AuthorListItem): void {
    this.editing.set(author);
    this.formOpen.set(true);
  }

  closeForm(): void {
    if (!this.saving()) this.formOpen.set(false);
  }

  save(request: SaveAuthorRequest): void {
    const current = this.editing();
    this.saving.set(true);

    const request$ = current
      ? this.authorsService.update(current.id, request)
      : this.authorsService.create(request);

    request$.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: (saved) => {
        if (current) {
          this.authors.update((list) =>
            list.map((a) => (a.id === current.id ? { ...saved, id: current.id, booksCount: current.booksCount } : a)),
          );
          this.notifications.success('Autor actualizado.');
        } else {
          const id = saved.id || this.nextId();
          this.authors.update((list) => [{ ...saved, id, booksCount: 1 }, ...list]);
          this.page.set(1);
          this.notifications.success('Autor creado.');
        }
        this.formOpen.set(false);
      },
    });
  }

  delete(): void {
    const author = this.toDelete();
    if (!author) return;

    this.deleting.set(true);
    this.authorsService
      .delete(author.id)
      .pipe(finalize(() => this.deleting.set(false)))
      .subscribe({
        next: () => {
          this.authors.update((list) => list.filter((a) => a.id !== author.id));
          this.toDelete.set(null);
          this.notifications.success(`${author.fullName} eliminado.`);
        },
      });
  }

  initials(author: AuthorListItem): string {
    return `${author.firstName.charAt(0)}${author.lastName.charAt(0)}`.toUpperCase();
  }

  private nextId(): number {
    return this.authors().reduce((max, a) => Math.max(max, a.id), 0) + 1;
  }
}
