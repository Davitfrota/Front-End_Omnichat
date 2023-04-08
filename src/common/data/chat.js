//import Images

import avatar02 from "../../assets/images/users/avatar-2.jpg";
import avatar03 from "../../assets/images/users/avatar-3.jpg";
import avatar04 from "../../assets/images/users/avatar-4.jpg";
import avatar06 from "../../assets/images/users/avatar-6.jpg";
import instagram from "../../assets/images/chat/InstagramIcone.png";
import whatts from "../../assets/images/chat/WhatsappIcone.png";

const chats = [
  {
    id: 1,
    roomId: 1,
    status: "Offline",
    image: instagram,
    name: "Ronaldo",
    description: "boa noite! Quais os sabores estao disponiveis?",
    time: "05 min",
  },
  {
    id: 2,
    roomId: 2,
    status: "Online",
    image: whatts,
    name: "JAO",
    description: "Tem pizza quentinha ai meu patraum ?",
    time: "12 min",
  },

]

const groups = [
  { id: 1, image: "G", name: "General" },
  { id: 2, image: "R", name: "Reporting" },
  { id: 3, image: "M", name: "Meeting" },
  { id: 4, image: "A", name: "Project A" },
  { id: 5, image: "B", name: "Project B" },
]

const contacts = [
  {
    category: "A",
    child: [
      { id: 1, name: "Adam Miller" },
      { id: 2, name: "Alfonso Fisher" },
    ],
  },
  {
    category: "B",
    child: [{ id: 1, name: "Bonnie Harney" }],
  },
  {
    category: "C",
    child: [
      { id: 1, name: "Charles Brown" },
      { id: 2, name: "Carmella Jones" },
      { id: 3, name: "Carrie Williams" },
    ],
  },
  {
    category: "D",
    child: [{ id: 4, name: "Dolores Minter" }],
  },
]

const messages = [
  {
    id: 1,
    roomId: 1,
    sender: "Ronaldo",
    message: "Oi!",
    time: "10:00",
  },
  {
    id: 2,
    roomId: 1,
    sender: "Ronaldo",
    message: "boa noite! Quais os sabores estao disponiveis?",
    time: "10:02",
  },
  {
    id: 2,
    roomId: 2,
    sender: "JAO",
    message: "Tem pizza quentinha ai meu patraum ?",
    time: "10:02",
  },
  
];
export { chats, messages, contacts, groups }
