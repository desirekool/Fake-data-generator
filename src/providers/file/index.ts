import { BaseProvider } from "../../generator";

export class FileProvider extends BaseProvider {
  __provider__ = "file";

  constructor(generator: import("../../generator").Generator) {
    super(generator);
  }

  private _mimeTypes: Record<string, string[]> = {
    "application": ["pdf", "json", "xml", "zip", "tar", "gzip", "javascript", "octet-stream"],
    "audio": ["mpeg", "wav", "ogg", "flac", "aac", "wma"],
    "image": ["png", "jpg", "jpeg", "gif", "bmp", "svg", "webp", "ico", "tiff"],
    "message": ["http", "smtp"],
    "model": ["iges", "vrml"],
    "multipart": ["form-data", "mixed", "related"],
    "text": ["plain", "html", "css", "csv", "xml", "javascript", "markdown"],
    "video": ["mp4", "avi", "mov", "wmv", "flv", "webm"],
  };

  mime_type(): string {
    const categories = Object.keys(this._mimeTypes);
    const category = this.randomElement(categories);
    const ext = this.randomElement(this._mimeTypes[category]);
    return `${category}/${ext}`;
  }

  file_extension(): string {
    const allExtensions: string[] = [];
    for (const exts of Object.values(this._mimeTypes)) {
      allExtensions.push(...exts);
    }
    return this.randomElement(allExtensions);
  }

  file_name(extension?: string): string {
    const name = this.generator.lexify("????????");
    const ext = extension ?? this.file_extension();
    return `${name}.${ext}`;
  }

  file_path(directory?: string): string {
    const dir = directory ?? this.generator.lexify("????/????/????").toLowerCase();
    return `${dir}/${this.file_name()}`;
  }

  unix_device(): string {
    return `/dev/${this.randomElement(["sd", "hd", "vd", "nvme"])}${String.fromCharCode(97 + this.generator.randomInt(0, 25))}${this.generator.randomInt(0, 15)}`;
  }

  unix_partition(): string {
    return `${this.unix_device()}${this.generator.randomInt(1, 9)}`;
  }
}