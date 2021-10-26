import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      REACT_APP_API_KEY: 'AIzaSyANFzNtKc1Z6V882uqkEhOX2bgh4k5t2NE',
      REACT_APP_AUTH_DOMAIN: 'live-chat-react-8a7be.firebaseapp.com',
      REACT_APP_DATABASE_URL:
        'https://live-chat-react-8a7be-default-rtdb.firebaseio.com',
      REACT_APP_PROJECT_ID: 'live-chat-react-8a7be',
      REACT_APP_STORAGE_BUCKET: 'live-chat-react-8a7be.appspot.com',
      REACT_APP_MESSAGING_SENDER_ID: '576506567284',
      REACT_APP_APP_ID: '1:576506567284:web:3bf306a9577130ac3fcf21',
    },
  },
});
