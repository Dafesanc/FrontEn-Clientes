import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/models/Cliente';

@Component({
  selector: 'app-crear-clientes',
  templateUrl: './crear-clientes.component.html',
  styleUrls: ['./crear-clientes.component.css']
})
export class CrearClientesComponent implements OnInit {
  @Input() displayAddModal: boolean = true;
  @Input() selectedCliente: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();
  //usuario!: Profile;
  date: Date = new Date();

  createClienteForm = this.fb.group({
    nombres : ["", [Validators.required]],
    cedula : ["", [Validators.required]],
    telefono: ["", [Validators.required]],
    edad: [0,[Validators.required]]

  });


  constructor(private fb: FormBuilder, private clienteService: ClienteService,
    private messageService: MessageService) {

  }
  ngOnInit(): void {

    //console.log(this.getPerfilData());
    //this.createUserForm.get('usuarioCreacion')?.setValue('xsiavichay');


  }
  closeModal() {
    this.createClienteForm.reset();
    this.clickClose.emit(true);
  }

  addUser() {
    let cliente = new Cliente();
    cliente.id;
    cliente.nombre = this.createClienteForm.value.nombres!;
    cliente.cedula = this.createClienteForm.value.cedula!;
    cliente.telefono = this.createClienteForm.value.telefono!;
    cliente.edad = this.createClienteForm.value.edad!;
    this.clienteService.createCliente(cliente).subscribe(
      response => {
        this.clickAdd.emit(response);
        this.closeModal();
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Usuario agregado exitosamente' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
        console.log('Error occured');
      }
    )



}

}
