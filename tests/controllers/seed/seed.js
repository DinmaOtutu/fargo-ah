const validUser = {
  user: {
    email: 'olumide@yahoo.com',
    username: 'lumexat',
    password: 'spirit2018',
  }
};

const validArticleData = {
  article: {
    title: 'How to train your dragon',
    description: 'Ever wonder how?',
    body: 'You have to believe',
    tagList: ['reactjs', 'angularjs', 'dragons'],
    categorylist: ['people', 'sports', 'culture']
  }
};

const validArticleData2 = {
  article: {
    title: 'How to train your dragon',
    description: 'Ever wonder how?',
    body: 'You have to believe',
    tagList: ['fiction'],
    categorylist: ['people', 'sports', 'culture']
  }
};

const editedArticle = {
  article: {
    title: 'How to train your dragon right',
    description: 'Ever wonder how?',
    body: 'You have to believe it to achieve it',
    tagList: ['reactjs', 'angularjs', 'dragons'],
    categorylist: ['people', 'sports', 'culture']
  }
};

const dataWithNoTitle = {
  article: {
    description: 'Ever wonder how?',
    body: 'You have to believe',
    tagList: ['reactjs', 'angularjs', 'dragons'],
    categorylist: ['people', 'sports', 'culture']
  }
};

const dataWithNoDescription = {
  article: {
    title: 'How to train your dragon',
    body: 'You have to believe',
    tagList: ['reactjs', 'angularjs', 'dragons'],
    categorylist: ['people', 'sports', 'culture']
  }
};

const dataWithNoBody = {
  article: {
    title: 'How to train your dragon',
    description: 'Ever wonder how?',
    tagList: ['reactjs', 'angularjs', 'dragons'],
    categorylist: ['people', 'sports', 'culture']
  }
};

export default {
  validUser,
  validArticleData,
  validArticleData2,
  dataWithNoTitle,
  dataWithNoDescription,
  dataWithNoBody,
  editedArticle,
};
