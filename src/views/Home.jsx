import Header from "../components/Header";
import logo from "../assets/img/logo.jpg";

function Home() {
    return (
        <>
            <Header title={"Control de aplicacion"} />

            <main className="content p-4">
                <h1 className="fw-bold">Bienvenido</h1>
                <h2 className="mb-4">Sistema de control de la aplicación</h2>
                <hr />

                <div className="row align-items-center mt-4">
                    <div className="col-md-6 mb-4 mb-md-0">
                        <p className="fs-5">
                            Este sistema fue diseñado para facilitar la gestión de flayers informativos
                            en el Ingenio Santos. Aquí podrás:
                        </p>
                        <ul className="fs-5">
                            <li>Crear nuevos flayers de forma rápida.</li>
                            <li>Ver y administrar los flayers existentes.</li>
                            <li>Reducir el uso de papel y mejorar la comunicación interna.</li>
                        </ul>
                        <p className="fs-6 mt-3">
                            Para comenzar, selecciona una opción del menú lateral.
                        </p>
                    </div>

                    <div className="col-md-6 text-center">
                        <img src={logo} className="img-fluid w-75" alt="Logo Ingenios Santos" />
                    </div>
                </div>
            </main>
        </>
    );
}

export default Home;
