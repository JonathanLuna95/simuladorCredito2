
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

function ocultarSecciones(){
  let componente = document.getElementById("parametros");
  let listaClass = componente.classList;

  listaClass.remove("activa");

  let componente2 = document.getElementById("clientes");
  let listaClass2 = componente2.classList;

  listaClass2.remove("activa");
}

function mostrarSeccion(id){
ocultarSecciones();

let componente = document.getElementById(id);
let listaClass = componente.classList;

listaClass.add("activa");

}

function guardarTasa(){
  let tasa = recuperarFloat("tasaInteres");
  
  if (tasa>=10 && tasa<=20){
    mostrarTexto("mensajeTasa","Tasa configurada correctamente: "+tasa+" %");

  } else {
    mostrarTexto("mensajeTasa","La tasa debe estar entre 10 y 20");
  }
}

function guardarCliente(){
  let cedula = recuperarTexto("txtCedula");
  let nombre = recuperarTexto("txtNombre");
  let apellido = recuperarTexto("txtApellido");
  let ingresos = recuperarFloat("txtIngresos");
  let egresos = recuperarFloat("txtEgresos");

  console.log("Cédula:", cedula);
  console.log("Nombre:", nombre);
  console.log("Apellido:", apellido);
  console.log("Ingresos:", ingresos);
  console.log("Egresos:", egresos);

  let cliente = {};
  cliente.cedula = cedula;
  cliente.nombre = nombre;
  cliente.apellido = apellido;
  cliente.ingresos = ingresos;
  cliente.egresos = egresos;

  clientes.push(cliente);
  console.log(clientes);

  pintarClientes();
}

function pintarClientes(){
  let contenidoTabla = "";
  let cliente;
  for (let indice=0; indice < clientes.length; indice++){
    cliente = clientes[indice];

    contenidoTabla += "<tr>";
    contenidoTabla += "<td>" + cliente.cedula + "</td>";
    contenidoTabla += "<td>" + cliente.nombre + "</td>";
    contenidoTabla += "<td>" + cliente.apellido + "</td>";
    contenidoTabla += "<td>" + cliente.ingresos + "</td>";
    contenidoTabla += "<td>" + cliente.egresos + "</td>";
    contenidoTabla += "<td>";
    contenidoTabla += "<button>Actualizar</button> ";
    contenidoTabla += "<button>Eliminar</button>";
    contenidoTabla += "</td>";
    contenidoTabla += "</tr>";
  }
  document.getElementById("tablaClientes").innerHTML = contenidoTabla;
}
