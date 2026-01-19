import { expect, test } from "vitest";
import { highlight } from "@/highlight";

test("number", () => {
    const result = highlight("(3.14159)");
    expect(result).toBe(`(\x1b[34m3.14159\x1b[39m)`);
});
