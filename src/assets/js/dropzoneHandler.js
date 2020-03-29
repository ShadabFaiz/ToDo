'use strict';

/**
 *
 * @param {*} event
 * @param {HTMLElement} element
 */

function dragoverHandler(event, element) {
    const backgroundColor = element.style.background;
    event.preventDefault();
    event.stopPropagation();
    return false;
}

function dragEnterHandler(event, dropzone) {
    event.stopPropagation();
    event.preventDefault();
    console.log(dropzone.dataset);
    if (dropzone.dataset.resizeable === 'true') {
        dropzone.classList.add('dropzone-hovered-resizeable');
    } else dropzone.classList.add('dropzone-hovered');
}

function removeDroppableIndicatorLayer(dropzone) {
    if (dropzone.dataset.resizeable === 'true')
        dropzone.classList.remove('dropzone-hovered-resizeable');
    else dropzone.classList.remove('dropzone-hovered');
}

/**
 *
 * @param { DragEvent } event
 */
function dropHandler(event, dropzone, position) {
    const droppZoneCurrentHeight = dropzone.offsetHeight;
    event.preventDefault();

    if (isDropElementFile(event)) {
        var dt = event.dataTransfer;
        var files = dt.files;

        var count = files.length;
        // console.log(dt, files, count);
        return;
    }

    removeDroppableIndicatorLayer(dropzone);
    const data = JSON.parse(event.dataTransfer.getData('text/plain'));
    // console.log(data);
    let element;
    if (position === 'absolute') {
        element = setDroppableToAbsolute(event);
    } else {
        element = document.getElementById(data.id);
        element.style.position = 'relative';
    }
    try {
        event.target.appendChild(element);
    } catch (error) {}
}

function setDroppableToAbsolute(event) {
    const data = JSON.parse(event.dataTransfer.getData('text/plain'));
    const element = document.getElementById(data.id);
    element.style.position = 'absolute';
    element.style.top = event.offsetY + 'px';
    element.style.left = event.offsetX + 'px';
    element.style.transform = `translate(-${data.x + 6}px, -${data.y + 6}px)`;
    return element;
}
