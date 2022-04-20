import './App.css';
import {NodeWindow, OnTextInputChangeNode, Node} from './nodes/Nodes.js';

function App() {
  return (
    <div className="App">
      <NodeWindow>
        <Node />
        <Node />
        <Node />
        <Node />
        <Node />
        <Node />
        <Node />
        <Node />
        <Node />
      </NodeWindow>
    </div>
  );
}

export default App;
