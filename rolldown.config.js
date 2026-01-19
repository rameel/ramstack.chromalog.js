import { dts } from "rolldown-plugin-dts";

export default [{
    input: "src/index.ts",
    platform: "node",
    external(id) {
        const is_internal = id.startsWith('@')
            || id.startsWith('./')
            || id.startsWith('/');
        return !is_internal;
    },
    output: [{
        dir: "dist",
        format: "esm",
        cleanDir: true
    }],
    plugins: [
        dts()
    ]
}];
