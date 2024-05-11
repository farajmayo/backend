const express = require("express");
const User = require("../models/user");

const router = express.Router();

// Create a new user
router.post("/", async (req, res) => {
    const { name, email, age } = req.body;

    // Check if all fields are provided
    if (!name || !email || !age) return res.status(400).json({ msg: "All fields are required!" });

    try {
        // Create a new user
        const user = await User.create({ name, email, age });

        // Return success message and the created user
        res.status(201).json({ msg: "User created successfully", user });
    } catch (error) {
        // Return error message if creation fails
        res.status(500).json({ msg: "Failed to create user", error: error.message });
    }
});

// Get all users
router.get("/", async (req, res) => {
    try {
        // Retrieve all users
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ msg: "Failed to get users", error: error.message });
    }
});

// Get a single user by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Find user by ID
        const user = await User.findById(id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ msg: "Failed to get user", error: error.message });
    }
});

// Update a user by ID
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    try {
        // Update user
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
        res.status(200).json({ updatedUser });
    } catch (error) {
        res.status(500).json({ msg: "Failed to update user", error: error.message });
    }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Delete user
        const deletedUser = await User.findByIdAndDelete(id);
        res.status(200).json({ deletedUser });
    } catch (error) {
        res.status(500).json({ msg: "Failed to delete user", error: error.message });
    }
});

module.exports = router;
