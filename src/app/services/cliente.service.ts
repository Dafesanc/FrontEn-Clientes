import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient} from '@angular/common/http'
import { Cliente } from 'src/models/Cliente';
import { Observable, Subject } from 'rxjs';
import { ResponseApi } from 'src/models/response';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = environment.apiUrl;
  private _refresh$ = new Subject<void>();


  constructor(private http:HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }
  getClientesById(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`)
  }

  createCliente(cliente: Cliente): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(this.apiUrl, cliente);
  }
  createClienteExcel(cliente: Cliente[]): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(this.apiUrl, cliente);
  }

  updateCliente(cliente: Cliente): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(this.apiUrl, cliente);
  }

  deleteCliente(id: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.apiUrl}/${id}`);
  }
  get refresh$() {
    return this._refresh$;
  }
}
