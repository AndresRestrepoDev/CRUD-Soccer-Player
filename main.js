const API_URL = 'http://localhost:3000/players';



//Cuando todo mi html este cargado hacer.....
document.addEventListener('DOMContentLoaded', () => {

    mostrarDatos();
    guardarDatos();
    //dentro de este evento solo voy a llamar funciones la logica la voy a implementar desde afuera


});

function guardarDatos() {
    const formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir recarga

        const name = document.getElementById('name').value.trim();
        const posicion = document.getElementById('posicion').value.trim();
        const pais = document.getElementById('pais').value.trim();
        const pie = document.getElementById('pie').value.trim();

        // Validar campos vacíos
        if (name === '' || posicion === '' || pais === '' || pie === '') {
            alert("Por favor llena todos los campos del formulario");
            return;
        }

        const player = {
            name: name,
            posicion: posicion,
            pais: pais,
            pie: pie
        };

        // Verificar si estamos editando o creando
        const editingId = formulario.dataset.editingId;
        const url = editingId ? `${API_URL}/${editingId}` : API_URL;
        const method = editingId ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        })
        .then(res => res.json())
        .then(data => {
            alert(editingId ? "Jugador actualizado con éxito" : "Jugador guardado con éxito");
            formulario.reset(); // Limpiar campos
            delete formulario.dataset.editingId; // Limpiar modo edición
            mostrarDatos(); // Refrescar tabla
        })
        .catch(error => console.error("Error al guardar o actualizar jugador:", error));
    });
}


function mostrarDatos(){

    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('cuerpo-tabla');
            tbody.innerHTML = "";

            data.forEach(jugador => {
                const row = document.createElement("tr");
                row.innerHTML = `
                                <td>${jugador.name}</td>
                                <td>${jugador.posicion}</td>
                                <td>${jugador.pais}</td>
                                <td>${jugador.pie}</td>
                `;
                //creamos la celda para añadir los botones
                const celdaAcciones = document.createElement("td");

                //creamos boton eliminar y editar
                const buttonEdit = document.createElement("button");
                buttonEdit.textContent = "Editar";
                const buttonDelete = document.createElement("button");
                buttonDelete.textContent = "Eliminar";

                //evento para eliminar
                buttonDelete.addEventListener('click', (e) => {
                
                if(confirm("¿Deseas eliminar este jugador?")){
                    fetch(`${API_URL}/${jugador.id}`, {
                        method: "DELETE"})
                        .then(() => mostrarDatos())
                        .catch(error => console.error("Error al eliminar jugador", error));
                    }
                });

                //evento para editar
                buttonEdit.addEventListener('click', () => {
                // Llenar el formulario con los datos del jugador
                document.getElementById('name').value = jugador.name;
                document.getElementById('posicion').value = jugador.posicion;
                document.getElementById('pais').value = jugador.pais;
                document.getElementById('pie').value = jugador.pie;

                // Guardar el id del jugador que se va a editar
                document.getElementById('formulario').dataset.editingId = jugador.id;
                //Esto llena el formulario y guarda el id en un atributo data-editing-id del formulario.

                });


                //agregamos botones a la celda
                celdaAcciones.appendChild(buttonDelete);
                celdaAcciones.appendChild(buttonEdit);

                //agregamos celda a la fila
                row.appendChild(celdaAcciones);

                //agreamos fila a la tabla
                tbody.appendChild(row);
            });
        })
}






