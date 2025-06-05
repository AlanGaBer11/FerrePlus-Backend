const db = require("./../config/db");
const bcrypt = require("bcryptjs");

// FUNCIÓN PARA OBTENER TODOS LOS USUARIOS
const getAllUsers = async () => {
  try {
    const result = await db.query("SELECT * FROM users");
    return result.rows;
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    throw err;
  }
};

// FUNCIÓN PAARA OBTENER UN USUARIO POR ID
const getUserById = async (id) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id_user = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (err) {
    console.error("Error al obtener el usuario:", err);
    throw err;
  }
};

// FUNCIÓN PARA REGISTRAR UN USUARIO
const registerUser = async (userData) => {
  const { name, email, password } = userData;
  try {
    // VERIFICAR SI EL EMAIL YA EXISTE
    const emailCheck = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (emailCheck.rows.length > 0) {
      throw new Error("El Email Ya Está Registrado");
    }

    // HASHEAMOS LA CONTRASEÑA
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

// FUNCIÓN PARA HACER LOGIN
const loginUser = async (email, password) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const user = result.rows[0];
    if (!user) {
      throw new Error("El Usuario No Existe"); // Usuario no encontrado
    }

    // Comparar la contraseña proporcionada con la hash almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Contraseña Incorrecta"); // Contraseña incorrecta
    }

    return user;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

// FUNCIÓN PARA ACTUALIZAR UN USUARIO (ACTUALIZA TODOS LOS CAMPOS)
const updateUser = async (id, userData) => {
  const { name, email, password } = userData;
  try {
    // Verificar si el usuario existe
    const userCheck = await db.query("SELECT * FROM users WHERE id_user = $1", [
      id,
    ]);
    if (userCheck.rows.length === 0) {
      throw new Error("El Usuario No Existe");
    }

    // Hashear la nueva contraseña si se proporciona
    let hashedPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const result = await db.query(
      "UPDATE users SET name = $1, email = $2, password = $3 WHERE id_user = $4 RETURNING *",
      [name, email, hashedPassword || userCheck.rows[0].password, id]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};

// FUNCIÓN PARA ELIMINAR UN USUARIO
const deleteUser = async (id) => {
  try {
    const result = await db.query(
      "DELETE FROM users WHERE id_user = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      throw new Error("El Usuario No Existe");
    }
    return result.rows[0];
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
