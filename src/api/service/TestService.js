import requestApi from "../request";

export const getAllTest = async (size, page) => {
  try {
    if (size === undefined && page === undefined) {
      const response = await requestApi(
        "/tests/all",
        "GET",
        null,
        false,
        "application/json"
      );
      return response;
    } else {
      const response = await requestApi(
        "/tests/all?size=" + size + "&page=" + page,
        "GET",
        null,
        false,
        "application/json"
      );
      return response;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addTest = async (name, description, time, typeTest, mp3) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("time", time);
    formData.append("typeTest", typeTest);
    formData.append("mp3", mp3);
    const response = await requestApi(
      "/tests/create",
      "POST",
      formData,
      false,
      "multipart/form-data"
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addPartToTest = async (testId, name,scorePerQuestion,typePart) => {
  try {
    console.log("test", testId);
    const response = await requestApi(
      "/tests/add-part",
      "POST",
      { testId, name ,scorePerQuestion,typePart},
      false,
      "application/json"
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addQuestion = async (
  partId,
  testId,
  description,
  options,
  image,
  answerId,
  isHideQuestion,
  isHideOption
) => {
  try {
    console.error("isHideOption", isHideOption);
    console.error("isHideQuesiton", isHideQuestion);
    const formData = new FormData();
    formData.append("partId", partId);
    formData.append("testId", testId);
    formData.append("description", description);
    image && formData.append("image", image);
    formData.append("answerId", answerId);
    formData.append("isHideQuestion", isHideQuestion);
    formData.append("isHideOption", isHideOption);
    options.map((option, index) => {
      formData.append(`options[${index}].content`, option.content);
      formData.append(`options[${index}].id`, option.id);
    });
    const response = await requestApi(
      "/tests/add-question",
      "POST",
      formData,
      false,
      "multipart/form-data"
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTestById = async (id) => {
  try {
    const response = await requestApi(
      "/tests/" + id,
      "GET",
      null,
      false,
      "application/json"
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};


export const addComboQuestion = async (partId, testId, image, questions) => {
  try {
    const formData = new FormData();
    formData.append("partId", partId);
    formData.append("testId", testId);
    formData.append("image", image);
    questions.map((question, index) => {
      //   formData.append("description", question.description);
      //   formData.append("image", question.image);
      //   formData.append("answerId", question.answerId);
      //   formData.append("isHideQuestion", question.isHideQuestion);
      //   formData.append("isHideOption", question.isHideOption);
      //   question.options.map((option, index) => {
      //     formData.append(`options[${index}].content`, option.content);
      //     formData.append(`options[${index}].id`, option.id);
      //   });
      formData.append(`questions[${index}].description`, question.description);
      formData.append(`questions[${index}].image`, question.image);
      formData.append(`questions[${index}].answerId`, question.correctOption);
      formData.append(
        `questions[${index}].isHideQuestion`,
        question.isHideQuestion
      );
      formData.append(
        `questions[${index}].isHideOption`,
        question.isHideOption
      );
      question.options.map((option, indexOption) => {
        formData.append(
          `questions[${index}].options[${indexOption}].content`,
          option.content
        );
        formData.append(
          `questions[${index}].options[${indexOption}].id`,
          option.id
        );
      });
    });
    const response = await requestApi(
      "/tests/add-combo",
      "POST",
      formData,
      false,
      "multipart/form-data"
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};


export const submitTest = async (email,idTest,time,answerQuestions) =>{
    try{
      console.error("answerQuestonDTOs",answerQuestions);
        const response = await requestApi("/tests/submit-test","POST",{email,idTest,time,answerQuestions},false,"application/json");
        return response;
    }catch(error){
        return Promise.reject(error);
    }
}

export const findResultById = async (id) => {
  try {
    const response = await requestApi(
      "/tests/result/" + id,
      "POST",
      null,
      true,
      "application/json"
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}


export const getHistoryTest = async (email) => {
  try {
    const response = await requestApi(
      "/tests/history-result/" + email,
      "GET",
      null,
      true,
      "application/json"
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getAnalysisTest = async (email) => {
  try {
    const response = await requestApi(
      "/tests/analytics/" + email,
      "GET",
      null,
      true,
      "application/json"
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}



