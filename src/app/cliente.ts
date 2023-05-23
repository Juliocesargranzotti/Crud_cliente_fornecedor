export interface Clientes{
  delete(client: Clientes): unknown;
  id : number;
  name : string;
  date : number;
  email : string;
  telefone : number;
}
