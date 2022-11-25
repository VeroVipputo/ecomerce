

// Variables
const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#lista-productos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

// Listeners
cargarEventListeners();

 function cargarEventListeners()  { 

               // Dispara cuando se presiona "Comprar"
     listaProductos.addEventListener  ('click', agregarProducto);
     async function agregarProducto(e) {
          try {
                e.preventDefault();
               // Delegation para agregar-carrito
                (e.target.classList.contains('agregar-carrito')) 
                    const producto = e.target.parentElement.parentElement;
                    // Enviamos el producto seleccionado para tomar sus datos
                    leerDatosProducto(producto);
                    console.log('Producto agregado')
     
               } catch (error) {
                    console.log(error);    
          }
     
          }

     // Cuando se elimina un producto del carrito
     carrito.addEventListener('click', eliminarProducto);
     console.log("Producto eliminado");
     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
     console.log("carrito vacio");

     // NUEVO: Contenido cargado
     document.addEventListener('DOMContentLoaded', () => {
          articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || []  ;
           console.log(articulosCarrito);
          carritoHTML();
     });
     } 


// Lee los datos del producto
function leerDatosProducto(producto) {
     const infoProducto = {
          imagen: producto.querySelector('img').src,
          titulo: producto.querySelector('h4').textContent,
          precio: producto.querySelector('.precio span').textContent,
          id: producto.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCarrito.some( producto => producto.id === infoProducto.id ) ) { 
          const productos = articulosProducto.map( producto => {
               if( producto.id === infoProducto.id ) {
                    let cantidad = parseInt(producto.cantidad);
                    cantidad++
                    producto.cantidad =  cantidad;
                    return producto;
               } else {
                    return producto;
               }
          })
          articulosCarrito = [...productos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoProducto];
     }

     console.log(articulosCarrito)

     carritoHTML();
}

// Elimina el producto del carrito en el DOM
function eliminarProducto(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          // e.target.parentElement.parentElement.remove();
          const producto = e.target.parentElement.parentElement;
          const productoID = producto.querySelector('a').getAttribute('data-id');
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoID);

          carritoHTML();
     }
}


// Muestra el producto seleccionado en el Carrito
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(producto => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${producto.imagen}" width=100>
               </td>
               <td>${producto.titulo}</td>
               <td>${producto.precio}</td>
               <td>${producto.cantidad} </td>
               <td>
                    <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

     // NUEVO:
     sincronizarStorage();

}


// NUEVO: 
function sincronizarStorage() {
     localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los productos del carrito en el DOM
function vaciarCarrito() {
     // forma rapida (recomendada)
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}

     
export default {
     
     cargarEventListeners,
     agregarProducto,
     leerDatosProducto,
     eliminarProducto,
     carritoHTML,
     sincronizarStorage,
     vaciarCarrito,

} ;
