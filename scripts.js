// Pseudo code

// Create a namespace object


const pokeDex = {};

// - create the init method on namespace object

pokeDex.init = () => {
    // call our getData method
    pokeDex.getTypeList();
}

pokeDex.getTypeList = () => {
    const url = new URL('https://pokeapi.co/api/v2/type')
    
    fetch(url)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            console.log(data)
        })
}

// create a getData method to request the correct info from the api
// damage_relations
// - double_damage_from
// - double_damage_to

// call the init method at the end

pokeDex.init();