import React from 'react';

const ConfirmationButton = (id,) => {
    const handleDelete = () => {
        toast.info(
          <div>
            <p>Deseja realmente encerrar o pedido de {{id}}?</p>
            <button onClick={() => onDelete(id)}>Confirmar</button>
            <button onClick={toast.dismiss}>Cancelar</button>
          </div>,
          {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined
          }
        );
      };

  return (
    <ToastContainer />
  );
};

export default ConfirmationButton;