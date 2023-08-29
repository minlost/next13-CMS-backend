# My Next.js 13 CMS Backend

This repository contains the backend code for a Content Management System (CMS) built on Next.js 13. The system has a frontend for administrative tasks and a backend that provides APIs for connecting with an e-commerce frontend. The project aims to be a generic solution, allowing users to create an e-shop after login.

## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [License](#license)

## Technologies

- **Backend Framework**: Next.js 13
- **Database**: MySQL via PlanetScale
- **ORM**: Prisma
- **Validation**: Zod
- **Authentication**: Clerk
- **CSS**: Tailwind with Radix(Shacn) for utility
- **HTTP Client**: Axios
- **Form Handling**: Hook Forms
- **Text Editor**: WYSIWYG via Editor.js
- **File Upload**: Cloud-based storage
- **Payment**: Stripe

## Installation

Clone this repository and then run:

\`\`\`bash
npm install

# or

yarn install
\`\`\`

### Environment Variables

Copy `.env.example` to `.env` and fill in your database and other environment-specific details.

## Usage

Once the server is running, you can navigate to the admin panel to manage content. You can create new e-shops.

### API

Data for each category can be fetched from the API.

## Contribution

If you would like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## Screenshots

![Screenshot 1](https://iili.io/Hyhg9Eu.png)
![Screenshot 2](https://iili.io/HyhgqhP.png)
![Screenshot 3](https://iili.io/HyhgBQ1.png

## License

This project is licensed under the MIT License.
