import {
    createRootCanvas,
    setCanvasToScreenSize,
    createShader,
    createProgram,
    randomInt,
    setRectangle,
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
    const colorLocation = gl.getUniformLocation(program, "u_color");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
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
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindVertexArray(vao);
    gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
    for (let i = 0; i < 50; i++) {
        const minX = Math.floor(canvas.width / 8);
        const minY = Math.floor(canvas.height / 8);
        const maxX = Math.floor(canvas.width / 4);
        const maxY = Math.floor(canvas.height / 4);
        setRectangle(
            gl,
            randomInt(0, canvas.width),
            randomInt(0, canvas.height),
            randomInt(minX, maxX),
            randomInt(minY, maxY)
        );
        gl.uniform4f(
            colorLocation,
            Math.random(),
            Math.random(),
            Math.random(),
            1
        );
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
}

window.addEventListener("resize", main);
main();
