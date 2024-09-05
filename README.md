Great! You can use relative paths to reference images from your `assets/images` folder in your `README.md` file. If the images are within your project directory, you can include them like this:

1. **Move Images to a Static Folder**: Ensure your images are accessible publicly. For local documentation, place them in a directory that GitHub Pages or your documentation platform can access, like a `docs` or `public` folder.

2. **Update `README.md` with Relative Paths**:

Here’s an updated version of the `README.md` with references to images in your `assets/images` folder:

```markdown
# Disaster Reporting Tool

## Overview

The Disaster Reporting Tool is an application designed to keep users informed about natural disasters and emergencies. It provides real-time updates, maps, and alerts to ensure users stay safe and aware of their surroundings.

## Features

- **Real-Time Disaster Alerts**: Get updates about ongoing natural disasters and emergencies.
- **Interactive Map**: View disaster locations and details on an interactive map.
- **Navigation**: Easily navigate to different screens and features within the app.
- **User Authentication**: Sign in and manage your account securely.
- **User-Friendly Interface**: Designed with a clean and intuitive interface for ease of use.

## Installation

To get started with the Disaster Reporting Tool, follow these steps:

### Prerequisites

- Node.js (version 14.x or later)
- npm (version 6.x or later) or Yarn

### Clone the Repository

```bash
git clone https://github.com/your-username/disaster-reporting-tool.git
cd disaster-reporting-tool
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Configure Firebase

1. Create a Firebase project in the Firebase Console.
2. Add your Firebase configuration to a `.env` file:

   ```env
   FIREBASE_API_KEY=your-api-key
   FIREBASE_AUTH_DOMAIN=your-auth-domain
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_STORAGE_BUCKET=your-storage-bucket
   FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   FIREBASE_APP_ID=your-app-id
   ```

### Run the Application

```bash
npm start
# or
yarn start
```

This will start the development server and open the app in your default web browser.

## Usage

- **Welcome Screen**: Launch the app to view the welcome screen with navigation options.
- **Sign In**: Access the sign-in page to log into your account.
- **Map Screen**: View disaster locations and details on an interactive map.
- **Get Started**: Click the "Get Started" button to begin using the app's features.

## Screenshots

Here are some screenshots of the Disaster Reporting Tool:

### Welcome Screen

![Welcome Screen](/assets/Images/img3.jpg)

### Sign In Page

![Sign In Page](/assets/Images/img5.jpg)

### Reporting Tool Page

![Reporting Tool](/assets/Images/img4.jpg)

### Map Screen

![Map Screen](assets/Images/img1.jpg)

## Contributing

We welcome contributions to the Disaster Reporting Tool! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, please contact:

- **Email**: your-email@example.com
- **GitHub Issues**: [Disaster Reporting Tool Issues](https://github.com/your-username/disaster-reporting-tool/issues)
```
