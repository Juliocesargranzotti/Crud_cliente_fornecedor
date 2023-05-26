
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fornecedor } from '../fornecedor';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent {
  fornecedor : Fornecedor[] = [];
  isEditing : boolean = false;
  formGroupClient: FormGroup;
  FornecedorService: any;
  submitted: boolean = false;



  constructor (private fornecedorService : FornecedorService, private formBuilder : FormBuilder){

    this.formGroupClient = formBuilder.group({
      id : [''],
      name : ['',[Validators.required]],
      email : ['',[Validators.required,Validators.email]],
      categoria : ['',[Validators.required]]

    });
  }

  ngOnInit(): void {
    this.loadFornecedor();
  }


  loadFornecedor() {
    this.fornecedorService.getFornecedor().subscribe(
      {
        next : data => this.fornecedor = data

      }
      );
  }

  save(){

    this.submitted = true;

   if(this.formGroupClient.valid){
    if(this.isEditing)
    {
      this.fornecedorService.update(this.formGroupClient.value).subscribe(
        {
          next: () => {
            this.loadFornecedor();
            this.formGroupClient.reset();
            this.isEditing = false;
            this.submitted = false;
          }
        }
      )
    }
    else{
      this.fornecedorService.save(this.formGroupClient.value).subscribe(
        {
          next: data => {
            this.fornecedor.push(data);
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

  edit(fornecedor : Fornecedor){
    this.formGroupClient.setValue(fornecedor);
    this.isEditing = true;
  }

  delete(fornecedor : Fornecedor){
    this.fornecedorService.delete(fornecedor).subscribe({
      next: () => this.loadFornecedor()
    })
  }

  get name() : any {
    return this.formGroupClient.get("name");
  }

  get email() : any{
    return this.formGroupClient.get("email");
  }

  get categoria() : any{
    return this.formGroupClient.get("categoria");
  }



}
