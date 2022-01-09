// Pseudo code

// Create a namespace object


const pokeDex = {};

// create the init method on namespace object

pokeDex.init = () => {
    // call our getData method
    pokeDex.getTypeList();
    pokeDex.getSelectType();
}

// returning an array with all the different unique types of pokemon

pokeDex.getTypeList = () => {
    const url = new URL('https://pokeapi.co/api/v2/type')
    
    fetch(url)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            // removes the unknown and shadow types since they don't exist in the core games
            const filterTypes = data.results.filter( (type) => {
                if (type.name !== "unknown" && type.name !== "shadow") {
                    return true;
                }
            })
            pokeDex.getTypes(filterTypes)
        })
}


// adds each of the types from the getTypes function to the select list
pokeDex.getTypes = (types) => {
    const typeListContainer = document.querySelector("#typeList")
    types.forEach( (types) => {
        const typeOption = document.createElement("option")
        typeOption.innerText = types.name;
        typeListContainer.appendChild(typeOption)
    })
}

// event listener for changes to the select list
pokeDex.getSelectType = () => {
    const selectElement = document.querySelector("select");
    selectElement.addEventListener("change", (event) => {
        pokeDex.getDamageRelations(event.target.value);
    })
}

// for the selected type, gets all the damage relations info from the api
pokeDex.getDamageRelations = (type) => {
    const url = new URL(`https://pokeapi.co/api/v2/type/${type}`)

    const doubleDamageToList = document.querySelector(".doubleDamageTo")
    const doubleDamageFromList = document.querySelector(".doubleDamageFrom")

    const halfDamageToList = document.querySelector(".halfDamageTo")
    const halfDamageFromList = document.querySelector(".halfDamageFrom")
    
    const noDamageToList = document.querySelector(".noDamageTo")
    const noDamageFromList = document.querySelector(".noDamageFrom")

    // clears the innerHTML for each of the damage relations catagories
    doubleDamageToList.innerHTML = "";
    doubleDamageFromList.innerHTML = "";

    halfDamageToList.innerHTML = "";
    halfDamageFromList.innerHTML = "";

    noDamageToList.innerHTML = "";
    noDamageFromList.innerHTML = "";

    fetch(url)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            // for each damage relations catagory, creates a li element for each returned type
            data.damage_relations.double_damage_to.forEach((type) => {
                const damageToList = document.createElement("li");
                damageToList.innerText = type.name;
                damageToList.classList.add(type.name)
                doubleDamageToList.appendChild(damageToList)
            })
            
            data.damage_relations.double_damage_from.forEach((type) => {
                const damageFromList = document.createElement("li");
                damageFromList.innerText = type.name;
                damageFromList.classList.add(type.name)
                doubleDamageFromList.appendChild(damageFromList);
            })

            data.damage_relations.half_damage_to.forEach((type) => {
                const damageToList = document.createElement("li");
                damageToList.innerText = type.name;
                damageToList.classList.add(type.name)
                halfDamageToList.appendChild(damageToList)
            })

            data.damage_relations.half_damage_from.forEach((type) => {
                const damageFromList = document.createElement("li");
                damageFromList.innerText = type.name;
                damageFromList.classList.add(type.name)
                halfDamageFromList.appendChild(damageFromList);
            })

            data.damage_relations.no_damage_to.forEach((type) => {
                const damageToList = document.createElement("li");
                damageToList.innerText = type.name;
                damageToList.classList.add(type.name)
                noDamageToList.appendChild(damageToList)
            })

            data.damage_relations.no_damage_from.forEach((type) => {
                const damageFromList = document.createElement("li");
                damageFromList.innerText = type.name;
                damageFromList.classList.add(type.name)
                noDamageFromList.appendChild(damageFromList);
            })

        })

}

// call the init method at the end

pokeDex.init();