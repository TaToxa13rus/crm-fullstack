import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory, IMessage } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('/api/category');
  }

  getById(id: string): Observable<ICategory> {
    return this.http.get<ICategory>(`/api/category/${id}`);
  }

  create(name: string, image?: File): Observable<ICategory> {
    const formData = new FormData();

    if (image) {
      formData.append('image', image, image.name);
    }
    formData.append('name', name);

    return this.http.post<ICategory>('/api/category', formData);
  }

  update(id: string, name: string, image?: File): Observable<ICategory> {
    const formData = new FormData();

    if (image) {
      formData.append('image', image, image.name);
    }
    formData.append('name', name);

    return this.http.patch<ICategory>(`/api/category/${id}`, formData);
  }

  delete(id: string): Observable<IMessage> {
    return this.http.delete<IMessage>(`/api/category/${id}`);
  }
}
