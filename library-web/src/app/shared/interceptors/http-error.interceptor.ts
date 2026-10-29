import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { ApiResponse } from '../models/api-response.model';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifications = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      notifications.error(resolveMessage(error));
      return throwError(() => error);
    }),
  );
};

function resolveMessage(error: HttpErrorResponse): string {
  if (error.status === 0) {
    return 'No se pudo conectar con el API. Verifica que esté corriendo.';
  }

  const body = error.error as Partial<ApiResponse<unknown>> | null;

  if (body?.errors?.length) {
    return body.errors.join(' · ');
  }

  switch (error.status) {
    case 404:
      return 'El registro no existe.';
    case 502:
      return 'El servicio externo no está disponible en este momento.';
    default:
      return body?.message || 'Ocurrió un error inesperado.';
  }
}
