import User from "@/models/user";
import dbConnect from "@/helpers/dbConnect";
import jwt from "jsonwebtoken";
import History from "@/models/history";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("INSIDE REQUEST");
      return res.status(401).json({ message: "No Token Provied" });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      const user = await User.findById(decoded.id).populate("userHistory");
      console.log("INSIDE REQUEST2");
      console.log(user);

      return res.status(200).json({ user: user.userHistory, success: true });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed", success: false, error: error });
    }
  }
  if (req.method === "POST") {
    const query = req.body.query;
    console.log("Query: ", query);
  
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token: ", token);
  
    if (!token) {
      return res.status(401).json({ message: "No Token Provided" });
    }
  
    try {
      
      const decoded = jwt.verify(token, process.env.SECRET);
      const userId = decoded.id;
  
      
      const newHistory = new History({ history: query });
      await newHistory.save();
  
      
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { userHistory: newHistory._id } },
        { new: true, populate: "userHistory" }
      );
  
      console.log("Updated User History: ", updatedUser.userHistory);
  
      return res.status(200).json({
        user: updatedUser.userHistory,
        success: true,
      });
    } catch (error) {
      console.error("Error: ", error);
  
      return res.status(500).json({
        message: "Failed",
        success: false,
        error: error.message,
      });
    }
  }
  

  if (req.method === "DELETE") {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token:", token);
  
    if (!token) {
      return res.status(401).json({ message: "No Token Provided" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      const userId = decoded.id;
      const { query } = req.body;
  
      if (!query) {
        return res
          .status(400)
          .json({ message: "No query provided in the request" });
      }
  
      const historyToDelete = await History.findById(query._id);
  
      if (!historyToDelete) {
        return res.status(404).json({ message: "History not found" });
      }
  
      
      await User.updateOne(
        { _id: userId },
        { $pull: { userHistory: historyToDelete._id } }
      );
  
      
      await History.deleteOne({ _id: historyToDelete._id });
  
      const updatedUser = await User.findById(userId).populate("userHistory");
  
      console.log("Updated user history after deletion: ", updatedUser.userHistory);
  
      return res.status(200).json({
        user: updatedUser.userHistory,
        message: "Deleted successfully",
        success: true,
      });
    } catch (error) {
      console.error("Error during DELETE:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
        error,
      });
    }
  }
  
}
