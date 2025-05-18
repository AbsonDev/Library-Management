/**
 * Interface representing a book in the library system
 */
export interface Book {
  /** Unique identifier for the book */
  id?: string;
  
  /** Title of the book */
  title: string;
  
  /** Author of the book */
  author: string;
  
  /** International Standard Book Number */
  isbn: string;
  
  /** Year when the book was published */
  publicationYear: number;
  
  /** Number of copies available in the library */
  quantity: number;
  
  /** Whether the book is currently available for borrowing */
  available: boolean;
  
  /** Date when the book was registered in the system */
  registrationDate: Date;
} 