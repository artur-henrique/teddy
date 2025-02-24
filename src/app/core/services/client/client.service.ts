import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';
import { Client, ClientResponse, CreateClientDTO } from '../../../models/client.model';

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

  createClient(client: CreateClientDTO): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client).pipe(
      tap((newClient) =>{
        const currentClients = this.clientsSubject.value;
        if (currentClients?.clients) {
          this.clientsSubject.next({
            ...currentClients,
            clients: [...currentClients.clients, newClient]
          });
        }
      })
    );
  }

  updateClient(client: Client): Observable<Client> {
    console.log('Cliente editado: ', client);
    return this.http.patch<Client>(`${this.apiUrl}/${client.id}`, client).pipe(
      tap((updatedClient) => {
        const currentClients = this.clientsSubject.value;
        if (currentClients?.clients) {
          this.clientsSubject.next({
            ...currentClients,
            clients: currentClients.clients.map(c => c.id === updatedClient.id ? updatedClient : c)
          });
        }
      }),
      catchError((error) => {
        console.error('Erro ao atualizar cliente:', error);
        return throwError(() => error);
      })
    );
;
  }

  deleteClient(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`, {
      responseType: 'text' as 'json'
    }).pipe(
      tap(() => {
        const currentClients = this.clientsSubject.value;
        if (currentClients?.clients) {
          this.clientsSubject.next({
            ...currentClients,
            clients: currentClients.clients.filter(client => client.id !== id)
          });
        }
      })
    );
  }

  updateSelectedClientIds(ids: number[]): void {
    this.selectedClientIdsSubject.next(ids);
  }

  selectClient(clientId: number): void {
    const currentIds = this.selectedClientIdsSubject.value;
    this.selectedClientIdsSubject.next([...currentIds, clientId]);
  }

  deselectClient(clientId: number): void {
    const currentIds = this.selectedClientIdsSubject.value;
    const index = currentIds.indexOf(clientId);

    if (index > -1) {
      this.selectedClientIdsSubject.next(
        currentIds.filter(id => id !== clientId)
      );
    }
  }

  deselectAllClients(): void {
    this.selectedClientIdsSubject.next([]);
  }
}
