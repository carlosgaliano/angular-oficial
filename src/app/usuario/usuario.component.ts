import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Interfaz para tipar los datos
interface Usuario {
  id: number;
  name: string;
  email: string;
  username: string;
}

@Component({
  selector: 'app-usuarios',
  template: `
    <div class="container">
      <h2>Lista de Usuarios</h2>

      <!-- Botones para diferentes operaciones -->
      <div class="buttons">
        <button (click)="obtenerUsuarios()" class="btn-primary">
          Obtener Usuarios
        </button>
        <button (click)="crearUsuario()" class="btn-success">
          Crear Usuario
        </button>
      </div>

      <!-- Loading spinner -->
       @if (cargando) {
         <div class="loading">
           Cargando...
         </div>
       }

      <!-- Mostrar errores -->
       @if(error){
         <div class="error">
           Error: {{ error }}
         </div>

       }

      <!-- Lista de usuarios -->
       @if (usuarios.length > 0) {
         <div class="usuarios-grid">
          @for (usuario of usuarios; track $index) {
            <div class="usuario-card">
              <h3>{{ usuario.name }}</h3>
              <p>Email: {{ usuario.email }}</p>
              <p>Username: {{ usuario.username }}</p>
              <div class="card-actions">
                <button (click)="actualizarUsuario(usuario.id)" class="btn-warning">
                  Actualizar
                </button>
                <button (click)="eliminarUsuario(usuario.id)" class="btn-danger">
                  Eliminar
                </button>
              </div>
            </div>
          }
         </div>

       }
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 1200px; margin: 0 auto; }
    .buttons { margin-bottom: 20px; }
    .buttons button { margin-right: 10px; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; }
    .btn-primary { background-color: #007bff; color: white; }
    .btn-success { background-color: #28a745; color: white; }
    .btn-warning { background-color: #ffc107; color: black; }
    .btn-danger { background-color: #dc3545; color: white; }
    .loading { text-align: center; padding: 20px; font-size: 18px; }
    .error { background-color: #f8d7da; color: #721c24; padding: 10px; border-radius: 4px; margin-bottom: 20px; }
    .usuarios-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
    .usuario-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      background-color: #f9f9f9;
    }
    .usuario-card h3 { margin-top: 0; color: #333; }
    .card-actions { margin-top: 15px; }
    .card-actions button { margin-right: 8px; padding: 5px 10px; font-size: 12px; }
  `]
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  cargando: boolean = false;
  error: string = '';

  // URL base de la API
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  // Inyectar HttpClient en el constructor
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Cargar usuarios al inicializar el componente
    this.obtenerUsuarios();
  }

  // Método GET - Obtener todos los usuarios
  obtenerUsuarios(): void {
    this.cargando = true;
    this.error = '';

    this.http.get<Usuario[]>(this.apiUrl)
      .pipe(
        catchError(this.manejarError.bind(this))
      )
      .subscribe({
        next: (usuarios) => {
          this.usuarios = usuarios;
          this.cargando = false;
          console.log('Usuarios obtenidos:', usuarios);
        },
        error: (error) => {
          this.cargando = false;
          console.error('Error al obtener usuarios:', error);
        }
      });
  }

  // Método POST - Crear un nuevo usuario
  crearUsuario(): void {
    const nuevoUsuario = {
      name: 'Nuevo Usuario',
      email: 'nuevo@ejemplo.com',
      username: 'nuevousuario'
    };

    this.cargando = true;
    this.error = '';

    this.http.post<Usuario>(this.apiUrl, nuevoUsuario)
      .pipe(
        catchError(this.manejarError.bind(this))
      )
      .subscribe({
        next: (usuario) => {
          // Agregar el nuevo usuario a la lista local
          this.usuarios.push(usuario);
          this.cargando = false;
          console.log('Usuario creado:', usuario);
        },
        error: (error) => {
          this.cargando = false;
          console.error('Error al crear usuario:', error);
        }
      });
  }

  // Método PUT - Actualizar un usuario existente
  actualizarUsuario(id: number): void {
    const usuarioActualizado = {
      id: id,
      name: 'Usuario Actualizado',
      email: 'actualizado@ejemplo.com',
      username: 'actualizado'
    };

    this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuarioActualizado)
      .pipe(
        catchError(this.manejarError.bind(this))
      )
      .subscribe({
        next: (usuario) => {
          // Actualizar el usuario en la lista local
          const index = this.usuarios.findIndex(u => u.id === id);
          if (index !== -1) {
            this.usuarios[index] = usuario;
          }
          console.log('Usuario actualizado:', usuario);
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
        }
      });
  }

  // Método DELETE - Eliminar un usuario
  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.http.delete(`${this.apiUrl}/${id}`)
        .pipe(
          catchError(this.manejarError.bind(this))
        )
        .subscribe({
          next: () => {
            // Remover el usuario de la lista local
            this.usuarios = this.usuarios.filter(u => u.id !== id);
            console.log('Usuario eliminado con ID:', id);
          },
          error: (error) => {
            console.error('Error al eliminar usuario:', error);
          }
        });
    }
  }

  // Método para manejar errores
  private manejarError(error: HttpErrorResponse): Observable<never> {
    let mensajeError = 'Ocurrió un error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      mensajeError = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      mensajeError = `Código de error: ${error.status}, mensaje: ${error.message}`;
    }

    this.error = mensajeError;
    console.error(mensajeError);
    return throwError(() => new Error(mensajeError));
  }
}
