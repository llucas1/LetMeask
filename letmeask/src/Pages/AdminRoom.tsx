import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

// importar components
import logoImg from "../assets/images/logo.svg";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import { useRoom} from "../hooks/useRoom";
import { database } from "../services/Firebase";
import { Question } from "../components/Question";

// importando o scss da pagina
import "../Style/room.scss";


//craindo o o id da sala
type RoomParams = {
  id: string;
};

// criando a sala de perguntas
export function AdminRoom() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestions] = useState("");
  const roomId = params.id;

  const { title,questions} = useRoom(roomId);
  


  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    // criando a regra para poder fazer a pegunta.
    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("you must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/question`).push(question);
    setNewQuestions("");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>
          <RoomCode code={roomId} />
          <Button> Encerrar sala </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question 
              key={question.id} 
              content={question.content} 
              author={question.author} />
            );
          })}
        </div>
      </main>
    </div>
  );
}
