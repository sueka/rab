import { configure } from '@storybook/react'
import 'reflect-metadata'

configure(require.context('../src', true, /\bstories\.tsx?$/), module)
