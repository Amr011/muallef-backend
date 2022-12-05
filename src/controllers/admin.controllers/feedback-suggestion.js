const db = require("../../models/index.model");

const suggestionModel = db.suggestion;
const feedbackModel = db.feedback;

class suggestion {
  // Get All Suggestions
  static getSuggestion = (req, res) => {
    let suggestion = [];

    suggestionModel
      .findAll({})
      .then((foundedSuggestion) => {
        suggestion = foundedSuggestion;
        if (suggestion) {
          return res.status(200).json({
            success: true,
            suggestion: suggestion,
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "! لا يوجد اقتراحات بعد",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          message: "Unexpected Error",
          status: 400,
          error: err,
        });
      });
  };

  // Create Suggestion By User
  static createSuggestion = (req, res) => {
    let suggestion = [];

    const userId = req.user.id;

    suggestionModel
      .create({
        title: req.body.title,
        description: req.body.description,
        userId: userId,
      })
      .then((createdSuggestion) => {
        suggestion = createdSuggestion;
        if (suggestion) {
          return res.status(200).json({
            success: true,
            message: "! تم اضافة اقتراح جديد",
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "! لا يمكنك اضافة اقتراح",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          message: "Unexpected Error",
          status: 400,
          error: err,
        });
      });
  };
}

class feedback {
  // Show All Feedback
  static getFeedback = (req, res) => {
    let feedback = [];

    feedbackModel
      .findAll({})
      .then((foundedFeedback) => {
        feedback = foundedFeedback;
        if (feedback) {
          return res.status(200).json({
            success: true,
            feedback: feedback,
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "! لا يوجد شكاوى بعد",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          message: "Unexpected Error",
          status: 400,
          error: err,
        });
      });
  };

  // Create Feedback By User
  static createFeedBack = (req, res) => {
    let feedback = [];

    const userId = req.user.id;

    feedbackModel
      .create({
        title: req.body.title,
        description: req.body.description,
        userId: userId,
      })
      .then((createdFeedback) => {
        feedback = createdFeedback;
        if (feedback) {
          return res.status(200).json({
            success: true,
            message: "! تم اضافة شكوى جديدة",
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "! لا يمكنك اضافة شكوى",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          message: "Unexpected Error",
          status: 400,
          error: err,
        });
      });
  };
}

module.exports = { suggestion, feedback };
