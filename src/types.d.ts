/**
 * Describes a single highlighting rule.
 *
 * A highlighter defines how to detect a fragment of text using a regular
 * expression and how to transform the matched value into a highlighted
 * representation.
 */
export interface Highlighter {
    /**
     * Optional priority of the rule.
     *
     * Used only when two rules match exactly the same fragment of text.
     * Lower values have higher priority.
     *
     * Defaults to `0`.
     */
    order?: number;

    /**
     * Regular expression used to find matches in the input string.
     *
     * The expression is expected to be global (`/g`).
     */
    regex: RegExp;

    /**
     * Transforms a matched substring into its highlighted form.
     *
     * @param m - The matched substring.
     * @returns The highlighted representation of the match.
     */
    apply: (m: string) => string;
}
