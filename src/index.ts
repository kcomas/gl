import { createRootNode } from "./util";
import "./index.css";
import vertexShaderSource from "./vertexShader.glsl";

const root = createRootNode();
root.innerHTML = "<h1>Hello World";
