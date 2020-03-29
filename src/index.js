import React from 'react';
import ReactDOM from 'react-dom';
import HTML5Backend from 'react-dnd-html5-backend';
import App from './App';
import { GridProvider } from './Grid/GridContext';
import { DndProvider } from 'react-dnd';

/**
 * HTML5Backend - wrapper that uses the HTML5 drag and drop API
 * https://react-dnd.github.io/react-dnd/docs/backends/html5
 *
 * TouchBackend - HTML5Backend does not support touch events,
 * so we would need to leverage something like TouchBackend:
 * https://react-dnd.github.io/react-dnd/docs/backends/touch
 */

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <GridProvider>
      <App />
    </GridProvider>
  </DndProvider>,
  document.getElementById('root')
);
