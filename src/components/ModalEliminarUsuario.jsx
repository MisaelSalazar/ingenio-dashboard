function ModalEliminarUsuario({ usuario, onConfirm, onCancel }) {
  if (!usuario) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Eliminar usuario</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <p>
              ¿Estás seguro que deseas eliminar al usuario <strong>{usuario.nombre}</strong>?
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
            <button className="btn btn-danger" onClick={() => onConfirm(usuario.id)}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEliminarUsuario;
