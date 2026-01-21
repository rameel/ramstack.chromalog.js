import {
    create_date_highlighter,
    create_datetime_iso_highlighter,
    create_guid_highlighter,
    create_ip4_highlighter,
    create_keyword_highlighter,
    create_number_highlighter,
    create_string_highlighter,
    create_time_highlighter,
    create_unix_path_highlighter,
    create_unix_process_highlighter,
    create_windows_path_highlighter
} from "@/highlighters";

export {
    create_date_highlighter as createDateHighlighter,
    create_datetime_iso_highlighter as createDatetimeIsoHighlighter,
    create_guid_highlighter as createGuidHighlighter,
    create_ip4_highlighter as createIp4Highlighter,
    create_keyword_highlighter as createKeywordHighlighter,
    create_number_highlighter as createNumberHighlighter,
    create_string_highlighter as createStringHighlighter,
    create_time_highlighter as createTimeHighlighter,
    create_unix_path_highlighter as createUnixPathHighlighter,
    create_unix_process_highlighter as createUnixProcessHighlighter,
    create_windows_path_highlighter as createWindowsPathHighlighter
}
export * from "@/highlight"
