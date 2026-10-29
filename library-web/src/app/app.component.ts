import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly links = [
    { path: '/books', label: 'Libros' },
    { path: '/authors', label: 'Autores' },
  ];
}
