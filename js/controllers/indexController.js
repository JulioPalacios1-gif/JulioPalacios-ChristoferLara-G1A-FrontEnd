import {getCuentas, createCuenta, updateCuenta, deleteCuenta} from '../services/cuentasService.js';
import {getUsuarios, getUsuarioById} from '../services/usuariosService.js';


const cuentaForm = document.getElementById('cuentaForm');
const IdCuenta = document.getElementById('IdCuenta');
const selUsuario = document.getElementById('selUsuario');
const txtNombre = document.getElementById('txtNombre');
const txtTipo = document.getElementById('txtTipo');
const txtSaldo = document.getElementById('txtSaldo');
const selActivo = document.getElementById('selActivo');
const btnGuardar = document.getElementById('btnGuardar');
const btnCancelar= document.getElementById('btnCancelar');
const cuentasTable = document.getElementById('cuentasTable');
const cuentasTableBody = document.getElementById('cuentasTableBody');

document.addEventListener('DOMContentLoaded', async function() {
    await loadCuentas();
    await loadUsuarios();
});

async function loadCuentas() {
    try {
        const cuentas = await getCuentas();
        cuentasTableBody.innerHTML = "";
        cuentas.forEach(cuenta => {
            cuentasTableBody.innerHTML += `
                <tr>
                    <td>${cuenta.idCuenta}</td>
                    <td>${cuenta.selUsuario}</td>
                    <td>${cuenta.txtNombre}</td>
                    <td>${cuenta.txtTipo}</td>
                    <td>${cuenta.txtSaldo}</td>
                    <td>${cuenta.selActivo}</td>

                    <td>
                        <button class="btn btn-primary btn-sm" onclick="editCuenta(${cuenta.idCuenta})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteCuenta(${cuenta.idCuenta})">Eliminar</button>
                    </td>
                </tr>`;
        });
    } catch (error) {
        alert("Error al cargar cuentas:"+error.message);
    }
}

async function loadUsuarios() {
    try {
        const usuarios = await getUsuarios();
        selUsuario.innerHTML = "";
            usuarios.forEach(usuario => {
            selUsuario.innerHTML += `<option value="${usuario.idUsuario}">${usuario.selUsuario}</option>`;
        });
    } catch (error) {
        alert("Error al cargar usuarios:"+error.message);
    }
}


cuentaForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const idCuenta = IdCuenta.value.trim();
    const idUsuario = selUsuario.value.trim();
    const nombre = txtNombre.value.trim();
    const tipo = txtTipo.value.trim();
    const saldo = txtSaldo.value.trim();
    const activo = selActivo.value.trim();
    if ( nombre === '' || tipo === '' || saldo === '' || activo === '') {
        alert("Por favor, complete todos los campos");
        return;
    }

const cuentaData = {
        idCuenta: idCuenta,
        txtNombre: nombre,
        txtTipo: tipo,
        txtSaldo: saldo,
        selActivo: activo
    };
    try {
        if (idCuenta == "") {
            await updateCuenta(idCuenta, cuentaData);
            alert("Cuenta actualizada correctamente.");
        } else {
            await createCuenta(cuentaData);
            alert("Cuenta creada correctamente.");
        }
    } catch (error) {
        alert("Error al guardar la cuenta: " + error.message);
    }
});

function resetForm() {
    cuentaForm.reset();
    idCuenta.value = "";
    btnGuardar.textContent = "Guardar Cuenta";
    btnCancelar.classList.add('d-none');
}
btnCancelar.addEventListener('click', function(event) {
    event.preventDefault();
    resetForm();
});



async function removeCuenta(idCuenta) {
    const confirmDelete = confirm("¿Está seguro de que desea eliminar esta cuenta?");
    if (!confirmDelete) {
        return;
    }
    try {
        await deleteCuenta(idCuenta);
        alert("Cuenta eliminada correctamente.");
        resetForm();
        await loadCuentas();
    } catch (error) {
        alert("Error al eliminar la cuenta: " + error.message);
    }
}

async function addCuentaData(idCuenta) {
    try { 
        const cuenta = await getCuentaById(idCuenta);
        IdCuenta.value = cuenta.idCuenta;
        selUsuario.value = cuenta.selUsuario;
        txtNombre.value = cuenta.txtNombre;
        txtTipo.value = cuenta.txtTipo;
        txtSaldo.value = cuenta.txtSaldo;
        selActivo.value = cuenta.selActivo;
        btnGuardar.textContent = "Actualizar Cuenta";
        btnCancelar.classList.remove('d-none');
    } catch (error) {
        alert("Error al cargar la cuenta: " + error.message);
    }
}



window.removeCuenta = removeCuenta;
window.addCuentaData = addCuentaData;
