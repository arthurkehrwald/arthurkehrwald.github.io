let delay = 0;
$('.typeAnim').each(function(index) {
  let typeAnimContent = $(this).attr('typeAnimContent');
  if (typeAnimContent == undefined) {
    return false;
  }
  typeAnimContent = typeAnimContent.split('| ');

  let typeAnimDelay = $(this).attr('typeAnimDelay');
  if (typeAnimDelay == undefined) {
    typeAnimDelay = 500;
  }

  let typeAnimSpeed = $(this).attr('typeAnimSpeed');
  if (typeAnimSpeed == undefined) {
    typeAnimSpeed = 100;
  }

  typeAnimArray($(this), typeAnimContent, typeAnimSpeed, false);
});

let spaceSymbolWidth = 0;
window.requestAnimationFrame(heroBarIntroAnim);

function heroBarIntroAnim() {
  if (spaceSymbolWidth < 100) {
    spaceSymbolWidth += 1666.66 / delay;
    $('.space-symbol').width(spaceSymbolWidth + '%');
    window.requestAnimationFrame(heroBarIntroAnim);
  }
}

function typeAnimArray(element, content, typeSpeed, deleteIndividually) {
  delay += 500;
  for (let paragraphIndex = 0; paragraphIndex < content.length; paragraphIndex++) {
    paragraph = content[paragraphIndex];
    let isLastParagraph = paragraphIndex == (content.length - 1);
    for (let charIndex = 0; charIndex < paragraph.length; charIndex++) {
      let newText = paragraph.slice(0, charIndex + 1);
      let isLastChar = charIndex == paragraph.length - 1;
      if (!isLastChar || !isLastParagraph) {
        newText += '&mid;';
      }
      scheduleTextChange(element, newText, delay);
      delay += typeSpeed;
    }
    // finished typing paragraph
    if (!isLastParagraph) {
      // it wasnt the last
      let toggleCaretInterval;
      setTimeout(function () {
        toggleCaretInterval = setInterval(function () {toggleCaret(element)}, 500);
      }, delay);
      delay += 2000;
      setTimeout(function () {
        clearInterval(toggleCaretInterval);
      }, delay);
      if (deleteIndividually) {
        for (let charIndex = paragraph.length - 1; charIndex >= 0; charIndex--) {
          let newText = paragraph.slice(0, charIndex + 1) + '&mid;';
          scheduleTextChange(element, newText, delay);
          delay += typeSpeed;
        }
      } else {
        setTimeout(function() {
          element.addClass('marked');
        }, delay);
        delay += 500;
        setTimeout(function() {
          element.removeClass('marked');
        }, delay);
      }
      scheduleTextChange(element, '&mid;', delay);
      delay += 500;
    }
  }
}

function scheduleTextChange(element, text, delay) {
  setTimeout(function() {
    element.html(text);
  }, delay);
}

function toggleCaret(textElement) {
  let text = textElement.html();
  let textEndsWithCaret;
  if (text.length < 1) {
    textEndsWithCaret = false;
  } else {
    textEndsWithCaret = text.slice(text.length - 1, text.length) == '∣';
  }
  if (textEndsWithCaret) {
    textElement.html(text.slice(0, text.length - 1));
  } else {
    textElement.html(text + '&mid;');
  }
}

function toggleSpaceSymbol() {
  for (let i = 0; i < 6; i++) {
    setTimeout(function() {
      $('.space-symbol').toggleClass('invisible');
    }, 700 * i);
  }
}
