import { useState } from 'react';
import { Header } from '../../components/Header';
import ItemList from '../../components/ItemList';
import background from '../../assets/background.svg';
import './styles.css';

function App() {
  const [usuario, setUsuario] = useState('');
  const [currentUsuario, setCurrentUsuario] = useState(null);
  const [repos, setRepos] = useState(null);


  const handleGetData = async () => {
    setRepos(null);

    const dadosUsuario = await fetch(`https://api.github.com/users/${usuario}`);

    const newUser = await dadosUsuario.json();    

    if (newUser.name) {
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUsuario({avatar_url, name, bio, login});

      const dadosRepos = await fetch(`https://api.github.com/users/${usuario}/repos`);
      const newRepos = await dadosRepos.json();

      if (newRepos.length) {
        setRepos(newRepos);
      }
    }
  }

  return (
    <div className="App">
      <Header/>
      <div className="conteudo">

          <img src={background} className="octocat" alt="backgroud app"/>

          <div className="info">
            <div className="grupo-input">
              <input name="usuario" value={usuario} 
              onChange={event => setUsuario(event.target.value)}
              placeholder="@username" />
              <button onClick={handleGetData}>Buscar</button>
            </div>

            {currentUsuario?.name ? (
            <>
              <div className="perfil">
                <img src={currentUsuario.avatar_url} className="profile" alt=""/>
                <div>
                    <h3>{currentUsuario.name}</h3>
                    <span>@{currentUsuario.login}</span>
                  <p>{currentUsuario.bio}</p>
                </div>
              </div>
   
              <hr/>
            </>
            ) : null}
            
            {repos?.length ? (
                <div>
                  <h4 className='repositorio'>Repositórios</h4>

                  {repos.map((repo, indice) => {
                    return (
                      <ItemList key={indice} title={repo.name} description={repo.description}/>
                    )
                  })}
                </div>
              ): null}
          </div>
      </div>
      
    </div>
  );
}

export default App;
