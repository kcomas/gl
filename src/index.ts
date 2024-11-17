import {
    createRootCanvas,
    setCanvasToScreenSize,
    createShader,
    createProgram,
} from "./util";
import "./index.css";
import vertexShaderSource from "./shaders/vertexShader.glsl";
import fragmentShaderSource from "./shaders/fragmentShader.glsl";

function main() {
    const canvas = createRootCanvas();
    setCanvasToScreenSize(canvas, 20);
    const gl = canvas.getContext("webgl2");
    if (!gl) throw new Error("gl");
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentShaderSource
    );
    const program = createProgram(gl, [vertexShader, fragmentShader]);
    const positionAttributeLocation = gl.getAttribLocation(
        program,
        "a_position"
    );
    const resolutionUniformLocation = gl.getUniformLocation(
        program,
        "u_resolution"
    );
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [10, 20, 80, 20, 10, 30, 10, 30, 80, 20, 80, 30];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);
    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    let offset = 0;
    gl.vertexAttribPointer(
        positionAttributeLocation,
        size,
        type,
        normalize,
        stride,
        offset
    );
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
    gl.bindVertexArray(vao);
    const primitiveType = gl.TRIANGLES;
    offset = 0;
    let count = 6;
    gl.drawArrays(primitiveType, offset, count);
}

window.addEventListener("resize", main);
main();
