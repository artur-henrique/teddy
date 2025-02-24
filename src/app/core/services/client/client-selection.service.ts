import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client, ClientAction } from '../../../models/client.model';
import { ClientActionType } from '../../../shared/enums/ClientActionType.enum';

@Injectable({
  providedIn: 'root'
})
export class ClientSelectionService {
  private clientActionSubject = new BehaviorSubject<ClientAction>({ client: null, action: null });
  clientAction$ = this.clientActionSubject.asObservable();

  selectClient(client: Client, action: ClientActionType) {
    this.clientActionSubject.next({ client, action });
  }

  clearSelection() {
    this.clientActionSubject.next({ client: null, action: null });
  }

}
