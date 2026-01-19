import { describe, expect, test } from "vitest";
import { highlight } from "@/highlight";
import { create_date_highlighter } from "@/highlighters";

describe("date", () => {
    test("highlights dates in YYYY-MM-DD and DD/MM/YYYY formats", () => {
        const highlighter = create_date_highlighter(s => `[date: ${s}]`);

        const values = [
            "1975/10/25",
            "1975/31/12",
            "1978-05-14",
            "1978-25-10",
            "2022/01/02",
            "2023-10-25",
            "24.12.2023",
            "24.12.2023",
            "02/11/2024",
            "03/07/1925",
            "12.08.1938",
            "03-10-1925",
        ];
        for (const value of values) {
            expect(
                highlight(`(${value})`, [highlighter])
            ).toBe(`([date: ${value}])`);
        }

        expect(
            highlight("Between 2020-05-20 and 20.05.2020", [highlighter])
        ).toBe("Between [date: 2020-05-20] and [date: 20.05.2020]");
    });
});
