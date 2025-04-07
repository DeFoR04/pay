function validateOrder() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const delivery = document.getElementById("delivery").value;
    let isValid = true;

    document.getElementById("nameError").textContent = name ? "" : "⚠ Обязательное поле";
    document.getElementById("phoneError").textContent = /^\d+$/.test(phone) ? "" : "⚠ Только цифры";
    document.getElementById("addressError").textContent = address ? "" : "⚠ Укажите адрес";
    document.getElementById("deliveryError").textContent = delivery ? "" : "⚠ Выберите способ";

    if (!name || !/^\d+$/.test(phone) || !address || !delivery) {
        return;
    }

    document.getElementById("orderForm").style.display = "none";
    document.getElementById("paymentSection").style.display = "block";
}

function startLoading() {
    const card = document.getElementById("cardNumber").value.trim();
    const expiry = document.getElementById("expiry").value.trim();
    const cvc = document.getElementById("cvc").value.trim();

    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(card) || !/^\d{2}\/\d{2}$/.test(expiry) || !/^\d{3}$/.test(cvc)) {
        alert("Неверные данные карты!");
        return;
    }

    document.getElementById("paymentSection").style.display = "none";
    document.getElementById("loaderSection").style.display = "block";
    let percent = 0;
    const progress = document.getElementById("progressFill");
    const interval = setInterval(() => {
        percent += 1;
        progress.style.width = percent + "%";
        progress.textContent = percent + "%";
        if (percent >= 100) {
            clearInterval(interval);
            showSuccess();
        }
    }, 30);
}

function showSuccess() {
    document.getElementById("loaderSection").style.display = "none";
    document.getElementById("successMessage").style.display = "block";

    const order = {
        name: document.getElementById("name").value,
        date: new Date().toLocaleString(),
        total: 3000 + " ₸"
    };

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
}

document.getElementById("cardNumber").addEventListener("input", function() {
    let cardValue = this.value.replace(/\D/g, '');
    cardValue = cardValue.match(/.{1,4}/g)?.join(' ') || cardValue;
    this.value = cardValue;
});