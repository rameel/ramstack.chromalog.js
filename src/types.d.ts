export interface Highlighter {
    order?: number;
    regex: RegExp;
    apply: (m: string) => string;
}
