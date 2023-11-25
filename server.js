const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const User = require('./models/userSchema');
const ClassAdvisor = require('./models/classAdvisorSchema');
const DeputyWarden = require('./models/deputyWardenSchema');
const Requ = require('./models/formSchema');

const app = express();

const URI = "mongodb+srv://h:h@cluster1.q2sily3.mongodb.net/HK?retryWrites=true&w=majority";
mongoose
  .connect(URI)
  .then(() => {
    app.listen(3001, () => {
      console.log("Connected to MongoDB and listening on port 3001");
    });
  });

app.use(cors());
app.use(bodyParser.json());

// Register route without token verification
app.post('/register', async (req, res) => {
  try {
    const { email, username, password, phone, advisor, department, Year, hostel, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    switch (role) {
      case 'student':
        const newUser = new User({ email, username, password: hashedPassword, phone, advisor, department, Year, hostel,role });
        await newUser.save();
        break;
      case 'classAdvisor':
        const newClassAdvisor = new ClassAdvisor({ email, username, password: hashedPassword, phone, department,role });
        await newClassAdvisor.save();
        break;
      case 'deputyWarden':
        const newDeputyWarden = new DeputyWarden({ email, username, password: hashedPassword, phone, hostel,role });
        await newDeputyWarden.save();
        break;
      default:
        return res.status(400).json({ error: 'Invalid role' });
    }

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error, please try again' });
  }
});

app.get('/register', async (req, res) => {
  try {
    const { role } = req.query; // Extract the role from query parameters
    let users;

    switch (role) { 
      case 'student':
        users = await User.find();
        break;
      case 'classAdvisor':
        users = await ClassAdvisor.find();
        break;
      case 'deputyWarden':
        users = await DeputyWarden.find();
        break;
      default:
        return res.status(400).json({ error: 'Invalid role' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user details' });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let user;

    switch (role) {
      case 'student':
        user = await User.findOne({ email });
        break;
      case 'class Advisor':
        user = await ClassAdvisor.findOne({ email });
        break;
      case 'deputy Warden':
        user = await DeputyWarden.findOne({ email });
        break;
      default:
        return res.status(401).json({ error: 'Invalid role' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
 
    res.json({ message: 'Login successful', role }); // Include the role in the response
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Login failed' });
  }
});


// Protected route for class advisors without token verification
app.get('/classAdvisors', async (req, res) => {
  try {
    const classAdvisors = await ClassAdvisor.find({}, { password: 0 });
    res.status(200).json(classAdvisors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching class advisor details' });
  }
});

// Protected route for deputy wardens without token verification
app.get('/deputyWardens', async (req, res) => {
  try {
    const deputyWardens = await DeputyWarden.find({}, { password: 0 });
    res.status(200).json(deputyWardens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching deputy warden details' });
  }
});

app.get('/classAdvisors/:id', async (req, res) => {
  try {
    const classAdvisor = await ClassAdvisor.findById(req.params.id, { password: 0 });
    if (!classAdvisor) {
      return res.status(404).json({ error: 'Class Advisor not found' });
    }
    res.status(200).json(classAdvisor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching class advisor details' });
  }
});

app.get('/deputyWardens/:id', async (req, res) => {
  try {
    const deputyWarden = await DeputyWarden.findById(req.params.id, { password: 0 });
    if (!deputyWarden) {
      return res.status(404).json({ error: 'Deputy Warden not found' });
    }
    res.status(200).json(deputyWarden);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching deputy warden details' });
  }
});

app.post('/form', async (req, res) => {
  try {
    const { firstName, lastName, outpassFor, sDate, eDate, Department, rollNo, Year, Hostel, Room } = req.body;
    const newReq = new Requ({ firstName, lastName, outpassFor, sDate, eDate, Department, rollNo, Year, Hostel, Room });
    await newReq.save();
    res.status(201).json({ message: 'Register successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error, please try again' });
  }
});

app.get('/form', async (req, res) => {
  try {
    const users = await Requ.find();
    res.status(201).json(users);
  } catch {
    res.status(500).json({ error: 'Error, please try again' });
  }
});

app.put('/approve-outpass/:id', async (req, res) => {
  const { id } = req.params;
  const { approvalType } = req.body; // 'deputyWarden' or 'classAdvisor'

  try {
    const outpass = await Requ.findById(id);

    if (!outpass) {
      return res.status(404).json({ error: 'Outpass request not found' });
    }

    // Update the respective approval field based on the approval type
    if (approvalType === 'deputyWarden') {
      outpass.deputyWardenApproval = true;
    } else if (approvalType === 'classAdvisor') {
      outpass.classAdvisorApproval = true;
    }

    // Check if both approvals are now true, and update the status accordingly
    if (outpass.deputyWardenApproval && outpass.classAdvisorApproval) {
      outpass.status = 'approved';
    }

    await outpass.save();

    res.json(outpass);
  } catch (error) {
    console.error('Error updating approval status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
