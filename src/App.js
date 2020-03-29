import React, { useContext } from 'react';
import DragItem from './Grid/DragItem';
import { GridItem, Widget } from './Grid/Grid';
import GridContext from './Grid/GridContext';
import './App.css';

function App() {
  const { items, moveItem } = useContext(GridContext);

  return (
    <div className="App">
      <div className="grid">
        {items.map((item) => (
          <DragItem key={item.id} id={item.id} onMoveItem={moveItem} size={item.size}>
            <GridItem>
              <Widget
                size={item.size}
                title={item.title}
                src={item.src}
              />
            </GridItem>
          </DragItem>
        ))}
      </div>
    </div>
  );
}

export default App;
