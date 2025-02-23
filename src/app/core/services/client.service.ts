import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Client, ClientResponse, CreateClientDTO } from '../../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'api/users';

  private clientsSubject = new BehaviorSubject<ClientResponse | null>(null);
  clients$ = this.clientsSubject.asObservable();

  private selectedClientIdsSubject = new BehaviorSubject<number[]>([]);
  selectedClientIds$ = this.selectedClientIdsSubject.asObservable();


  constructor(private http: HttpClient) {}

  getClients(page: number = 1, pageSize: number = 16): void {
    this.http.get<ClientResponse>(`${this.apiUrl}?page=${page}&limit=${pageSize}'`).subscribe((data) => {
      this.clientsSubject.next(data);
    });
  }

  createClient(client: Client): Observable<CreateClientDTO> {
    return this.http.post<CreateClientDTO>(this.apiUrl, client);
  }

  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.patch<Client>(`${this.apiUrl}/${id}`, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateSelectedClientIds(ids: number[]): void {
    this.selectedClientIdsSubject.next(ids);
  }

  toggleClientSelection(clientId: number): void {
    const currentIds = this.selectedClientIdsSubject.value;
    const index = currentIds.indexOf(clientId);

    if (index > -1) {
      this.selectedClientIdsSubject.next(
        currentIds.filter(id => id !== clientId)
      );
    } else {
      this.selectedClientIdsSubject.next([...currentIds, clientId]);
    }
  }
}
