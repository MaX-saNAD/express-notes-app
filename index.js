// ================ Initial Packges ================
import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'
const _dirname = dirname(fileURLToPath(import.meta.url))

// ================ Repeated Functions ================
async function readFile() {
  try {
    const data = await fs.readFile('./data/notes.json', 'utf-8')
    let newData = JSON.parse(data)
    return newData
  } catch (error) {
    if (error.code === 'ENOENT'){
      writeFile([])
      return []
    } 
    throw error
  }
}
async function writeFile(data) {
  let newData = JSON.stringify(data, null, 2)
  await fs.writeFile('./data/notes.json', newData)
}

// ================ Putting The Server Rules & Middlewares ================
const app = express()
const port = 3000
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
// ================ The Main Route ================
app.get('/', async (req, res) => {
  const notes = await readFile()
  res.render('index.ejs', { notes })
})

// ================ Bringing The Add Route ================
app.get('/add', (req, res) => {
  res.render('form.ejs')
})

// ================ The Add Route Functionlity ================
app.post('/add', async (req, res) => {
  const data = await readFile()
  data.push({
    id: Date.now(),
    title: req.body.title,
    body: req.body.body,
  })
  await writeFile(data)
  res.redirect('/')
})

// ================ The Delete Route Functionlity ================
app.post('/delete/:id', async (req, res) => {
  const id = req.params.id
  const currentData = await readFile()
  const newData = currentData.filter((ele) => ele.id !== +id)
  await writeFile(newData)
  res.redirect('/')
})

// ================ Showing Single Note ================
app.get('/note/:id', async (req, res) => {
  const id = req.params.id
  const data = await readFile()
  const currentnote = data.find((ele) => ele.id === +id)
  if (currentnote) {
    res.render('note.ejs', {
      id: currentnote.id,
      title: currentnote.title,
      body: currentnote.body,
    })
  } else {
    res.redirect('/')
  }
})

// ================ Bringing The Edit Route ================
app.get('/edit/:id', async (req, res) => {
  const id = req.params.id
  const currentData = await readFile()
  const note = currentData.find((ele) => ele.id === +id)
  res.render('formEdit.ejs', { note })
})

// ================ The Edit Route Functionlity ================
app.post('/edit/form/:id', async (req, res) => {
  const currentData = await readFile()
  const id = req.params.id
  const currentIdx = currentData.findIndex((ele) => ele.id === +id)
  if (currentIdx != -1) {
    if (req.body.title) currentData[currentIdx]['title'] = req.body.title
    if (req.body.body) currentData[currentIdx]['body'] = req.body.body
  }
  else {
    res.redirect('/')
    return
  }
  await writeFile(currentData)
  res.redirect('/')
})

// ================ Starting The Server ================
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
