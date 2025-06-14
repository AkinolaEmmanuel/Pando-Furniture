import User from '../model/user.js';

// Register a User

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const user = new User({ username, email, password, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', status: 201, data: user });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
}

// Login a User

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', status: 200, data: user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error });
    }
}

// login an Admin

export const loginAdmin = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await User.findOne({ email, role: 'admin' });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        if (user.role !== 'admin') {
            return res.status(401).json({ message: 'You are not an admin' });
        }
        res.status(200).json({ message: 'Login successful', status: 200, data: user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error });
    }
}

// Get all users

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({message: 'Users retrieved successfully', data: users});
    } catch (error) {
        res.status(500).json({ message: 'Error getting users', error });
    }
}

// Get a user by ID
export const getUserById =  async (req, res) => {
    try {
        const { id } = req.params;
        const users = await User.findById({id});
        res.status(200).json({message: 'Users retrieved successfully', data: users});
    } catch (error) {
        res.status(500).json({ message: 'Error getting users', error });
    }
}

// Get a user by email
export const getUserByEmail =  async (req, res) => {
    try {
        const { email } = req.params;
        const users = await User.findOne({email});
        res.status(200).json({message: 'Users retrieved successfully', data: users});
    } catch (error) {
        res.status(500).json({ message: 'Error getting users', error });
    }
}