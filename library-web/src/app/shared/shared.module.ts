import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ModalComponent } from './components/modal/modal.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { EmptyStateComponent, LoadingStateComponent } from './components/state/state.components';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ToastContainerComponent } from './components/toast-container/toast-container.component';
import { TruncatePipe } from './pipes/truncate.pipe';

const COMPONENTS = [
  PageHeaderComponent,
  ModalComponent,
  ConfirmDialogComponent,
  LoadingStateComponent,
  EmptyStateComponent,
  PaginationComponent,
  ToastContainerComponent,
];

@NgModule({
  declarations: [...COMPONENTS, TruncatePipe],
  imports: [CommonModule],
  exports: [
    ...COMPONENTS,
    TruncatePipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SharedModule {}
