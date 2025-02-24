import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { BtnComponent } from '../../shared/components/btn/btn.component';
import { ClientService } from '../../core/services/client/client.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientSelectionService } from '../../core/services/client/client-selection.service';
import { Client } from '../../models/client.model';
import { ClientActionType } from '../../shared/enums/ClientActionType.enum';

@Component({
  selector: 'app-client-page',
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    ReactiveFormsModule,
    BtnComponent,
    ModalComponent
  ],
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.scss'
})
export class ClientPageComponent implements OnInit {
  selectedClient: Client | null = null;
  isEditClientModalOpen:boolean = false;
  isCreateClientModalOpen:boolean = false;
  isDeleteClientModalOpen:boolean = false;
  userName: string = '';
  clientsFoundPerPage: number = 0;
  currentRoute: string = '';
  routeSubscription!: Subscription;
  currentPage: number = 1;
  totalPages: number = 0;
  pageSize:number = 16;
  clientForm: FormGroup;

  constructor(
    private clientService: ClientService,
    private clientSelectionService: ClientSelectionService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      companyValuation: ['', [Validators.required, Validators.min(0)]]
    });

  }

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

    this.clientSelectionService.clientAction$.subscribe(({ client, action }) => {
      if (client && action) {
        this.handleClientAction(client, action);
      } else {
        this.clientService.deselectAllClients();
      }
    });

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

  onSubmit(): void {
    if (this.clientForm.valid) {

      if (this.isCreateClientModalOpen) {
        this.clientService.createClient(this.clientForm.value).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error)   => {
            console.log(error);
          }
        });
      }

      if (this.isEditClientModalOpen) {
        const clientWithID = {
          ...this.clientForm.value,
          id: this.selectedClient?.id
        }
        this.clientService.updateClient(clientWithID).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error)   => {
            console.log(error);
          }
        });
      }

      this.clientForm.reset();
      this.isCreateClientModalOpen = false;
      this.isEditClientModalOpen = false;
    }
  }

  handleClientAction(client: Client, action: ClientActionType): void {
    this.selectedClient = client;

    switch (action) {
      case ClientActionType.DELETE:
        this.isDeleteClientModalOpen = true;
        break;
      case ClientActionType.EDIT:
        this.isEditClientModalOpen = true;
        this.setFormValues();
        break;
      case ClientActionType.SELECT:
        this.clientService.selectClient(client.id);
        break;
      case ClientActionType.DESELECT:
        this.clientService.deselectClient(client.id);
        break;
    }
  }

  confirmDelete(): void {
    if (this.selectedClient?.id) {
      this.clientService.deleteClient(this.selectedClient?.id).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error)   => {
          console.log(error);
        }
      });
      this.isDeleteClientModalOpen = false;
    }
  }

  setFormValues() {
    this.clientForm.patchValue({
      name: this.selectedClient?.name,
      salary: this.selectedClient?.salary,
      companyValuation: this.selectedClient?.companyValuation
    });
  }

  onCloseModal() {
    this.clientForm.reset();
    this.isCreateClientModalOpen = false;
    this.isEditClientModalOpen = false;
  }

  onDeselectAllClients() {
    this.clientSelectionService.clearSelection();
  }
}
