import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/models/Cliente';
import { UploadEvent } from 'primeng/fileupload';
import * as  XLSX from 'xlsx';
import { Binary } from '@angular/compiler';

@Component({
  selector: 'app-clientesindex',
  templateUrl: './clientesindex.component.html',
  styleUrls: ['./clientesindex.component.css']
})
export class ClientesindexComponent implements OnInit, OnDestroy {
  clientes: Cliente[]=[];
  dropdownOpen:boolean = false;
  suscription!:Subscription;
  displayAddModal:boolean = false;
  displayAddEditModal:boolean = false;
  selectedCliente: any = null;
  searchCedula: string = '';


  constructor(private clienteService: ClienteService, private confirmationService:ConfirmationService,
    private messageService: MessageService){


  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    this.suscription.unsubscribe();
    console.log('Observable cerrado')
  }


  ngOnInit(): void {
    this.getClientesList();

    this.suscription = this.clienteService.refresh$.subscribe(()=>{
      this.getClientesList();
    })

  }

  getClientesList(){
    this.clienteService.getClientes().subscribe(
      {
        next:(response) =>
        { console.log(response)
          this.clientes = response;

        },
        error:(error) =>
        {console.log(error)}
      }
    )
  }
  showAddModal(){
    this.selectedCliente = null;
    this.displayAddModal = true;

  }
  showEditModal(cliente:Cliente){
    this.displayAddEditModal=true;
    this.selectedCliente = cliente;

  }
  hideAddModal(isClosed:boolean){
    this.displayAddModal = !isClosed;
  }
  saveClientToList(newData: any){
    this.getClientesList();
    this.clientes.unshift(newData);
  }

  deleteUser(cliente: Cliente) {
    this.confirmationService.confirm({
      message: 'Estas seguro que deseas eliminar este usuario?',
      accept: () => {
        //Actual logic to perform a confirmation
        this.clienteService.deleteCliente(cliente.id).subscribe(
          response => {
            this.getClientesList();
            this.clientes = this.clientes.filter(data => data.id !== cliente.id);
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Eliminado con exito' });
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          }
        )
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
            case ConfirmEventType.REJECT:
                this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Haz rechazado con exito' });
                break;
            case ConfirmEventType.CANCEL:
                this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Haz cancelado con exito' });
                break;
        }
      }
    });
  }

  hideEditModal(isClosed:boolean){
    this.displayAddEditModal= !isClosed;

  }

  saveOrUpdateClientToList(newData: any){
    if(newData.id === this.selectedCliente.id){
      const clientIndex = this.clientes.findIndex(data => data.id === newData.id);
      this.clientes[clientIndex] = newData;
      this.getClientesList();
    } else {

    this.getClientesList();
    }
  }
  get filteredClientes(): Cliente[] {
    if (!this.searchCedula) {
      return this.clientes;
    }
    return this.clientes.filter(cliente =>
      cliente.cedula.toLowerCase().includes(this.searchCedula.toLowerCase())
    );
  }






}
