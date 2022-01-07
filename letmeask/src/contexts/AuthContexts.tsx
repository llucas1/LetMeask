import { createContext, ReactNode, useEffect, useState} from'react';
import { auth, firebase } from '../services/Firebase';
// ciar as informações que vai no usuario e formato como String
type User ={
    id: string;
    name: string;
    avatar: string;
  }
  
  //criar um tipo de informação do usuario
  type authContextType = {
      user: User | undefined;
      singInWithGoogle: () =>  Promise<void>;
  }

  type AuthContextProviderProps = {
    children: ReactNode;
  }
  

export const authContext = createContext ({} as authContextType);
// faz o armazenamento dos dados do usuario
export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<User>()

    // aqui faz a recuperação dos dados do usuario caso ele relogue a paginas
    useEffect(() => {
      const UnSubScribe = auth.onAuthStateChanged(user => {
        if (user) {
          const {displayName, photoURL, uid} = user
            if(!displayName || !photoURL){
                throw new Error('missing inforamtion from Google Accont.');
            }
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL,
            })
        }
      })
      //depois que osuario sair ele deixa de ouvir a função acima
      return () => {
        UnSubScribe();
      }
    }, [])
  
    // fazendo autenticação do usuario para todas as paginas.
    async function singInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
  
        
      const result = await auth.signInWithPopup(provider)
  
          if(result.user) {
            const {displayName, photoURL, uid} = result.user
  
            if(!displayName || !photoURL || !uid) {
              throw new Error('missing infomration form Google Accont.')
            }
            setUser({
              id: uid,
              name:displayName,
              avatar:photoURL
            })
          }
    }
    return (
        <authContext.Provider value={{user, singInWithGoogle}}>
            {props.children}
        </authContext.Provider>

    );
}