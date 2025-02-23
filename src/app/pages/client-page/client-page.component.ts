import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { BtnComponent } from '../../shared/components/btn/btn.component';
import { ClientService } from '../../core/services/client.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-page',
  imports: [CommonModule, RouterModule, RouterOutlet,BtnComponent],
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.scss'
})
export class ClientPageComponent implements OnInit {
  userName: string = '';
  clientsFoundPerPage: number = 0;
  currentRoute: string = '';
  routeSubscription!: Subscription;

  currentPage: number = 1;
  totalPages: number = 0;
  pageSize:number = 16;


  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(){
    this.userName = window.history.state.userName || 'Usuário';

    this.clientService.getClients(this.currentPage, this.pageSize);

    this.clientService.clients$.subscribe((data) => {
      this.clientsFoundPerPage = data?.clients.length || 0;
      this.currentPage = data?.currentPage || 1;
      this.totalPages = data?.totalPages || 0;
    });

    this.currentRoute = this.router.url;
    this.routeSubscription = this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  loadClients(page: number): void {
    this.clientService.getClients(page, this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadClients(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.loadClients(this.currentPage - 1);
    }
  }

}
