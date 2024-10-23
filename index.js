const express = require('express')
const cors = require('cors')
const { json } = require("express");
const app = express()

const PORT = 3000;

let persist = {
    persons: {},
    companies: {}
}

const APPROVED = {
    status: 'APPROVED',
    max_amount: 10000
}

const DENIED = {
    status: 'DENIED'
}

app.use(cors())
app.use(json())

function setPerson(body, response) {
    persist.persons[body.document] = {
        person: body,
        credit_result: response
    }
}

function setCompany(body, response) {
    persist.companies[body.document] = {
        company: body,
        credit_result: response
    }
}


app.post('/credit-score/person', function (req, res, next) {
    if (req.body.income > 1000) {
        setPerson(req.body, APPROVED)
        res.json(APPROVED)
    } else {
        setPerson(req.body, DENIED)
        res.json(DENIED)
    }

})

app.post('/credit-score/company', function (req, res, next) {
    if (req.body.revenue > 1000) {
        setCompany(req.body, APPROVED)
        res.json(APPROVED)
    } else {
        setCompany(req.body, DENIED)
        res.json(DENIED)
    }

})

app.get('/credit-score/list', function (req, res, next) {
    res.json({
        persons: [
            ...Object.values(persist.persons),
        ],
        companies: [
            ...Object.values(persist.companies),
        ]
    })
});

app.listen(PORT, function () {
    console.log(`web server listening on port ${PORT}`)
})
