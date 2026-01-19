import { expect, test } from "vitest";
import { highlight } from "@/highlight";
import {
    create_datetime_iso_highlighter,
    create_guid_highlighter,
    create_ip4_highlighter,
    create_keyword_highlighter,
    create_number_highlighter,
    create_string_highlighter,
    create_unix_path_highlighter,
    create_windows_path_highlighter,
} from "@/highlighters";

test("all: highlights tokens ", () => {
    const text = `
        The system reported: "Path '/usr/local/bin/2026' not found" at 2026-01-19 14:30:00+00:00
        while processing request ID 12345. log('ERROR', 'File ~/tasks/2026/01/19/report_2026-01-19.log missing')
        returned null. Config value 'enable_feature' set to false, but 'debug_mode' remained true.

        Administrator said: 'Check C:\\Windows\\System32\\drivers\\etc\\hosts and /etc/hosts on 192.168.1.100'.
        API call: GET /api/v1/status, then PATCH /config/123 with {"active": true, "retry_count": 3.14}.
        Response: 404 on 2026-01-19T14:30:00.000Z.

        Paths tested:
        - ~/tasks/2026/01/19
        - ~/tasks/2026-01-19
        - /var/log/2026/01/19/app.log
        - C:\\Users\\admin\\Documents\\2026\\01\\19\\data.csv
        - /opt/backup/192.168.1.100/2026-01-19.tar.gz

        Commands: DELETE /tmp/cache/12345, POST /upload with file "/data/2026-01-19.json", HEAD /health,
        PUT /settings/789, INFO 'Service restarted at 14:30:00'. WARNING: IPv4 10.0.0.255 unreachable.
        ERROR: Path "/home/user/2026/01/19" contains segment "2026" matching date 2026-01-19.

        Final check: numbers 123, 456.789, 0xFF, paths with digits /opt/2026/01/19,
        C:\\2026\\01\\19, mixed tokens "string with 123 and /path/2026-01-19".

        Extra keywords in strings: "true or false", "null pointer", "true", "false",
        "null", "GET", "HEAD", "WARNING message".`;

    const expected = `
        The system reported: [string: "Path '/usr/local/bin/2026' not found"] at 2026-01-19 14:30:00+00:00
        while processing request ID [number: 12345]. log([string: 'ERROR'], [string: 'File ~/tasks/2026/01/19/report_2026-01-19.log missing'])
        returned [kw: null]. Config value [string: 'enable_feature'] set to [kw: false], but [string: 'debug_mode'] remained [kw: true].

        Administrator said: [string: 'Check C:\\Windows\\System32\\drivers\\etc\\hosts and /etc/hosts on 192.168.1.100'].
        API call: [kw: GET] [path: /api/v1/status], then [kw: PATCH] [path: /config/123] with {[string: "active"]: [kw: true], [string: "retry_count"]: [number: 3.14]}.
        Response: [number: 404] on [iso: 2026-01-19T14:30:00.000Z].

        Paths tested:
        - [path: ~/tasks/2026/01/19]
        - [path: ~/tasks/2026-01-19]
        - [path: /var/log/2026/01/19/app.log]
        - [path: C:\\Users\\admin\\Documents\\2026\\01\\19\\data.csv]
        - [path: /opt/backup/192.168.1.100/2026-01-19.tar.gz]

        Commands: [kw: DELETE] [path: /tmp/cache/12345], [kw: POST] [path: /upload] with file [string: "/data/2026-01-19.json"], [kw: HEAD] [path: /health],
        [kw: PUT] [path: /settings/789], [kw: INFO] [string: 'Service restarted at 14:30:00']. [kw: WARNING]: IPv4 [ip: 10.0.0.255] unreachable.
        [kw: ERROR]: Path [string: "/home/user/2026/01/19"] contains segment [string: "2026"] matching date 2026-01-19.

        Final check: numbers [number: 123], [number: 456.789], [number: 0xFF], paths with digits [path: /opt/2026/01/19],
        [path: C:\\2026\\01\\19], mixed tokens [string: "string with 123 and /path/2026-01-19"].

        Extra keywords in strings: [string: "true or false"], [string: "null pointer"], [string: "true"], [string: "false"],
        [string: "null"], [string: "GET"], [string: "HEAD"], [string: "WARNING message"].`;


    const highlighters = [
        create_datetime_iso_highlighter(s => `[iso: ${s}]`),
        create_guid_highlighter(s => `[guid: ${s}]`),
        create_ip4_highlighter(s => `[ip: ${s}]`),
        create_keyword_highlighter(s => `[kw: ${s}]`),
        create_number_highlighter(s => `[number: ${s}]`),
        create_string_highlighter(s => `[string: ${s}]`),
        create_unix_path_highlighter(s => `[path: ${s}]`),
        create_windows_path_highlighter(s => `[path: ${s}]`),
    ];

    expect(highlight(text, highlighters)).toBe(expected);
});
