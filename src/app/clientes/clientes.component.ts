import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../clientes.service';
import { Clientes } from './../cliente';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  clientes : Clientes[] = [];
  isEditing : boolean = false;
  formGroupClient: FormGroup;
  ClientesService: any;
  submitted: boolean = false;


  constructor (private clientesService : ClientesService, private formBuilder : FormBuilder){

    this.formGroupClient = formBuilder.group({
      id : [''],
      name : ['',[Validators.required]],
      date : [''],
      email : ['',[Validators.required,Validators.email]],
      telefone : ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadClientes();
  }


  loadClientes() {
    this.clientesService.getClientes().subscribe(
      {
        next : data => this.clientes = data

      }
      );
  }

  save(){

    this.submitted = true;

   if(this.formGroupClient.valid){
    if(this.isEditing)
    {
      this.clientesService.update(this.formGroupClient.value).subscribe(
        {
          next: () => {
            this.loadClientes();
            this.formGroupClient.reset();
            this.isEditing = false;
            this.submitted = false;
          }
        }
      )
    }
    else{
      this.clientesService.save(this.formGroupClient.value).subscribe(
        {
          next: data => {
            this.clientes.push(data);
            this.formGroupClient.reset();
            this.submitted = false;
          }
        }
        );
    }
 }
}

  clean(){
    this.formGroupClient.reset();
    this.isEditing = false;
    this.submitted = false;
  }

  edit( clientes : Clientes){
    this.formGroupClient.setValue(this.clientes);
    this.isEditing = true;
  }

  delete(clientes : Clientes){
    this.clientesService.delete(clientes).subscribe({
      next: () => this.loadClientes()
    })
  }

  get name() : any {
    return this.formGroupClient.get("name");
  }

  get email() : any{
    return this.formGroupClient.get("email");
  }

  get telefone() : any{
    return this.formGroupClient.get("telefone");
  }

}


