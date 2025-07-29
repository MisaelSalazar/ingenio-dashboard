import { Link } from "react-router-dom";

function Header({ title }) {
  return (
    <>
      {/* <!-- Navbar --> */}
      <nav className="navbar bg-success fixed-top">
        <div className="container-fluid">
          <button className="btn btn-outline-light d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu">
            <i className="fas fa-bars"></i>
          </button>
          <a className="navbar-brand text-white fs-4" href="#">{title}</a>

          <Link to={"/"} className="btn btn-outline-light">
            <i className="fas fa-sign-out-alt me-1"></i>Salir
          </Link>
        </div>
      </nav>

      {/* <!-- Sidebar Offcanvas --> */}
      <div className="offcanvas offcanvas-start d-md-none" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarLabel">Menú</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            {/* Enlace de inicio */}
            <li className="nav-item">
              <Link
                className="nav-link text-dark"
                to={"/inicio"}
              >
                <div className="row">
                  <div className="col-2">
                    <i class="fa-solid fa-house"></i>
                  </div>
                  <div className="col">
                    Inicio
                  </div>
                </div>
              </Link>
            </li>

            {/* Enlace de crear */}
            <li className="nav-item">
              <Link
                className="nav-link text-dark"
                to={"/crear"}
              >
                <div className="row">
                  <div className="col-2">
                    <i class="fa-solid fa-plus"></i>
                  </div>
                  <div className="col">
                    Crear Flayer
                  </div>
                </div>
              </Link>
            </li>

            {/* Enlace de vizualizar */}
            <li className="nav-item">
              <Link
                className="nav-link text-dark"
                to={'/ver'}
              >
                <div className="row">
                  <div className="col-2">
                    <i class="fa-solid fa-eye"></i>
                  </div>
                  <div className="col">
                    Ver Flayers
                  </div>
                </div>
              </Link>
            </li>
            {/* Enlace de crear usuarios */}
            <li className="nav-item">
              <Link
                className="nav-link text-dark"
                to={'/crearUsuario'}
              >
                <div className="row">
                  <div className="col-2">
                    <i class="fa-solid fa-user-plus"></i>
                  </div>
                  <div className="col">
                    Crear Usuarios
                  </div>
                </div>
              </Link>
            </li>

            {/* Enlace de vizualizar Usuarios */}
            <li className="nav-item">
              <Link
                className="nav-link text-dark"
                to={'/verUsuarios'}
              >
                <div className="row">
                  <div className="col-2">
                    <i class="fa-solid fa-user"></i>
                  </div>
                  <div className="col">
                    Ver Usuarios
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* <!-- Sidebar fijo visible solo en escritorio --> */}
      <div className="d-none d-md-block fs-5" id="sidebarMenu">
        <div className="p-3">
          <ul className="nav flex-column">

            {/* Enlace de inicio */}
            <li className="nav-item">
              <Link
                className="nav-link text-dark"
                to={"/inicio"}
              >
                <div className="row">
                  <div className="col-2">
                    <i class="fa-solid fa-house"></i>
                  </div>
                  <div className="col">
                    Inicio
                  </div>
                </div>
              </Link>
            </li>

            {/* Enlace de crear */}
            <li className="nav-item">
              <Link
                className="nav-link text-dark"
                to={"/crear"}
              >
                <div className="row">
                  <div className="col-2">
                    <i class="fa-solid fa-plus"></i>
                  </div>
                  <div className="col">
                    Crear Flayer
                  </div>
                </div>
              </Link>
            </li>

            {/* Enlace de vizualizar */}
            <li className="nav-item">
              <Link
                className="nav-link text-dark"
                to={'/ver'}
              >
                <div className="row">
                  <div className="col-2">
                    <i class="fa-solid fa-eye"></i>
                  </div>
                  <div className="col">
                    Ver Flayers
                  </div>
                </div>
              </Link>
            </li>

            {/* Enlace de crear usuarios */}
            <li className="nav-item">
              <Link
                className="nav-link text-dark"
                to={'/crearUsuario'}
              >
                <div className="row">
                  <div className="col-2">
                    <i class="fa-solid fa-user-plus"></i>
                  </div>
                  <div className="col">
                    Crear Usuarios
                  </div>
                </div>
              </Link>
            </li>

            {/* Enlace de vizualizar Usuarios */}
            <li className="nav-item">
              <Link
                className="nav-link text-dark"
                to={'/verUsuarios'}
              >
                <div className="row">
                  <div className="col-2">
                    <i class="fa-solid fa-user"></i>
                  </div>
                  <div className="col">
                    Ver Usuarios
                  </div>
                </div>
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
