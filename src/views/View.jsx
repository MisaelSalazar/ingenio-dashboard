import { useEffect, useState } from "react";
import Header from "../components/Header";
import ModalVerFlayer from "../components/ModalVerFlayer";
import ModalEliminarFlayer from "../components/ModalEliminarFlayer";
import ModalEditarFlayer from "../components/ModalEditarFlayer";
import Toast from "../components/Toast";


function View() {

    const [toast, setToast] = useState(null);

    const [modalEditar, setModalEditar] = useState(null);

    const [flayers, setFlayers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const [modalVer, setModalVer] = useState(null);
    const [modalEliminar, setModalEliminar] = useState(null);

    useEffect(() => {
        fetch("https://green-goldfish-952011.hostingersite.com/ingenio-backend/flayers/get_all.php")
            .then((res) => res.json())
            .then((data) => setFlayers(data.reverse())) // opcional: mostrar los más recientes primero
            .catch((err) => console.error("Error al cargar flayers:", err));
    }, []);

    const totalPages = Math.ceil(flayers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentFlayers = flayers.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <Header title={"Control de aplicación"} />

            <main className="content p-4">
                <h2>Flayers creados</h2>
                <hr />
                <br />

                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Título</th>
                            <th>SLUG</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentFlayers.map((flayer, index) => (
                            <tr key={flayer.id}>
                                <td>{startIndex + index + 1}</td>
                                <td>{flayer.titulo}</td>
                                <td>{flayer.slug}</td>
                                <td className="w-25 text-center">
                                    <button
                                        className="btn btn-primary me-2"
                                        onClick={() => setModalVer(flayer)}
                                    >
                                        <i className="fa-solid fa-eye"></i>
                                    </button>
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => setModalEditar(flayer)}
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => setModalEliminar(flayer)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* PAGINACIÓN */}
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                &laquo;
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                &raquo;
                            </button>
                        </li>
                    </ul>
                </nav>
            </main>

            {/* Modales */}
            {modalVer && (
                <ModalVerFlayer
                    flayer={modalVer}
                    onClose={() => setModalVer(null)}
                />
            )}
            {modalEliminar && (
                <ModalEliminarFlayer
                    flayer={modalEliminar}
                    onCancel={() => setModalEliminar(null)}
                    onConfirm={(id) => {
                        const token = localStorage.getItem("token");

                        fetch("https://green-goldfish-952011.hostingersite.com/ingenio-backend/flayers/delete.php", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                            body: JSON.stringify({ id })
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.success) {
                                    setFlayers(flayers.filter(f => f.id !== id));
                                    setModalEliminar(null);
                                    setToast({ tipo: "success", mensaje: "Flayer eliminado correctamente" });
                                } else {
                                    setToast({ tipo: "error", mensaje: "Error al eliminar: " + (data.error || "desconocido") });
                                }
                            })
                            .catch(err => {
                                console.error(err);
                                setToast({ tipo: "error", mensaje: "Error de conexión con el servidor" });
                            });
                    }}

                />
            )}

            {modalEditar && (
                <ModalEditarFlayer
                    flayer={modalEditar}
                    onClose={() => setModalEditar(null)}
                    onActualizado={() => {
                        // Refrescar flayers después de edición
                        fetch("https://green-goldfish-952011.hostingersite.com/ingenio-backend/flayers/get_all.php")
                            .then((res) => res.json())
                            .then((data) => setFlayers(data.reverse()));
                    }}
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

export default View;
