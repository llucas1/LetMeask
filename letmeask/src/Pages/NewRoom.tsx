import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import IllustracionImg from '../assets/images/illustration.svg';
import LogoImg from '../assets/images/logo.svg';

//importando o botão
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/Firebase';
import '../Style/auth.scss';



export function NewRoom() {

    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();

        //criando a sala e verificando se a algum usuario logado com
        if(newRoom.trim() === ' '){
            return;
        }

        // referenciado informação do banco de dados
        const roomRef = database.ref('rooms'); 

        // aqui vai criar o metodo push para jogar uma salda dentro da rooms
        const firebaseRoom = await roomRef.push({// aqui insere o dado no banco para salvar a chave de acesso
            title: newRoom,
            authId: user?.id,
        })

        history.push('./rooms/${firebaseRoom.key}') 
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
                <img src={LogoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>    
                        <form onSubmit={handleCreateRoom}>
                            <input type="text"
                            placeholder="Nome da sala" 
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                            />
                            <Button type="submit">
                            Criar sala
                        </Button>
                        </form>
                    <p> Quer entrar em uma sala existente? </p> <Link to="/">Clique aqui</Link>
                </div>
            </main>
        </div>
    )
}