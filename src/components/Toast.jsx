import { useEffect } from "react";

function Toast({ tipo = "info", mensaje, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // cerrar automáticamente en 3 segundos
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const estilos = {
    success: "alert alert-success",
    error: "alert alert-danger",
    info: "alert alert-info",
  };

  return (
    <div
      className="position-fixed top-0 end-0 p-3"
      style={{ zIndex: 1055 }}
    >
      <div
        className={`${estilos[tipo] || estilos.info} alert-dismissible fade show d-flex align-items-center justify-content-between shadow`}
        role="alert"
        style={{ minWidth: "300px", maxWidth: "400px" }}
      >
        <span>{mensaje}</span>
        <button
          type="button"
          className="btn-close ms-2"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default Toast;
