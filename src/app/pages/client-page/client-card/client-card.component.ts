import { Component, Input } from '@angular/core';
import { Client } from '../../../models/client.model';
import { ClientService } from '../../../core/services/client.service';

@Component({
  selector: 'app-client-card',
  imports: [],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.scss'
})
export class ClientCardComponent {
  @Input() client!: Client;

  constructor(private clientService: ClientService) {}

  toggleSelection(): void {
   this.clientService.toggleClientSelection(this.client.id)   ;
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
