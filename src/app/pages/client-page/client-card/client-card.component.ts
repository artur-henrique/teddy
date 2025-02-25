import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from '../../../models/client.model';
import { ClientSelectionService } from '../../../core/services/client/client-selection.service';
import { ClientActionType } from '../../../shared/enums/ClientActionType.enum';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

const { STORAGE_KEY  } = environment;

@Component({
  selector: 'app-client-card',
  imports: [ CommonModule ],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.scss'
})
export class ClientCardComponent implements OnInit {
  @Input() client!: Client;
  @Input() selected: boolean = false;
  isSelected: boolean = false;

  constructor(
    private clientSelectionService: ClientSelectionService
  ) {}

  ngOnInit(): void {
    const selectedClientIds = this.getClientIdsFromStorage();
    console.log(selectedClientIds);
    const isClientSelected = selectedClientIds.find(id => id === this.client.id);

    if(isClientSelected) {
      this.isSelected = true;
    }
  }

  onSelectClient(): void {
    this.clientSelectionService.selectClient(this.client, ClientActionType.SELECT);
    this.isSelected = true;
    this.addClientIdToStorage(this.client.id);
  }

  onDeselectClient(): void {
    this.clientSelectionService.selectClient(this.client, ClientActionType.DESELECT);
    this.isSelected = false;
    this.removeClientIdFromStorage(this.client.id);
  }

  onEditClient(): void {
    this.clientSelectionService.selectClient(this.client, ClientActionType.EDIT);
  }

  onDeleteClient(): void {
     this.clientSelectionService.selectClient(this.client, ClientActionType.DELETE);
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  addClientIdToStorage(id: number): void {
    const storedData = localStorage.getItem(STORAGE_KEY);
    const ids: number[] = storedData ? JSON.parse(storedData) : [];
    console.log(ids);
    if (!ids.includes(id)) {
      ids.push(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    }
  }

  removeClientIdFromStorage(id: number): void {
    const storedData = localStorage.getItem(STORAGE_KEY);
    const ids: number[] = storedData ? JSON.parse(storedData) : [];

    const filteredIds = ids.filter((storedId) => storedId !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredIds));
  }

  getClientIdsFromStorage(): number[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  }
}
