import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/models/Cliente';

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.css']
})
export class EditarClientesComponent implements OnInit {
  @Input() displayAddEditModal: boolean = true;
  @Input() selectedCliente!: Cliente;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  public cliente!: Cliente;
  valueSelected: boolean = false

  constructor(private fb: FormBuilder, private clienteService: ClienteService,
    private messageService: MessageService){

  }

  ngOnInit(): void {

  }
  ngOnChanges(): void {
    if (this.selectedCliente) {
      this.cliente = this.selectedCliente; // Asegúrate de que cliente se actualice
      this.clienteForm.patchValue(this.selectedCliente);
      console.log(this.selectedCliente);
      console.log('Usuario Seleccionado');

    } else {
      this.clienteForm.reset();
      console.log('reseteado');

    }
  }

  clienteForm = this.fb.group({
    id:[{value:0, disabled:true},[Validators.required]],
    nombre : ["", [Validators.required]],
    cedula : ["", [Validators.required]],
    telefono: ["", [Validators.required]],
    edad: [0,[Validators.required]]
  })

  isValueSelected(){
    if(this.selectedCliente.id === this.cliente.id){
      this.valueSelected= true;
      console.log(this.valueSelected);
    }
  }
  closeModal() {
    this.clienteForm.reset();
    this.clickClose.emit(true);
  }

  EditCliente(){
    let cliente = new Cliente();
    cliente.id = this.selectedCliente.id;
    cliente.nombre = this.clienteForm.value.nombre!;
    cliente.cedula = this.clienteForm.value.cedula!;
    cliente.telefono = this.clienteForm.value.telefono!;
    cliente.edad = this.clienteForm.value.edad!;
    this.clienteService.updateCliente(cliente).subscribe(
      response => {
        console.log(response);
        this.clickAddEdit.emit(response);
        this.closeModal();
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Usuario Actualizado correctamente' });

      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
        console.log(error);



      }
    )
  }

  getSelectedClientList(cliente: Cliente) {
    this.clienteService.getClientesById(cliente.id).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.cliente = response;
        },
        error: (error) => { console.log(error) }
      }
    )
  }

}
