import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [nombre, setNombre] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://green-goldfish-952011.hostingersite.com/ingenio-backend/users/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: nombre.trim(),
                    contrasenha: contraseña
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("usuario", data.nombre);
                navigate("/inicio");
            } else {
                setError(data.error || "Error desconocido");
            }
        } catch (err) {
            setError("Error de conexión con el servidor");
        }
    };

    return (
        <>
            <br /><br /><br />
            <div className="row m-4">
                <div className="col-4 col-md-3 col-lg-4"></div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card border border-success">
                        <div className="card-header bg-success text-white">
                            <center><h1>Iniciar Sesión</h1></center>
                        </div>

                        <div className="card-body h5">
                            <form onSubmit={handleSubmit} className='form'>
                                <label className='mb-3 ml-3'>Usuario:</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text p-3 bg-success text-white">
                                            <i className="fa-solid fa-circle-user"></i>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingrese su usuario"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                </div>

                                <br />
                                <label className='mb-3'>Contraseña:</label>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text p-3 bg-success text-white">
                                            <i className="fa-solid fa-lock"></i>
                                        </div>
                                    </div>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Ingrese su contraseña"
                                        value={contraseña}
                                        onChange={(e) => setContraseña(e.target.value)}
                                        required
                                    />
                                </div>

                                <br />
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}

                                <center>
                                    <input type="submit" value="Entrar" className='btn btn-success' />
                                </center>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
