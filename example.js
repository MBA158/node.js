const fs = require('fs');


// Function to create a file with specified content
const createFile = (filename, content) => {
    fs.writeFile(filename, content, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('File created successfully');
    });
};

// Function to read and print the content of a file
const readFile = (fileName) => {
    fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(data);
    });
};

// Create the file and then read it
createFile('example.txt', 'this is an example', () => {
    // Read the file after it's created
    readFile('example.txt');
});
