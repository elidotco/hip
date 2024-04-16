// User Interface Module
const UserInterface = {
  getUserInput: () => {
    // Code to get user input (e.g., from a web form or command line)
    return userInput;
  },
};

// Controller Module
const Controller = {
  processInput: (input) => {
    // Code to process user input
    const processedData = processData(input);
    return processedData;
  },
};

// Backend Processing Module
const BackendProcessing = {
  processData: (data) => {
    // Code to handle business logic
    const result = performBusinessLogic(data);
    return result;
  },
};

// Database Module
const Database = {
  saveData: (data) => {
    // Code to save data to the database
    saveToDatabase(data);
  },
  fetchData: () => {
    // Code to fetch data from the database
    return fetchDataFromDatabase();
  },
};

// Main Program
const userInput = UserInterface.getUserInput();
const processedData = Controller.processInput(userInput);
const result = BackendProcessing.processData(processedData);
Database.saveData(result);

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Dummy data for dormitory listings
const dormitories = [
  {
    id: 1,
    name: "Dormitory A",
    location: "Location A",
    amenities: ["Amenity 1", "Amenity 2"],
    contact: "Contact A",
  },
  {
    id: 2,
    name: "Dormitory B",
    location: "Location B",
    amenities: ["Amenity 3", "Amenity 4"],
    contact: "Contact B",
  },
];

app.use(bodyParser.json());

// User authentication (dummy implementation)
app.post("/login", (req, res) => {
  // Dummy authentication logic (check username/password)
  const { username, password } = req.body;
  if (username === "user" && password === "password") {
    res.status(200).send("Login successful");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// Main dashboard with dormitory listings
app.get("/dashboard", (req, res) => {
  res.json(dormitories);
});

// View dormitory details
app.get("/dormitories/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const dormitory = dormitories.find((d) => d.id === id);
  if (dormitory) {
    res.json(dormitory);
  } else {
    res.status(404).send("Dormitory not found");
  }
});

// Interactive map (dummy implementation)
app.get("/map", (req, res) => {
  // Return dummy map data
  res.send("Interactive map with dormitory locations");
});

// Book dormitory (dummy implementation)
app.post("/book/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const dormitory = dormitories.find((d) => d.id === id);
  if (dormitory) {
    // Dummy booking logic
    res.send(`Booking for ${dormitory.name} confirmed`);
  } else {
    res.status(404).send("Dormitory not found");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
