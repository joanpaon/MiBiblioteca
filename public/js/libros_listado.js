// Activa el script tras la carga de la página
this.window.addEventListener("load", () => {
  // Token + Local Storage >> X
  const olvidarToken = () => {
    localStorage.removeItem("JWT_TOKEN");
  };

  // Local Storage > Token
  const recuperarToken = () => {
    return localStorage.getItem("JWT_TOKEN");
  };

  // Token > LocalStorage
  const memorizarToken = () => {
    if (!recuperarToken()) {
      // Obtiene + Referencia JWT Token - Autorización
      const token = document.getElementById("token").value;

      // Token >> Local Storage
      localStorage.setItem("JWT_TOKEN", token);
    }
  };

  // User + Local Storage >> X
  const olvidarUser = () => {
    localStorage.removeItem("JWT_USER");
  };

  // Local Storage > User
  const recuperarUser = () => {
    return localStorage.getItem("JWT_USER");
  };

  // User > LocalStorage
  const memorizarUser = () => {
    if (!recuperarUser()) {
      // Obtiene + Referencia JWT Token - Autorización
      const user = document.getElementById("user").value;

      // Token >> Local Storage
      localStorage.setItem("JWT_USER", user);
    }
  };

  // Consultar Libro - API Callback - Todo: WEB
  const consultarLibro = function () {
    // Id Libro Actual
    const id = this.getAttribute("data-id");

    // Crea Request
    const xhr = new XMLHttpRequest();

    // WEB: Ficha Libro - Asíncrono
    xhr.open("GET", `/libros/${id}`, true);

    // Establece Tipo de Respuesta - Documento
    xhr.responseType = "document";

    // Configura Cabecera - Autorización JWT
    xhr.setRequestHeader("Authorization", `Bearer ${recuperarToken()}`);

    // Atiende eventos de cambio de estado
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        document.open();
        document.write(xhr.responseXML.documentElement.innerHTML);
        document.close();
      }
    };

    // Envia Petición
    xhr.send(null);
  };
 
  // Borrar Libro - WEB Callback
  const borrarLibro = function () {
    // Id Libro Actual
    const id = this.getAttribute("data-id");

    // Crea Request
    const xhr = new XMLHttpRequest();

    // WEB: Formulario Edición - Asíncrono
    xhr.open("GET", `/web/libros/borrado/${id}`, true);

    // Tipo de Respuesta - Documento
    xhr.responseType = "document";

    // Cabecera - Autorización JWT
    xhr.setRequestHeader("Authorization", `Bearer ${recuperarToken()}`);

    // Atiende Cambio de Estado
    xhr.onreadystatechange = () => {
      // Petición Completada
      if (xhr.readyState == 4 && xhr.status == 200) {
        // Documento Actual > Documento Obtenido
        document.open();
        document.write(xhr.responseXML.documentElement.innerHTML);
        document.close();
      }
    };

    // Enviar Petición
    xhr.send(null);
  };

  // Editar Libro - WEB Callback
  const editarLibro = function () {
    // Id Libro Actual
    const id = this.getAttribute("data-id");

    // Crea Request
    const xhr = new XMLHttpRequest();

    // WEB: Formulario Edición - Asíncrono
    xhr.open("GET", `/web/libros/edicion/${id}`, true);

    // Tipo de Respuesta - Documento
    xhr.responseType = "document";

    // Cabecera - Autorización JWT
    xhr.setRequestHeader("Authorization", `Bearer ${recuperarToken()}`);

    // Atiende Cambio de Estado
    xhr.onreadystatechange = () => {
      // Petición Completada
      if (xhr.readyState == 4 && xhr.status == 200) {
        // Documento Actual > Documento Obtenido
        document.open();
        document.write(xhr.responseXML.documentElement.innerHTML);
        document.close();
      }
    };

    // Enviar Petición
    xhr.send(null);
  };

  // Eventos click - Consulta
  const listaBtnConsulta = document.getElementsByClassName("consulta");
  for (const boton of listaBtnConsulta) {
    boton.addEventListener("click", consultarLibro);
  }

  // Eventos click - Borrado
  const listaBtnBorrado = document.getElementsByClassName("borrado");
  for (const boton of listaBtnBorrado) {
    boton.addEventListener("click", borrarLibro);
  }

  // Eventos click - Edición
  const listaBtnEdicion = document.getElementsByClassName("edicion");
  for (const boton of listaBtnEdicion) {
    boton.addEventListener("click", editarLibro);
  }

  // Logo + click > WEB: / - Página de Inicio
  document.querySelector(".brand-logo").addEventListener("click", () => {
    // Eliminar Autorización
    olvidarToken();

    // Redirección: /
    window.location.href = "/";
  });

  // Principal + click > WEB: /web/libros/principal - Página Principal
  document.querySelector(".principal").addEventListener("click", () => {
    // Crea Request
    const xhr = new XMLHttpRequest();

    // Inicializa Request - Asíncrono
    xhr.open("GET", "/web/libros/principal", true);
    
    // Establece Tipo de Respuesta - Documento
    xhr.responseType = "document";

    // Configura Cabecera - Autorización JWT
    xhr.setRequestHeader("Authorization", `Bearer ${recuperarToken()}`);

    // Eventos de cambio de estado
    xhr.onreadystatechange = () => {
      // Petición Completada
      if (xhr.readyState == 4 && xhr.status == 200) {
        document.open();
        document.write(xhr.responseXML.documentElement.innerHTML);
        document.close();
      }
    };

    // Envia Petición
    xhr.send(null);
  });

   // Usuario Sesion
   document.querySelector(".user-name").innerHTML = recuperarUser();

   // Info
   console.log("Token: ", recuperarToken());
   console.log("User: ", recuperarUser());
});
