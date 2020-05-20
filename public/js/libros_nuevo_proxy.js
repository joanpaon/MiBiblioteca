// Activación con Página Cargada
this.window.addEventListener("load", () => {
  // Local Storage > Token
  const recuperarToken = () => {
    return localStorage.getItem("JWT_TOKEN");
  };

  // Capturar + Encapsular Datos Formulario
  const fd = new FormData(document.querySelector(".formulario"));

  // Array de Pares UrlEncoded
  const urlPairs = [
    "titulo=" + encodeURIComponent(fd.get("titulo")),
    "editorial=" + encodeURIComponent(fd.get("editorial")),
    "precio=" + encodeURIComponent(fd.get("precio")),
  ];

  // Pares Unidos con & + Espacios sustituidos por + > Cadena de Texto
  const urlData = urlPairs.join("&").replace(/%20/g, "+");

  // Crea Request
  const xhr = new XMLHttpRequest();

  // Atiende Cambio de Estado
  xhr.onreadystatechange = () => {
    // Petición Completada
    if (xhr.readyState == 4) {
      // Procesar Respuesta - (Todo: HTML > JSON)
      document.open();
      document.write(xhr.responseXML.documentElement.innerHTML);
      document.close();
    }
  };

  // Inserta Libro - Asíncrono
  xhr.open("POST", "/libros", true);

  // Tipo de Respuesta: Documento
  xhr.responseType = "document";

  // Cabecera - Autorización JWT + Content-Type ( Defecto )
  xhr.setRequestHeader("Authorization", `Bearer ${recuperarToken()}`);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // Envía Petición
  xhr.send(urlData);

  // Info
  console.log("Token: ", recuperarToken());
});
