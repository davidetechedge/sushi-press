# sushi-press

- [sushi-press](#sushi-press)
  - [Init repository](#init-repository)
  - [Available script](#available-script)
    - [`npm start`](#npm-start)
    - [`npm run build`](#npm-run-build)
    - [`npm test`](#npm-test)
    - [`npm run prettier`](#npm-run-prettier)

## Init repository

Per installare le librerie scrivi nel terminale il comando:

```
npm ci
```

Se questo primo comando dovesse dare problemi con [nvm](https://github.com/nvm-sh/nvm) usare npm alla versione 5 o 6 (lockfileVersion is 1).

## Available script

### `npm start`

Comando che serve per far runnare la app in development mode.\
Apre la finestra del browser al link [http://localhost:3000](http://localhost:3000).

### `npm run build`

Crea una cartella nella root con il nome `build`.\

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm test`

Questo è il comando per far runnare cypress.

### `npm run prettier`

Questo è il comando per formattare il codice con l'utilizzo di prettier.\
È possibile settare l'estensione sul proprio editor, seguendo la [guida](https://prettier.io/docs/en/editors.html), oppure scrivere questo comando prima di pushare codice. In questo modo tutti avranno il codice con il medesimo stile.
