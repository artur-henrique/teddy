import { Component } from '@angular/core';
import { ClientCardComponent } from '../client-card/client-card.component';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../models/client.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-list',
  imports: [ CommonModule, ClientCardComponent],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {
  clients: Client[] | undefined = [];
  selectedClientIds: number[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.clients$.subscribe((data) => {
      this.clients = data?.clients;
    });

    this.clientService.selectedClientIds$.subscribe((ids) => {
      this.selectedClientIds = ids;
    });
  }
}
