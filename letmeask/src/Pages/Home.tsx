import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react';

import IllustracionImg from '../assets/images/illustration.svg';
import logoimg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { database } from '../services/Firebase'

//importando o botão
import { Button } from '../components/Button';
import { useAuth} from '../hooks/useAuth';
import '../Style/auth.scss';
;



export function Home(){

    const history = useHistory();
    const { user, singInWithGoogle} = useAuth();
    const [roomCode, setRoomCode] = useState('');// variavel apra armazenar o codido da sala

       async function HandleCreateRoom(){
            if(!user){
               await singInWithGoogle();
            }

            history.push('./rooms/new')
        }

        async function handleJoinRoom(event: FormEvent){
            event.preventDefault();
            
            // verificando se o codifo esta vazio
            if( roomCode.trim() ===''){
                return;
            }

            const roomRef = await database.ref(`rooms/${roomCode}`).get();
            if(!roomRef.exists()){
                alert('Room does not exists,')
                return;
            }

            history.push(`./rooms/${roomCode}`)
        }

    return (
        <div id="page-auth">
            <aside>
                <img src={IllustracionImg} alt="ilustração de perguntas e respostas"/>
                <strong> Crie sala de Q&amp;A ao-vivo</strong>
                <p>Tire as Dúvidas da sua audiência em tempo-real</p>
            </aside>
            
            <main>
                <div className="main-content">
                   <img src={logoimg} alt="Letmeask" />
                    <button onClick={HandleCreateRoom} className="create-room"> 
                        <img src={googleIconImg} alt="logo do google" />
                        Crie uma sala
                    </button>
                    <div className="separator"> ou entre em uma sala </div>

                    <form onSubmit={handleJoinRoom}>
                        <input type="text"
                        placeholder="Digite o código da sala" 
                        onChange={event => setRoomCode(event.target.value)}
                        value={roomCode}
                        />
                         <Button type="submit">
                        Entrar na sala
                    </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}