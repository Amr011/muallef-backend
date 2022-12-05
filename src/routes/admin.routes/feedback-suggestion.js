const express = require("express");
const router = express.Router();

const {
  feedback,
  suggestion,
} = require("../../controllers/admin.controllers/feedback-suggestion");

const { validateToken } = require("../../middleware/authenticate");

// GET All Suggestion
router.route("/api/suggestion").get(validateToken, suggestion.getSuggestion);

// POST Suggestion
router
  .route("/api/suggestion")
  .post(validateToken, suggestion.createSuggestion);

// GET All Feedback
router.route("/api/feedback").get(validateToken, feedback.getFeedback);

// POST Feedback
router.route("/api/feedback").post(validateToken, feedback.createFeedBack);

module.exports = router;
