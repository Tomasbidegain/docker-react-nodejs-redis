const redisclient = require('../redis/index')

const addCharacter = async (req, res) => {
  const { number_episode, name_character } = req.body;
  await redisclient.rPush('lista_key', JSON.stringify([number_episode, name_character]));
  return res.send('Personaje creado con éxito')
}

const getAllCharacters = async (req, res) => {
  const response = await redisclient.lRange("lista_key", 0, -1)
  // const data = [response]
  // miArray = data.map(item => JSON.parse(item));
  // console.log(miArray)
  // return 
  // res.send(data)
  const characters = response.map(item => {
    try {
      return JSON.parse(item);
    } catch (err) {
      console.error(`Error al parsear ${item}: ${err.message}`);
      return null;
    }
  }).filter(item => item !== null);
  
  return res.send(characters)
}

const deleteCharacter = async (req, res) => {
  const { number_episode, name_character } = req.body;
  await redisclient.lRem("lista_key", 0, JSON.stringify([number_episode, name_character]))
  return res.send(`Personaje con numero de episodio ${number_episode} y nombre ${name_character} eliminado con éxito.`);
}

const getAllCharactersByNumberEpisode = async (req, res) => {
  const { number_episode } = req.body;
  const allCharacters = await redisclient.lRange("lista_key", 0, -1)
  const charactersByNumber = []

  for (let i = 0; i < allCharacters.length; i++) {
    const character = JSON.parse(allCharacters[i])
    if(character[0] === number_episode){
      charactersByNumber.push(JSON.parse(allCharacters[i]))
    }    
  }
  res.send(charactersByNumber)
}

module.exports = { addCharacter, deleteCharacter, getAllCharacters, getAllCharactersByNumberEpisode }