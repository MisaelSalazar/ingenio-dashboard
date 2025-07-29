import { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import Toast from "../components/Toast";

function Create() {
    const editorRef = useRef(null);

    const token = localStorage.getItem("token");


    const [titulo, setTitulo] = useState("");
    const [slug, setSlug] = useState("");
    const [video, setVideo] = useState("");
    const [imagen, setImagen] = useState(null);
    const [slugEditadoManual, setSlugEditadoManual] = useState(false);
    const [mensaje, setMensaje] = useState("");

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMensaje, setToastMensaje] = useState("");
    const [toastTipo, setToastTipo] = useState("info");

    // Para mostrar el toast
    const mostrarToast = (mensaje, tipo = "info") => {
        setToastMensaje(mensaje);
        setToastTipo(tipo);
        setToastVisible(true);
    };

    const handleCommand = (command) => {
        document.execCommand(command, false, null);
        editorRef.current.focus();
    };

    const generarSlug = (texto) => {
        return texto
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
    };

    useEffect(() => {
        if (!slugEditadoManual) {
            setSlug(generarSlug(titulo));
        }
    }, [titulo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("INTENTANDO ENVIAR FLAYER...");

        const contenidoHTML = editorRef.current.innerHTML;

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("slug", slug);
        formData.append("video", video);
        formData.append("contenido", contenidoHTML);
        formData.append("imagen", imagen);

        try {
            const response = await fetch("https://green-goldfish-952011.hostingersite.com/ingenio-backend/flayers/create.php", {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            //setMensaje("✅ Flayer creado correctamente");
            //setMensaje("❌ Error: " + (data.error || "No se pudo crear el flayer"));
            //setMensaje("❌ Error de conexión con el servidor" + err.message);
            if (response.ok && data.success) {
                mostrarToast("✅ Flayer creado correctamente", "success");
                // Limpiar campos si quieres
                setTitulo("");
                setSlug("");
                setVideo("");
                setImagen(null);
                setSlugEditadoManual(false);
                editorRef.current.innerHTML = "";
            } else {
                mostrarToast("❌ Error: " + (data.error || "No se pudo crear el flayer"), "error");
            }
        } catch (err) {
            mostrarToast("❌ Error de conexión con el servidor" + err.message, "error");
            //console.error("DETALLE DEL ERROR:", err);
        }
    };

    return (
        <>
            <Header title={"Control de aplicación"} />

            <main className="content p-4">
                <h2>Crear nuevo flayer</h2>
                <hr />
                <br />

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <label>Título:</label>
                            <input
                                type="text"
                                className="form-control mt-2"
                                placeholder="Ingrese un título para el flayer"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col">
                            <label>SLUG:</label>
                            <input
                                type="text"
                                className="form-control mt-2"
                                placeholder="El SLUG se genera automáticamente a partir del título"
                                value={slug}
                                onChange={(e) => {
                                    setSlug(e.target.value);
                                    setSlugEditadoManual(true);
                                }}
                                required
                            />
                        </div>
                    </div>

                    <br />

                    <div className="row">
                        <div className="col">
                            <label>Imagen:</label>
                            <input
                                type="file"
                                className="form-control mt-2"
                                onChange={(e) => setImagen(e.target.files[0])}
                                required
                            />
                        </div>
                        <div className="col">
                            <label>Video (opcional):</label>
                            <input
                                type="text"
                                className="form-control mt-2"
                                placeholder="Enlace a un video (opcional)"
                                value={video}
                                onChange={(e) => setVideo(e.target.value)}
                            />
                        </div>
                    </div>

                    <br />

                    <div className="row">
                        <div className="col">
                            <label>Contenido:</label>
                            <br />
                            <div className="mb-2">
                                <button type="button" className="btn btn-outline-dark me-2" onClick={() => handleCommand("italic")}>
                                    <i className="fa-solid fa-italic"></i>
                                </button>
                                <button type="button" className="btn btn-outline-dark me-2" onClick={() => handleCommand("bold")}>
                                    <i className="fa-solid fa-bold"></i>
                                </button>
                                <button type="button" className="btn btn-outline-dark me-2" onClick={() => handleCommand("insertOrderedList")}>
                                    <i className="fa-solid fa-list-ol"></i>
                                </button>
                                <button type="button" className="btn btn-outline-dark" onClick={() => handleCommand("insertUnorderedList")}>
                                    <i className="fa-solid fa-list"></i>
                                </button>
                            </div>

                            <div
                                ref={editorRef}
                                contentEditable
                                className="form-control"
                                style={{ height: '8rem', background: '#fff' }}
                                placeholder="Ingrese el contenido o descripción"
                                suppressContentEditableWarning={true}
                            ></div>
                        </div>
                    </div>

                    <br />

                    <div className="row">
                        <div className="col-6">
                            {mensaje && <div className="alert alert-info">{mensaje}</div>}
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">
                                Crear Flayer
                            </button>
                        </div>
                    </div>
                </form>
            </main>

            {toastVisible && (
                <Toast
                    tipo={toastTipo}
                    mensaje={toastMensaje}
                    onClose={() => setToastVisible(false)}
                />
            )}
        </>
    );
}

export default Create;
