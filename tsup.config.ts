import type { Options } from "tsup"

export default <Options>{
	entry: {
		index: "src/index.ts",
		curry: "src/curry/index.ts",
	},
	outDir: "./",

	clean: false,

	format: ["esm"],

	dts: true,

	skipNodeModulesBundle: true,
}
