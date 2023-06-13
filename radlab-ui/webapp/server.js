const admin = require("firebase-admin")
const { applicationDefault, initializeApp } = require("firebase-admin/app")

const { createServer } = require("http")
const { parse } = require("url")
const next = require("next")
const { parseCookies } = require("nookies")

const dev = process.env.NODE_ENV !== "production"
const hostname = "localhost"
const port = process.env.PORT ?? 3000

console.log("#####################");


if (dev) {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099" // this is needed for local setup, it looks like all the env variables here are null??
  process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080"
  // info about this is below
  // process.env.GOOGLE_APPLICATION_CREDENTIALS="sa-private-key.json" // todo move this elsewhere (needed when functions should talk to firebase admin)

  if (admin.apps.length === 0) {
    // this is also the reason whe we have to provide the name here
    initializeApp({ projectId: "rad-lab-ui-cb1c" })
  }
} else {
  // the admin sdk automatically gets the correct credentials form the app engine environemnt
  // so we do not need to load them here;
  // but this also means we can not really test this locally here either
  // process.env.GOOGLE_APPLICATION_CREDENTIALS="sa-private-key.json"
  initializeApp({
    credential: applicationDefault(),
    projectId: "rad-lab-ui-cb1c",
  })
}

const auth = admin.auth()

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      if (pathname === "/a" || pathname === "/a/") {
        // why is a trailing / added in produciton build?
        console.log("got called")
        const cookies = parseCookies({ req })
        console.log("cookies", cookies)
        if (!cookies.token) {
          return await handle(req, res, "/signin")
        }
        let token;
        try{
          token = await auth.verifyIdToken(cookies.token)
        }
        catch(e){
          console.log(e);
          return await handle(req, res, "/signin")
        }
        console.log("token", token)
        res.statusCode = 200
        res.end("logged in" + JSON.stringify(token))
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err)
      res.statusCode = 500
      res.end("internal server error")
    }
  })
    .once("error", (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
