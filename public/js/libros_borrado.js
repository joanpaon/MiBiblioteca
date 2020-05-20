// Activación con Página Cargada
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

  // Logo + click > WEB: Página de Inicio
  document.querySelector(".brand-logo").addEventListener("click", () => {
    // Eliminar Autorización
    olvidarToken();

    // Redirección: /
    window.location.href = "/";
  });

  // Signin + click > WEB: Formulario Identificación
  document.querySelector(".account").addEventListener("click", () => {
    // Eliminar Autorización
    olvidarToken();

    // Redireccion: /signin
    window.location.href = "/signin";
  });

  // Volver + click > API: /libros - Listado de Libros
  document.querySelector(".volver").addEventListener("click", () => {
    // Crea Request
    const xhr = new XMLHttpRequest();

    // Inicializa Request - Asíncrono
    xhr.open("GET", "/libros", true);

    // Establece Tipo de Respuesta - Documento
    xhr.responseType = "document";

    // Configura Cabecera - Autorización JWT
    xhr.setRequestHeader("Authorization", `Bearer ${recuperarToken()}`);

    // Eventos Cambio de Estado
    xhr.onreadystatechange = () => {
      // Petición Realizada
      if (xhr.readyState == 4 && xhr.status == 200) {
        // Sustituye Documento Actual
        document.open();
        document.write(xhr.responseXML.documentElement.innerHTML);
        document.close();
      }
    };

    // Envia Petición
    xhr.send(null);
  });

  // Home + click > WEB: / - Página Principal
  document.querySelector(".principal").addEventListener("click", () => {
    // Token
    const token = recuperarToken();

    // Ruta Destino
    const url = "/web/libros/principal";

    // Crea Request
    const xhr = new XMLHttpRequest();

    // Inicializa Request - Asíncrono
    xhr.open("GET", url, true);

    // Establece Tipo de Respuesta - Documento
    xhr.responseType = "document";

    // Configura Cabecera - Autorización JWT
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    // Atiende eventos de cambio de estado
    xhr.onreadystatechange = () => {
      // alert(xhr.readyState + " - " + xhr.status);

      // readyState	Description
      // 0	UNSENT	Client has been created. open() not called yet.
      // 1	OPENED	open() has been called.
      // 2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
      // 3	LOADING	Downloading; responseText holds partial data.
      // 4	DONE	The operation is complete.
      // status      200 - The request has succeeded
      if (xhr.readyState == 4 && xhr.status == 200) {
        // console.log(xhr.responseXML.documentElement.innerHTML);

        // Sustituye el Documento Actual por uno nuevo
        document.open();
        document.write(xhr.responseXML.documentElement.innerHTML);
        document.close();
      }
    };

    // Envia Petición
    xhr.send(null);
  });

  // Borrar + click > API: BORRADO - DELETE(/libros/:id) - Todo (WEB > JSON)
  document.querySelector(".borrar").addEventListener("click", () => {
    // Capturar + Encapsular Datos Formulario
    const fd = new FormData(document.querySelector(".formulario"));

    // Crea Request
    const xhr = new XMLHttpRequest();

    // Atiende Cambio de Estado
    xhr.onreadystatechange = () => {
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

    // Clave Registro a Borrar
    const id = fd.get("id");

    // Borrar Libro - Asíncrono
    xhr.open("DELETE", `/libros/${id}`, true);

    // Establece Tipo de Respuesta - Documento
    xhr.responseType = "document";

    // Configura Cabecera - Autorización JWT
    xhr.setRequestHeader("Authorization", `Bearer ${recuperarToken()}`);

    // Envía Petición
    xhr.send();
  });

   // Usuario Sesion
   document.querySelector(".user-name").innerHTML = recuperarUser();

   // Info
   console.log("Token: ", recuperarToken());
   console.log("User: ", recuperarUser());
});
