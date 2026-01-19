import { describe, expect, test } from "vitest";
import { highlight } from "@/highlight";
import {
    create_date_highlighter,
    create_unix_path_highlighter
} from "@/highlighters";

describe("highlighter priorities (order)", () => {
    test("date should win over path", () => {
        const path_highlighter = create_unix_path_highlighter(s => `[path: ${s}]`);
        const date_highlighter = create_date_highlighter(s => `[date: ${s}]`);

        expect(
            highlight("Check file at 20/01/2026 for details", [path_highlighter, date_highlighter])
        ).toBe("Check file at [date: 20/01/2026] for details");

        expect(
            highlight("Check file at 20/01/2026 for details", [date_highlighter, path_highlighter])
        ).toBe("Check file at [date: 20/01/2026] for details");

        path_highlighter.order = 0;
        date_highlighter.order = 1;

        expect(
            highlight("Check file at 20/01/2026 for details", [path_highlighter, date_highlighter])
        ).toBe("Check file at [path: 20/01/2026] for details");

        expect(
            highlight("Check file at 20/01/2026 for details", [date_highlighter, path_highlighter])
        ).toBe("Check file at [path: 20/01/2026] for details");
    });
});
