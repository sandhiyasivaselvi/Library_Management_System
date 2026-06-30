import Member from "../Model/Member.js";


const createMembers = async (req, res) => {
  try {
    console.log("Category received:", req.body.category);
    const { name,email , phone, department, type } = req.body;

    const member = await Member.create({
      name,
      email,
      phone,
      department,
      type,
    });

    res.status(201).json({
      success: true,
      data: member,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export default createMembers

export const getAllmembers = async (req, res) => {
  try {
    const members = await Member.find();

    res.status(200).json({
      success: true,
      message: "Members fetched successfully",
      data: members,
    });
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const getmemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member fetched successfully by ID",
      data: member,
    });
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMember = await Member.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({
        success: false,
        message: "Member not found, cannot delete",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member deleted successfully",
      data: deletedMember,
    });
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMember = await Member.findByIdAndUpdate(id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!updatedMember) {
      return res.status(404).json({
        success: false,
        message: "Member not found, cannot update",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member updated successfully",
      data: updatedMember,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};