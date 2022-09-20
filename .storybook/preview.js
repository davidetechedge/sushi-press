require('../src/index.css')
require('../src/App.css')

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'sushi-press',
    values: [
      {
        name: 'sushi-press',
        value: '#FFF8EF',
      },
      {
        name: 'facebook',
        value: '#3b5998',
      },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
