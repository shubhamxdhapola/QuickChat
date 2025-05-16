# QuickChat

QuickChat is a real-time chat web application designed to enable seamless communication between users. It offers an interactive, user-friendly interface with features like real-time messaging, user status, file sharing, and profile updates.

## Features

* Responsive frontend built with **React.js**, styled using **Tailwind CSS** and **DaisyUI**.
* Efficient state management using **Zustand**.
* Robust backend powered by **Node.js**, **Express**, and **MongoDB**.
* Real-time bidirectional communication implemented with **Socket.io**.
* User features including **active/inactive status**, **file sharing**, and **profile updates**.
* Secure storage of user data and chat history.

## Technologies Used

* **React.js** – Frontend UI development
* **Tailwind CSS** & **DaisyUI** – Styling and UI components
* **Zustand** – State management
* **Node.js** & **Express** – Backend server and API
* **MongoDB** – Database for user data and chat history
* **Socket.io** – Real-time communication

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shubhamxdhapola/QuickChat.git
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd quickchat/client
   npm install

   cd ../server
   npm install
   ```

3. Create `.env` files in both `client` and `server` directories.

#### Server `.env`

```env
PORT=5000
MONGO_ATLAS_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ORIGIN=your_client_url
```

#### Client `.env`

```env
BASE_URL=your_client_url
```

4. Run the server:

   ```bash
   npm start
   ```

5. Run the client development server:

   ```bash
   npm start
   ```

## Usage

* Register or log in to start chatting in real-time.
* Update your profile and share files with other users.
* See the active or inactive status of your contacts.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

## License

This project is licensed under the MIT License.

---
