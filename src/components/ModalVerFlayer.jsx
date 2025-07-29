function convertirAEmbedURL(url) {
  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(youtubeRegex);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

function ModalVerFlayer({ flayer, onClose }) {
  if (!flayer) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{flayer.titulo}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <img src={`https://green-goldfish-952011.hostingersite.com/ingenio-backend/${flayer.imagen}`} alt="imagen" className="img-fluid mb-3" />
            {flayer.video && (
              <div className="mb-3">
                <iframe
                  src={convertirAEmbedURL(flayer.video)}
                  title="Video"
                  className="w-100"
                  height="315"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: flayer.contenido }} />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalVerFlayer;
