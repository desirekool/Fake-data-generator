import { BaseProvider } from "../../generator";

const APPLICATION_MIME_TYPES = [
  "application/atom+xml", "application/ecmascript", "application/EDI-X12",
  "application/EDIFACT", "application/json", "application/javascript",
  "application/octet-stream", "application/ogg", "application/pdf",
  "application/postscript", "application/rdf+xml", "application/rss+xml",
  "application/soap+xml", "application/font-woff", "application/xhtml+xml",
  "application/xml-dtd", "application/xop+xml", "application/zip",
  "application/gzip",
];

const AUDIO_MIME_TYPES = [
  "audio/basic", "audio/L24", "audio/mp4", "audio/mpeg", "audio/ogg",
  "audio/vorbis", "audio/vnd.rn-realaudio", "audio/vnd.wave", "audio/webm",
];

const IMAGE_MIME_TYPES = [
  "image/gif", "image/jpeg", "image/pjpeg", "image/png", "image/svg+xml",
  "image/tiff", "image/vnd.microsoft.icon",
];

const MESSAGE_MIME_TYPES = [
  "message/http", "message/imdn+xml", "message/partial", "message/rfc822",
];

const MODEL_MIME_TYPES = [
  "model/example", "model/iges", "model/mesh", "model/vrml",
  "model/x3d+binary", "model/x3d+vrml", "model/x3d+xml",
];

const MULTIPART_MIME_TYPES = [
  "multipart/mixed", "multipart/alternative", "multipart/related",
  "multipart/form-data", "multipart/signed", "multipart/encrypted",
];

const TEXT_MIME_TYPES = [
  "text/cmd", "text/css", "text/csv", "text/html", "text/javascript",
  "text/plain", "text/vcard", "text/xml",
];

const VIDEO_MIME_TYPES = [
  "video/mpeg", "video/mp4", "video/ogg", "video/quicktime", "video/webm",
  "video/x-matroska", "video/x-ms-wmv", "video/x-flv",
];

const MIME_TYPES: Record<string, string[]> = {
  "application": APPLICATION_MIME_TYPES,
  "audio": AUDIO_MIME_TYPES,
  "image": IMAGE_MIME_TYPES,
  "message": MESSAGE_MIME_TYPES,
  "model": MODEL_MIME_TYPES,
  "multipart": MULTIPART_MIME_TYPES,
  "text": TEXT_MIME_TYPES,
  "video": VIDEO_MIME_TYPES,
};

const AUDIO_FILE_EXTENSIONS = ["flac", "mp3", "wav"];
const IMAGE_FILE_EXTENSIONS = ["bmp", "gif", "jpeg", "jpg", "png", "tiff"];
const TEXT_FILE_EXTENSIONS = ["css", "csv", "html", "js", "json", "txt"];
const VIDEO_FILE_EXTENSIONS = ["mp4", "avi", "mov", "webm"];
const OFFICE_FILE_EXTENSIONS = [
  "doc", "docx", "xls", "xlsx", "ppt", "pptx", "odt", "ods", "odp",
  "pages", "numbers", "key", "pdf",
];

const FILE_EXTENSIONS: Record<string, string[]> = {
  "audio": AUDIO_FILE_EXTENSIONS,
  "image": IMAGE_FILE_EXTENSIONS,
  "office": OFFICE_FILE_EXTENSIONS,
  "text": TEXT_FILE_EXTENSIONS,
  "video": VIDEO_FILE_EXTENSIONS,
};

const UNIX_DEVICE_PREFIXES = ["sd", "vd", "xvd"];

export class FileProvider extends BaseProvider {
  __provider__ = "file";

  constructor(generator: import("../../generator").Generator) {
    super(generator);
  }

  mime_type(category?: string): string {
    const cat = category || this.randomElement(Object.keys(MIME_TYPES));
    return this.randomElement(MIME_TYPES[cat]);
  }

  file_extension(category?: string): string {
    const cat = category || this.randomElement(Object.keys(FILE_EXTENSIONS));
    return this.randomElement(FILE_EXTENSIONS[cat]);
  }

  file_name(category?: string, extension?: string): string {
    if (extension === undefined) {
      extension = this.file_extension(category);
    }
    const name = this.lexify("????????");
    return extension ? `${name}.${extension}` : name;
  }

  file_path(depth: number = 1, category?: string, extension?: string): string {
    const file = this.file_name(category, extension);
    let path = file;
    for (let i = 0; i < depth; i++) {
      path = `${this.lexify("????")}/${path}`;
    }
    return `/${path}`;
  }

  unix_device(prefix?: string): string {
    const pre = prefix || this.randomElement(UNIX_DEVICE_PREFIXES);
    const suffix = String.fromCharCode(97 + this.randomInt(0, 25));
    return `/dev/${pre}${suffix}`;
  }

  unix_partition(prefix?: string): string {
    return `${this.unix_device(prefix)}${this.randomInt(1, 9)}`;
  }
}
