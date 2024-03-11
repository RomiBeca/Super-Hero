$(function () {

    //formulario
    const formSearchSH = $("#formSearchSH")
    const inputSH = $("#inputSH")
    //card
    const cards = $("#cards")


    //formulario e input
    formSearchSH.submit(function (event) {
        event.preventDefault();

        const superheroId = inputSH.val();

        if (/^\d+$/.test(superheroId) && superheroId >= 1 && superheroId <= 731) {
            const urlSuperHero = `https://www.superheroapi.com/api.php/7246518678795864/${superheroId}`;

            //ajax para card y grafico
            $.ajax({

                url: urlSuperHero,
                method: "GET",

                success(dataSuperHero) {

                    const inteligencia = dataSuperHero.powerstats.intelligence !== "null" ? dataSuperHero.powerstats.intelligence : 0
                    const fuerza = dataSuperHero.powerstats.strength !== "null" ? dataSuperHero.powerstats.strength : 0
                    const velocidad = dataSuperHero.powerstats.speed !== "null" ? dataSuperHero.powerstats.speed : 0
                    const resistencia = dataSuperHero.powerstats.durability !== "null" ? dataSuperHero.powerstats.durability : 0
                    const poder = dataSuperHero.powerstats.power !== "null" ? dataSuperHero.powerstats.power : 0
                    const combate = dataSuperHero.powerstats.combat !== "null" ? dataSuperHero.powerstats.combat : 0



                    //card
                    cards.html(`
                        <div class="col-12 col-md-6">
                            <img src="${dataSuperHero.image.url}" class="img-fluid rounded-start w-100" alt="superHeroImage">
                        </div>
                        <div class="col-md-6">
                            <div class="card-body">                    
                                <h5 class="card-title fw-bold">ID: <span class="text-success">${dataSuperHero.id}</span> </h5>
                                <p class="fw-bold">Name: <span class="fw-normal">${dataSuperHero.name}</span></p>               
                                <p class="fw-bold">Biography: </p>
                                    <ul>
                                        <li>Full Name: ${dataSuperHero.biography["full-name"]}</li>
                                        <li>Alter Egos: ${dataSuperHero.biography["alter-egos"]}</li>
                                        <li>Aliases: ${dataSuperHero.biography["aliases"]}</li>
                                        <li>Place-of-birth: ${dataSuperHero.biography["place-of-births"]}</li>
                                        <li>First-appearance: ${dataSuperHero.biography["first-appearance"]}</li>
                                        <li>Publisher: ${dataSuperHero.biography["publisher"]}</li>
                                        <li>Alignment: ${dataSuperHero.biography["alignment"]}</li>                           
                                    </ul>
                                <p class="fw-bold" >Appearance:</p>
                                    <ul>
                                        <li>Gender: ${dataSuperHero.appearance.gender}</li>
                                        <li>Race: ${dataSuperHero.appearance.race}</li>
                                        <li>height: ${dataSuperHero.appearance.height}</li>
                                        <li>weight: ${dataSuperHero.appearance.weight}</li>
                                        <li>eye-color: ${dataSuperHero.appearance["eye-color"]}</li>
                                        <li>hair-color: ${dataSuperHero.appearance["hair-color"]}</li>                 
                                    </ul> 
                                <p class="fw-bold" >PowerStats:</p>
                                    <ul>
                                        <li>Intelligence: ${inteligencia}</li>
                                        <li>Strength: ${fuerza}</li>                           
                                        <li>speed: ${velocidad}</li>                           
                                        <li>durability: ${resistencia}</li>                           
                                        <li>power: ${poder}</li>                           
                                        <li>combat: ${combate}</li>   
                                    </ul>
                                <p class="fw-bold" >Work:</p> 
                                    <ul>
                                        <li>Ocupation: ${dataSuperHero.work.occupation}</li>
                                        <li>Base: ${dataSuperHero.work.base}</li>
                                    </ul>
                                <p class="fw-bold" >Conecctions</p>
                                    <ul>
                                        <li>Group Affiliation: ${dataSuperHero.connections["group-affiliation"]}</li>
                                        <li>Relatives: ${dataSuperHero.connections.relatives}</li>
                                    </ul>                                  
                                <p class="fw-bold" >Response: <span class="fw-normal">${dataSuperHero.response}</span> </span></p>
                            </div>
                        </div>
                    `);

                    //grafico de pastel
                    const superPowerstats = [
                        { label: "Intelligence", y: parseInt(inteligencia), name: "Intelligence" },
                        { label: "Strength", y: parseInt(fuerza), name: "Strength" },
                        { label: "Speed", y: parseInt(velocidad), name: "Speed" },
                        { label: "Durability", y: parseInt(resistencia), name: "Durability" },
                        { label: "Power", y: parseInt(poder), name: "Power" },
                        { label: "Combat", y: parseInt(combate), name: "Combat" },
                    ]

                    const chart = new CanvasJS.Chart("chartContainer", {
                        animationEnabled: true,
                        title: {
                            text: `PowerStats Super Hero`
                        },
                        data: [{
                            type: "pie",
                            showInLegend: true,
                            dataPoints: superPowerstats.reverse()
                        }],

                    });

                    chart.render();
                    inputSH.val('')
                },
                error(e) {
                    console.log(e);
                }
            })

        } else {
            alert("Ingrese un número de ID válido (entre 1 y 731).");
            inputSH.val('')
        }
    })
});