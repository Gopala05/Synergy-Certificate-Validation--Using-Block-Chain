const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
  userName: {
    type: String,
    lowercase: true,
    unique: true,
    sparse: true,
    required: [true, "Please provide UserName!"],
  },
  name: {
    type: String,
  },
  aadhar: {
    type: String,
    required: [true, "Please provide Aadhar Number!"],
  },
  profile: {
    type: String,
  },
  userEmails: [{ type: String, lowercase: true }],
  role: {
    type: String,
  },
  gitHub: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  slack: {
    type: String,
  },
  leetCode: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
  alternativeMobile: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  careerTitles: {
    type: [String],
    validate: {
      validator: (array) => array.length <= 4,
      message: "Career Titles array length cannot exceed 4",
    },
  },
  careers: {
    type: [String],
    validate: {
      validator: (array) => array.length <= 4,
      message: "Career array length cannot exceed 4",
    },
  },
  resume: {
    type: String,
  },
  qualificationYears: {
    type: [String],
    validate: {
      validator: (array) => array.length <= 4,
      message: "Qualification Years array length cannot exceed 4",
    },
  },
  qualificationTitles: {
    type: [String],
    validate: {
      validator: (array) => array.length <= 4,
      message: "Qualification Titles array length cannot exceed 4",
    },
  },
  qualificationsFrom: {
    type: [String],
    validate: {
      validator: (array) => array.length <= 4,
      message: "Qualifications From array length cannot exceed 4",
    },
  },
  hobbies: {
    type: [String],
    validate: {
      validator: (array) => array.length <= 7,
      message: "Hobbies array length cannot exceed 7",
    },
  },
  softSkills: {
    type: [String],
    validate: {
      validator: (array) => array.length <= 7,
      message: "Soft Skills array length cannot exceed 7",
    },
  },
  experiencePeriods: {
    type: [String],
    validate: {
      validator: (array) => array.length <= 4,
      message: "Experience Period array length cannot exceed 4",
    },
  },
  experienceTitles: {
    type: [String],
    validate: {
      validator: (array) => array.length <= 4,
      message: "Experience Titles array length cannot exceed 4",
    },
  },
  experiencesFrom: {
    type: [String],
    validate: {
      validator: (array) => array.length <= 4,
      message: "Experience From array length cannot exceed 4",
    },
  },
  workSkills: {
    type: [String],
    validate: {
      validator: (array) => array.length <= 10,
      message: "Work Skills array length cannot exceed 10",
    },
  },
  projects: {
    type: [String],
    validate: {
      validator: (array) => array.length <= 5,
      message: "Projects array length cannot exceed 5",
    },
  },
  projectsURL: {
    type: [String],
    validate: {
      validator: (array) => array.length <= 5,
      message: "Projects URL array length cannot exceed 5",
    },
  },
  sslcCertificate: {
    type: String,
  },
  puCertificate: {
    type: String,
  },
  ugCertificate: {
    type: String,
  },
});

const userDetailsModal = mongoose.model("UserDetail", userDetailsSchema);

module.exports = userDetailsModal;
