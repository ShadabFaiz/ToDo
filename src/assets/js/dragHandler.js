"use strict";
var elementBeingDragged;
window.addEventListener("DOMContentLoaded", () => {
  const draggableElements = document.querySelectorAll("[draggable=true]");
  for (var i = 0; i < draggableElements.length; i++) {
    const element = draggableElements.item(i);
    element.addEventListener("dragstart", dragstart_handler);
    element.addEventListener("dragend", dragEndHandler);
    if (element.dataset.sortable) {
      element.addEventListener("dragover", dragOverDraggable);
    }
  }
});

/**
 *
 * @param {DragEvent} event
 */
function dragstart_handler(event) {
  event.dataTransfer.setData(
    "text/plain",
    `{ "x": ${event.offsetX}, "y": ${event.offsetY}, "id": "${event.target.id}" }`
  );

  setTimeout(() => {
    event.srcElement.class;
    event.srcElement.style.zIndex = -1;
    event.srcElement.style.opacity = 0.5;
  }, 0);
  elementBeingDragged = event.srcElement;
  event.dataTransfer.dropEffect = "move";
}

function setDroppableToAbsolute(event) {
  const data = JSON.parse(event.dataTransfer.getData("text/plain"));
  const element = document.getElementById(data.id);
  element.style.position = "absolute";
  element.style.top = event.offsetY + "px";
  element.style.left = event.offsetX + "px";
  element.style.transform = `translate(-${data.x + 6}px, -${data.y + 6}px)`;
  return element;
}

function isDropElementFile(event) {
  return event.dataTransfer.types.includes("Files");
}

/**
 *
 * @param {DragEvent} event
 */
function dragOverDraggable(event) {
  if (isBefore(elementBeingDragged, event.currentTarget)) {
    event.currentTarget.parentNode.insertBefore(
      elementBeingDragged,
      event.currentTarget
    );
  } else {
    event.currentTarget.parentNode.insertBefore(
      elementBeingDragged,
      event.currentTarget.nextSibling
    );
  }
}

var droppableElement;
function createDropIndictorLayer() {
  if (droppableElement) {
    return droppableElement;
  }
  droppableElement = document.createElement("div");
  droppableElement.id = "droppableLayer";
  droppableElement.style.background = "#a9a9a963";
  droppableElement.style.position = "absolute";
  droppableElement.style.left = 0;
  droppableElement.style.right = 0;
  droppableElement.style.top = 0;
  droppableElement.style.bottom = 0;

  return droppableElement;
}

function dragEndHandler(event) {
  event.srcElement.style.opacity = 1;
  event.srcElement.style.zIndex = 1;
}

function isBefore(el1, el2) {
  var cur;
  if (el2.parentNode === el1.parentNode) {
    for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
      if (cur === el2) {
        return true;
      }
    }
    return false;
  }
  return false;
}
