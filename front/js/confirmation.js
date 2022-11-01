//Insère l'id de commande dans la page confirmation
function insertOrderId() {
    var url = new URL(window.location.href);
    var orderId = url.searchParams.get("order_id");
    let orderIdSpan = document.getElementById("orderId");
    if (orderIdSpan != null) {
        orderIdSpan.textContent = orderId;
    }
}
insertOrderId();