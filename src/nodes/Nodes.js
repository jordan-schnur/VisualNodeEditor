import React, { Children, cloneElement, useRef, useState } from "react";
import "./Nodes.css";

//Parent sends isDragging prop
//Node takes care of movement itself

export function NodeWindow(props) {
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [draggingNode, setDraggingNode] = useState(null);
    const [nodes, setNodes] = useState(null);
    const [firstPass, setFirstPass] = useState(true);
    const myRef = useRef()
    //const nodesArray = React.Children.toArray(props.children);

    const mouseUpEvent = React.useRef(null);
    const mouseMoveEvent = React.useRef(null);
    const nodeWindowRef = React.useRef(null);

    function clickedMe() {
        console.log("Clicked %o", this);
        document.body.style.cursor = "grab";
        setDraggingNode(this);
    }

    // Children.map(nodesArray, (node, index) => {
        
    // });

    if(firstPass) {
        setFirstPass(false);
        setNodes(
            React.Children.map(props.children, (child, index) => {
                console.log("modding children");
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {startPosX: index * 150, startPosY: index * 50, onMouseDown: clickedMe, nodeId: index, isDragging: false})
                    }
                    return child;
                })
            );
    }




    function moveNode(event) {
        if (draggingNode) {
            //draggingNode.moveNode(event.clientX, event.clientY)
            setMouseX(event.clientX);
            setMouseY(event.clientY);
            nodes[draggingNode.nodeId] = React.cloneElement(nodes[draggingNode.nodeId], {startPosX: event.clientX, startPosY: event.clientY, onMouseDown: clickedMe, nodeId: draggingNode.nodeId, isDragging: true});
        }
    }

    function mouseUp() {
        if (draggingNode) {
            setMouseX(0);
            let node = nodes[draggingNode.nodeId];
            nodes[draggingNode.nodeId] = React.cloneElement(node, {startPosX: node.props.startPosX, startPosY: node.props.startPosY, onMouseDown: clickedMe, nodeId: draggingNode.nodeId, isDragging: false});

            document.body.style.cursor = null;
            setDraggingNode(null);
        }
        
    }

    return(
        <div
        ref={el => {
            if (!el) return;
    
            //console.log(el.getBoundingClientRect());
          }}
        onMouseUp={mouseUp}
        onMouseMove={(e) => moveNode(e)}
        
        className="vne-node-window"
        >
            {nodes}
        </div>
    )
}

export function Node(props) {
    const [down, setDown] = useState(0); 
    const [posX, setX] = useState(props.startPosX ?? 0);
    const [posY, setY] = useState(props.startPosY ?? 0);

    function handleMouseDown() {
        console.log("Node mouse down")
    }

    if(props.isDragging) {
        console.log("This guy is draggin")
    }

    function moveNode(x, y) {
        setX(x);
        setY(y);
    }

    return (
        <div 
        ref={el => {
            if (!el) return;
    
            let boundingBox = el.getBoundingClientRect();
            setX(boundingBox.x);
            setY(boundingBox.y);
            //console.log(el.getBoundingClientRect());
          }}
        className="vne-node-generic" 
        style={{
            left: props.startPosX,
            top: props.startPosY,
        }}
        //onMouseMove={(e) => moveNode(e)}}
        onMouseDown={() => props.onMouseDown()}
        onSelect={(e) => console.log(e)}
        >
            {/* MouseX: {props.mouseX}<br/>
            MouseY: {props.mouseY}<br/>
            isUp: {props.isUp}<br/> */}
            X: {posX} Y: {posY}<br/>
            left: {props.startPosX} top: {props.startPosY}
        </div>
    );
}

export function OnTextInputChangeNode(props) {
    return (
        <Node
            name="TextBoxChange">
        </Node>
    );
}

export function TransformTextNode() {
    return (
        <Node
            name="TransformText">
        </Node>
    );
}

export function AlertNode() {
    return (
        <Node
            name="Alert">
        </Node>
    );
}