# Vue + Electron + TouchBar Game

It is a project I did during my first Degica's Open Hack Day, a hackathon where you can pick any project/tech/framework/idea, build something cool and share takeaways with others.

----

![demo](./.readmeAssets/demo.gif)

----
![demo-game-welcome](./.readmeAssets/demo1.png)
![demo-game](./.readmeAssets/demo2.png)
![demo-game-over](./.readmeAssets/demo3.png)

----


## General Architecture
The app is split into 2 parts, Electron Engine and the Game renderer.
- Electron engine is responsible for spawning the app, configuring Touch Bar and refreshing it with whatever image comes from the Game renderer.

- Renderer is a Vue app but, due to TouchBar limitations, everything has to be rendered as a canvas. The app doesn't use html but canvas abstraction provided by [Kanva lib](https://konvajs.org/).

Communication is done by an event mechanism provided by Electron.
Every 1/30s (30fps) renderer dumps whatever is on the canvas, base64 it and sends it to the Electron engine to render it on the Touch Bar.

### Limitations
There are several limitations as Electron TouchBar support is still an experimental feature.

- App window has to be focused, otherwise touchbar is taken over by other app... Native apps are able to overcome this limitation so it's just electron issue.

- There is no real way to render anything on Touch Bar... The way I did it is, it's an icon of a massive button. This is the hack. Which leads to another limitation:

- user interaction is limited to a tap. We can't detect tap's coordinates in the tap event so I tweaked game logic to meet this UI limitations.


## Development
Development environment is configured to run in two modes.
- The full Electron one which is the real environment but development process is slowed down due to need to reload Electron (reloading is automatic so its pretty fast still)
- Normal web app - the game is just a Vue app so can be ran on normal browser

```bash
nvm use
yarn
yarn run dev # for full Electron/TouchBar environment
yarn run dev:lite # for a normal web app you can open in a browser
```

