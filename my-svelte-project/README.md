*Psst — looking for a more complete solution? Check out [SvelteKit](https://kit.svelte.dev), the official framework for building web applications of all sizes, with a beautiful development experience and flexible filesystem-based routing.*

*Looking for a shareable component template instead? You can [use SvelteKit for that as well](https://kit.svelte.dev/docs#packaging) or the older [sveltejs/component-template](https://github.com/sveltejs/component-template)*

---

# svelte app

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:8080](http://localhost:8080). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for *any* path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Using TypeScript

This template comes with a script to set up a TypeScript development environment, you can run it immediately after cloning the template with:

```bash
node scripts/setupTypeScript.js
```

Or remove the script via:

```bash
rm scripts/setupTypeScript.js
```

If you want to use `baseUrl` or `path` aliases within your `tsconfig`, you need to set up `@rollup/plugin-alias` to tell Rollup to resolve the aliases. For more info, see [this StackOverflow question](https://stackoverflow.com/questions/63427935/setup-tsconfig-path-in-svelte).

## Deploying to the web

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
# Components
Navbar.svelte
⦁	Lässt jemand zwischen dem Login, dem TimeTracking, der Weekly Overview und der Daily Overview navigieren. Zusätzlich kann man sich ausloggen, womit alle Daten im Local Storage gelöscht werden.

LoginPage.Svelte
⦁	Man kann sich einloggen. Personal Number und Name werden in das Local Storage gereicht. Somit können diese über aufgerufen werden. 

TimeTracking.svelte
⦁	Registriert die Zeit, Pause und das Datum und packt es in den Local Storage

WeeklyFormular.svelte
⦁	Zeigt alle Einträge einer Woche dazu werden die Einträge aus dem Local Storage aufgerufen.

DailyFormular.svelte
⦁	Zeigt alle Einträge eines bestimmten Arbeitstages an ( Datum Uhrzeit Beginn, Beginn Pause, Ende Pause und Gehen)

Clock.svelte
⦁	Eine Echtzeit Uhr


# Quellen Images

Edit.png = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXktw6DUv_3pFI96cPYwX1MmfoM-Hmy9Gn5zdn2xeOte_2DyPMQ_3Uk5eVtcU4dQL79e8&usqp=CAU"

Save.png = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAmkPtzd5dDHAWTTzBNP1VLfn_qNXuLsN0-HDS4jCYXdW0H8_odYP6wmIoSbS2OGzKrIw&usqp=CAU"

Profile.png ="https://www.google.com/search?q=blank-profile-picture-973460__480.png&rlz=1C1ONGR_deDE981DE982&sxsrf=APq-WBtlnw-BRanXQXL0FV13Ll95vTfvVg:1649829681063&tbm=isch&source=iu&ictx=1&vet=1&fir=ScRGRFGMiXHWfM%252Cwg0CyFWNfK7o5M%252C_%253BlBTOvfGlhQMvDM%252CiFLCHGZQ3ajwtM%252C_%253BlWmEZfQqmAx8KM%252C-sO-Lk9c9uX8VM%252C_%253BVAnBYwEE4o134M%252Ci6PluJXyduOMCM%252C_%253BGT7_clBqDJm7vM%252Ck05WWWYK4vNA7M%252C_%253BsqQ8k40QUZpTvM%252CqWxpmdurO2MhPM%252C_%253BR95gPjPVfLFphM%252CFdNZT9hRZ6zyYM%252C_%253Bm84CsCQpMu-OuM%252Ci6PluJXyduOMCM%252C_%253BoXlyOuq8MWMJnM%252CZerAWmokvNhyTM%252C_%253BMTZBE44kznQxdM%252Ci6PluJXyduOMCM%252C_&usg=AI4_-kSMnLYXo7o2wJxebi_0soVQWoq8ng&sa=X&ved=2ahUKEwjmk9HArpD3AhWWhP0HHcvDCVMQ9QF6BAgFEAE#imgrc=lWmEZfQqmAx8KM"