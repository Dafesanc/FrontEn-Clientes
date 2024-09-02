import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ClientesindexComponent } from './features/clientes/clientesindex/clientesindex.component';
import { CrearClientesComponent } from './features/clientes/crear-clientes/crear-clientes.component';
import { EditarClientesComponent } from './features/clientes/editar-clientes/editar-clientes.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ScrollerModule } from 'primeng/scroller';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import {MessageService } from 'primeng/api';
import { FilterService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    ClientesindexComponent,
    CrearClientesComponent,
    EditarClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    InputNumberModule,
    RadioButtonModule,
    DialogModule,
    FileUploadModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    CardModule,
    ScrollerModule,
    DynamicDialogModule,
    FormsModule,
    ReactiveFormsModule,





  ],

  providers: [
    MessageService, ConfirmationService, FilterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
