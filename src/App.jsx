import { useState, useEffect } from "react";
import PedidoForm from "./components/PedidoForm";
import PedidoList from "./components/PedidoList";
import Inventario from "./components/Inventario";

const App = () => {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoActual, setPedidoActual] = useState(null);
  const [materiales, setMateriales] = useState([]);

  // Recupera los pedidos al cargar la aplicación
  useEffect(() => {
    const pedidosGuardados = localStorage.getItem("pedidos");
    if (pedidosGuardados) {
      setPedidos(JSON.parse(pedidosGuardados));
    }
  }, []);

  // Guarda los pedidos en localStorage cada vez que cambian
  useEffect(() => {
    if (pedidos.length > 0) {
      localStorage.setItem("pedidos", JSON.stringify(pedidos));
    }
  }, [pedidos]);

  const addPedido = (pedido) => {
    setPedidos([...pedidos, pedido]);
  };

  const editPedido = (pedidoEditado) => {
    const pedidosActualizados = pedidos.map((p) =>
      p.id === pedidoEditado.id ? pedidoEditado : p
    );
    setPedidos(pedidosActualizados);
    setPedidoActual(null);
  };

  const deletePedido = (id) => {
    const pedidosFiltrados = pedidos.filter((p) => p.id !== id);
    setPedidos(pedidosFiltrados);
  };

  const actualizarMateriales = (materialesActualizados) => {
    setMateriales(materialesActualizados);
  };

  return (
    <div>
      <h1>Gestión de Pedidos</h1>
      <Inventario actualizarMateriales={actualizarMateriales} />
      <PedidoForm
        addPedido={addPedido}
        editPedido={editPedido}
        pedidoActual={pedidoActual}
        materiales={materiales}
      />
      <PedidoList
        pedidos={pedidos}
        deletePedido={deletePedido}
        setPedidoActual={setPedidoActual}
      />
    </div>
  );
};

export default App;
