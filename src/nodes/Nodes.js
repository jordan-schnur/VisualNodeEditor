import React, { useState } from "react";
import "./Nodes.css";

export function NodeWindow(props) {
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [mouseUp, setMouseUp] = useState(false);

    const childWithProps = React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {mouseX: mouseX, mouseY: mouseY, mouseUp: mouseUp})
        }

        return child;
    });

    function moveNode(event) {
        setMouseX(event.clientX);
        setMouseY(event.clientY);
        console.log(mouseX + ":" + mouseY)
    }

    document.body.addEventListener('mousemove', (event) => {

    })

    document.body.addEventListener('mouseup', (event) => {
        setMouseUp(true);
    });

    document.body.addEventListener('mousedown', (event) => {
        setMouseUp(false);
    });

    return(
        <div 
        className="vne-node-window"
        onMouseMove={(event) => moveNode(event)}
        >
            {childWithProps}
        </div>
    )
}

export function Node(props) {
    const [isDragging, setIsDragging] = useState(false);
    // function moveNode(event) {
    //     if (isDown) {
    //         //console.log(event);
    //         //setMouseX(event.clientX);
    //         //setMouseY(event.clientY);
    //     }
    // }

    console.log(props);

    return (
        <div 
        className="vne-node-generic" 
        // style={{
        //     left: mouseX,
        //     top: mouseY,
        // }}
        //onMouseMove={(e) => moveNode(e)}}
        >
            MouseX: {props.mouseX}<br/>
            MouseY: {props.mouseY}<br/>
            isUp: {props.isUp}<br/>
            Name: {props.name}
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