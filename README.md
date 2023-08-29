# Cli-Share: Seamless Command Line File Upload & Sharing with file.io

Cli-Share is a powerful command-line tool that streamlines file uploading and sharing through the file.io service. This tool, built with TypeScript and Commander, empowers you to efficiently manage file uploads, while providing advanced options like auto-delete, maximum downloads, and file expiration. Cli-Share supports uploads of files up to 2GB in size.

## Features

- Upload files directly from the command line.
- Automatic deletion of shared files after a set duration.
- Set a maximum download limit for shared files.
- Choose an expiration date for shared files.
- Seamlessly upload files up to 2GB in size.

## Installation

To install cli-share, use npm:

```bash

npm install -g cli-share

```

# Collect API key

cli-share collect-key

# Upload a file

cli-share upload <file-path>

# Set options for sharing

cli-share upload <file-path> --expires <expiry-date> --max-downloads <max-downloads> --auto-delete

# Update sharing options

cli-share update-options <file-id>

# Get a specific shared file

cli-share get-one <file-id>

# Get a list of all shared files

cli-share get-all

# Delete a shared file

cli-share delete <file-id>

# View account details

cli-share me

## Contribution

Contributions are welcome! If you find any issues or have ideas for improvements, feel free to open a pull request.

## License

This project is licensed under the MIT License.
