document.addEventListener("DOMContentLoaded", () => {

    // ===== SLIDER (INDEX PAGE ONLY) =====
    const track = document.querySelector(".product-track");
    const cards = document.querySelectorAll(".product-link");

    if (track && cards.length > 0) {
        let index = 0;
        const visible = 3;
        const cardWidth = 310;

        setInterval(() => {
            index++;
            if (index > cards.length - visible) index = 0;
            track.style.transform = `translateX(-${index * cardWidth}px)`;
        }, 3000);
    }

    // ===== PRODUCT PAGE (PRICING + ADD TO CART) =====
    const volumeSelect = document.getElementById("volume");
    const priceDisplay = document.getElementById("price");
    const addBtn = document.getElementById("addToCart");
    const qtyInput = document.getElementById("quantity");

    if (volumeSelect && priceDisplay && addBtn) {

        const productName = document.querySelector(".product-info h1")?.innerText;

        const priceData = {
            "Silver Stone": {
                "3": 120, "3.5": 140, "6": 230, "6s": 200, "10s": 290, "15s": 400
            },
            "Black Opium": {
                "3": 120, "3.5": 140, "6": 230, "6s": 200, "10s": 290, "15s": 400
            },
            "Cool Water": {
                "3": 120, "3.5": 140, "6": 230, "6s": 200, "10s": 290, "15s": 400
            },
            "Vampire Blood": {
                "3": 210, "3.5": 240, "6": 410, "6s": 330, "10s": 470, "15s": 670
            },
            "Dunhill Desire": {
                "3": 145, "3.5": 175, "6": 300, "6s": 250, "10s": 360, "15s": 480
            },
            "Dior Sauvage": {
                "3": 145, "3.5": 175, "6": 300, "6s": 250, "10s": 360, "15s": 480
            },
            "Ferrari Black": {
                "3": 145, "3.5": 175, "6": 300, "6s": 250, "10s": 360, "15s": 480
            }
        };

        function updatePrice() {

    const vol = volumeSelect.value;

    const basePrice = priceData[productName]?.[vol] || 0;

    const quantity = parseInt(qtyInput.value);

    priceDisplay.textContent = basePrice * quantity;
}

        volumeSelect.addEventListener("change", updatePrice);
        qtyInput.addEventListener("change", updatePrice);
        updatePrice();

        addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const qtyInput = document.getElementById("quantity");

    const item = {
        name: productName,
        volume: volumeSelect.value,
        quantity: parseInt(qtyInput.value),
        price: priceData[productName][volumeSelect.value]
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(p =>
        p.name === item.name && p.volume === item.volume
    );

    if (existing) {
        existing.quantity += item.quantity;
    } else {
        cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");
});
    }

    // ===== CART PAGE =====

const cartBody = document.getElementById("cart-body");

if (cartBody) {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cartBody.innerHTML = "";

    cart.forEach(item => {

        const rowTotal = item.price * item.quantity;

        total += rowTotal;

        cartBody.innerHTML += `

            <tr>
                <td>${item.name} (${item.volume} ml)</td>
                <td>${item.quantity}</td>
                <td>৳${rowTotal}</td>
            </tr>

        `;
    });

    const totalEl = document.getElementById("cart-total");

    if (totalEl) {

        totalEl.textContent = "Total: ৳" + total;

    }
}

// ===== CLEAR CART =====

const clearBtn = document.getElementById("clearCart");

if (clearBtn) {

    clearBtn.addEventListener("click", () => {

        localStorage.removeItem("cart");

        location.reload();

    });

}

});