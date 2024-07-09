const Student = require('../models/Student.cjs');
const Course = require('../models/Course.cjs');

exports.allocateSeats = async (req, res) => {
  try {
    // Fetch all students and courses, sorted by student rank
    const students = await Student.find({ allocation: null }).sort('rank');
    const courses = await Course.find();



    // Check if there are students and courses available
    if (students.length === 0 || courses.length === 0) {
      return res.status(400).json({ message: "No students or courses available for allocation" });
    }

    // Initialize course capacities using 'seats' and 'branch' as keys
    let courseCapacities = courses.reduce((acc, course) => {
      acc[course.branch] = course.seats;
      return acc;
    }, {});

    let allocationResult = [];

    for (const student of students) {
      let allocated = false;

      // Check each of the student's preferences
      for (let i = 1; i <= 3; i++) {
        let preference = student[`preference${i}`];
        if (courseCapacities[preference] && courseCapacities[preference] > 0) {
          courseCapacities[preference]--;
          allocated = true;
          // Update the student's allocation in the database
          await Student.findByIdAndUpdate(student._id, { allocation: preference });
          allocationResult.push({ student: student.name, course: preference });
          break;
        }
      }

      // Handle case where no allocation is possible
      if (!allocated) {
        allocationResult.push({ student: student.name, course: "Not Allocated" });
        await Student.findByIdAndUpdate(student._id, { allocation: "Not Allocated" });
      }
    }

    // Update courses in the database with the new capacities
    for (const [branchName, seats] of Object.entries(courseCapacities)) {
      await Course.findOneAndUpdate({ branch: branchName }, { seats });
    }

    res.status(200).json({ message: "Allocation successful", allocationResult });
  } catch (error) {
    console.error("Allocation error:", error);
    res.status(500).json({ message: "Allocation failed", error: error.message });
  }
};
