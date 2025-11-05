# SecureVault Pro - Go Backend

This is a simple Go backend service to handle chunked file uploads from the SecureVault Pro React frontend.

## Features

-   Receives file chunks via a REST API endpoint.
-   Stores chunks temporarily on the server.
-   Assembles the full file once all chunks are received.
-   Cleans up temporary chunk files after assembly.

## Running the Backend

1.  **Prerequisites:**
    -   Go (version 1.21 or later) installed on your system.

2.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

3.  **Run the server:**
    ```bash
    go run main.go
    ```

    The server will start on `http://localhost:8080`. All uploaded files will be saved in the `backend/uploads` directory.

## API Endpoint

-   `POST /api/upload/{fileId}`
    -   Handles the upload of a single file chunk.
    -   The request must be a `multipart/form-data` request with the following fields:
        -   `chunk`: The binary data of the file chunk.
        -   `index` (string): The zero-based index of the chunk.
        -   `total` (string): The total number of chunks for the file.
        -   `filename` (string): The original name of the file being uploaded.
