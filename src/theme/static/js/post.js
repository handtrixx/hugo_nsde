
document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.post-container');

  //get all headline contents and ids of them in the container
  const headlines = Array.from(container.querySelectorAll('h2, h3')).map(headline => ({
    content: headline.textContent,
    id: headline.id,
    selector: headline.tagName.toLowerCase(),
    element: headline // Store reference to the actual element
  }));

  //add items as li childs to item with id: "content-index-list"
  const contentIndexList = document.getElementById('content-index-list');
  headlines.forEach(headline => {
    const listItem = document.createElement('li');
    listItem.className = 'content-index-item';
    //add second class for selector
    listItem.classList.add(`level-${headline.selector}`);
    // Add data attribute to link with headline
    listItem.setAttribute('data-target', headline.id);
    listItem.textContent = headline.content;
    listItem.addEventListener('click', () => {
      document.getElementById(headline.id).scrollIntoView({ behavior: 'smooth' });
    });
    contentIndexList.appendChild(listItem);
  });

  //add a scrollspy to mark the currently scrolled headline from container at content-index-item as active
  window.addEventListener('scroll', () => {
    //get closest headline to current scroll position
    const scrollPosition = window.scrollY + 100; // Add offset for better UX
    let currentHeadline = null;

    // Find the headline that's currently in view
    for (let i = headlines.length - 1; i >= 0; i--) {
      const headline = headlines[i];
      const headlineElement = headline.element;
      const headlineTop = headlineElement.offsetTop;

      if (scrollPosition >= headlineTop) {
        currentHeadline = headline;
        break;
      }
    }

    // Remove active class from all items
    const allItems = contentIndexList.querySelectorAll('.content-index-item');
    allItems.forEach(item => item.classList.remove('active'));

    // Add active class to current item
    if (currentHeadline) {
      const activeItem = contentIndexList.querySelector(`[data-target="${currentHeadline.id}"]`);
      if (activeItem) {
        activeItem.classList.add('active');
      }
    }
  });
});



document.addEventListener('DOMContentLoaded', function () {
  const codeBlocks = document.querySelectorAll('.highlight pre code');

  codeBlocks.forEach(codeBlock => {
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.innerText = 'Copy';

    const pre = codeBlock.parentElement;
    pre.insertBefore(button, pre.firstChild);

    button.addEventListener('click', function () {
      // Get all line spans (each line is wrapped in a span with display:flex)
      const lineSpans = codeBlock.querySelectorAll('span[style*="display:flex"]');

      let codeText = '';
      lineSpans.forEach(lineSpan => {
        // Within each line span, get the second span (the actual code content)
        // The first span contains the line number with user-select:none
        const contentSpans = lineSpan.querySelectorAll('span');
        if (contentSpans.length >= 2) {
          // Skip the first span (line number) and get text from the second span
          codeText += contentSpans[1].textContent + '\n';
        }
      });

      // Remove the last newline character
      codeText = codeText.slice(0, -1);

      navigator.clipboard.writeText(codeText).then(() => {
        this.innerText = 'kopiert!';
        setTimeout(() => {
          this.innerText = 'Kopieren';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  });
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


function togglePostNav() {
  const postNav = document.getElementById('block-post-nav');
  if (postNav) {
    postNav.classList.toggle('d-none');
  }
}


// Scope link modifications to only post-content div
const postContent = document.getElementById('post-content');
if (postContent) {
  // Get all links within post-content that don't already have a target attribute
  postContent.querySelectorAll('a:not([target])').forEach(link => {
    link.setAttribute('target', '_blank');
  });

  // Get all images within post-content and make them clickable links
  postContent.querySelectorAll('img').forEach(img => {
    const link = document.createElement('a');
    link.href = img.src;
    link.target = '_blank';
    img.parentNode.insertBefore(link, img);
    link.appendChild(img);
    img.style.cursor = 'pointer';
  });
}