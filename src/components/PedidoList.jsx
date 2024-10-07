const PedidoList = ({ pedidos, deletePedido, setPedidoActual }) => {
  return (
    <div>
      <h2>Lista de Pedidos</h2>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id}>
            {pedido.nombre} - Cantidad: {pedido.cantidad}
            <button onClick={() => setPedidoActual(pedido)}>Editar</button>
            <button onClick={() => deletePedido(pedido.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PedidoList;
