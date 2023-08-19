import _ from 'lodash';

export default function solution(content){
  // BEGIN
  
  // END
  const object = convertToObject(content)
  console.log(count(object));
  console.log(rank(object));
  // console.log(debud(object)); 
  console.log(ratingOfMeet(object));
  console.log(victoryStatus(object));

  
}
const convertToObject = (content) => {
const current = content.split('\n').slice(1).filter((el) => el !== '').map((el) => el.split(','));
const Object = current.map((el) =>({

  game_id: el[0],
  rated: el[1],
  turns: el[2],
  victory_status: el[3],
  winner: el[4],
  time_increment: el[5],
  white_id: el[6],
  white_rating: el[7],
  black_id: el[8],
  black_rating: el[9],
  moves: el[10],
  opening_code: el[11],
  opening_moves: el[12],
  opening_fullname: el[13],
  opening_shortname: el[14],
  opening_response: el[15],
  opening_variation: el[16],

  }));
  
  return Object;

};
// - количество партий
const count = (object) => `Количество партий: ${object.length}`;

// - соотношение игр рейтинговых игр против нерейтинговых
const rank = (object) => {
  const ranked = object.filter(( {rated} ) => rated === 'TRUE').length;
  return `Соотношение игр рейтинговых игр против нерейтинговых: ${ranked * 100 / object.length}`;
}

// - все варианты дебютов - 'opening_fullname' (уникальные названия без дублей)
const debud = (object) => {
    return `Все варианты дебютов: ${_.uniq(object.map (( {opening_fullname} ) => opening_fullname)).join(', ')}`
}

// - количество побед игрока с меньшим рейтингом над игроком с большим

const ratingOfMeet = (object) => {
  const whiteLooser = object.reduce((acc, item) => {
    if(item.black_rating < item.white_rating && item.winner === 'Black')
      acc++
    if(item.black_rating > item.white_rating && item.winner === 'White')
      acc++
    return acc;
  }, 0)
  return `Количество побед игрока с меньшим рейтингом над игроком с большим: ${whiteLooser}`
}

// - соотношение всех вариантов завершения игры - 'victory_status' 
/*
Out of Time
Resign
Mate
Draw
*/
const victoryStatus = (object) => {
  const out = object.filter(({victory_status}) => victory_status === 'Out of Time').length * 100 / object.length;
  const mate = object.filter(({victory_status}) => victory_status === 'Mate').length * 100 / object.length;
  const resign = object.filter(({victory_status}) => victory_status === 'Resign').length * 100 / object.length;
  const draw = object.filter(({victory_status}) => victory_status === 'Draw').length * 100 / object.length;
   return `Out of Time: ${out}, Mate: ${mate}, Resign: ${resign}, Draw: ${draw}`;
}