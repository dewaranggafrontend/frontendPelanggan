import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { authentication } from '../store/Recoil';

function Authenticated(props) {
  const navigate = useNavigate();
  const { auth } = useRecoilValue(authentication);
  useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  }, []);

  return props.children;
}

export default Authenticated;
