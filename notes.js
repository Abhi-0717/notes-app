const fs = require('fs')
const chalk = require('chalk')

const getNotes = () =>
{
    return "Your notes..."
}

const addNote = (title,body) =>
{
   const notes = loadNotes()
   
// const duplicatNotes = notes.filter((note) => note.title === title)
// Efficient version of duplicatNotes which checks and stops when finds any duplicate without searching the whole notes array as above.
   const duplicateNote = notes.find((note) => note.title === title)

   if(!duplicateNote){  //or duplicatNote === undefined
    notes.push({
        title: title,
        body: body
    })
    saveNotes(notes)

    console.log(chalk.green.inverse('New note added!'))
   }
   else{
       console.log(chalk.red.inverse('Note title already taken!'))
   }
}

const removeNote = (title) => {
    const notes = loadNotes()

    const notesToKeep = notes.filter((note) => note.title !== title )
    saveNotes(notesToKeep)
    
    if(notesToKeep.length === notes.length){
        console.log(chalk.red.inverse('No notes found!'))
        
    }
    else{
        console.log(chalk.green.inverse('Note removed!'))
    }
}

const listNotes =() => {
    const notes = loadNotes()
    
    console.log(chalk.green.bold('Your Notes->'))

    notes.forEach((note) =>{
        console.log(note.title)
    })
}

const readNotes = (title) => {
    const notes = loadNotes()

    const note = notes.find((note) => note.title === title)

    if(note){
        console.log(chalk.yellow.bold('Note title-: ' + note.title))
        console.log(chalk.bold('Note contents - ') + note.body)
    }
    else{
        console.log(chalk.red.inverse('No note found ?'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () =>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e) {
        return []
    }
}
module.exports ={
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}