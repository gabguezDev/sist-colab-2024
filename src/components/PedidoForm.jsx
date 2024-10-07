import { useState, useEffect } from "react";

const PedidoForm = ({ addPedido, editPedido, pedidoActual, materiales }) => {
  const [pedido, setPedido] = useState({ id: "", nombre: "", materialesUsados: [] });
  const [materialSeleccionado, setMaterialSeleccionado] = useState("");
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (pedidoActual) {
      setPedido(pedidoActual);
    } else {
      setPedido({ id: "", nombre: "", materialesUsados: [] });
    }
  }, [pedidoActual]);

  // Verifica la disponibilidad de todos los materiales
  const verificarDisponibilidad = () => {
    for (let materialUsado of pedido.materialesUsados) {
      const material = materiales.find((mat) => mat.nombre === materialUsado.nombre);
      if (!material) {
        setError(`Material ${materialUsado.nombre} no está disponible en el inventario`);
        return false;
      } else if (material.cantidad < materialUsado.cantidad) {
        setError(`No hay suficientes ${materialUsado.nombre} para este pedido`);
        return false;
      }
    }
    setError("");
    return true;
  };

  const agregarMaterialAlPedido = () => {
    if (materialSeleccionado && cantidadSeleccionada > 0) {
      const nuevoMaterial = {
        nombre: materialSeleccionado,
        cantidad: cantidadSeleccionada
      };
      setPedido({
        ...pedido,
        materialesUsados: [...pedido.materialesUsados, nuevoMaterial]
      });
      setMaterialSeleccionado("");
      setCantidadSeleccionada(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pedido.nombre && pedido.materialesUsados.length > 0) {
      if (verificarDisponibilidad()) {
        if (pedido.id) {
          editPedido(pedido);
        } else {
          addPedido({ ...pedido, id: Date.now() });
        }
        setPedido({ id: "", nombre: "", materialesUsados: [] });
      }
    } else {
      setError("Por favor, agregue al menos un material y un nombre al pedido");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del pedido"
        value={pedido.nombre}
        onChange={(e) => setPedido({ ...pedido, nombre: e.target.value })}
      />
      
      {/* Selección de materiales */}
      <select
        value={materialSeleccionado}
        onChange={(e) => setMaterialSeleccionado(e.target.value)}
      >
        <option value="">Selecciona un material</option>
        {materiales.map((mat, index) => (
          <option key={index} value={mat.nombre}>
            {mat.nombre}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Cantidad"
        value={cantidadSeleccionada}
        onChange={(e) => setCantidadSeleccionada(parseInt(e.target.value))}
      />

      <button type="button" onClick={agregarMaterialAlPedido}>
        Agregar Material
      </button>

      {/* Mostrar los materiales agregados al pedido */}
      <ul>
        {pedido.materialesUsados.map((mat, index) => (
          <li key={index}>
            {mat.nombre} - Cantidad: {mat.cantidad}
          </li>
        ))}
      </ul>

      <button type="submit">{pedido.id ? "Editar Pedido" : "Agregar Pedido"}</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default PedidoForm;
