import { Component } from '@angular/core';
import { ClientCardComponent } from '../client-card/client-card.component';
import { ClientService } from '../../../core/services/client/client.service';
import { Client } from '../../../models/client.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  imports: [ CommonModule, ClientCardComponent],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {
  clients: Client[] | undefined = [];
  selectedClients: Client[] | undefined = [];
  routeSubscription!: Subscription;
  currentRoute: string = '';

  constructor(
    private clientService: ClientService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.routeSubscription = this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    })

    this.clientService.clients$.subscribe((data) => {
      this.clients = data?.clients;
    });

    this.clientService.selectedClientIds$.subscribe((ids) => {
      this.selectedClients = this.clients?.filter(client => ids.includes(client.id));
    });
  }
}
