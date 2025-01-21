document.getElementById("download-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const link = document.getElementById("video-link").value;
    const responseMessage = document.getElementById("response-message");
    const button = document.querySelector("button");

    // Validar enlace
    if (!link.startsWith("https://www.youtube.com/")) {
        responseMessage.style.color = "red";
        responseMessage.textContent = "Por favor, introduce un enlace válido de YouTube.";
        return;
    }

    // Mostrar mensaje de carga y deshabilitar botón
    responseMessage.style.color = "black";
    responseMessage.textContent = "Procesando tu solicitud, por favor espera...";
    button.disabled = true;

    try {
        const response = await fetch("/download", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ link }),
        });
        const result = await response.json();

        if (result.message) {
            responseMessage.style.color = "green";
            responseMessage.textContent = result.message;
            document.getElementById("video-link").value = "";
        } else {
            responseMessage.style.color = "red";
            responseMessage.textContent = result.error;
        }
    } catch (error) {
        responseMessage.style.color = "red";
        responseMessage.textContent = "Ocurrió un error. Por favor, intenta nuevamente.";
    } finally {
        button.disabled = false;
    }
});
