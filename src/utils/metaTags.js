// Utility function to update meta tags dynamically
export const updateMetaTags = (title, description, image, url) => {
  // Update or create title tag
  let titleTag = document.querySelector('title');
  if (!titleTag) {
    titleTag = document.createElement('title');
    document.head.appendChild(titleTag);
  }
  titleTag.textContent = title;

  // Update or create description meta tag
  let descriptionTag = document.querySelector('meta[name="description"]');
  if (!descriptionTag) {
    descriptionTag = document.createElement('meta');
    descriptionTag.name = 'description';
    document.head.appendChild(descriptionTag);
  }
  descriptionTag.content = description;

  // Update or create og:title
  let ogTitleTag = document.querySelector('meta[property="og:title"]');
  if (!ogTitleTag) {
    ogTitleTag = document.createElement('meta');
    ogTitleTag.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitleTag);
  }
  ogTitleTag.content = title;

  // Update or create og:description
  let ogDescriptionTag = document.querySelector('meta[property="og:description"]');
  if (!ogDescriptionTag) {
    ogDescriptionTag = document.createElement('meta');
    ogDescriptionTag.setAttribute('property', 'og:description');
    document.head.appendChild(ogDescriptionTag);
  }
  ogDescriptionTag.content = description;

  // Update or create og:image
  let ogImageTag = document.querySelector('meta[property="og:image"]');
  if (!ogImageTag) {
    ogImageTag = document.createElement('meta');
    ogImageTag.setAttribute('property', 'og:image');
    document.head.appendChild(ogImageTag);
  }
  ogImageTag.content = image;

  // Update or create og:url
  let ogUrlTag = document.querySelector('meta[property="og:url"]');
  if (!ogUrlTag) {
    ogUrlTag = document.createElement('meta');
    ogUrlTag.setAttribute('property', 'og:url');
    document.head.appendChild(ogUrlTag);
  }
  ogUrlTag.content = url;

  // Update or create twitter:title
  let twitterTitleTag = document.querySelector('meta[name="twitter:title"]');
  if (!twitterTitleTag) {
    twitterTitleTag = document.createElement('meta');
    twitterTitleTag.name = 'twitter:title';
    document.head.appendChild(twitterTitleTag);
  }
  twitterTitleTag.content = title;

  // Update or create twitter:description
  let twitterDescriptionTag = document.querySelector('meta[name="twitter:description"]');
  if (!twitterDescriptionTag) {
    twitterDescriptionTag = document.createElement('meta');
    twitterDescriptionTag.name = 'twitter:description';
    document.head.appendChild(twitterDescriptionTag);
  }
  twitterDescriptionTag.content = description;

  // Update or create twitter:image
  let twitterImageTag = document.querySelector('meta[name="twitter:image"]');
  if (!twitterImageTag) {
    twitterImageTag = document.createElement('meta');
    twitterImageTag.name = 'twitter:image';
    document.head.appendChild(twitterImageTag);
  }
  twitterImageTag.content = image;
};