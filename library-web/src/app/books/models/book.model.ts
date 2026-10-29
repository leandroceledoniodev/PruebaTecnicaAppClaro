export interface Book {
  id: number;
  title: string;
  description: string | null;
  pageCount: number;
  excerpt: string | null;
  publishDate: string;
}

export interface BookAuthor {
  id: number;
  idBook: number;
  firstName: string;
  lastName: string;
  fullName: string;
}

export interface BookDetail extends Book {
  authors: BookAuthor[];
}

export interface SaveBookRequest {
  title: string;
  description: string | null;
  pageCount: number;
  excerpt: string | null;
  publishDate: string;
}
