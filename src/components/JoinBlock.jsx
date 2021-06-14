import React from 'react';
import socket from '../socket';


function JoinBlock() {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-5 col-md-7 col-sm-8 col-10 text-align-center">
        <div className="join-block text-center">
          <input 
            type='text'
            className="form-control w-100"
            placeholder='Room ID' 
          />
          <input 
            type='text'
            className="form-control w-100"
            placeholder='Ваше имя' 
          />
          <input 
            type='button'
            className="btn btn-success w-100"
            value='Войти' 
          />
        </div>
      </div>
    </div>
  )
}

export default JoinBlock
