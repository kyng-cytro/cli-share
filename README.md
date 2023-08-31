# Cli-Share: Seamless Command Line File Upload & Sharing with file.io

Cli-Share is a powerful command-line tool that streamlines file uploading and sharing through the file.io service. This tool, built with TypeScript and Commander, empowers you to efficiently manage file uploads, while providing advanced options like auto-delete, maximum downloads, and file expiration. Cli-Share supports uploads of files up to 2GB in size.

## Features

**please note that some features requires a paid plan**

- Upload files directly from the command line.
- Automatic deletion of shared files after a set duration.
- Set a maximum download limit for shared files.
- Choose an expiration date for shared files.
- Seamlessly upload files up to 2GB in size.

## Installation

To install use npm:

```bash
npm install -g cli-share

```

## Usage

### Collect API key

```bash
share login
```

### Upload a file

```bash
share upload <file-path>
```

### Copy link

```bash
share upload <file-path> -c
```

### Set options for sharing

```bash
share upload <file-path> -e <expiry-date> -m <max-downloads> -a
```

### Update sharing options

```bash
share update <file-id>
```

### Retrieve files or perform search

```bash
share get -s <search-query> --sort <sort-by> --offset <number> --limit <number>
```

### Delete a file

```bash
share delete <file-id>
```

### View account details

```bash
share me
```

## Contribution

Contributions are welcome! If you find any issues or have ideas for improvements, feel free to open a pull request.

## License

This project is licensed under the MIT License.
