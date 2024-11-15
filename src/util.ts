export function createRootCanvas() {
    document.body.innerHTML = "";
    const root = document.createElement("canvas");
    document.body.appendChild(root);
    return root;
}

const MIN_MARGIN = 10;

export function setCanvasToScreenSize(
    canvas: HTMLCanvasElement,
    margin: number
) {
    canvas.width = window.innerWidth - margin - MIN_MARGIN;
    canvas.height = window.innerHeight - margin * 2 - MIN_MARGIN;
    canvas.style.setProperty("margin", `${margin}px auto`);
}

export function createShader(
    gl: WebGL2RenderingContext,
    type: number,
    source: string
) {
    const shader = gl.createShader(type);
    if (!shader) throw new Error("shader");
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) return shader;
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    throw new Error("failed to compile shader");
}

export function createProgram(
    gl: WebGL2RenderingContext,
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
) {
    const program = gl.createProgram();
    if (!program) throw new Error("program");
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) return success;
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    throw new Error("failed to link program");
}
