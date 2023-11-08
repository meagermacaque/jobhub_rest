const Job = require('../models/Job');

module.exports = {
    createJob: async(req, res) => {
        const newJob = new Job(req.body);

        try {
            await newJob.save();

            res.status(201).json({status: true, message: 'Job created successfully.'});

        } catch (error) {
            res.status(500).json(error);
        }    
    },

    updateJob: async(req, res) => {
        const jobID = req.params.id;
        const updated = req.body;

        try {
            const updatedJob = await Job.findByIdAndUpdate(jobID, updated, {new: true});

            if(!updatedJob) {
                return res.status(404).json({status: false, message: "No job found with the given ID."})
            }

            res.status(200).json({status: true, message:'Job updated successfully.'});
        } catch (error) {
            res.status(500).json(error);
        }    
    },

    deleteJob: async(req, res) => {
        const jobID = req.params.id;
        
        try {
            await Job.findByIdAndDelete(jobID);
            res.status(200).json({status: true, message:'Job deleted successfully.'});
        } catch (error) {
            res.status(500).json(error);
        }    
    },

    getJob: async(req, res) => {
        const jobID = req.params.id;
        
        try {
            const job = await Job.findById({_id: jobID}, {ceratedAt: 0, updateAt: 0, __V: 0});

            res.status(200).json(job);
        } catch (error) {
            res.status(500).json(error);
        }    
    },

    getAllJobs: async(req, res) => {
        const recent = req.query.new;

        try{
            let jobs;

            if(recent){
                jobs = await Job.find({},{ceratedAt: 0, updateAt: 0, __V: 0}).sort({ceratedAt: -1}).limit(2);
            } else{
                jobs = await Job.find({},{ceratedAt: 0, updateAt: 0, __V: 0});
            }

            res.status(200).json(jobs);
        }
        catch(error) {
            res.status(500).json(error);
        }
    },

    searchJobs: async(req, res) => {
        try{
            const results = await Job.aggregate([
                {
                  $search: {
                    index: "jobsearch",
                    text: {
                      query: req.params.key,
                      path: {
                        wildcard: "*"
                      }
                    }
                  }
                }
              ]);
              res.status(200).json(results);
        }
        catch(error) {
            res.status(500).json(error);
        }
    }
};