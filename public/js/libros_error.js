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

  // Logo + Evento click > Ruta: /
  document.querySelector(".brand-logo").addEventListener("click", () => {
    // Eliminar Autorización
    olvidarToken();

    // Redirección: /
    window.location.href = "/";
  });

  // Identificación + Evento click > Ruta: /signin
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

    // Atiende Cambio de Estado
    xhr.onreadystatechange = () => {
      // Petición Completada
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

    // Atiende Cambio de Estado
    xhr.onreadystatechange = () => {
      // Petición Completada
      if (xhr.readyState == 4 && xhr.status == 200) {
        // Documento Actual > Documento Nuevo
        document.open();
        document.write(xhr.responseXML.documentElement.innerHTML);
        document.close();
      }
    };

    // Envia Petición
    xhr.send(null);
  });

  // Visibilidad - Botones
  if (recuperarUser()) {
    document.querySelector(".volver").style.display = "flex";
    document.querySelector(".principal").style.display = "flex";

    document.querySelector(".account > i").style.display = "none";
    document.querySelector(".user").style.display = "flex";
  } else {
    document.querySelector(".volver").style.display = "none";
    document.querySelector(".principal").style.display = "none";

    document.querySelector(".account > i").style.display = "flex";
    document.querySelector(".user").style.display = "none";
  }

  // Usuario Sesion
  document.querySelector(".user-name").innerHTML = recuperarUser();

  // Info
  console.log("Token: ", recuperarToken());
  console.log("User: ", recuperarUser());
});
