import { describe, expect, test } from "vitest";
import { highlight } from "@/highlight";
import { create_unix_process_highlighter } from "@/highlighters";

describe("unix process", () => {
    test("highlights process names", () => {
        const highlighter = create_unix_process_highlighter(s => `[proc: ${s}]`);

        expect(
            highlight("systemd[1]: Starting system", [highlighter])
        ).toBe("[proc: systemd][1]: Starting system");

        expect(
            highlight("(sshd)[1234]: Connection closed", [highlighter])
        ).toBe("[proc: (sshd)][1234]: Connection closed");

        expect(
            highlight("==(/usr/bin/Xwayland :0 -auth /run/user/1000/xauth_hJeyDO -listenfd 8 -listenfd 9 -displayfd 72 -wm 82 -rootless -enable-ei-portal)[1556]==", [highlighter])
        ).toBe("==[proc: (/usr/bin/Xwayland :0 -auth /run/user/1000/xauth_hJeyDO -listenfd 8 -listenfd 9 -displayfd 72 -wm 82 -rootless -enable-ei-portal)][1556]==");

        expect(
            highlight("Process /usr/lib/bluetooth/bluetoothd[999]", [highlighter])
        ).toBe("Process [proc: /usr/lib/bluetooth/bluetoothd][999]");

        expect(
            highlight("Process node.js-worker[43]: working", [highlighter])
        ).toBe("Process [proc: node.js-worker][43]: working");

        expect(
            highlight("Process node.js/worker[43]: working", [highlighter])
        ).toBe("Process [proc: node.js/worker][43]: working");
    });
});
