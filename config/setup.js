const db = require('./db')

const createPetStore = `
    CREATE TABLE petstore (
        petId VARCHAR(3) NOT NULL PRIMARY KEY,
        petName VARCHAR(20) NOT NULL,
        petType VARCHAR(20) NOT NULL
    )
`

db.serialize(() => {
    db.run(createPetStore, (error) => {
        if (!error) {
            console.log('Table Created Successfully!')
        }
        else {
            console.log(error)
        }
    })
})
