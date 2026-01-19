import { describe, expect, test } from "vitest";
import { highlight } from "@/highlight";
import { create_ip4_highlighter } from "@/highlighters";

describe("ip4", () => {
    test("highlights ip4", () => {
        const highlighter = create_ip4_highlighter(s => `[ip: ${s}]`);
        expect(
            highlight("ping 192.168.0.1", [highlighter])
        ).toBe("ping [ip: 192.168.0.1]");
    });

    test("highlights ip4 with mask", () => {
        const highlighter = create_ip4_highlighter(s => `[ip: ${s}]`);
        expect(
            highlight("network: 10.0.0.0/24, mask: /16", [highlighter])
        ).toBe("network: [ip: 10.0.0.0/24], mask: /16");
    });

    test("highlights multiple ip4 addresses with and without masks", () => {
        const highlighter = create_ip4_highlighter(s => `[ip: ${s}]`);
        expect(
            highlight("servers: 10.0.0.1, 172.16.0.5/16, 8.8.8.8", [highlighter])
        ).toBe("servers: [ip: 10.0.0.1], [ip: 172.16.0.5/16], [ip: 8.8.8.8]");
    });

    test("highlights ip4 inside text", () => {
        const highlighter = create_ip4_highlighter(s => `[ip: ${s}]`);
        expect(
            highlight("client(127.0.0.1): connected", [highlighter])
        ).toBe("client([ip: 127.0.0.1]): connected");
    });

    test("does not highlight partial or malformed ip sequences", () => {
        const highlighter = create_ip4_highlighter(s => `[ip: ${s}]`);
        expect(
            highlight("data: 1.2.3.4.5, short: 192.168.1, leading: .1.1.1.1", [highlighter])
        ).toBe("data: 1.2.3.4.5, short: 192.168.1, leading: .1.1.1.1");
    });
});
