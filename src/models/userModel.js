const db = require("./../config/db");
const bcrypt = require("bcryptjs");

// FUNCIÓN PARA OBTENER TODOS LOS USUARIOS
const getAllUsers = async () => {
  try {
    const result = await db.query("SELECT * FROM users ORDER BY id_user ASC");
    return result.rows;
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    throw err;
  }
};

// FUNCIÓN PARA OBTENER UN USUARIO POR ID
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
      throw new Error("El email ya está registrado");
    }

    // HASHEAMOS LA CONTRASEÑA
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
    //
    return result.rows[0];
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    throw err;
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
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    throw err;
  }
};

// FUNCIÓN PARA CREAR UN USUARIO
const createUser = async (userData) => {
  const { name, email, password, role } = userData;
  try {
    // VERIFICAR SI EL EMAIL YA EXISTE
    const emailCheck = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (emailCheck.rows.length > 0) {
      throw new Error("El email ya está registrado");
    }

    // HASHEAMOS LA CONTRASEÑA
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, role]
    );
    //
    return result.rows[0];
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    throw err;
  }
};

// FUNCIÓN PARA ACTUALIZAR UN USUARIO (ACTUALIZA TODOS LOS CAMPOS)
const updateUser = async (id, userData) => {
  const { name, email, password, role } = userData;
  try {
    // Verificar si el usuario existe
    const userCheck = await db.query("SELECT * FROM users WHERE id_user = $1", [
      id,
    ]);
    if (userCheck.rows.length === 0) {
      throw new Error("El usuario no existe");
    }

    // Hashear la nueva contraseña si se proporciona
    let hashedPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const result = await db.query(
      "UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id_user = $5 RETURNING *",
      [name, email, hashedPassword || userCheck.rows[0].password, role, id]
    );

    return result.rows[0];
  } catch (err) {
    console.error("Error al actualizar el usuario:", err);
    throw err;
  }
};

// FUNCIÓN PARA ELIMINAR UN USUARIO
const deleteUser = async (id) => {
  try {
    // Verificar si el usuario existe
    const userCheck = await db.query("SELECT * FROM users WHERE id_user = $1", [
      id,
    ]);
    if (userCheck.rows.length === 0) {
      throw new Error("El usuario no existe");
    }
    const result = await db.query(
      "DELETE FROM users WHERE id_user = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (err) {
    console.error("Error al eliminar el usuario:", err);
    throw err;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  createUser,
  updateUser,
  deleteUser,
};
