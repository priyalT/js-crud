const http = require("http");
const PORT = 3000;

let shelf = [
    { id : 1, name: "Song Of Achilles", rating: 5, author: "Madeline Miller", status: "read" },
    { id: 2, name: "My Dark Vanessa", rating: 5, author: "Kate Elizabeth Russell", status: "read" },
    { id: 3, name: "Frankenstein", rating: 0, author: "Mary Shelley", status: "unread" }
];

const server = http.createServer((req, res) => {

    //GET
    if (req.method === "GET" && req.url === "/books") {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(shelf))
    }

    //POST
    if (req.method === "POST" && req.url === "/addbook") {
        
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
    });

        req.on("end", () => {
            const newBook = JSON.parse(body)

            newBook.id = shelf.length + 1;

            shelf.push(newBook);

            res.writeHead(201, { "Content-Type" : "application/json" });
            res.end(JSON.stringify(newBook));
        });
        
        return;
    }
 
    //PUT
    if (req.method === "PUT" && req.url.startsWith("/update/")) {
        
        const id = parseInt(req.url.split("/")[2]);

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {

            const updatedBook = JSON.parse(body);
            const book = shelf.find(u => u.id === id);

            if (!book) {
                res.writeHead(404);
                return res.end("Entry not found!");
            }

            book.name = updatedBook.name || book.name
            book.rating = updatedBook.rating || book.rating
            book.author = updatedBook.author || book.author
            book.status = updatedBook.status || book.status

            res.writeHead(200, { "Content-Type" : "application/json"});
            res.end(JSON.stringify(book));
        });

        return;
    }

    //DELETE
    if (req.method === "DELETE" && req.url.startsWith("/delete/")) {

        const id = parseInt(req.url.split("/")[2]);

        shelf = shelf.filter(u => u.id !== id);

        res.writeHead(200);
        res.end("Book deleted");

        return;
    }

    //Route not found
    res.writeHead(404);
    res.end("Route not found");
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});