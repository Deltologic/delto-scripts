/**
 * Delto Scripts
 * Hub for open-source automation scripts.
 * https://github.com/Deltologic/delto-scripts
 *
 * Started and maintained by Deltologic. Supported by community.
 **/

import { Client } from "@notionhq/client"
import express from "express"

// define server main settings and credentials to Notion
const PORT = 8080
const NOTION_API_KEY = 'secret_************************'
const DATABASE_ID = 'cb5************************'

// ticket pattern we want to find from PR title
const TICKET_PATTERN = /[a-zA-Z]+-[0-9]+/

// create connection to Notion
const notion = new Client({ auth: NOTION_API_KEY })

// initialize express.js app
const app = express()

// we must register this middleware if we want to use body from request given in json format
app.use(express.json())

// main route for github webhooks
app.post('/github-webhook', async (req, res) => {
    const event = req.header('X-GitHub-Event')

    // GitHub after registering webhook in repository settings sends "ping" message,
    // so it would be nice to respond for this request
    if (event === 'ping') {
        res.sendStatus(200)
        return
    }

    const payload = req.body

    // in this script we don't want to handle other
    // events than pull requests
    if (event !== 'pull_request') {
        // notify GitHub we don't want other events and someone should
        // change webhook configuration
        res.sendStatus(400)
        return
    }

    // we are interested in only one event for PR (opened), but GitHub
    // sends every event about PR, so we should handle other cases
    if (payload['action'] !== 'opened') {
        res.sendStatus(200)
        return
    }

    const title = payload['pull_request']['title']
    const tickets = title.match(TICKET_PATTERN)

    // we didn't find any tickets in title, so we won't send it to notion
    if (tickets === null) {
        res.sendStatus(200)
        return
    }

    for (const ticket of tickets) {
        // find page (task) that have ticket found in PR title
        const response = await notion.databases.query({
            database_id: DATABASE_ID,
            filter: {
                property: "Ticket", // in your database, this name can be different depend on what have you set
                rich_text: {
                    equals: ticket
                }
            }
        })

        // there was no task with given ticket
        if (response.results.length === 0) {
            continue
        }

        // update page PR property (in your database it can have different name)
        await notion.pages.update({
            page_id: response.results[0]['id'],
            properties: {
                PR: {
                    url: payload['pull_request']['html_url']
                }
            }
        })

        res.sendStatus(201)
        return
    }

    res.sendStatus(200)
})

// now server is working and listening to given PORT
app.listen(PORT, () => {
    console.log('Waiting for webhooks!')
})
