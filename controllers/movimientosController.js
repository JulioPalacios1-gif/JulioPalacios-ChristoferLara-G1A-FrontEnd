import {getMovimientos, getMovimientoById, createMovimiento, updateMovimiento, deleteMovimiento} from '../services/movimientosService.js';

const movimientoForm = document.getElementById('movimientoForm');
const IdMovimiento = document.getElementById('IdMovimiento');
const selCuenta = document.getElementById('selCuenta');
const txtFecha = document.getElementById('txtFecha');
const txtTipo = document.getElementById('txtTipo');
const txtCategoria = document.getElementById('txtCategoria');
const txtDescripcion = document.getElementById('txtDescripcion');
const btnGuardar = document.getElementById('btnGuardar');
const btnCancelar= document.getElementById('btnCancelar');
const movimientosTable = document.getElementById('movimientosTable');
const movimientosTableBody = document.getElementById('movimientosTableBody');


document.addEventListener('DOMContentLoaded', async function() {
    await loadMovimientos();
    await loadCuentas();
});


async function loadMovimientos() {
    try {
        const movimientos = await getMovimientos();
        movimientosTableBody.innerHTML = "";
        movimientos.forEach(movimiento => {
            movimientosTableBody.innerHTML += `
                <tr>
                    <td>${movimiento.IdMovimiento}</td>
                    <td>${movimiento.selCuenta}</td>
                    <td>${movimiento.txtFecha}</td>
                    <td>${movimiento.txtTipo}</td>
                    <td>${movimiento.txtCategoria}</td>
                    <td>${movimiento.txtDescripcion}</td>
                    
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="editMovimiento(${movimiento.idMovimiento})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteMovimiento(${movimiento.idMovimiento})">Eliminar</button>
                    </td>
                </tr>`;
        });
    } catch (error) {
        alert("Error al cargar movimientos:"+error.message);
    }
}

movimientoForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const IdMovimiento = IdMovimiento.value.trim();
    const selCuenta = selCuenta.value.trim();
    const txtFecha = txtFecha.value.trim();
    const txtTipo = txtTipo.value.trim();
    const txtCategoria = txtCategoria.value.trim();
    const txtDescripcion = txtDescripcion.value.trim();
    if (fecha === '' || tipo === '' || categoria === '' || descripcion === '') {
        alert("Por favor, complete todos los campos");
        return;
    }

const movimientoData = {
        IdMovimiento: IdMovimiento,
        selCuenta : selCuenta,
        txtFecha : fecha,
        txtTipo: tipo,
        txtCategoria: categoria,
        txtDescripcion: descripcion
    };
    try {
        if (IdMovimiento  == ""){
            await updateMovimiento(IdMovimiento, movimientoData);
            alert("Movimiento actualizado correctamente");
        } else {
            await createMovimiento(movimientoData);
            alert("Guardado Correctamentre");
        }
    resetForm();
    await loadMovimientos();
    } catch (error) {
        alert("Error al guardar movimiento:"+error.message);
    }
});


function resetForm() {
    movimientoForm.reset();
    IdMovimiento.value = "";
    btnGuardar.textContent = "Guardar movimiento";
    btnCancelar.classList.add("d-none");
}
btnCancelar.addEventListener('click', function() {
    event.preventDefault();
    resetForm();
});



async function removeMovimientos(IdMovimiento) {
    const confirmDelete = confirm ("¿Está seguro de que desea eliminar este movimiento?");
    if (!confirmDelete) {
        return;
    }
    try{
        await deleteMovimiento(IdMovimiento);
        alert("Movimiento eliminado correctamente");
        resetForm();
        await loadMovimientos();
    } catch (error) {
        alert(error.message);
    }
}


async function addMovimientosData(IdMovimiento) {
    try {
        const movimiento = await getMovimientoById(IdMovimiento);
        selCuenta.value = movimiento.selCuenta;
        txtFecha.value = movimiento.txtFecha;
        txtTipo.value = movimiento.txtTipo;
        txtCategoria.value = movimiento.txtCategoria;
        txtDescripcion.value = movimiento.txtDescripcion;
        IdMovimiento.value = movimiento.IdMovimiento;
        btnGuardar.textContent = "Actualizar Movimiento";
        btnCancelar.classList.remove("d-none");
    } catch (error) {
        alert("Error al cargar el movimiento: " + error.message);
    }
}


window.editMovimiento = addMovimientosData;
window.removeMovimientos = removeMovimientos;