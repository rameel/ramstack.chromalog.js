export interface Highlighter {
    regex: RegExp;
    apply: (m: string) => string;
}
