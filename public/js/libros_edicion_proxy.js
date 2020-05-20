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
    console.log(xhr);

    // Petición Completada
    if (xhr.readyState == 4) {
      // Listado de Libros - Asíncrono - (Todo: Web > Rest)
      xhr.open("GET", "/libros", true);

      // Establece Tipo de Respuesta - (Todo: HTML > JSON)
      xhr.responseType = "document";

      // Configura Cabecera - Autorización JWT
      xhr.setRequestHeader("Authorization", `Bearer ${recuperarToken()}`);

      // Atiende Cambio de Estado
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          // Procesar Respuesta - (Todo: HTML > JSON)
          document.open();
          document.write(xhr.responseXML.documentElement.innerHTML);
          document.close();
        }
      };

      // Envia Petición
      xhr.send();
    }
  };

  // Clave del Libro
  const id = fd.get("id");

  // Modifica Libro - Asíncrono - API
  xhr.open("PUT", `/libros/${id}`, true);

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
