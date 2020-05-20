// Módulos Externos
const jwt = require("jsonwebtoken");

// Clave Secreta ( Servidor )
// const CLAVE_SECRETA = "secretoNode";
const CLAVE_SECRETA = require("../data/config_jwt.json").secret;

// Método para generar el token cuando el usuario se valide correctamente
const generarToken = (login, role) => {
  return jwt.sign(
    // Información contenida en el Token ( Visible ) - Carga (PAYLOAD)
    {
      login: login,
      role: role,
    },
    // Palabra secreta para cifrar tokens ( Almacenada en Servidor ) - Seguridad Fuerte/Débil
    CLAVE_SECRETA,
    // Opciones de Generación del Token
    {
      // Número (segundos) | Descriptor (Normalizado) de intervalo tiempo
      expiresIn: "2 hours",
    }
  );
};

// Método para validar un token que llega de un usuario presuntamente validado
// Si es correcto devuelve el contenido (PAYLOAD)
// La validación consiste en la comprobación de la integridad del token
// Potencialmente se podría comprobar también si los datos que lo han generado (payload) no ha cambiado ( El [rol/Nivel de acceso] es el mismo )
// Sobrecarga de consulta a la BD???
const validarToken = (token) => {
  try {
    return jwt.verify(token, CLAVE_SECRETA);
  } catch (e) {
    // console.log("ERROR: Token NO válido");
  }
};

// Middleware a aplicar a cada recurso protegido, para dejar pasar sólo a los USUARIOS
// validados que tengan el rol indicado (cadena vacía para no necesitar ningún rol)
const protegerRuta = (role) => {
  return (req, res, next) => {
    // Obtiene el token de la petición
    let autorizacion = req.headers["authorization"];
    // console.log("Autorización:", autorizacion);

    // Verificación de la Autorización
    if (autorizacion) {
      let label = autorizacion.split(" ")[0];
      let token = autorizacion.split(" ")[1];

      // Extrae contenido Token (PAYLOAD)
      let payload = validarToken(token);
      // console.log(payload);
      // console.log("Role:", role);

      // Valida Contenido Token
      if (label === "Bearer" && payload) {    // Token SI válido
        // Rol OK - [cualquiera | coincidente]
        if (role === "" || role === payload.role) {   
          // Rol SI correcto > Acceso Permitido > Siguiente Middleware
          next();
        } else {    // Rol NO correcto > Acceso NO Permitido
          res.render("libros_error", {
            msg: "ERROR: Usuario no autorizado",
          });
        }
      } else {    // Token NO válido > Acceso NO Permitido
        res.render("libros_error", {
          msg: "ERROR: Credenciales incorrectas",
        });
      }
    } else {    // NO hay token > Acceso NO Permitido
      res.render("libros_error", {
        msg: "ERROR: Credenciales incorrectas",
      });
    }
  };
};

// Exportar Recursos
module.exports = {
  generarToken,
  validarToken,
  protegerRuta,
};
