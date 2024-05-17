import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import Logo from './components/icons/Logo';
import Card from "./components/Card";
import { createApi } from "unsplash-js";
import Masonry from '@mui/lab/Masonry';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useBookStore } from './store/bookStore';
import Login from './components/Login';
import appFirebase from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import debounce from 'lodash.debounce';

const auth = getAuth(appFirebase);

const api = createApi({
  accessKey: import.meta.env.VITE_ACCESKEY
});

function App() {
  // Logica de login 
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
      } else {
        setUsuario(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState([]);
  let index = useRef(1);

  const val = useBookStore(state => state.value);
  
  const fetchPhotos = useCallback(
    debounce((query, page) => {
      api.search
        .getPhotos({ query, perPage: 20, page })
        .then(result => {
          if (page === 1) {
            setData(result.response.results);
          } else {
            setData(prevData => [...prevData, ...result.response.results]);
          }
          if (result.response.results.length === 0) {
            setHasMore(false);
          }
        })
        .catch(() => {
          console.log("Something went wrong!");
        });
    }, 300),
    []
  );

  useEffect(() => {
    index.current = 1;
    setHasMore(true);
    fetchPhotos(val, index.current);
  }, [val, fetchPhotos]);

  const moreData = () => {
    index.current += 1;
    if (index.current === 3) {
      setHasMore(false); // Actualiza el estado directamente a false
    }
    fetchPhotos(val, index.current);
  }

  return (
    <div className='container'>
      {usuario ? (
        <>
          <Header correoUsuario={usuario.email} />
          <InfiniteScroll
            dataLength={data.length}
            next={moreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            style={{ overflow: 'none' }}
          >
            <Masonry 
              columns={{ xs: 2, sm: 3, md: 5 }}
              spacing={{ xs: 1, sm: 2, md: 3 }} 
              className='masonry'
            > 
              {data.map(item => (
                <Card key={item.id} item={item} />
              ))}
            </Masonry>
          </InfiniteScroll>
        </>
      ) : <Login />}
    </div>
  );
}

export default App;
