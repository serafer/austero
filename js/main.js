
//fetch traigo los datos del .json

let productos = [];

fetch("../js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        imprimirProductos(productos);
        actualizarCarrito ()
    })


//contructor

class Productos {
    constructor(id, nombre, imagen, categoria, precio, color, stock, sale) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.categoria = categoria;
        this.precio = precio;
        this.color = color;
        this.stock = stock;
        this.sale = sale;
    }
}

//Array

const productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];




const contenedorProductos = document.querySelector("#contenedorProductos")
const categoria = document.querySelectorAll(".btnCategoria")
let btnAgregar = document.querySelectorAll(".btnAgregar")
let btnEliminar = document.querySelectorAll(".btnEliminar")


//imprime en el DOM los productos

function imprimirProductos(seleeccion) {
    contenedorProductos.innerHTML = "";
    seleeccion.forEach(productos => {

        const div = document.createElement("div")
        div.classList.add("card")
        div.innerHTML = `

        <div>
            <div class= "prodtuctosCarroImgCont"><img class="imgTienda" src="${productos.imagen}" alt="${productos.imagen}"
            class="card-img-top img-fluid py-3"> </div>
                <div class="card-body">
                    <h3 class="card-title"> ${productos.nombre} </h3>
                    <div class = "precioCard">   <p class="card-text"> $${productos.precio} </p>
                    <button class="btn btn-primary btnAgregar" id="${productos.id}"> Agregar</button>
                    </div></div>

        </div>`;

        contenedorProductos.append(div)
    });
    actBotonesAgregar()
}

//selector de categoría

categoria.forEach(boton => {
    boton.addEventListener("click", (e) => {

        //elimino la class "asideActive" de todo los items
        categoria.forEach(boton => boton.classList.remove("asideActive"));
        //creo la class "asideActive" en categoría posicionada
        e.currentTarget.classList.add("asideActive")

        //imprime filtro
        if (e.currentTarget.id != "todos") {
            const seleccion = productos.filter(productos => productos.categoria === e.currentTarget.id)
            imprimirProductos(seleccion);
        } else {
            imprimirProductos(productos);
        }



    })

})

//activa y refresca botones
function actBotonesAgregar() {
    btnAgregar = document.querySelectorAll(".btnAgregar");

    btnAgregar.forEach(boton => {
        boton.addEventListener("click", carrito)
    })
}

function actBotonesEliminar() {
    btnEliminar = document.querySelectorAll(".btnEliminar");

    console.log(btnEliminar)

    btnEliminar.forEach(boton => {
        boton.addEventListener("click", eliminar)
    })
}

//envia los productos al carrito
function carrito(e) {
    const idBoton = e.currentTarget.id
    const productoAgregado = productos.find(producto => producto.id === idBoton)

    //si está, no duplica el array, solo agrega +1 en cantidad
    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
        productosEnCarrito[index].cantidad++
    } else {
        productoAgregado.cantidad = 1
        productosEnCarrito.push(productoAgregado)
    }
    console.log(productosEnCarrito)
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))
    actualizarCarrito()
    actBotonesEliminar()
}

//imprime en el DOM los productos del carrito

const productosCarro = document.querySelector("#productosCarro");
function actualizarCarrito() {
    productosCarro.innerHTML = ""

    const refreshProductosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || []
    refreshProductosEnCarrito.forEach(producto => {

        const div = document.createElement("div")
        div.classList.add("productosCarroCard")
        div.innerHTML = `

            <div><img class="prodtuctosCarroImg" src="${producto.imagen}"></div>
             <div class="productoTitulo">
               <p>Nombre</p>
               <p>${producto.nombre}</p>
             </div>
             <div class="productoCantidad">
               <p>Cantidad</p>
               <p>${producto.cantidad}</p>
             </div>
             <div class="productoPrecio">
               <p>Precio</p>
               <p>$${producto.precio}</p>
             </div>
             <div class="productoSubtotal">
               <p>Subtotal</p>
               <p>$${producto.precio * producto.cantidad}</p>
             </div>
             <button class="btnEliminar" id="${producto.id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                 fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                 <path
                   d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                 <path fill-rule="evenodd"
                   d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
               </svg></button>
       
               `
        productosCarro.append(div)

    })
    actBotonesEliminar()
    calcularTotalCompra()

}

//eliminar producto del carro
function eliminar(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    console.log(productosEnCarrito)
    productosEnCarrito.splice(index, 1);
    console.log(productosEnCarrito)
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))

    actualizarCarrito()
}


//vaciar carro
const vaciarCarrito = document.getElementById('vaciarCarrito');
vaciarCarrito.addEventListener('click', () => {
    productosEnCarrito.splice(0, productosEnCarrito.length);
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))

    actualizarCarrito();
});


//boton comprar
const comprarCarrito = document.getElementById('comprarCarrito');
comprarCarrito.addEventListener('click', () => {

    Swal.fire({
        title: 'Desea confirmar la compra?',
        showDenyButton: true,
        confirmButtonText: 'Comprar',
        denyButtonText: `No comprar`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Compra exitosa. Muchas gracias por confiar en nosotros!', '', 'success')

            productosEnCarrito.splice(0, productosEnCarrito.length);
            localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))

            actualizarCarrito();

        } else if (result.isDenied) {
            Swal.fire('Compra rechazada', '', 'info')
        }
    })

})


//monto total de la compra

const totalCompra = document.getElementById('totalCompra');
const calcularTotalCompra = () => {
    let totalCompra = 0;
    productosEnCarrito.forEach((producto) => {
        totalCompra += parseInt(producto.precio * producto.cantidad);
    });
    document.getElementById('totalCompra').innerHTML = `$${totalCompra}`;
};