# Contributing to chess.js

Thank you for considering contributing to the project.

Please use the [issue tracker](https://github.com/jhlywa/chess.js/issues) for:

- Bug reports
- Feature requests
- Questions

The rest of this document covers how to contribute code and documentation.

## Before you start

If your planned changes are anything other than minor, we recommend creating an
issue to discuss them first. This ensures your proposal is aligned with the
project goals and is not already being worked on.

## Getting started

It is fairly straightforward to get the project up and running locally:

1. Fork the repository.
2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/chess.js.git
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Submitting changes

Before you submit your changes you will need to run:

```bash
npm run check
```

This runs various checks to ensure that:

- Code is formatted correctly (`npm run format` should fix most issues)
- There are no eslint errors
- All tests pass
- The project builds
- Any changes to the public API are intended (explained in the next section
  "Changes to the public API")

Confirm there are no errors before pushing your changes.

Finally ensure that you update the documentation as required (see the section on
documentation)

### Changes to the public API

We are using api-extractor to check for any changes to the public API. This tool
runs as part of `npm run check`, but you can also run it directly with
`npm run api:check`.

If there are any changes, you will need to check that they are intended and
properly documented (see the next section). Once you are happy with them run
`npm run api:update` to confirm the changes.

### Documentation

You can view the existing documentation at https://jhlywa.github.io/chess.js

The documentation is versioned. The file you will need to edit is located at
`website/docs/index.md`. When the next release is made, a snapshot of this file
will be published to the documentation site.
