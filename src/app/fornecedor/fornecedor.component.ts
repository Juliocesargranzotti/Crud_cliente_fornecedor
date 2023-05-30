import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Fornecedor } from './../fornecedor';
import { Component } from '@angular/core';
import { FornecedorService } from '../fornecedor.service';
import { importar } from '../importar';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent {

  importar = importar;
  fornecedor: Fornecedor[] = [];
  isEditing: boolean = false;
  formGroupClient: FormGroup;
  submitted: boolean = false;


  constructor(private fornecedorService: FornecedorService, private formBuilder: FormBuilder) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      categoria: this.formBuilder.array([]),
      importar: ['']

    });
  }

  ngOnInit(): void {
    this.loadFornecedor();
  }

  loadFornecedor() {
    this.fornecedorService.getFornecedor().subscribe({
      next: data => this.fornecedor = data
    });
  }

  save() {
    this.submitted = true;
    if(this.formGroupClient.valid){

    if (this.isEditing) {
      this.fornecedorService.update(this.formGroupClient.value).subscribe({
        next: () => {
          this.loadFornecedor();
          this.formGroupClient.reset();
          this.isEditing = false;
          this.submitted = false;
        }
      })
    } else {
      const formData = this.formGroupClient.value;
      formData.categoria = this.getCategoriasSelecionadas();

      this.fornecedorService.save(formData).subscribe({
        next: data => {
          this.fornecedor.push(data);
          this.formGroupClient.reset();
          this.submitted = false;
        }
      });
    }
  }
}

  getCategoriasSelecionadas(): string[] {
    const categoriasSelecionadas: string[] = [];

    const categoriaFormArray = this.formGroupClient.get('categoria') as FormArray;
    categoriaFormArray.getRawValue().forEach((value: any) => {
      if (value) {
        categoriasSelecionadas.push(value);
      }
    });

    return categoriasSelecionadas;
  }

  clean() {
    this.formGroupClient.reset();
    this.isEditing = false;
    this.submitted = false;
  }

  edit(fornecedor: Fornecedor) {
    this.formGroupClient.setValue(fornecedor);
    this.isEditing = true;
  }

  delete(fornecedor: Fornecedor) {
    this.fornecedorService.delete(fornecedor).subscribe({
      next: () => this.loadFornecedor()
    });
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

  toggleCategoria(categoria: string) {
    const categoriaFormArray = this.formGroupClient.get('categoria') as FormArray;

    if (this.isCategoriaSelecionada(categoria)) {
      const index = categoriaFormArray.value.indexOf(categoria);
      categoriaFormArray.removeAt(index);
    } else {
      categoriaFormArray.push(new FormControl(categoria));
    }
  }

  isCategoriaSelecionada(categoria: string): boolean {
    const categoriaFormArray = this.formGroupClient.get('categoria') as FormArray;
    return categoriaFormArray.value.includes(categoria);
  }

}
