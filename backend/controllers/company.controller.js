import { Company } from "../models/company.model.js";

// Register a Company
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    // Validation for companyName
    if (!companyName || companyName.trim() === "") {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }

    // Check if the company already exists
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "This company is already registered.",
        success: false,
      });
    }

    // Create the company
    company = await Company.create({
      name: companyName,
      userId: req.id, // Ensure `req.id` is populated by the middleware
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error registering company:", error);
    return res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      success: false,
    });
  }
};

// Get Companies for a User
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; // Ensure `req.id` is populated by the middleware
    const companies = await Company.find({ userId });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "No companies found.",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      success: false,
    });
  }
};

// Get a Company by ID
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    return res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      success: false,
    });
  }
};

// Update a Company
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    // Prepare the data to update
    const updateData = { name, description, website, location };

    // Find and update the company
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true, // Return the updated document
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    return res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      success: false,
    });
  }
};
