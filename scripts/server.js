// Route to return a JSON file (assuming 'data.json' exists in the same directory)
const path = require('path');
const fs = require('fs');

const express = require("express");
const app = express();


app.get("/data", (req, res) => {
    const filePath = path.join(__dirname, 'component.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Failed to load data' });
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData); // Sends the parsed JSON data from the file
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({ error: 'Invalid JSON format in file' });
        }
    });
});

app.get("/ui", (req, res) => {
  res.json({
    type: "View",
    props: {
      style: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0"
      }
    },
    children: [
      {
        type: "Text",
        props: {
          style: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
          children: "Hello from Server!"
        }
      },
      {
        type: "Button",
        props: {
          title: "Click Me",
          onPress: "handleClick"
        }
      },
      {
        type: "Card",
        props: {
          title: "Server Driven UI",
          content: "This card is defined by the server, rendered in Expo!",
        },
      },
    ]
  });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));