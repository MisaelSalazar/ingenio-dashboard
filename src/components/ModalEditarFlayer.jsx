import { useEffect, useRef, useState } from "react";

function ModalEditarFlayer({ flayer, onClose, onActualizado }) {
  const [titulo, setTitulo] = useState(flayer.titulo);
  const [slug, setSlug] = useState(flayer.slug);
  const [video, setVideo] = useState(flayer.video || "");
  const [imagen, setImagen] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    editorRef.current.innerHTML = flayer.contenido;
  }, [flayer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("id", flayer.id);
    formData.append("titulo", titulo);
    formData.append("slug", slug);
    formData.append("video", video);
    formData.append("contenido", editorRef.current.innerHTML);

    if (imagen) {
      formData.append("imagen", imagen);
    }

    try {
      const response = await fetch("https://green-goldfish-952011.hostingersite.com/ingenio-backend/flayers/update.php", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onActualizado(); // Recargar flayers desde vista padre
        onClose();
      } else {
        alert("Error al actualizar: " + (data.error || "Error desconocido"));
      }
    } catch (error) {
      alert("Error de red al actualizar");
      console.error(error);
    }
  };

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Editar flayer</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <label>Título:</label>
              <input
                type="text"
                className="form-control mb-2"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />

              <label>Slug:</label>
              <input
                type="text"
                className="form-control mb-2"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />

              <label>Video:</label>
              <input
                type="text"
                className="form-control mb-2"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
              />

              <label>Imagen nueva (opcional):</label>
              <input
                type="file"
                className="form-control mb-2"
                onChange={(e) => setImagen(e.target.files[0])}
              />

              <label>Contenido:</label>
              <div
                ref={editorRef}
                contentEditable
                className="form-control"
                style={{ height: '8rem', background: '#fff' }}
                suppressContentEditableWarning={true}
              ></div>
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

export default ModalEditarFlayer;
