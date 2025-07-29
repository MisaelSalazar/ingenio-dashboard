import { useState } from "react";
import Header from "../components/Header";
import Toast from "../components/Toast";

function CreateUser() {
    const [nombre, setNombre] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [rol, setRol] = useState("");

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMensaje, setToastMensaje] = useState("");
    const [toastTipo, setToastTipo] = useState("info");

    const mostrarToast = (mensaje, tipo = "info") => {
        setToastMensaje(mensaje);
        setToastTipo(tipo);
        setToastVisible(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token"); // Asegúrate de tener el token almacenado

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("contrasenha", contrasena);
        formData.append("rol", rol);

        try {
            const response = await fetch("https://green-goldfish-952011.hostingersite.com/ingenio-backend/users/create.php", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                mostrarToast(result.message || "Usuario creado correctamente.", "success");
                setNombre("");
                setContrasena("");
                setRol("");
            } else {
                mostrarToast(result.error || "Error al crear usuario.", "error");
            }
        } catch (err) {
            mostrarToast("Error en la conexión con el servidor.", "error");
        }
    };

    return (
        <>
            <Header title={"Control de aplicación"} />

            {toastVisible && (
                <Toast
                    tipo={toastTipo}
                    mensaje={toastMensaje}
                    onClose={() => setToastVisible(false)}
                />
            )}

            <main className="content p-4">
                <h2>Crear un nuevo usuario</h2>
                <hr />
                <br />

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-lg-6">
                            <label className="mb-3">Usuario:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingrese el nombre para el nuevo usuario"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>

                        <div className="col-lg-6">
                            <label className="mb-3">Contraseña:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingrese la contraseña para el nuevo usuario"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-lg-6">
                            <label className="mb-3">Permisos:</label>
                            <select
                                className="form-control"
                                value={rol}
                                onChange={(e) => setRol(e.target.value)}
                            >
                                <option value="">Seleccione los permisos del usuario</option>
                                <option value="admin">Administrador</option>
                                <option value="invitado">Invitado</option>
                            </select>
                        </div>

                        <div
                            className="col-lg-6 d-flex flex-row-reverse"
                            style={{ marginTop: '2.5rem' }}
                        >
                            <button type="submit" className="btn btn-primary">
                                Crear usuario
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </>
    );
}

export default CreateUser;
