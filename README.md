# SolidEns_RS || 🏗 Scaffold-Eth 2

## Overview

SolidEns_RS is the frontend component of the Enstate library, a robust ENS (Ethereum Name Service) query API implemented as a Cloudflare worker in Rust. This project is designed to provide a seamless interface for interacting with ENS names, allowing users to resolve ENS names to addresses, view ENS records, and more.

## Features

- **ENS Name Resolution**: Quickly resolve ENS names to Ethereum addresses.
- **Record Management**: View and manage records associated with ENS names.
- **Real-time Updates**: Stay updated with real-time changes in ENS records.
- **User-friendly Interface**: A clean and intuitive interface built with modern UI components.

## Deployment

To deploy the SolidEns_RS frontend, follow these steps:

1. **Environment Setup**:
   Create an `.en.local` file using the `.env.local.example` file as a template.

2. **Install Dependencies**:
   Run the following command to install the necessary dependencies:

```bash
  yarn install
```


3. **Start the Development Server**:
   Launch the development server to view the application in your browser:

```bash
  yarn start
```

# Acknowledgements

- [ScaffoldETH v2](https://github.com/scaffold-eth/se-2)
- [enstate](https://github.com/v3xlabs/enstate)

