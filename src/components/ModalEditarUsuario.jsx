import { useState } from "react";

function ModalEditarUsuario({ usuario, onClose, onActualizado }) {
    const [nombre, setNombre] = useState(usuario.nombre);
    const [contrasena, setContrasena] = useState(""); // Se puede dejar en blanco si no se quiere cambiar
    const [rol, setRol] = useState(usuario.rol);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const payload = {
            id: usuario.id,
            nombre,
            contrasenha: contrasena,
            rol
        };

        try {
            const response = await fetch("https://green-goldfish-952011.hostingersite.com/ingenio-backend/users/update.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                onActualizado(); // Recargar usuarios
                onClose();
            } else {
                alert("Error al actualizar: " + (data.error || "Error desconocido"));
            }
        } catch (error) {
            //alert("Error de red al actualizar");
            console.error(error);
        }
    };


    return (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-md">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">Editar usuario</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <label>Nombre de usuario:</label>
                            <input
                                type="text"
                                className="form-control mb-2"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />

                            <label>Nueva contraseña (opcional):</label>
                            <input
                                type="password"
                                className="form-control mb-2"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                            />

                            <label>Rol:</label>
                            <select
                                className="form-control"
                                value={rol}
                                onChange={(e) => setRol(e.target.value)}
                                required
                            >
                                <option value="">Seleccione el rol</option>
                                <option value="admin">Administrador</option>
                                <option value="invitado">Invitado</option>
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success">Guardar cambios</button>
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalEditarUsuario;
