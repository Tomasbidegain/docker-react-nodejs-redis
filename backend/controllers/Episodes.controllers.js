const redisclient = require('../redis/index')

const addEpisode = async (req, res) => {
  try {
    //Seteamos el valor disponible como default
    let status = 'available';
    //Requerimos del body los datos de la request
    const { number_episode, name_episode } = req.body;
    //Cargamos en la lista mandalorian el episodio.
    await redisclient.rPush('mandalorian', JSON.stringify([number_episode, name_episode, status]));
    return res.send('Episodio de mandalorian creado con éxito.')
  } catch (error) {
    return res.status(400).send({error: error.message})
  }
}

const getAllEpisodes = async (req, res) => {
  const response = await redisclient.lRange("mandalorian", 0, -1)
  const episodes = response.map(item => {
  try {
      return JSON.parse(item);
    } catch (err) {
      console.error(`Error al parsear ${item}: ${err.message}`);
      return null;
    }
  }).filter(item => item !== null);
  
  return res.send(episodes)
}

const updateStatusEpisodes = async (req, res) => {
  try {
    //Obtenemos el numero de episdodio desde el body
    const { number_episode } = req.body;

    // Obtenenemos todos los elementos de la lista
    const mandalorian = await redisclient.lRange('mandalorian', 0, -1);
    const mandalorianArray = mandalorian.map(JSON.parse);
    
    // Buscamos el índice del episodio que tiene el número de episodio buscado
    const index = mandalorianArray.findIndex(episode => episode[0] === number_episode);
    // index será -1 si no se encontró ningún episodio con ese número de episodio
    if (index === -1) {
      return res.status(400).send({msg:'El episodio no existe.'})
    }
    //Si el valor del status en esa posicion es available o reserved retorna un error porque ya está alquilado
    if (mandalorianArray[index][2] !== 'available' && mandalorianArray[index][2] !== 'reserved') {
      return res.status(400).send({msg:'El episodio no se encuentra disponible para alquilar.'})
    }

    // Actualizamos la clave de episodio para reservar el episodio durante 4 minutos
    mandalorianArray[index][2] = 'reserved'
    await redisclient.lSet("mandalorian", index, JSON.stringify(mandalorianArray[index]));

    // Establecemos una clave "reserved" en Redis con el valor del episodio.
    await redisclient.set(`reserved:${number_episode}`, JSON.stringify(mandalorianArray[index]));

    // Agregamos una función que se ejecute cuando expire el tiempo de reserva para cambiar el status del episodio a disponible en caso de que no se alquile antes.
    setTimeout(async () => {
      const reservedStatus = await redisclient.get(`reserved:${number_episode}`);
      const rentedStatus = await redisclient.get(`rented:${number_episode}`);

      if (reservedStatus && !rentedStatus) {
        const episode = JSON.parse(reservedStatus);
        episode[2] = 'available';
        await redisclient.lSet("mandalorian", index, JSON.stringify(episode));
        await redisclient.del(`reserved:${number_episode}`);
      }
    }, 240000);

    return res.status(200).send({msg: 'Episodio reservado con éxito.'});
  } catch (error) {
    return res.status(400).send({error: error.message})
  }
}

const confirmPayment = async (req, res) => {
  try {
    const { number_episode, price } = req.body;

    // Obtenenemos todos los elementos de la lista
    const mandalorian = await redisclient.lRange('mandalorian', 0, -1);
    const mandalorianArray = mandalorian.map(JSON.parse);

    // Buscar el índice del episodio que tiene el número de episodio buscado
    const index = mandalorianArray.findIndex(episode => episode[0] === number_episode);

    // Obtenemos el valor del episodio reservado y si no esta reservado retorna error.
    const reservedEpisode = await redisclient.get(`reserved:${number_episode}`);
    if (!reservedEpisode) {
      return res.status(400).send({msg:'El episodio no se encuentra reservado.'})
    }

    const reservedEpisodeArray = JSON.parse(reservedEpisode);

    //Si el status del episodio no es "reserved" retorna erorr.
    if (reservedEpisodeArray[2] !== 'reserved') {
      return res.status(400).send({msg:'El episodio no se encuentra reservado.'})
    }

    // Actualizamos la clave de episodio para alquilar el episodio durante 24 hs
    mandalorianArray[index][2] = 'rented'
    await redisclient.lSet("mandalorian", index, JSON.stringify(mandalorianArray[index]));

    // Establecemos una clave "rented" en Redis con el valor del episodio.
    await redisclient.set(`rented:${number_episode}`, JSON.stringify(mandalorianArray[index]));

    // Agrega una función que se ejecute cuando expire el tiempo de alquiler para cambiar el status del episodio a disponible
    setTimeout(async () => {
      const episodeStatus = await redisclient.get(`rented:${number_episode}`);
      if (episodeStatus) {
        const episode = JSON.parse(episodeStatus);
        episode[2] = 'available';
        await redisclient.lSet("mandalorian", index, JSON.stringify(episode));
        await redisclient.del(`rented:${number_episode}`);
      }
    }, 86400000);

    return res.status(200).send({msg: `Su pago de $${price} fue confirmado y alquilo el episodio por 24 hs.`});

  } catch (error) {
    return res.status(400).send({error: error.message})
  }
}


const deleteAllEpisodes = async (req, res) => {
  try {
    await redisclient.del('mandalorian')
    return res.status(200).send({msg: 'Episodios eliminados con exito'})
  } catch (error) {
    return res.status(400).send({error: error.message})
  }
}

module.exports = {
  getAllEpisodes, addEpisode, updateStatusEpisodes, confirmPayment, deleteAllEpisodes
}