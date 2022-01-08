// Pseudo code

// Create a namespace object


const pokeDex = {};

// - create the init method on namespace object

pokeDex.init = () => {
    // call our getData method
    pokeDex.getTypeList();
    pokeDex.getSelectType();
}

pokeDex.getTypeList = () => {
    const url = new URL('https://pokeapi.co/api/v2/type')
    
    fetch(url)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            // console.log(data.results);
            const filterTypes = data.results.filter( (type) => {
                if (type.name !== "unknown" && type.name !== "shadow") {
                    return true;
                }
            })
            pokeDex.getTypes(filterTypes)
        })
}

pokeDex.getTypes = (types) => {
    const typeListContainer = document.querySelector("#typeList")
    types.forEach( (types) => {
        const typeOption = document.createElement("option")
        typeOption.classList.add(types.name)
        typeOption.innerText = types.name
        typeListContainer.appendChild(typeOption)
    })
}

pokeDex.getSelectType = () => {
    const selectElement = document.querySelector("select");
    selectElement.addEventListener("change", (event) => {
        pokeDex.getDamageRelations(event.target.value);
    })
}

pokeDex.getDamageRelations = (type) => {
    const url = new URL(`https://pokeapi.co/api/v2/type/${type}`)

    const doubleDamageToList = document.querySelector(".doubleDamageTo")
    const doubleDamageFromList = document.querySelector(".doubleDamageFrom")

    const halfDamageToList = document.querySelector(".halfDamageTo")
    const halfDamageFromList = document.querySelector(".halfDamageFrom")
    
    const noDamageToList = document.querySelector(".noDamageTo")
    const noDamageFromList = document.querySelector(".noDamageFrom")

    doubleDamageToList.innerHTML = "";
    doubleDamageFromList.innerHTML = "";

    fetch(url)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            data.damage_relations.double_damage_to.forEach((type) => {
                
                const damageToList = document.createElement("li");
                damageToList.innerText = type.name;
                doubleDamageToList.appendChild(damageToList)
            })
            
            data.damage_relations.double_damage_from.forEach((type) => {
                const damageFromList = document.createElement("li");
                damageFromList.innerText = type.name;
                doubleDamageFromList.appendChild(damageFromList);
            })




            data.damage_relations.half_damage_to.forEach((type) => {

                const damageToList = document.createElement("li");
                damageToList.innerText = type.name;
                halfDamageToList.appendChild(damageToList)
            })

            data.damage_relations.half_damage_from.forEach((type) => {
                const damageFromList = document.createElement("li");
                damageFromList.innerText = type.name;
                halfDamageFromList.appendChild(damageFromList);
            })

            data.damage_relations.no_damage_to.forEach((type) => {

                const damageToList = document.createElement("li");
                damageToList.innerText = type.name;
                noDamageToList.appendChild(damageToList)
            })

            data.damage_relations.no_damage_from.forEach((type) => {
                const damageFromList = document.createElement("li");
                damageFromList.innerText = type.name;
                noDamageFromList.appendChild(damageFromList);
            })


        })

}

// create a getData method to request the correct info from the api
// - user selects a type and uses the submit button to finalize selection, an event listener (possibly "change" instead of "submit") will wait for the submission and return two values in double damage from and double damage to
// damage_relations
// - double_damage_from
// - double_damage_to

// call the init method at the end

pokeDex.init();