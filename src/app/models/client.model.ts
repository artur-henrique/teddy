import { ClientActionType } from "../shared/enums/ClientActionType.enum";

export interface Client {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
}

export interface CreateClientDTO {
  name: string;
  salary: number;
  companyValuation: number;
}

export interface ClientResponse {
  clients: Client[];
  totalPages: number;
  currentPage: number;
}

export interface ClientAction {
  client: Client | null;
  action: ClientActionType | null;
}
