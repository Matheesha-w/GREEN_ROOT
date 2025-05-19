const solution = require('../model/solutionModel')

//Get all solutions
const allSolutions = async (req, res) => {
    try {
      const Solutions = await solution.find({});
      if (!Solutions) {
        res.status(400).json({ msg: "No solutions found!" });
        return;
      }
      res.status(200).json(Solutions);
    } catch (e) {
      res.status(400).json({ msg: "Server error", error: e.message });
    }
  };

// Get solutions by ticket ID
const solutionsByTicketId = async (req, res) => {
    const { ticketID } = req.params;
    try {
      const Solutions = await solution.find({ ticketID });
      if (Solutions.length <= 0) {
        res.status(400).json({ msg: "No solutions found for this ticket!" });
        return;
      }
      res.status(200).json(Solutions)
    } catch (e) {
      res.status(400).json({ msg: "Server error", error: e.message });
    }
  };

// // Get a solution by ID
// const solutionById = async (req, res) => {
//     const { id } = req.params;
//     try {
//       const solution = await Solution.findById(id);
//       if (!solution) {
//         res.status(400).json({ msg: "Solution not found!" });
//         return;
//       }
//       res.status(200).json({ msg: "Success", data: solution });
//     } catch (e) {
//       res.status(400).json({ msg: "Server error", error: e.message });
//     }
//   }  

//Create a solution
const createSolution = async (req, res) => {

    let newPath = null
    if (req.file) {
        const {originalname,path} = req.file;
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        newPath = path+'.'+ext
        fs.renameSync(path, newPath)
        
    }
    
    const {ticketID, description } = req.body

    try {
        // const user_id = req.user._id
        const Solution = await solution.create({ticketID, description, file: newPath})
        res.status(200).json(Solution)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

// // Update a solution
// const updateSolution = async (req, res) => {
//     const { id } = req.params;
//     try {
//       const solution = await Solution.findByIdAndUpdate(id, req.body, { new: true });
//       if (!solution) {
//         res.status(404).json({ msg: "Solution not updated!" });
//         return;
//       }
//       res.status(200).json({ msg: "Update Successful", data: solution });
//     } catch (e) {
//       res.status(500).json({ msg: "Server error", error: e.message });
//     }
//   };

// Delete a solution
const deleteSolution = async (req, res) => {
    const { id } = req.params;
    try {
      const Solution = await solution.findByIdAndDelete(id);
      if (!Solution) {
        res.status(404).json({ msg: "Solution not deleted!" });
        return;
      }
      res.status(200).json(solution);
    } catch (e) {
      res.status(500).json({ msg: "Server error", error: e.message });
    }
  };
  
  module.exports = {
    allSolutions,
    solutionsByTicketId,
    createSolution,
    deleteSolution
  }