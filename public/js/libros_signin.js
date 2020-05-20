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

  // Logo + click > WEB: / - Página de Inicio
  document.querySelector(".brand-logo").addEventListener("click", () => {
    window.location.href = "/";
  });

  // Eliminar Autorización
  olvidarToken();
  olvidarUser();
});
