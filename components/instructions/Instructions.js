import React, { useState, useEffect } from 'react';

const Instructions = () => {
  const [instructions, setInstructions] = useState( '');
  /*
   * useEffect(() => {
   * const fetchData = async () => {
   *  const response = await fetch("/api/instructions/");
   *  return await response.json();
   * };
   * fetchData().then(data => setInstructions(data.instructions));
   * }); 
   */
  return (
    <div dangerouslySetInnerHTML={ { __html: instructions } } />
  )
};

export default Instructions;
