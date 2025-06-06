# Conflict Resolver

## Overview
Conflict Resolver is a command-line tool designed to help users identify and resolve conflicts in collaborative environments. It simplifies the process of managing and merging changes in shared files or projects, making it an essential utility for teams working with version-controlled systems.

## Features
- **Conflict Detection**: Automatically detects conflicts in shared files.
- **Conflict Resolution**: Provides tools to resolve conflicts efficiently.
- **Version Control Integration**: Seamlessly integrates with Git for version management.
- **User-Friendly CLI**: Designed for both technical and non-technical users.

## Installation
Install the package globally via npm:

```bash
npm install -g conflict-resolver
```

## Usage
Once installed, you can use the `conflict-resolver` command directly in your terminal. Below are some common commands:

---

## Commands

### `resolve`
Resolve merge conflicts in a Git repository.

#### Options:
- `-s, --strategy <strategy>`: Specify the conflict resolution strategy. Available strategies:
  - `ours`: Keep changes from the current branch.
  - `theirs`: Keep changes from the branch being merged.
  - `merge`: Attempt to merge changes from both branches.
  - `manual`: Manually resolve conflicts.
  - **Default**: `ours`.

- `-a, --auto`: Automatically resolve conflicts without user input.
- `-p, --path <path>`: Specify the path to the Git repository. Defaults to the current working directory.

#### Example Usage:
```bash
# Resolve conflicts using the "theirs" strategy
resolver resolve -s theirs

# Automatically resolve conflicts using the "merge" strategy
resolver resolve -s merge -a

# Resolve conflicts in a specific repository path
resolver resolve -p /path/to/repo
```

---

### `--help`
Display help information for the CLI tool.

#### Example Usage:
```bash
resolver --help
```

---

### `--version`
Display the current version of the CLI tool.

#### Example Usage:
```bash
resolver --version
```

---

## Contributing
We welcome contributions! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m "Add feature-name"
    ```
4. Push to the branch:
    ```bash
    git push origin feature-name
    ```
5. Open a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For questions or feedback, please contact **kartikaygarg777@gmail.com**.

---

## Links
- [GitHub Repository](https://github.com/Kartikay-Garg18/conflict-resolver)
- [npm Package](https://www.npmjs.com/package/conflict-resolver)
