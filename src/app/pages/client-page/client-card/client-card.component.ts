import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../../../models/client.model';
import { ClientSelectionService } from '../../../core/services/client/client-selection.service';
import { ClientActionType } from '../../../shared/enums/ClientActionType.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-card',
  imports: [ CommonModule ],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.scss'
})
export class ClientCardComponent {
  @Input() client!: Client;
  @Input() selected: boolean = false;

  constructor(
    private clientSelectionService: ClientSelectionService
  ) {}

  onSelectClient(): void {
    this.clientSelectionService.selectClient(this.client, ClientActionType.SELECT);
  }

  onDeselectClient(): void {
    this.clientSelectionService.selectClient(this.client, ClientActionType.DESELECT);
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
}
