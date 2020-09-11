export const getContentType = (categories, categoryId, contentId) => {
  const { contentTypes } = categories.filter((cat) => cat.name === categoryId)[0];
  const contentType = contentTypes.filter((content) => content.name === contentId)[0];

  return contentType;
};

export const setArticleContent = (articleContent, contentType, categories) => {
  const { _id } = categories.filter((cat) => cat.name === articleContent.categoryId)[0];
  let article = {
    categoryId: _id,
    contentTypeId: articleContent.contentTypeId,
    title: articleContent.title,
  };

  if (contentType.location && (contentType.location.required || articleContent.location !== '')) {
    article.placeId = articleContent.location;
  }

  if (contentType.URL && (contentType.URL.required || articleContent.URL !== '')) {
    article.URL = articleContent.URL;
  }

  if (contentType.image && (contentType.image.required || articleContent.photo.url !== '')) {
    article.image = 'image:' + articleContent.photo.imageId;
  }

  if (contentType.date && (contentType.date.required || articleContent.date !== null || articleContent.date !== '')) {
    const date = new Date(articleContent.date);
    const formattedMonth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const dayFormatted = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const formattedDate = `${date.getFullYear()}/${formattedMonth}/${dayFormatted}`;
    article.date = formattedDate;
  }

  if (
    contentType.other &&
    (contentType.other.required || articleContent.other !== null || articleContent.other !== '')
  ) {
    article.other = articleContent.other;
  }

  if (
    contentType.other &&
    contentType.other.type &&
    contentType.other.type === 'boolean' &&
    (contentType.other.required || articleContent.discontinued_law)
  ) {
    article.other = articleContent.discontinued_law;
  }

  if (
    articleContent.pdf &&
    (articleContent.pdf !== null || articleContent.pdf !== '' || articleContent.pdf !== undefined)
  ) {
    article.pdf = articleContent.pdf;
  }

  if (articleContent.keywords && articleContent.keywords.length > 0) {
    article.keywords = [...articleContent.keywords];
  }

  if (articleContent.contents && articleContent.contents.length > 0) {
    article.content = setContentFormat(articleContent.contents);
  }

  article.communityEditsAllowed = articleContent.contributions;

  return article;
};

const setContentFormat = (contents) => {
  const contentFormated = [];
  contents.forEach((content) => {
    if (content.type === 'image') {
      const images = content.content[0].children;
      const upToOneImage = images.length > 1;
      if (upToOneImage) {
        const imageIds = images.map((image) => `image:${image.imageId}`);
        contentFormated.push({ type: 'gallery', content: imageIds });
      } else {
        const id = images[0].imageId;
        contentFormated.push({ type: 'image', content: `image:${id}` });
      }
    }
    if (content.type === 'embed') {
      const embedData = content.content[0].children[0].source;
      const embedType = content.content[0].embedType;
      contentFormated.push({
        type: 'video',
        content: embedType + ':' + embedData,
      });
    }

    if (content.type === 'paragraph') {
      const paragraphs = content.content;
      paragraphs.forEach((parag) => {
        const texts = parag.children;
        const textFormatted = texts.map((t) => {
          if (t.type && t.type === 'link') {
            let newText = {};
            newText.link = true;
            newText.url = t.url;
            newText.text = t.children[0].text;
            if (t.children[0].bold) {
              newText.bold = t.children[0].bold;
            }
            if (t.children[0].italic) {
              newText.italic = t.children[0].italic;
            }
            if (t.children[0].underline) {
              newText.underline = t.children[0].underline;
            }
            return newText;
          } else {
            let newText = {};
            if (t.text) {
              newText.text = t.text;
            }
            if (t.bold) {
              newText.bold = t.bold;
            }
            if (t.italic) {
              newText.italic = t.italic;
            }
            if (t.underline) {
              newText.underline = t.underline;
            }
            return newText;
          }
        });
        contentFormated.push({ type: 'paragraph', content: textFormatted });
      });
    }
  });
  return contentFormated;
};
