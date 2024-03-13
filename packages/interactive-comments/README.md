# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

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

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Screenshot

![](./screenshot.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [https://visualsource.github.io/interactive-comments](https://visualsource.github.io/interactive-comments)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Tailwind](https://tailwindcss.com/) - For styles
- [Lit](https://lit.dev/) - Simple. Fast. Web Components.
- [Superjson](https://www.npmjs.com/package/superjson) - Safely serialize JavaScript expressions to a superset of JSON, which includes Dates, BigInts, and more.
- [Immer](https://immerjs.github.io/immer/) - A tiny package that allows you to work with immutable state in a more convenient way.
- [Date-fns](https://date-fns.org/) - Modern JavaScript date utility library

### What I learned

- When working with lit custom html elements you can use a . in front of a prop to pass the value directly to the custom element this helps with passing objects and arrays between elements. This only working when calling it from the `html` templete function from lit.

```ts
class Element extends LitElement {
  render() {
    return html`
      <custom-element .list=${["item1", "item2", "item3"]}></custom-element>
    `;
  }
}
```

- When working with css grid areas, declaring the grid with columns and rows is not required, but can be add to help constan the element in the grid and with `fr` units it allows for responive design.

```css
.example-grid {
  grid-template-areas:
    "count header action"
    "count body   body  "
    "count body   body  "
    "none  body   body  ";
  grid-template-columns: 0.5fr 4fr 1fr;
}
```

- When paring a string into a date in javascript passing the string into the Date constructor and if the date string is invalid it will return a Date object with the value of 'Invalid Date'. You can use `==` to test if the date is equal to 'Invalid Date', but using `==` is generally not a great idea in modern javascript so you can use `Date.parse` which will return `NaN` if invalid which is better the comparing with `==`;

```js
new Date("Some Invalid Date");
// Returns a Date object of 'Invalid Date'

Date.parse("Some Invalid Date");
// Returns NaN
```

### Continued development

In the future i'd like to use css grid area more, due to it allow for moving content around a container with out having to redeclare the some component in more then one place. I tend to fall in to using only flexbox but css gird is soming i'd like to use more.

### Useful resources

- [MDN: Dialog Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) - This helped me for reference in using the html dialog element.
- [MDN: Grid Template Areas](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas) - This helped me for reference in using css grid template areas
- [Lit Element: No Shadow Dom](https://stackoverflow.com/questions/55126694/how-to-create-litelement-without-shadow-dom) - Help with how to disable shadow dom to allow for use of tailwind

## Author

- Website - [https://visualsource.us](https://visualsource.us)
- Frontend Mentor - [@VisualSource](https://www.frontendmentor.io/profile/VisualSource)
- LinkedIn - [Collin Blosser](https://linkedin.com/in/collinblosser)
