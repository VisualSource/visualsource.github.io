# Frontend Mentor - Multi-step form solution

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Complete each step of the sequence
- Go back to a previous step to update their selections
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Receive form validation messages if:
  - A field has been missed
  - The email address is not formatted correctly
  - A step is submitted, but no selection has been made

### Screenshot

![](./screenshot.png)

### Links

- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- Flexbox
- Mobile-first workflow
- [Alpine.js](https://alpinejs.dev/) - JavaScript framework
- [Iodine](https://github.com/caneara/iodine) - A micro JavaScript validation library.
- [Typescript](https://www.typescriptlang.org/) - Typescript
- [Tailwind css](https://tailwindcss.com/) - For styles
- [Vite](https://vitejs.dev/) - Bundler

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

One of the major things i learned was that you can use a fieldset element to catch the :valid and :invalid pseudo-classes which makes it easier to to style other element dependent on the input element state.

```html
<fieldset>
  <label>Label</label>
  <input type="text" />
</fieldset>
```

```css
fieldset:invalid > label:first-of-type {
  border-color: red;
}
```

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [fieldset](https://stackoverflow.com/a/71647978) - Using a fieldset to catch :invalid and :valid pseudo-classes
- [:invalid](https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid) - How the :invalid pseudo-class works and interacts with form elements.
- [setCustomValidity()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity) - Setting custom valiation error messages

## Author

- Website - [Collin Blosser](https://visualsource.us)
- Frontend Mentor - [@VisualSource](https://www.frontendmentor.io/profile/VisualSource)
- LinkedIn - [@collinblosser](https://linkedin.com/in/collinblosser)