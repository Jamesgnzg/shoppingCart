import React from "react";
import Row from "react-bootstrap/esm/Row";

export default function CartItems({
  id,
  name,
  type,
  quantity,
  hasError,
  onDelete,
  onChangeShoppingItem,
}) {
  return (
    <>
      <Row className="cartItems">
        <div className="col-5">
          <input
            type="text"
            className={hasError ? "form-control is-invalid" : "form-control"}
            placeholder="Item Name"
            defaultValue={name}
            onChange={(e) => onChangeShoppingItem(e, id, "name")}
            required
          />
        </div>
        <div className="col-4">
          <select
            className="form-select"
            aria-label="Item Type"
            defaultValue={type}
            onChange={(e) => onChangeShoppingItem(e, id, "type")}
          >
            <option value="1">Grocery</option>
            <option value="2">Home Goods</option>
            <option value="3">Hardware</option>
          </select>
        </div>
        <div className="col-2">
          <select
            className="form-select"
            aria-label="Quantity"
            defaultValue={quantity}
            onChange={(e) => onChangeShoppingItem(e, id, "quantity")}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
        <div className="col-1">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              onDelete(id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </button>
        </div>
      </Row>
    </>
  );
}
