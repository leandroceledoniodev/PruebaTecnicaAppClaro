import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BooksRoutingModule } from './books-routing.module';
import { BookListComponent } from './pages/book-list/book-list.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BooksService } from './services/books.service';

@NgModule({
  declarations: [BookListComponent, BookDetailComponent, BookFormComponent],
  imports: [SharedModule, BooksRoutingModule],
  providers: [BooksService],
})
export class BooksModule {}
