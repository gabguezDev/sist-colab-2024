import { useState, useEffect } from "react";

const Inventario = ({ actualizarMateriales }) => {
  const [materiales, setMateriales] = useState([]);
  const [material, setMaterial] = useState({ nombre: "", cantidad: 0 });
  const [editando, setEditando] = useState(false);
  const [materialAEditar, setMaterialAEditar] = useState(null);

  // Recupera los materiales al cargar la aplicación
  useEffect(() => {
    const inventarioGuardado = localStorage.getItem("inventario");
    if (inventarioGuardado) {
      setMateriales(JSON.parse(inventarioGuardado));
      actualizarMateriales(JSON.parse(inventarioGuardado));
    }
  }, []);

  // Guarda los materiales en localStorage cada vez que cambian
  useEffect(() => {
    if (materiales.length > 0) {
      localStorage.setItem("inventario", JSON.stringify(materiales));
    }
    actualizarMateriales(materiales);
  }, [materiales]);

  const agregarMaterial = (e) => {
    e.preventDefault();
    if (material.nombre && material.cantidad > 0) {
      if (editando) {
        // Actualizar material
        const materialesActualizados = materiales.map((mat) =>
          mat.nombre === materialAEditar.nombre ? material : mat
        );
        setMateriales(materialesActualizados);
        setEditando(false);
        setMaterialAEditar(null);
      } else {
        // Agregar nuevo material
        setMateriales([...materiales, material]);
      }
      setMaterial({ nombre: "", cantidad: 0 });
    }
  };

  const editarMaterial = (material) => {
    setMaterial(material);
    setEditando(true);
    setMaterialAEditar(material);
  };

  const eliminarMaterial = (nombre) => {
    const materialesActualizados = materiales.filter((mat) => mat.nombre !== nombre);
    setMateriales(materialesActualizados);
  };

  return (
    <div>
      <h2>Inventario</h2>
      <form onSubmit={agregarMaterial}>
        <input
          type="text"
          placeholder="Nombre del material"
          value={material.nombre}
          onChange={(e) => setMaterial({ ...material, nombre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={material.cantidad}
          onChange={(e) => setMaterial({ ...material, cantidad: parseInt(e.target.value) })}
        />
        <button type="submit">{editando ? "Guardar Cambios" : "Agregar Material"}</button>
      </form>

      {/* Lista de Materiales */}
      <ul>
        {materiales.map((mat, index) => (
          <li key={index}>
            {mat.nombre} - Cantidad disponible: {mat.cantidad}
            <button onClick={() => editarMaterial(mat)}>Editar</button>
            <button onClick={() => eliminarMaterial(mat.nombre)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventario;
