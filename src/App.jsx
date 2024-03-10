/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from 'react';
import './App.css'
let pokemonData = [];

function getName(string){
	let wordArray = string.split("-")
	let name = "";

	if (wordArray.length>1) {
		for (let i = 0; i < wordArray.length; i++) {
			name = name + wordArray[i].slice(0,1).toUpperCase()+wordArray[i].slice(1) +" "
		}
		
		return name;
	} else {
		return string.slice(0,1).toUpperCase()+string.slice(1);
	}
}
function App() {
	const [search,setSearch] = useState("");
	const[id,setId] = useState(1)
	const[name,setName] = useState("Bulbasaur")
	const[type,setType] = useState("Grass")
	const[weight,setWeight] = useState(6.9)
	const[height,setHeight] = useState(0.7)
	const[move1,setMove1] = useState('Razer Wind')
	const[move2,setMove2] = useState('Swords Dance')
	const[move3,setMove3] = useState('Cut')
	const[hp,setHp] = useState(45)
	const[atk,setAtk] = useState(49)
	const[def,setDef] = useState(49)
	const[satk,setSatk] = useState(65)
	const[sdef,setSdef] = useState(65)
	const[spd,setSpd] = useState(45)
	const [color,setColor] = useState('rgb(122, 199, 76)')

	function fetchPokeData(){
		fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
	   .then(response => response.json())
	   .then(data =>{
		pokemonData=data.results
		}
	   );
	}

	function handleClick(newId){
		setId(newId)
		fetch(`https://pokeapi.co/api/v2/pokemon/${newId}`)
			.then(response=>{return response.json()})
			.then(data=>{
				setName(getName(data.name))
				setType(getName(data.types[0].type.name))
				setWeight(data.weight/10)
				setHeight(data.height/10)
				setMove1(getName(data.moves[0].move.name))
				setMove2(getName(data.moves[1].move.name))
				setMove3(getName(data.moves[2].move.name))
				setHp(data.stats[0].base_stat)
				setAtk(data.stats[1].base_stat)
				setDef(data.stats[2].base_stat)
				setSatk(data.stats[3].base_stat)
				setSdef(data.stats[4].base_stat)
				setSpd(data.stats[5].base_stat)
			})
			.catch((error)=>{
				console.log(error);
			})
		
	}

	useEffect(fetchPokeData,[])
	useEffect(()=>{
		switch(type){
			case `Normal`:
				setColor(`rgb(168, 167, 122)`)
				break;

			case `Fire`:
				setColor('rgb(238, 129, 48)')
				break;

			case `Water` :
				setColor('rgb(99, 144, 240)')
				break;

			case `Ground`:
				setColor(`#E2BF65`);
				break;
				
			case `Electric` :
				setColor('rgb(247, 208, 44)')
				break;

			case `Grass` :
				setColor('rgb(122, 199, 76)')
				break;

			case `Ice` :
				setColor('rgb(150, 217, 214)')
				break;

			case `Fighting` :
				setColor('rgb(150, 217, 214)')
				break;

			case `Poison` :
				setColor('#A33EA1')
				break;

			case `Flying` :
				setColor('#A98FF3')
				break;

			case `Psychic` :
				setColor('#F95587')
				break;

			case `Bug` :
				setColor('#A6B91A')
				break;

			case `Rock`:
				setColor('#B6A136')
				break;

			case `Ghost`:
				setColor('#735797')
				break;

			case `Dragon`:
				 setColor('#6F35FC')
				break;

			case `Dark`:
				setColor('#705746')
				break;

			case `Steel`:
				setColor('#B7B7CE')
				break;

			case `Fairy`:
				setColor('#D685AD')
				break;

			default:
				setColor(`black`);
		}
	},[type])


	function handleChange(e){
		setSearch(e.target.value)
	}

  return (
    <div className='body'>
		<input 
			type='text'
			placeholder='Search'
			id='search'
			value={search}
			onChange={(e)=>{handleChange(e)}}
		/>

	<div className='pokemons'>
	<div className="fullDisplay" id='fullDisplay' style={{background:color}}>
				<div className="pic">
					<p>{name}</p>
					<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt='img not found' />
				</div>
				<div className="details">
					<div className="type" style={{background:color}}>{type}</div>

					<div className="stats">
						<div className="weight">
							<span className='head'>WEIGHT</span>
							<span className='statsNum'>{weight} kg</span>
						</div>
						<div className="height">
							<span className='head'>HEIGHT</span>
							<span className='statsNum'>{height} m</span>
						</div>
						<div className="moves">
							<span className='head'>MOVES</span>
							<span className='move'>{move1}</span>
							<span className='move'>{move2}</span>
							<span className='move'>{move3}</span>
						</div>
					</div>

					<div className="baseStats">
									<div className="hp">
										<span className='baseStatName'style={{color:color}}>HP</span>
										<span className='baseStat'>{hp}</span>
										<div className="progressBar">
											<div className="progress" style={{background:color,width:`${hp}%`}}></div>
										</div>
									</div>
									<div className="hp">
										<span className='baseStatName'style={{color:color}}>ATK</span>
										<span className='baseStat'>{atk}</span>
										<div className="progressBar">
											<div className="progress" style={{background:color,width:`${atk}%`}}></div>
										</div>
									</div>
									<div className="hp">
										<span className='baseStatName'style={{color:color}}>DEF</span>
										<span className='baseStat'>{def}</span>
										<div className="progressBar">
											<div className="progress" style={{background:color,width:`${def}%`}}></div>
										</div>
									</div>
									<div className="hp">
										<span className='baseStatName'style={{color:color}}>SATK</span>
										<span className='baseStat'>{satk}</span>
										<div className="progressBar">
											<div className="progress" style={{background:color,width:`${satk}%`}}></div>
										</div>
									</div>
									<div className="hp">
										<span className='baseStatName'style={{color:color}}>SDEF</span>
										<span className='baseStat'>{sdef}</span>
										<div className="progressBar">
											<div className="progress" style={{background:color,width:`${sdef}%`}}></div>
										</div>
									</div>
									<div className="hp">
										<span className='baseStatName'style={{color:color}}>SPD</span>
										<span className='baseStat'>{spd}</span>
										<div className="progressBar">
											<div className="progress" style={{background:color,width:`${spd}%`}}></div>
										</div>
									</div>
					</div>
				</div>
			</div>

	<div className="pokemonDisplay">			
			{
			pokemonData.filter((item)=>{
				return search==""?item:item.name.toLowerCase().includes(search.toLowerCase())
			}).map((item)=>{
			return(
			<div key={item.url.split("/")[6]} className="card" onClick={()=>{handleClick(item.url.split("/")[6])}}>
				<div className="upper">
					<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.url.split("/")[6]}.png`} alt='img not found' />
				</div>
				<div className="lower">
					<h4>{getName(item.name)}</h4>
				</div>
			</div>
			)
			})
		}
	</div>

	</div>
    </div>
  )
}

export default App
