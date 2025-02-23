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
