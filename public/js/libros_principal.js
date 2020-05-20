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

  // Logo + click > WEB: / - Página Inicio
  document.querySelector(".brand-logo").addEventListener("click", () => {
    // Eliminar Autorización
    olvidarToken();

    // Redirección: /
    window.location.href = "/";
  });

  // Listado + click > API: /libros - Listado de Libros
  document.querySelector("#listado").addEventListener("click", () => {
    // Token
    const token = recuperarToken();

    // Crea Request
    const xhr = new XMLHttpRequest();

    // API: Listado de Libros - Asíncrono
    xhr.open("GET", "/libros", true);

    // Establece Tipo de Respuesta - Documento
    xhr.responseType = "document";

    // Configura Cabecera - Autorización JWT
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    // Atiende eventos de cambio de estado
    xhr.onreadystatechange = () => {
      // Petición Completada
      if (xhr.readyState == 4 && xhr.status == 200) {
        document.open();
        document.write(xhr.responseXML.documentElement.innerHTML);
        document.close();
      }
    };

    xhr.send(null);
  });

  // Inserción + click > WEB: /web/libros/nuevo - Formulario Nuevo Libro
  document.querySelector("#insercion").addEventListener("click", () => {
    // Crea Request
    const xhr = new XMLHttpRequest();

    // WEB: Formulario Nuevo Libro - Asíncrono
    xhr.open("GET", "/web/libros/nuevo", true);

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
  });

  // JWT Token > Local Storage
  memorizarToken();

  // Usuario Sesión > Local Storage
  memorizarUser();

  // Usuario Sesion
  document.querySelector(".user-name").innerHTML = recuperarUser();

  // Info
  console.log("Token: ", recuperarToken());
  console.log("User: ", recuperarUser());
});
