import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly baseUri = `${environment.api}/users`;

  http = inject(HttpClient);

  fetchUsers() {
    return this.http.get<User[]>(this.baseUri);
  }

  updateUser(user: User) {
    return this.http.put<User>(`${this.baseUri}/${user.id}`, user);
  }
}
