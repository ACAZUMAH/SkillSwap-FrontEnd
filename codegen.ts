import { CodegenConfig } from '@graphql-codegen/cli';
const config: CodegenConfig = {
    schema: "http://localhost:8800/graphql",
    generates: {
        "src/interfaces/graphql/": {
            preset: "client",
            presetConfig: {
                gqlTagName: "graphql",
            },
            hooks: {
                afterOneFileWrite: async (fileName) => {
                    const fs = require("fs");
                    const content = fs.readFileSync(fileName, "utf8");
                    if(!content.includes("@ts-nocheck")){
                        fs.writeFileSync(fileName, `// @ts-nocheck\n${content}`);
                    }
                }
            }
        }
    }
}
export default config