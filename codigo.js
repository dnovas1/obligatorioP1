//Logica
let botones = document.querySelectorAll(".btnSeccion")
for(let i=0;i<botones.length;i++){
    botones[i].addEventListener("click",mostrarSeccion)
}

document.querySelector("#btnSeccionLogin").click()

function mostrarSeccion() {
    ocultarSecciones();
    let idBoton = this.getAttribute("id"); //btnSeccionRegistro -> seccionRegistro
    let idSeccion = idBoton.charAt(3).toLowerCase() + idBoton.substring(4);
    let seccion = document.querySelector("#" + idSeccion);
    if (seccion) {
        seccion.style.display = "block";
    } else {
        console.error("No se encontró la sección con id:",idSeccion);
    }
}

function ocultarSecciones(){
    let secciones = document.querySelectorAll(".seccion");
    for(let i=0;i<secciones.length;i++){
     secciones[i].style.display = "none"
    }
}

ocultarSeccionesAdmin();
ocultarSeccionesCliente();

function ocultarSeccionesAdmin(){
    let btnAdmin = document.querySelectorAll(".btnAdmin")
    for(let i=0;i<btnAdmin.length;i++){
        btnAdmin[i].style.display = "none"
    }
}

function ocultarSeccionesCliente(){
    let btnCliente = document.querySelectorAll(".btnCliente")
    for(let i=0;i<btnCliente.length;i++){
        btnCliente[i].style.display = "none"
    }
}

//Mostrar botones admin
function mostrarSeccionesAdmin(){
    let btnAdmin = document.querySelectorAll(".btnAdmin")
    for(let i=0;i<btnAdmin.length;i++){
        btnAdmin[i].style.display = "block"
    }
}

function mostrarSeccionCliente(){
    let btnAdmin = document.querySelectorAll(".btnCliente")
    for(let i=0;i<btnAdmin.length;i++){
        btnAdmin[i].style.display = "block"
    }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//////////////////////////////////////////////////////////////////////7
/////////////////////////////////////////////////////////////////////////////////////////?????\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//Login
let miSistema = new Sistema()
document.querySelector("#btnIngresar").addEventListener("click", ingresar);

function ingresar() {
    let nombreUsuarioIngresado = document.querySelector("#txtUsuario").value;
    let contraseniaIngresada = document.querySelector("#txtContraseniaLogin").value;
    let mensaje = "Usuario o contraseña incorrectos.";

    for (let i = 0; i < miSistema.usuarios.length; i++) {
        const unUsuario = miSistema.usuarios[i];
        if (unUsuario.nombreUsuario === nombreUsuarioIngresado && unUsuario.contrasenia === contraseniaIngresada) {
            miSistema.usuarioLogueado = unUsuario;
            mensaje = "Ingreso exitoso!";
            document.querySelector("#seccionLogin").style.display = 'none';
            mostrarFuncionalidadesUsuario();          
        }
    }
    document.querySelector("#pMensajesLogin").innerHTML = mensaje;
}

function mostrarFuncionalidadesUsuario() {
    if (miSistema.usuarioLogueado && miSistema.usuarioLogueado.esAdmin) {
        document.querySelector("#btnSeccionInforme").click();
        mostrarSeccionesAdmin();
    } else {
        console.log("No es administrador");
        mostrarSeccionCliente();
    }
}

//REGISTRAR NUEVO USUARIO
document.querySelector("#btnRegistrarse").addEventListener("click",registrarNuevoUsuario)

function registrarNuevoUsuario() {
    let nombre = document.querySelector("#txtNombre").value;
    let apellido = document.querySelector("#txtApellido").value;
    let nombreUsuario = document.querySelector("#txtNombreDeUsuario").value;
    let contrasenia = document.querySelector("#txtContrasenia").value;
    let numTarjeta = document.querySelector("#txtNumTarjeta").value;
    let cvc = document.querySelector("#txtCVC").value;

    if (nombre === "" || apellido === "" || nombreUsuario === "" || contrasenia === "" || numTarjeta === "" || cvc === "") {
        document.querySelector("#pMensajesRegistrarse").innerHTML = "Todos los campos son obligatorios.";
        return;
    }

    if (usuarioYaExiste(nombreUsuario)) {
        document.querySelector("#pMensajesRegistrarse").innerHTML = "El nombre de usuario ya está en uso.";
        return;
    }

    let contraseniaValida = validarContrasenia(contrasenia);
    if (contraseniaValida !== true) {
        document.querySelector("#pMensajesRegistrarse").innerHTML = "La contraseña no cumple con las validaciones correspondientes.";
        return;
    }
    if (validarContrasenia(contrasenia)) {
        console.log("contraseña válida");
    } else {
        console.log("contraseña inválida");
    }
    if (luhnCheck(numTarjeta)) {
        console.log("Número de tarjeta válido");
    } else {
        console.log("Número de tarjeta inválido");
    }

    if (!validarCVC(cvc)) {
            document.querySelector("#pMensajesRegistrarse").innerHTML = "El CVC debe ser un número de 3 dígitos.";
            return;
    }

    //Si pasa las validaciones agregamos el usuario
    miSistema.agregarNuevoUsuario(nombre, apellido, nombreUsuario, contrasenia, numTarjeta, cvc, false);
    console.log("Nuevo usuario agregado:", miSistema.usuarios[miSistema.usuarios.length - 1]);
    
    
}
function validarContrasenia(contrasenia) {
    let tieneMayuscula = false;
    let tieneMinuscula = false;
    let tieneNumero = false;

    for (let i = 0; i < contrasenia.length; i++) {
        let caracter = contrasenia.charAt(i);
        if (caracter >= 'A' && caracter <= 'Z') {
            tieneMayuscula = true;
        } else if (caracter >= 'a' && caracter <= 'z') {
            tieneMinuscula = true;
        } else if (caracter >= '0' && caracter <= '9') {
            tieneNumero = true;
        }
    }

    return tieneMayuscula && tieneMinuscula && tieneNumero && contrasenia.length >= 5;
}
function usuarioYaExiste(nombreUsuario){
    for(let i = 0; i < miSistema.usuarios.length; i++){
        if(miSistema.usuarios[i].nombreUsuario === nombreUsuario){
            return true;
        }
    }
    return false;
}
function validarTarjeta(numTarjeta) {
    let tarjeta = numTarjeta;
    let parrafo = document.querySelector("#pMensajesRegistrarse");
    let resultado = "La tarjeta no es correcta";
    if (validadorTarjeta(tarjeta)) {
        resultado = "La tarjeta es correcta";
    }
    parrafo.innerHTML = resultado;
}


function luhnCheck(numTarjeta) {
    // Convertir el número de tarjeta a una lista de dígitos en orden invertido
    let digits = [];
    for (let i = numTarjeta.length - 1; i >= 0; i--) {
        digits.push(parseInt(numTarjeta[i], 10));
    }
    
    // Doblar cada segundo dígito y restar 9 si el resultado es mayor que 9
    for (let i = 1; i < digits.length; i += 2) {
        digits[i] *= 2;
        if (digits[i] > 9) {
            digits[i] -= 9;
        }
    }
    
    // Sumar todos los dígitos
    let totalSum = 0;
    for (let i = 0; i < digits.length; i++) {
        totalSum += digits[i];
    }
    
    // Verificar si la suma es múltiplo de 10
    return totalSum % 10 === 0;
}
function validarCVC(cvc) {
    return !isNaN(cvc) && cvc.length === 3;
}

//GENERAR TABLA DE PRODUCTOS EN VENTA
document.querySelector("#btnSeccionCompra").addEventListener("click", mostrarTablaDeProductos);

function mostrarTablaDeProductos() {
    let contenidoTabla = "";
    for (let i = 0; i < miSistema.productos.length; i++) {
        const unProducto = miSistema.productos[i];
        if (unProducto.estado === "activo" && unProducto.stock > 0) {
            contenidoTabla += `<tr>
                <td>${unProducto.nombreProducto}</td>
                <td>${unProducto.descripcion}</td>
                <td>$${unProducto.precio}</td>
                <td>${unProducto.enOferta}</td>
                <td><img src='img/${unProducto.imagen}' width='100'></td>
                <td><input type="number" class="cantidadDeseada" data-index="${i}" min="1" max="${unProducto.stock}"></td>
                <td><input type="button" value="Comprar" class="btnComprarProd" data-id="${unProducto.idProducto}" data-index="${i}"></td>
            </tr>`;
        }
    }

    document.querySelector("#tablaProductos").innerHTML = contenidoTabla;

    let botonesComprar = document.querySelectorAll(".btnComprarProd");
    for (let i = 0; i < botonesComprar.length; i++) {
        botonesComprar[i].addEventListener("click", comprarProducto);
    }
}


//////////////////////////////////////////////////////////////////////////////
///////////////////////////////COMPRAR PRODUCTO///////////////////////////////
//////////////////////////////////////////////////////////////////////////////


function comprarProducto(event) {
    let boton = event.target;
    let index = boton.getAttribute("data-index");
    let cantidadDeseada = document.querySelector(`.cantidadDeseada[data-index="${index}"]`).value;
    let idProducto = boton.getAttribute("data-id");

    if (cantidadDeseada <= 0) {
        alert("La cantidad deseada debe ser mayor a 0");
        return;
    }

    let producto = miSistema.productos.find(p => p.idProducto === idProducto);

    if (producto.stock < cantidadDeseada) {
        alert("No hay suficiente stock disponible");
        return;
    }

    // Crear objeto compra
    let compra = {
        idProducto: buscarProducto(producto.idProducto),
        nombreProducto: producto.nombreProducto,
        cantidad: cantidadDeseada,
        precioTotal: producto.precio * cantidadDeseada,
        estado: "pendiente",
        usuario: miSistema.usuarioLogueado

    }
    function buscarProducto(idProducto){

        for (let i = 0; i < miSistema.productos.length; i++) {
            if (miSistema.productos[i].idProducto === idProducto) {
                return miSistema.productos[i];
            }
        }
    }


    // Agregar compra al sistema
    miSistema.agregarCompra(compra,miSistema.usuarioLogueado);

    // Actualizar stock del producto
    producto.stock -= cantidadDeseada;

    alert("Compra realizada con éxito");

    // Mostrar sección de listado de compras
    let botonSeccionListado = document.querySelector("#btnSeccionListado");
    if (botonSeccionListado) {
        botonSeccionListado.click();
    } else {
        console.error("No se encontró el botón con id: btnSeccionListado");
    }
}

//Boton salir
document.querySelector("#btnSalir").addEventListener("click",salir)
function salir(){
    miSistema.usuarioLogueado = null;
    document.querySelector("#btnSeccionLogin").click();
}




//////////////////////////////////////////////////////////////////////////////
///////////////////////////////LISTADO DE COMPRAS/////////////////////////////
//////////////////////////////////////////////////////////////////////////////
document.querySelector("#btnSeccionListado").addEventListener("click", mostrarTablaDeCompras);

function buscarComprasCliente() {
    const usuarioLogueado = miSistema.usuarioLogueado;
    let listaComprasClienteLogueado = [];

    for (let i = 0; i < miSistema.compras.length; i++) {
        if (miSistema.compras[i].usuario === usuarioLogueado) {
            listaComprasClienteLogueado.push(miSistema.compras[i]);
        }
    }

    return listaComprasClienteLogueado;
}

function mostrarTablaDeCompras() {
    let contenidoTabla = "";
    let listaDeCompras = buscarComprasCliente();

    for (let i = 0; i < listaDeCompras.length; i++) {
        const unaCompra = listaDeCompras[i];

        contenidoTabla += `<tr>
            <td>${unaCompra.producto.nombreProducto}</td>
            <td>${unaCompra.cantidad}</td>
            <td>$${unaCompra.cantidad * unaCompra.producto.precio}</td>
            <td>${unaCompra.estado}</td>
            <td><input type="button" value="Cancelar" class="btnCancelarCompra" data-index="${i}"></td>
        </tr>`;
    }

    document.querySelector("#tablaCompras").innerHTML = contenidoTabla;

    let botonesCancelar = document.querySelectorAll(".btnCancelarCompra");
    for (let i = 0; i < botonesCancelar.length; i++) {
        botonesCancelar[i].addEventListener("click", cancelarCompra);
    }
}

function cancelarCompra(event) {
    let boton = event.target;
    let index = boton.getAttribute("data-index");
    let compraCancelada = miSistema.compras[index];

    if (compraCancelada.estado === "pendiente") {
        compraCancelada.estado = "cancelada";
        // Puedes devolver el stock del producto si es necesario
        let producto = miSistema.productos.find(p => p.idProducto === compraCancelada.idProducto);
        if (producto) {
            producto.stock += compraCancelada.cantidad;
        }
    }

    // Actualizar la tabla
    mostrarTablaDeCompras();
}



//////////////////////////////////////////////////////////////////////////////
/////////////////////////VER PRODUCTOS EN OFERTA//////////////////////////////
//////////////////////////////////////////////////////////////////////////////

document.querySelector("#btnSeccionOfertas").addEventListener("click", mostrarTablaDeOfertas);

function mostrarTablaDeOfertas() {
    let contenidoTabla = "";
    for (let i = 0; i < miSistema.productos.length; i++) {
        const unProducto = miSistema.productos[i];
        if (unProducto.enOferta === true && unProducto.stock > 0) {
            contenidoTabla += `<tr>
                <td>${unProducto.nombreProducto}</td>
                <td>${unProducto.descripcion}</td>
                <td>$${unProducto.precio}</td>
                <td>${unProducto.enOferta}</td>
                <td><img src='img/${unProducto.imagen}' width='100'></td>
                <td><input type="number" class="cantidadDeseada" data-index="${i}" min="1" max="${unProducto.stock}"></td>
                <td><input type="button" value="Comprar" class="btnComprarProd" data-id="${unProducto.idProducto}" data-index="${i}"></td>
            </tr>`;
        }
    }

    document.querySelector("#tablaProductosOferta").innerHTML = contenidoTabla;

    let botonesComprar = document.querySelectorAll(".btnComprarProd");
    for (let i = 0; i < botonesComprar.length; i++) {
        botonesComprar[i].addEventListener("click", comprarProducto);
    }
}

//////////////////////////////////////////////////////////////////////////////
/////////////////////////CREAR PRODUCTO///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////  
document.querySelector("#btnCrearProducto").addEventListener("click", crearProducto);

function crearProducto() {
    const nombreProducto = document.querySelector("#txtNombreProducto").value
    const precioProducto = document.querySelector("#txtPrecio").value;
    const descripcionProducto = document.querySelector("#txtDescripcion").value;
    const urlImagenProducto = document.querySelector("#txtUrlImagen").value;
    const stockProducto = document.querySelector("#txtStock").value;
    const mensajeCrearProducto = document.querySelector("#pMensajesCrearProducto");

    // Validaciones
    if (!nombreProducto) {
        mensajeCrearProducto.textContent = "El nombre del producto es obligatorio.";
        return;
    }
    if (!precioProducto || isNaN(precioProducto) || Number(precioProducto) <= 0) {
        mensajeCrearProducto.textContent = "El precio debe ser un valor numérico mayor a 0.";
        return;
    }
    if (!descripcionProducto) {
        mensajeCrearProducto.textContent = "La descripción del producto es obligatoria.";
        return;
    }
    if (!urlImagenProducto) {
        mensajeCrearProducto.textContent = "La URL de la imagen es obligatoria.";
        return;
    }
    if (!stockProducto || isNaN(stockProducto) || Number(stockProducto, 10) <= 0) {
        mensajeCrearProducto.textContent = "La cantidad de stock debe ser un valor numérico mayor a 0.";
        return;
    }

    // Crear nuevo producto
    const nuevoProducto = {
        idProducto: miSistema.productos.length + 1, // Asignar un nuevo ID
        nombreProducto: nombreProducto,
        precio: parseFloat(precioProducto),
        descripcion: descripcionProducto,
        imagen: urlImagenProducto,
        stock: parseInt(stockProducto, 10),
        estado: "activo",
        enOferta: false
    };

    // Agregamos nuevo producto al sistema
    miSistema.productos.push(nuevoProducto);

    //mostramos mensaje si se crea correcatemnte
    mensajeCrearProducto.textContent = "Producto creado exitosamente.";
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////ADMINISTRAR PRODUCTO////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////  


document.querySelector("#btnSeccionAdministrar").addEventListener("click", mostrarTablaDeAdministrarProductos);

function mostrarTablaDeAdministrarProductos() {
    let contenidoTabla = "";
    for (let i = 0; i < miSistema.productos.length; i++) {
        const unProducto = miSistema.productos[i];
        contenidoTabla += `<tr>
            <td>${unProducto.nombreProducto}</td>
            <td>
                <select id="estado-${unProducto.idProducto}">
                    <option value="activo" ${unProducto.estado === "activo" ? "selected" : ""}>Activo</option>
                    <option value="pausado" ${unProducto.estado === "pausado" ? "selected" : ""}>Pausado</option>
                </select>
            </td>
            <td>
                <select id="oferta-${unProducto.idProducto}">
                    <option value="true" ${unProducto.enOferta ? "selected" : ""}>En Oferta</option>
                    <option value="false" ${!unProducto.enOferta ? "selected" : ""}>No en Oferta</option>
                </select>
            </td>
            <td><input type="number" class="cantidadDeseada" id ="idStockProd" data-index="${i}" min="0" value="${unProducto.stock}"></td>
            <td><input type="button" value="Modificar" class="btnModificarProd" data-id="${unProducto.idProducto}" data-index="${i}"></td>
        </tr>`;
    }

    document.querySelector("#tablaAdministrarProductos").innerHTML = contenidoTabla;

    let botonesModificar = document.querySelectorAll(".btnModificarProd");
    for (let i = 0; i < botonesModificar.length; i++) {
        botonesModificar[i].addEventListener("click", modificarProducto);
    }
}

function modificarProducto(event) {
    const boton = event.target;
    const idProducto = boton.getAttribute("data-id");
    const nuevoStock = Number(document.querySelector(`#idStockProd`).value);
    const nuevoEstado = document.querySelector(`#estado-${idProducto}`).value;
    const enOferta = document.querySelector(`#oferta-${idProducto}`).value === 'true';
    const mensajeAdministrarProductos = document.querySelector("#mensajeAdministrarProductos");

    if (isNaN(nuevoStock) || nuevoStock < 0) {
        document.querySelector("#mensajeAdministrarProductos").innerHTML ="El stock debe ser un valor numérico mayor o igual a 0.";
        return;
    }

    // Actualizar el producto en el sistema
    for (let i = 0; i < miSistema.productos.length; i++) {
        if (miSistema.productos[i].idProducto == idProducto) {
            miSistema.productos[i].stock = nuevoStock;
            miSistema.productos[i].estado = (nuevoStock === 0) ? "pausado" : nuevoEstado;
            miSistema.productos[i].enOferta = enOferta;
            break;
        }
    }

    // Mostrar mensaje de éxito
    mensajeAdministrarProductos.textContent = "Cambios guardados exitosamente.";

    // Actualizar la vista para reflejar los cambios
    mostrarTablaDeAdministrarProductos();
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////VER INFORME DE GANANCIAS////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


document.querySelector("#btnSeccionInforme").addEventListener("click", mostrarInformeDeGanancias);

function mostrarInformeDeGanancias() {
    let informe = "";
    let gananciaTotal = 0;
    for (let i = 0; i < miSistema.compras.length; i++) {
        const unaCompra = miSistema.compras[i];
        const cantidadVendida = unaCompra.cantidad||0;
        const gananciaProducto = cantidadVendida * unaCompra.producto.precio;
        gananciaTotal += gananciaProducto;

        informe += `<p>Producto: ${unaCompra.producto.nombreProducto} - Cantidad Vendida: ${cantidadVendida} - Ganancia: $${gananciaProducto}</p>`;
    }

    informe += `<p>Ganancia Total: $${gananciaTotal}</p>`;
    document.querySelector("#pInformeGanancias").innerHTML = informe;
}