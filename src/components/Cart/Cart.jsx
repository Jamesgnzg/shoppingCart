import React, { useState, useEffect } from "react";
import CartItems from "./CartItems";
import { toast } from "react-toastify";
import { Container, Row, Modal, Col } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Cart() {
  const [itemList, updateItemList] = useState([]); //Contains the items in the cart.
  const [successModalVisibility, setSucessVisibility] = useState(false); //Toggles the sucess modal visibility.
  const [cartTotal, setCartTotal] = useState(0); //Contains the value of the cart total label.

  const showSuccessModal = () => setSucessVisibility(true);
  const hideSucessModal = () => setSucessVisibility(false);

  useEffect(() => {
    /**
     * Updates the number of items label. This is triggered when itemList is updated.
     */
    const totalItems = () => {
      let totalVal = 0;
      for (let i = 0; i < itemList.length; i++) {
        totalVal += itemList[i].quantity;
      }
      setCartTotal(totalVal);
    };
    totalItems();
  }, [itemList]);

  /**
   * Handler for add new item button.
   * It adds a new element in the itemList which would add an additional row.
   */
  const addNewItem = () => {
    updateItemList([
      ...itemList,
      {
        id: itemList.length + 1,
        name: "",
        type: 1,
        quantity: 1,
        hasError: false,
      },
    ]);
  };

  /**
   * Validation for the form. Checks if item name or quantity is empty.
   * if yes it will update the hasError flag in the item then it would show and indicator
   * which items has errors.
   * @returns {Boolean} indicates when there are no more errors in the form.
   */
  const isFormValid = () => {
    let hasNoErrors = true;
    const items = [...itemList];
    const updatedItemsList = items.map((item) => {
      if (item.name === "" || item.quantity === "") {
        item.hasError = true;
        hasNoErrors = false;
      } else {
        item.hasError = false;
      }
      return item;
    });

    console.log(updatedItemsList);
    updateItemList(updatedItemsList);
    return hasNoErrors;
  };

  /**
   * Handler for save button.
   */
  const saveShoppingList = () => {
    if (isFormValid()) {
      showSuccessModal(); //Show success modal if form has no errors.
    } else {
      toast.error("Please fill in item names."); //Display toast message for the errors.
    }
  };

  /**
   * Updates itemList when updates occur in the shopping cart.
   * @param {event} e event emitted
   * @param {Number} itemId the id to determine which row is to be updated
   * @param {String} attr item property that will be updated
   */
  const onChangeShoppingItem = (e, itemId, attr) => {
    const items = [...itemList]; //Copy item list
    const updatedItemsList = items.map((item) => {
      if (item.id === itemId) {
        switch (attr) {
          case "name":
            item.name = e.target.value;
            break;
          case "quantity":
            item.quantity = Number(e.target.value);
            break;
          case "type":
            item.type = Number(e.target.value);
            break;
          default:
            // Don't update anything.
            break;
        }
      }
      return item;
    }); //Update the value in the element corresponding to the changes.

    updateItemList(updatedItemsList);
  };

  /**
   * Handler for delete.
   * Removes the row in the itemList state.
   * @param {Number} itemId the id to determine which row is to be deleted
   */
  const deleteItem = (itemId) => {
    updateItemList(itemList.filter((item) => item.id !== itemId));
  };

  /**
   * Reorders the list to correspond where the user dragged the item.
   * @param {Array} list contains the contents of the shopping list.
   * @param {Number} startIndex The original index of the item.
   * @param {Number} endIndex The destination index of the item.
   * @returns {Array} Rearrange itemList containing the new indexes.
   */
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1); //Get the dragged item.
    result.splice(endIndex, 0, removed); //Add it on it's new index.

    return result;
  };

  /**
   * Handler when the user drops the item.
   * Updates the itemList state after reordering.
   * @param {Object} result event object
   */
  const onDragEnd = (result) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      itemList,
      result.source.index,
      result.destination.index
    );

    updateItemList(items);
  };

  return (
    <>
      <Modal
        className="successMessage"
        show={successModalVisibility}
        onHide={hideSucessModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have successfully updated the items in your cart!
        </Modal.Body>
      </Modal>
      <Container>
        <Row style={{ height: "100px" }} className="align-items-center">
          <Col>
            <span className="totalquantitylbl">
              <b>Number of items: {cartTotal}</b>
            </span>
          </Col>
          <Col>
            <button
              type="button"
              className="btn btn-light actionBtn float-end"
              onClick={addNewItem}
            >
              <b>Add new Item +</b>
            </button>
            <button
              type="submit"
              className={`btn btn-outline-primary actionBtn float-end ${
                itemList.length === 0 ? "disabled" : ""
              }`}
              onClick={saveShoppingList}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-floppy"
                  viewBox="0 0 20 20"
                >
                  <path d="M11 2H9v3h2z" />
                  <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                </svg>
                <b>Save</b>
              </span>
            </button>
          </Col>
        </Row>
      </Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container className="text-center">
          <Row className=" rowHeader">
            <div className="col-5">
              <b>Name</b>
            </div>
            <div className="col-4">
              <b>Type</b>
            </div>
            <div className="col-2">
              <b>Quantity</b>
            </div>
            <div className="col-1">
              <b>Action</b>
            </div>
          </Row>
          <hr />
          <form onChange={onChangeShoppingItem} onSubmit={saveShoppingList}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {itemList.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <CartItems
                            key={item.id.toString()}
                            id={item.id}
                            name={item.name}
                            type={item.type}
                            quantity={item.quantity}
                            hasError={item.hasError}
                            onDelete={deleteItem}
                            onChangeShoppingItem={onChangeShoppingItem}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </form>
        </Container>
      </DragDropContext>
    </>
  );
}
