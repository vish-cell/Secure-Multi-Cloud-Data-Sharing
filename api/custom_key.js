// Import necessary modules
const express = require('express');
const multer = require('multer');
const path = require('path');

// Initialize the express app
const app = express();

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Destination directory for uploaded files
        cb(null, 'C:\\Users\\visha\\Documents\\Secure-Multi-Cloud-Data-Sharing\\secrets\\keys\\custom');
    },
    filename: (req, file, cb) => {
        // Assign specific names to each field
        let filename = '';
        
        switch (file.fieldname) {
            case 'aws_privatekey':
                filename = 'aws_private.pem';
                break;
            case 'aws_publickey':
                filename = 'aws_public.pem';
                break;
            case 'azure_privatekey':
                filename = 'azure_private.pem';
                break;
            case 'azure_publickey':
                filename = 'azure_public.pem';
                break;
            default:
                // If the field name is unknown, use the original file name
                filename = file.originalname;
        }
        
        cb(null, filename);
    }
});

// Initialize multer with the custom storage configuration
const upload = multer({ storage: storage });

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle file uploads at the endpoint '/upload-custom-keys'
app.post('/upload-custom-keys', upload.fields([
    { name: 'aws_privatekey', maxCount: 1 },
    { name: 'aws_publickey', maxCount: 1 },
    { name: 'azure_privatekey', maxCount: 1 },
    { name: 'azure_publickey', maxCount: 1 }
]), (req, res) => {
    if (req.files) {
        // Log the uploaded files (for debugging purposes)
        console.log('Files uploaded:', req.files);

        // Respond with a success message
        res.json({ success: true, message: 'Custom keys uploaded successfully!' });
    } else {
        // Respond with an error if no files were uploaded
        res.json({ success: false, message: 'No files uploaded.' });
    }
});

// Start the server on a specified port
const port = 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
