import { configure } from '@storybook/react'

function loadStories() {
  const req = require.context('../src', true, /\bstories\.tsx?$/)

  req.keys().forEach(req)
}

configure(loadStories, module)
