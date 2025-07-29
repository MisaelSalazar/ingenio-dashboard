import { useEffect, useState } from "react";
import Header from "../components/Header";
import Toast from "../components/Toast";

import ModalEditarUsuario from "../components/ModalEditarUsuario"; // Asegúrate de tener este archivo
import ModalEliminarUsuario from "../components/ModalEliminarUsuario"; // Asegúrate de tener este archivo


function ViewUser() {

    const [modalEliminar, setModalEliminar] = useState(null);

    const handleEliminarUsuario = async (id) => {
        try {
            const res = await fetch("https://green-goldfish-952011.hostingersite.com/ingenio-backend/users/delete.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ id })

            });
            //console.log("ID recibido:", id);

            const data = await res.json();

            //console.log( "esta es la respuesta ",data)

            if (data.success) {
                setToast({ tipo: "success", mensaje: "Usuario eliminado correctamente" });
                setUsuarios(prev => prev.filter(u => u.id !== id));
            } else {
                setToast({ tipo: "error", mensaje: data.error || "Error al eliminar usuario" });
            }
        } catch (error) {
            setToast({ tipo: "error", mensaje: "Error de red al eliminar" });
        } finally {
            setModalEliminar(null);
        }
    };


    const [modalEditar, setModalEditar] = useState(null);

    const [usuarios, setUsuarios] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetch("https://green-goldfish-952011.hostingersite.com/ingenio-backend/users/get_all.php", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setUsuarios(data.reverse());
                } else {
                    setToast({ tipo: "error", mensaje: "Error al cargar usuarios" });
                }
            })
            .catch((err) => {
                console.error("Error al cargar usuarios:", err);
                setToast({ tipo: "error", mensaje: "Error de conexión con el servidor" });
            });
    }, []);

    const totalPages = Math.ceil(usuarios.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsuarios = usuarios.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <Header title="Control de aplicación" />

            <main className="content p-4">
                <h2>Usuarios registrados</h2>
                <hr />
                <br />

                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsuarios.map((usuario, index) => (
                            <tr key={usuario.id}>
                                <td>{startIndex + index + 1}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.rol}</td>
                                <td className="w-25 text-center">
                                    {/* <button className="btn btn-primary me-2">
                                        <i className="fa-solid fa-eye"></i>
                                    </button> */}
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => setModalEditar(usuario)}
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => setModalEliminar(usuario)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&laquo;</button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&raquo;</button>
                        </li>
                    </ul>
                </nav>
            </main>

            {/* Modal de edición */}
            {modalEditar && (
                <ModalEditarUsuario
                    usuario={modalEditar}
                    onClose={() => setModalEditar(null)}
                    onActualizado={() => {
                        fetch("https://green-goldfish-952011.hostingersite.com/ingenio-backend/users/get_all.php")
                            .then((res) => res.json())
                            .then((data) => {
                                setUsuarios(data.reverse());
                                setToast({ tipo: "success", mensaje: "Usuario actualizado correctamente" });
                            })
                            .catch(() => {
                                //setToast({ tipo: "error", mensaje: "Error al actualizar usuarios" });
                            });
                    }}
                />
            )}

            {modalEliminar && (
                <ModalEliminarUsuario
                    usuario={modalEliminar}
                    onCancel={() => setModalEliminar(null)}
                    onConfirm={handleEliminarUsuario}
                />
            )}



            {toast && (
                <Toast
                    tipo={toast.tipo}
                    mensaje={toast.mensaje}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );
}

export default ViewUser;
