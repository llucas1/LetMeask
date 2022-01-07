import { useEffect, useState } from "react";
import {database} from '../services/Firebase'


type firebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
  }
>;

type QuestionsType = {
    id: string;
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
  };


export function useRoom (roomId: string) {
    const [questions, setQuestions] = useState<QuestionsType[]>([]);
    const [title, setTitle] = useState("");

    
  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: firebaseQuestions = databaseRoom.question ?? {};

      const parsQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighLighted: value.isHighLighted,
            isAnswered: value.isAnswered,
          };
        }
      );

      setTitle(databaseRoom.title);
      setQuestions(parsQuestions);
    });
  }, [roomId]);

  return {questions, title}

}