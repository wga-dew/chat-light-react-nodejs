import React from 'react';
import axios from 'axios';
// import socket from '../socket';


function JoinBlock({onLogin}) {
  const [roomId, setRoomId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [errMess, setErrMess] = React.useState('');

  const onEnter = async () => {
    if (!roomId || !userName) {
      !roomId && userName ? setErrMess('Заполните поле с ID комнаты!') 
      : !userName && roomId ? setErrMess('Заполните поле с ваши именем!')
      : setErrMess('Заполните все поля коректно!');
      return;
    } 

    cleanAlert();
    
    const obj = {
      roomId,
      userName,
      isJoined: true
    };

    setLoading(true);

    await axios.post('/rooms', obj)
    .then(res => {
      if (res.status === 200 || res.status === 304) onLogin(obj);
      else throw Error(`Не удалось получить данные код ошибки ${res.status}`);
    });
  };

  const cleanAlert = () => {
    setErrMess('');
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-5 col-md-7 col-sm-8 col-10 text-align-center">
        <div className="join-block text-center">
          {
            errMess ? (
              <div className="alert alert-warning alert-dismissible fade show mb-2" role="alert">
                {errMess}
                <button onClick={() => cleanAlert()} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            ) : null
          }
          <input 
            type='text'
            className="form-control w-100"
            placeholder='Room ID'
            value={roomId}
            onChange={e => setRoomId(e.target.value)}
          />
          <input 
            type='text'
            className="form-control w-100"
            placeholder='Ваше имя'
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <button 
            className="btn btn-success w-100"
            onClick={onEnter}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default JoinBlock
