export interface Fornecedor{
  delete(client: Fornecedor): unknown;
  id : number;
  name : string;
  email : string;
  categoria: string[];
  importar: string;
}
