import {
    createRootCanvas,
    setCanvasToScreenSize,
    createShader,
    createProgram,
} from "./util";
import "./index.css";
import vertexShaderSource from "./vertexShader.glsl";
import fragmentShaderSource from "./fragmentShader.glsl";

function main() {
    setCanvasToScreenSize(canvas, 20);
    const gl = canvas.getContext("webgl2");
    if (!gl) throw new Error("gl");
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentShaderSource
    );
    const program = createProgram(gl, vertexShader, fragmentShader);
}

const canvas = createRootCanvas();

window.addEventListener("resize", main);
main();
