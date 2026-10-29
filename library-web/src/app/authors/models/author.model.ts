export interface Author {
  id: number;
  idBook: number;
  firstName: string;
  lastName: string;
  fullName: string;
}

export interface AuthorListItem extends Author {
  booksCount: number;
}

export interface SaveAuthorRequest {
  idBook: number;
  firstName: string;
  lastName: string;
}
