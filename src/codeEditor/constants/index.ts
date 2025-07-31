
export const SUPPORTED_LANGUAGES = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "cpp", label: "C++" },
    { value: "go", label: "Go" },
    { value: "ruby", label: "Ruby" },
    { value: "php", label: "PHP" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "bash", label: "Bash" },
    { value: "sql", label: "SQL" },
    { value: "kotlin", label: "Kotlin" },
    { value: "swift", label: "Swift" },
    { value: "rust", label: "Rust" },
    { value: "dart", label: "Dart" },
    { value: "scala", label: "Scala" },
    { value: "haskell", label: "Haskell" },
    { value: "r", label: "R" },
    { value: "matlab", label: "MATLAB" },
    { value: "perl", label: "Perl" },
    { value: "objective-c", label: "Objective-C" },
    { value: "visual-basic", label: "Visual Basic" },
    { value: "assembly", label: "Assembly" },
    { value: "fortran", label: "Fortran" },
    { value: "pascal", label: "Pascal" },
    { value: "prolog", label: "Prolog" },
    { value: "json", label: "JSON" },
    { value: "xml", label: "XML" },
    { value: "markdown", label: "Markdown" },
    { value: "plaintext", label: "Plain Text" },
    { value: "graphql", label: "GraphQL" },
    { value: "typescriptreact", label: "TypeScript React" },
    { value: "javascriptreact", label: "JavaScript React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "sqlserver", label: "SQL Server" },
    { value: "sqlite", label: "SQLite" },
    { value: "mongodb", label: "MongoDB" },
    { value: "redis", label: "Redis" },
    { value: "sas", label: "SAS" },
    { value: "elixir", label: "Elixir" },
    { value: "julia", label: "Julia" },
    { value: "cobol", label: "COBOL" },

]

export const getFileExtension = (language: string): string => {
    switch (language) {
        case "javascript":
            return "js";
        case "typescript":
            return "ts";
        case "python":
            return "py";
        case "java":
            return "java";
        case "csharp":
            return "cs";
        case "cpp":
            return "cpp";
        case "go":
            return "go";
        case "ruby":
            return "rb";
        case "php":
            return "php";
        case "html":
            return "html";
        case "css":
            return "css";
        case "bash":
            return "sh";
        case "sql":
            return "sql";
        case "kotlin":
            return "kt";
        case "swift":
            return "swift";
        case "rust":
            return "rs";
        case "dart":
            return "dart";
        case "scala":
            return "scala";
        case "haskell":
            return "hs";
        case "r":
            return "r";
        case "matlab":
            return "m";
        case "perl":
            return "pl";
        case "objective-c":
            return "m";
        case "visual-basic":
            return "vb";
        case "assembly":
            return "asm";
        case "fortran":
            return "f90";
        case "pascal":
            return "pas";
        case "prolog":
            return "pl";
        case "json":
            return "json";
        case "xml":
            return "xml";
        case "markdown":
            return "md";
        case "plaintext":
            return "txt";
        case "graphql":
            return "graphql";
        case "typescriptreact":
            return "tsx";
        case "javascriptreact":
            return "jsx";
        case "vue":
            return "vue";
        case "angular":
            return "html"; // Angular files are often HTML with TypeScript
        case "svelte":
            return "svelte";
        case "sqlserver":
            return "sql";
        case "sqlite":
            return "sqlite";
        case "mongodb":
            return "json"; // MongoDB queries are often in JSON format
        case "redis":
            return "redis"; // Redis commands are often in plain text
        case "sas":
            return "sas";
        case "elixir":
            return "ex";
        case "julia":
            return "jl";
        case "cobol":
            return "cob";
        default:
            return "txt"; // Default to plain text if language is not recognized
    }
}