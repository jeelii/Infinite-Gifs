# Infinite Gifs React App

## Description

- Search infinite gifs from the Giphy api
- Reload page/go back or forward without losing your search history
- Your searches are saved in the browser

## Technologies

- React.JS with custom hooks

## Features

- Custom hook for fetching with Axios
- Infinite scroll as pagination
- useRef to trigger new fetch
- History state keeps track of location and history
- Using local storage to remember searches between sessions

## Demo

🚀 [Launch website](https://jeelii.github.io/Infinite-Gifs/)
If it stops loading gifs, it can be because the Giphy API (beta version) is limited to a certain number of requests in a limited time (I print this error on the page if that is the case). You can come back and try again in a little while.

## Sources

This app fetches images from the [Giphy api](https://developers.giphy.com/)

## Credits

Refactored a boiler plate from a course on [Treehouse](https://teamtreehouse.com/).

Implemented infite scroll with inspiration from these tutorials:
https://medium.com/suyeonme/react-how-to-implement-an-infinite-scroll-749003e9896a
https://www.youtube.com/watch?v=NZKUirTtxcg

Added features like location parameters and search history.
