import React from 'react';

export const ConfirmDelete = ({ deleteFunc, deleteItem, closeCallback }) => {
  return (
    <div className="confirmDelete">
      <p>Are you sure?</p>
      <button
        onClick={() => {
          deleteFunc(deleteItem);
          closeCallback();
        }}
      >
        Yes
      </button>
      <button onClick={() => closeCallback()}>No</button>
    </div>
  );
};
