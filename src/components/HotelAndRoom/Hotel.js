import { useState } from 'react';

export default function Hotel({ name, image, rooms }) {
  const acommodations = typesOfAcommodation(rooms);
  const numberOfAvailablePositions = availablePositions(rooms);

  return (
    <>
      <h3>Tipos de acomodação:</h3>
      <p>{acommodations}</p>

      <h3>Vagas disponíveis:</h3>
      <p>{numberOfAvailablePositions}</p>
    </>
  );
}

function typesOfAcommodation(rooms) {
  const [single, setSingle] = useState(false);
  const [double, setDouble] = useState(false);
  const [triple, setTriple] = useState(false);

  if (rooms.length === 0) return '';

  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].capacity === 1) {
      setSingle(true);
    }
    if (rooms[i].capacity === 2) {
      setDouble(true);
    }
    if (rooms[i].capacity === 3) {
      setTriple(true);
    }
  }

  const acommodations = [
    { acommodation: 'Single', contain: single },
    { acommodation: 'Double', contain: double },
    { acommodation: 'Triple', contain: triple },
  ];

  const filterAcommodations = acommodations.filter((item) => item.contain === true);

  const result = filterAcommodations.map((item) => item.acommodation);

  if (result.length === 3) {
    return `${result[0]}, ${result[1]} e ${result[2]}`;
  } else if (result.length === 2) {
    return `${result[0]} e ${result[1]}`;
  } else {
    return `${result[0]}`;
  }
}

function availablePositions(rooms) {
  return rooms.reduce((acc, curr) => acc + (curr.capacity - curr._count), 0);
}
