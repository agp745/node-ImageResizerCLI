# resizer-cli

[![NPM version][npm-badge]][npm-url]
![GitHub](https://img.shields.io/github/license/agp745/node-ImageResizerCLI)

## Description

`resizer-cli` is a command-line interface (CLI) tool that utilizes FFMPEG to resize all images in a specified folder.

## Installation

You can easily install `resizer-cli` using npm:

```bash
npm install resizer-cli
```

## CLI Options

- `-h, --help`: Display help information.
- `-s, --scale <integer>`: Set the width of resized images in pixels (default = 20).
- `-d, --docker`: Run the CLI tool virtually in a Docker container.

## How it Works

### Option 1: Run FFMPEG Locally

If you prefer to run FFMPEG locally, follow these steps:

1. Install FFMPEG locally

    - For macOS users, you can use Homebrew:

        ```bash
        brew install ffmpeg
        ```

    - For linux users, use your preferred package manager

2. In the root directory of your project, run the following command, replacing `<path_to_image_folder>` with the actual path to your image folder:

   ```bash
   npx resizer-cli <path_to_image_folder>
   ```

## Option 2: Run FFMPEG Virtually

If you do not want to install FFMPEG locally, you can use the `-d` flag to run the CLI tool virtually in a Docker container. Follow these steps:

1. Ensure Docker Desktop is installed:

   - **Mac:** [Install Docker Desktop](https://docs.docker.com/desktop/install/mac-install/)
   - **Windows:** [Install Docker Desktop](https://docs.docker.com/desktop/install/windows-install/)
   - **Linux:** [Install Docker Desktop](https://docs.docker.com/desktop/install/linux-install/)

2. In the root directory of your project, run the following command, replacing `<path_to_image_folder>` with the actual path to your image folder:

   ```bash
   npx resizer-cli <path_to_image_folder> -d
   ```

## Contributing

I welcome contributions from the community! If you'd like to contribute to `resizer-cli`, please follow these guidelines:

1. Fork the repository and clone it locally.

2. Create a new branch for your feature or bug fix.

3. Make your changes and test them thoroughly.

4. Ensure your code follows the project's coding style.

5. Submit a pull request with a clear description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).

[npm-badge]: https://img.shields.io/npm/v/resizer-cli.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/resizer-cli
