<?php
// Parámetros de conexión a la base de datos
$servidor = "localhost";
$usuario = "root";
$password = "";
$base_datos = "pix_contacto";

// Crear conexión
$conn = new mysqli($servidor, $usuario, $password, $base_datos);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Verificar si el formulario ha sido enviado y los campos existen
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['nombre'], $_POST['correo'], $_POST['mensaje'])) {
        // Capturar los datos del formulario
        $nombre = $_POST['nombre'];
        $correo = $_POST['correo'];
        $mensaje = $_POST['mensaje'];

        // Preparar y ejecutar la consulta SQL para insertar los datos
        $sql = "INSERT INTO contactos (nombre, correo, mensaje) VALUES ('$nombre', '$correo', '$mensaje')";

        if ($conn->query($sql) === TRUE) {
            echo "Mensaje enviado correctamente.";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Faltan datos del formulario.";
    }
}

// Cerrar la conexión
$conn->close();
?>
