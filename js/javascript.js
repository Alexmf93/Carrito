let contenedor = document.getElementById("container")
let cartItemsContainer = document.getElementById("cart-items")
let cartTotalEl = document.getElementById("cart-total")
let clearCartBtn = document.getElementById("clear-cart")

let cart = {}

function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart))
}

function loadCart(){
    const raw = localStorage.getItem('cart')
    cart = raw ? JSON.parse(raw) : {}
}

function formatMoney(n){ return n.toFixed(2) }

function renderProducts(){
    let contenido = ""
    productos.forEach(producto => {
        const qty = cart[producto.id] || 0
        contenido += `
    <div class="card">
        <img class="card-img" src="${producto.imagen}" alt="${producto.nombre}">
        <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">${producto.descripcion}</p>
        <p class="card-text">Precio: €${formatMoney(producto.precio)}</p>
        <div class="controls">
            <div class="qty-controls">
                <button onclick="updateCart(${producto.id}, -1)">-</button>
                <span id="qty-${producto.id}">${qty}</span>
                <button onclick="updateCart(${producto.id}, 1)">+</button>
            </div>
        </div>
        </div>
    </div>

    `
    })

    contenedor.innerHTML = contenido
}

function renderCart(){
    cartItemsContainer.innerHTML = ''
    let total = 0
    const ids = Object.keys(cart)
    if(ids.length === 0){
        cartItemsContainer.innerHTML = '<p>El carrito está vacío</p>'
    } else {
        ids.forEach(idStr => {
            const id = Number(idStr)
            const qty = cart[id]
            const producto = productos.find(p => p.id === id)
            if(!producto) return
            const subtotal = producto.precio * qty
            total += subtotal

            const item = document.createElement('div')
            item.className = 'cart-item'
            item.innerHTML = `
                <div>
                    <strong>${producto.nombre}</strong>
                    <div>€${formatMoney(producto.precio)} x ${qty} = €${formatMoney(subtotal)}</div>
                </div>
                <div class="qty-controls">
                    <button onclick="updateCart(${id}, -1)">-</button>
                    <span>${qty}</span>
                    <button onclick="updateCart(${id}, 1)">+</button>
                </div>
            `
            cartItemsContainer.appendChild(item)
        })
    }
    cartTotalEl.textContent = `Total: €${formatMoney(total)}`
}

function updateQtyDisplay(id){
    const el = document.getElementById(`qty-${id}`)
    if(el) el.textContent = cart[id] || 0
}

function updateCart(id, delta){
    const current = cart[id] || 0
    const next = current + delta
    if(next <= 0){
        delete cart[id]
    } else {
        cart[id] = next
    }
    saveCart()
    updateQtyDisplay(id)
    renderCart()
}

// expose to global so inline onclick works
window.updateCart = updateCart

clearCartBtn.addEventListener('click', () => {
    cart = {}
    saveCart()
    renderProducts()
    renderCart()
})

// init
loadCart()
renderProducts()
renderCart()