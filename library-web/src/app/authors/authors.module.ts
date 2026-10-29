import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorListComponent } from './pages/author-list/author-list.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';
import { AuthorsService } from './services/authors.service';

@NgModule({
  declarations: [AuthorListComponent, AuthorFormComponent],
  imports: [SharedModule, AuthorsRoutingModule],
  providers: [AuthorsService],
})
export class AuthorsModule {}
