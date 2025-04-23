import scheduleModel from "../models/schedule.model.js";

export const createSchedule = async (req, res) => {
    try {
        const { date,subject,subjectDescription,company}= req.body;
        const createdBy = req.id; 
        const schedule = await scheduleModel.create({
            date,
            subject,
            subjectDescription,
            createdBy,
            company
        })
        if(!schedule) {
            return res.status(400).json({ message: "Schedule not created" });
        }
        res.status(201).json({ message: "Schedule created", schedule });
    } catch (error) {
        res.status(500).json({ message: "Error creating schedule", error });
    }
}

export const getTodaySchedule = async (req, res) => {
    try {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));
        const schedule = await scheduleModel.find({
            date: { $gte: startOfDay, $lte: endOfDay },
        })        
        .populate("createdBy", "name rollNumber")
        if (!schedule) {
            return res.status(404).json({ message: "No schedule found" });
        }
        res.status(200).json({ message: "Schedule found", schedule });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting schedule", error });
    }
}

export const getAllmySchedule = async (req, res) => {
    try {
        const schedule = await scheduleModel.find({ createdBy: req.id }).populate("createdBy", "name rollNumber");
        if (!schedule) {
            return res.status(404).json({ message: "No schedule found" });
        }
        res.status(200).json({ message: "Schedule found", schedule });
    } catch (error) {
        res.status(500).json({ message: "Error getting schedule", error });
    }
}

export const deleteAllCompletedSchedule = async (req,res) => {
    try {
        const schedule = await scheduleModel.deleteMany({status: "inactive"});
        res.status(200).json({ message: "All completed schedule deleted", schedule });
    } catch (error) {
        res.status(500).json({ message: "Error getting schedule", error });

    }
}

export const getAllCompletedSchedule = async (req, res) => {
    try {
        const schedule = await scheduleModel.find({ status: "inactive" }).populate("createdBy", "name rollNumber").sort({ completedAt: -1 });
        if (!schedule) {
            return res.status(404).json({ message: "No schedule found" });
        }
        res.status(200).json({ message: "Schedule found", schedule });
    } catch (error) {
        res.status(500).json({ message: "Error getting schedule", error });
    }
}

export const getAllScheduleSortByDate = async (req, res) => {
    try {
        const schedule = await scheduleModel.find().sort({ date: 1 }).populate("createdBy", "name rollNumber");
        if (!schedule) {
            return res.status(404).json({ message: "No schedule found" });
        }
        res.status(200).json({ message: "Schedule found", schedule });
    } catch (error) {
        res.status(500).json({ message: "Error getting schedule", error });
    }
}
export const completeSchedule = async (req, res) => {
    try {
        const { id } = req.body;
        const schedule = await scheduleModel.findByIdAndUpdate(id, { status: "inactive",completedAt: Date.now() }, { new: true });
        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }
        res.status(200).json({ message: "Schedule completed", schedule });
    } catch (error) {
        res.status(500).json({ message: "Error completing schedule", error });
    }
}