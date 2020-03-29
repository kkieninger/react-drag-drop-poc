import React, { memo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

/**
 * Wrapping DragItem in React.memo, a higher order component that will
 * help with a performance boost.
 *
 * In English, we skip rendering the component and reuse the last
 * rendered result.
 * https://reactjs.org/docs/react-api.html#reactmemo
 *
 * @type id: unique ID of the item we are dragging
 * @type onMoveItem: handler for moving / rearranging items
 * @type children: children that will be rendered
 */
const DragItem = memo(({ id, onMoveItem, children, size }) => {
  // Create a ref to be used as a reference to corresponding DOM node
  // https://reactjs.org/docs/refs-and-the-dom.html
  const ref = useRef(null);

  // Drag source is created with useDrag
  const [{ isDragging }, connectDrag] = useDrag({
    // Required: refers to the specific DOM node we are dragging
    item: { id, type: 'DIV' },
    // monitor is a reference to the DragSourceMonitor which includes some helper methods:
    // https://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor
    collect: (monitor) => {
      return {
        // isDragging will return a boolean if drag operation is in process
        isDragging: !!monitor.isDragging(),
      };
    },
  });

  // Set the drop target with useDrop
  const [, connectDrop] = useDrop({
    // accept corresponds to item type in function above
    accept: 'DIV',
    // Compare IDs of dragged and hovered items to detect the
    // moment items should be reordered using the onMoveItem handler
    hover(hoveredOverItem) {
      if (hoveredOverItem.id !== id) {
        onMoveItem(hoveredOverItem.id, id);
      }
    }
  });

  // Hook up the ref by calling respective connector functions
  connectDrag(ref);
  connectDrop(ref);

  // Basic styling to illustrate the container is being interacted with
  const opacity = isDragging ? 0.5 : 1;
  const containerStyle = { opacity };

  // Passing in children here allows us to make this component reusable
  // but we must pass the DOM ref down via forwardedRef here
  return React.Children.map(children, child =>
    React.cloneElement(child, {
      forwardedRef: ref,
      style: containerStyle,
      size,
    }),
  );
});

export default DragItem;
