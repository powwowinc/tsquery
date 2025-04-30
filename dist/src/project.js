import * as fs from 'fs';
import * as path from 'path';
import { createCompilerHost, createProgram, parseJsonConfigFileContent, readConfigFile, sys } from 'typescript';
/**
 * @public
 * Get all the `SourceFiles` included in a the TypeScript project described by a given config file.
 *
 * @param configFilePath - the path to the TypeScript config file, or a directory containing a `tsconfig.json` file.
 * @returns an `Array` of the `SourceFiles` for all files in the project.
 */
export function project(configFilePath) {
    const fullPath = findConfig(configFilePath);
    if (fullPath) {
        return getSourceFiles(fullPath);
    }
    return [];
}
/**
 * @public
 * Get all the file paths included ina the TypeScript project described by a given config file.
 *
 * @param configFilePath - the path to the TypeScript config file, or a directory containing a `tsconfig.json` file.
 * @returns an `Array` of the file paths for all files in the project.
 */
export function files(configFilePath) {
    const fullPath = findConfig(configFilePath);
    if (fullPath) {
        return parseConfig(configFilePath).fileNames;
    }
    return [];
}
function findConfig(configFilePath) {
    try {
        const fullPath = path.resolve(process.cwd(), configFilePath);
        // Throws if file does not exist:
        const stats = fs.statSync(fullPath);
        if (!stats.isDirectory()) {
            return fullPath;
        }
        const inDirectoryPath = path.join(fullPath, 'tsconfig.json');
        // Throws if file does not exist:
        fs.accessSync(inDirectoryPath);
        return inDirectoryPath;
    }
    catch (e) {
        return null;
    }
}
function getSourceFiles(configFilePath) {
    const parsed = parseConfig(configFilePath);
    const host = createCompilerHost(parsed.options, true);
    const program = createProgram(parsed.fileNames, parsed.options, host);
    return Array.from(program.getSourceFiles());
}
function parseConfig(configFilePath) {
    const config = readConfigFile(configFilePath, sys.readFile.bind(sys));
    const parseConfigHost = {
        fileExists: sys.fileExists.bind(sys),
        readDirectory: sys.readDirectory.bind(sys),
        readFile: sys.readFile.bind(sys),
        useCaseSensitiveFileNames: true
    };
    return parseJsonConfigFileContent(config.config, parseConfigHost, path.dirname(configFilePath), { noEmit: true });
}
//# sourceMappingURL=project.js.map