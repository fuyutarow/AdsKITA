import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default () => {
  const { id: adId } = useParams();
  return (
    <div>@fuyutarowさんが応援しています</div>
  );
};
