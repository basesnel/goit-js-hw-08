import throttle from 'lodash.throttle';
import { save, load } from './storage';

const feedback = document.querySelector('.feedback-form');
const FEEDBACK_FORM_DATA = 'feedback-form-state';
const feedbackData = {};

populateFeedback();

feedback.addEventListener('input', throttle(onTextInput, 500));

feedback.addEventListener('submit', onFeedbackSubmit);

function onTextInput(e) {
  feedbackData[e.target.name] = e.target.value;
  save(FEEDBACK_FORM_DATA, feedbackData);
}

function onFeedbackSubmit(e) {
  e.preventDefault();
  if (feedbackData.email && feedbackData.message) {
    console.log(feedbackData);
    e.target.reset();
    Object.keys(feedbackData).forEach(key => delete feedbackData[key]);
    localStorage.removeItem(FEEDBACK_FORM_DATA);

    return;
  }

  console.error('Validate: all fields must be filled!');
}

function populateFeedback() {
  const feedbackLocalstorage = load(FEEDBACK_FORM_DATA);

  if (feedbackLocalstorage) {
    if (feedbackLocalstorage.email) {
      feedback.email.value = feedbackData[feedback.email.name] =
        feedbackLocalstorage.email;
    }

    if (feedbackLocalstorage.message) {
      feedback.message.value = feedbackData[feedback.message.name] =
        feedbackLocalstorage.message;
    }
  }
}
