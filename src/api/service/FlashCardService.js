import requestApi from "../request";

export const getFlashCardByEmail = async (email,page,size) => {
    try {
       if(page === undefined && size === undefined){
           const response = await requestApi("/exercise/flashcard/get-flashcards/"+email, "GET", null, true, "application/json");
           return response;
         }else{
            const response = await requestApi("/exercise/flashcard/get-flashcards/"+email+"?page="+page+"&size="+size, "GET", null, true, "application/json");
            return response;
         }
    } catch (error) {
        return Promise.reject(error);
    }
}

export const createFlashCard = async (name,description,email) => {
    try {
        const response = await requestApi("/exercise/flashcard/create", "POST", {name,description,createdBy:email}, true, "application/json");
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}


export const addVocabularyToFlashcard = async (word,meaning,example,img,audio,spellings,idFlashCard) => {
    try {
        const formData = new FormData();
        formData.append("word", word);
        formData.append("meaning", meaning);
        formData.append("example", example);
        if(img !== null){
            formData.append("img", img);
        }
        if(audio !== null){
            formData.append("audio", audio);
        }
        formData.append("spellings", spellings);
        formData.append("idFlashCard", idFlashCard);
        console.error(idFlashCard);
        console.log("audio",audio);
        console.error(audio);
        const response = await requestApi("/exercise/flashcard/add-vocabulary", "POST", formData, true, "multipart/form-data");
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const removeVocabularies = async (idVocabularies,idFlashCard) => {
    try {
        const response = await requestApi("/exercise/flashcard/remove-vocabulary", "POST", {idVocabularies,idFlashCard}, true, "application/json");
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const removeFlashCard = async (idFlashCard) => {
    try {
        const response = await requestApi("/exercise/flashcard/remove-flashcard/"+idFlashCard, "DELETE",null, true, "application/json");
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getFlashCardPublic = async (page,size) => {
    try {
        const response = await requestApi("/exercise/flashcard/user/get-flashcards-public?page="+page+"&size="+size, "GET", null, false, "application/json");
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getFlashCardById = async (idFlashCard) => {
    try {
        const response = await requestApi("/exercise/flashcard/user/find-flashcard/"+idFlashCard, "GET", null, false, "application/json");
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const findFlashCardLearnedByEmail = async (email) => {
    try {
        const response = await requestApi("/exercise/flashcard/user/find-flashcard-learned/"+email, "GET", null, true, "application/json");
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const findFlashCardUser = async (email,idFlashCard) => {
    try {
        const response = await requestApi("/exercise/flashcard/user/find-flashCardUser/"+email+"/"+idFlashCard, "GET", null, true, "application/json");
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const addFlashCardUser = async (email,idFlashCardSet) => {
    try {
        const response = await requestApi("/exercise/flashcard/user/add-flashCardUser", "POST", {email,idFlashCardSet}, true, "application/json");
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}