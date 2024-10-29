class Sistema{
    constructor(){
        this.productos = [  new Producto ("Botella",50,"Botella 500ml","1.jpg","PROD_ID_"+1,200,false,"activo"),
                            new Producto ("Pelota + Inflador", 500, "Pelota con inflador", "2.jpg","PROD_ID_"+2,50,true,"activo"),
                            new Producto("Pelota Sherrin",400,"Pelota Sherrin goma","3.jpg","PROD_ID_"+3,300,true,"activo"),
                            new Producto("Bolso",400,"Bolso deportivo","4.jpeg","PROD_ID_"+4,300,true,"activo"),
                            new Producto("Bicicleta + acc.",2500,"Bicicleta + accesorios","5.jpg","PROD_ID_"+5,50,true,"activo"),
                            new Producto("Futbolito",3000,"Futbolito y mas","6.jpg","PROD_ID_"+6,100,false,"activo"),
                            new Producto("Pelota Rugby",900,"Pelota Rugby","7.jpg","PROD_ID_"+7,400,true,"activo"),
                            new Producto("Tejo",3000,"Tejo","8.jpg","PROD_ID_"+8,100,true,"activo"),
                            new Producto("Set pelotas",1000,"Set pelotas","9.jpg","PROD_ID_"+9,60,false,"activo"),
                            new Producto("Botella plastica",120,"Botella 1000ml","1.jpg","PROD_ID_"+10,60,false,"activo")]

        
        this.usuarios = [new Usuario ("Juan","Perez","juanperez","juan1",4970110000000062,123,true,8),
                         new Usuario("Matias","Lopez","matiaslopez","matias1",4970110000000062,456,true,7),
                         new Usuario ("Pedro","Sanchez","pedrosanchez","pedro1",4970110000000062,789,true,6),
                         new Usuario("Administrador", "Admin", "administrador", "admin1234", "1234123412341234", "123", true,1),
                         new Usuario("Diego","Novas","diegonovas","diegonovas",1234567812345678,"456",true,2),
                         new Usuario("Juan","Perez","juanperez","juan1","1234123412341234","789,",true,3),
                         new Usuario("Jose","Lopez","joselopez","jose1","1234123456785678","012",true,4),
                         new Usuario("Juana","Ort","juanaort","juana1","123456789012","345",true,5),
                         //usuarios compradores
                         new Usuario("Diego","Aguirre","diegoaguirre","diego1","123456789012","345",false,6,5087),
                         new Usuario("Leo","Fernandez","leof","leof1","1111222233334444","111",false,7,3888),
                         new Usuario("Stefani","Forli","stefanif","stef1","1212121212121212","222",false,8,3100),
                         new Usuario("Leo","Messi","leomessi","messi10","1030103010301030","333",false,9,10000),
                         new Usuario("Marcelo","Zalayeta","marceloz","marcelo1","1010202030304040","444",false,10,5555)]

        
        this.compras = [new Compra(1,"pendiente",3,this.productos[0],this.usuarios[11])
        ,new Compra(3,"aprobada",6,this.productos[1],this.usuarios[11])
        ,new Compra(2,"aprobada",2,this.productos[1],this.usuarios[11])
        ,new Compra(4,"aprobada",1,this.productos[2],this.usuarios[11])
        ,new Compra(5,"aprobada",3,this.productos[3],this.usuarios[11])]
        this.proximoIdCompra = 10000;
        this.usuarioLogueado = null;        
        this.proximoIdUsuario = 1000;  
        this.proximoIdProducto = 101;

    }
        //Para obtener id de los usuarios que autoincremente
    obtenerIdUsuario(){
        let idUsuarioActual = this.proximoIdUsuario;
        this.proximoIdUsuario++;
        return idUsuarioActual;
    }
    //Para obtener id de los productos que autoincremente
    obtenerIdProdcuto(){
        let idProductoActual = this.proximoIdProducto;
        this.proximoIdProducto++;
        return "PROD_ID_"+idProductoActual;
    }
    agregarNuevoUsuario(nombre, apellido, nombreUsuario, contrasenia, numTarjeta, cvc, esAdmin) {
        const nuevoUsuario = new Usuario(nombre, apellido, nombreUsuario, contrasenia, numTarjeta, cvc, esAdmin);
        nuevoUsuario.idUsuario = this.obtenerIdUsuario();
        this.usuarios.push(nuevoUsuario);
    }

    agregarCompra(compra) {
        this.compras.push(compra);
    }
}

class Usuario{
    constructor(unNombre, unApellido, unNombreUsuario, unaContrasenia, unNumTarjeta, unCvc, esAdmin,unIdUsuario,unSaldo){
        this.nombre = unNombre;
        this.apellido = unApellido;
        this.nombreUsuario = unNombreUsuario;
        this.contrasenia = unaContrasenia;
        this.numTarjeta = unNumTarjeta;
        this.cvc = unCvc;
        this.esAdmin = esAdmin;
        this.idUsuario = unIdUsuario; // Se asigna automaticamente y sera autoincremental
        this.saldo = unSaldo;
    }
}

class Producto{
    constructor(unNombreProducto,unPrecio,unaDescripcion,unaImagen,unIdProducto,unaCantStock,enOferta,unEstado){
        this.nombreProducto = unNombreProducto;
        this.precio = unPrecio;
        this.descripcion = unaDescripcion;
        this.imagen = unaImagen;
        this.idProducto = unIdProducto;//alfanumero incremental “PROD_ID_x" donde x va a ser el numero que incremente.
        this.stock = unaCantStock;
        this.enOferta = enOferta;
        this.estado = unEstado;
    }

}

class Compra{
    constructor(unIdCompra,unEstado,unaCantidad,unProducto,unUsuario){
        this.idCompra = unIdCompra;
        this.estado = unEstado;
        this.cantidad = unaCantidad;
        this.producto = unProducto;
        this.usuario = unUsuario;
    }
}

