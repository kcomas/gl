import { resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config = {
    entry: resolve(import.meta.dirname, "./src", "index.ts"),
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(glsl|vs|fs)$/,
                loader: "ts-shader-loader",
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [new HtmlWebpackPlugin()],
    output: {
        filename: "bundle.js",
        path: resolve(import.meta.dirname, "dist"),
    },
};

export default config;
