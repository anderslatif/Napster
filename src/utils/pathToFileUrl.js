// Converts a filesystem path into a file:// URL safe to hand to <audio>/<video>.
// Without encoding, characters like # and ? in a file name are parsed as URL
// syntax (fragment and query string), truncating the path.
// Only use this where a URL is expected - anything talking to the file system
// needs the raw path.
export function pathToFileUrl(filePath) {
    if (!filePath) return filePath;

    const isWindowsPath = /^[a-zA-Z]:/.test(filePath);

    // encode per segment so the separators themselves are not escaped into %2F
    const encodedPath = filePath
        .split(/[/\\]/)
        // the drive letter is left alone so the colon stays readable as C:/
        .map((segment, index) => isWindowsPath && index === 0 ? segment : encodeURIComponent(segment))
        .join("/");

    // windows absolute paths (C:\...) already start with a drive letter
    // and need the extra slash that posix paths get from their leading separator
    return isWindowsPath ? `file:///${encodedPath}` : `file://${encodedPath}`;
}
